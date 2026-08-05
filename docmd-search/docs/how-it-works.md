---
title: "How It Works"
description: "Architecture deep-dive: engine adapter, file discovery, heading-aware chunking, ONNX embedding, vector compression, multi-batch indexing, and hybrid browser search."
---

`docmd-search` works in two distinct phases: a **build-time** pipeline running on Node.js, and a lightweight **search-time** client running in the browser.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                 BUILD TIME (Node.js)                    │
│                                                         │
│   Crawl → Chunk → Embed (ONNX) → Quantise → Compress    │
│              │                      │                   │
│              └──────────────────────┘                   │
│                        │                                │
│               Engine Adapter (Rust → JS → built-in)     │
│                        │                                │
│                        ▼                                │
│                _docmd-search/                           │
│                ├── manifest.json                        │
│                ├── navigation.json                      │
│                └── batches/ (000.json + 000.bin)        │
└─────────────────────────────────────────────────────────┘
                         │
                    Deploy / Host
                         │
┌─────────────────────────────────────────────────────────┐
│               SEARCH TIME (Browser, <3KB)               │
│                                                         │
│  Load manifest → Load batches/000.json → Search ready   │
│                → Stream remaining batches in background │
│                → BM25 term scoring + Cosine similarity  │
│                → Ranked search results                  │
└─────────────────────────────────────────────────────────┘
```

## Engine Adapter Integration

`docmd-search` uses an **engine adapter** (`src/engine.ts`) to assign CPU-heavy work (such as text chunking and vector quantisation) to the fastest available engine:

| Priority | Engine | Selection Condition |
| :------- | :----- | :------------------ |
| 1 | **Rust Engine** | `@docmd/engine-rust` binary installed in system `node_modules` |
| 2 | **JS Engine** | `@docmd/engine-js` module present (within docmd environment) |
| 3 | **Built-in Fallback** | Native TypeScript/JavaScript fallback engine |

::: callout info "Runs Standalone"
`docmd-search` does not require `docmd` or native binary engines. When running standalone (`npx docmd-search ./docs`), the built-in fallback engine handles all chunking and vector processing automatically.
:::

### Delegated Engine Functions

| Operation | Purpose |
| :-------- | :------ |
| `search:chunk` | Splits documents into overlapping chunks by heading structure |
| `search:quantize` | Quantises Float32 vectors to Int8 arrays |
| `search:cosine` | Batch vector dot product and similarity scoring |

ONNX Runtime model execution runs inside Node.js using `onnxruntime-node`. Native engine providers handle text splitting and post-processing tasks.

## Build-Time Pipeline Details

### 1. File Discovery (Crawl)

The crawler scans target directories for files matching `include` patterns while respecting `exclude` rules. Default file extensions: `.md`, `.txt`, `.html`.

During incremental builds, the crawler checks file modification times (`mtime`) and file sizes against records stored in `manifest.json`. Unchanged files are skipped.

### 2. Heading-Aware Chunking

Documents are split into sections along Markdown heading markers (`#`, `##`, `###`):

- Headings mark section boundaries.
- Chunk sizes follow the configured `chunkSize` (default: 256 tokens).
- Neighbouring chunks share `chunkOverlap` tokens (default: 32 tokens) to preserve context across section splits.
- Chunks record relative file paths, heading contexts, and byte offset ranges.

### 3. ONNX Vector Embedding

Text chunks pass into the ONNX Runtime model to produce dense vector representations:

::: callout info "Local ONNX Runtime"
ONNX Runtime processes models locally without cloud APIs or CUDA requirements. Models download once and are saved in `~/.docmd-search/models/`.
:::

Models run in **Int8-quantised form** (`q8`). Quantised models take ~75% less disk space than 32-bit float models with minimal retrieval impact.

The ONNX execution environment configures CPU threading based on physical core counts to maximize SIMD throughput.

### 4. Vector Quantisation

Raw embedding vectors (384 dimensions × 4 bytes = 1,536 bytes per chunk) are quantised to signed 8-bit integers (`Int8`), reducing memory usage to 384 bytes per chunk.

### 5. Multi-Batch Index Storage

Index files are written into batches under `_docmd-search/`:

```
_docmd-search/
├── manifest.json         # Index schema version, model ID, file timestamps
├── navigation.json       # Structural navigation tree
└── batches/
    ├── 000.json          # First batch chunk metadata
    ├── 000.bin           # First batch quantised vector data
    └── ...
```

## Search-Time Client Runtime

The browser client bundle is under **3KB gzipped** and contains no neural network model weights.

### Asynchronous Loading Strategy

1. **Manifest Fetch**: Loads `manifest.json` to inspect batch counts and vector dimensions.
2. **Initial Batch Load**: Loads `batches/000.json` and `batches/000.bin` so search is ready immediately.
3. **Background Streaming**: Asynchronously fetches remaining batches during idle browser cycles (`requestIdleCallback`).

### Hybrid Scoring Strategy

Queries are scored using a two-stage hybrid ranking strategy:

#### Stage 1: BM25 Term Matching

The query is tokenised into terms, and candidate chunks are scored using term frequency saturation:

$$\text{keywordScore} = \sum \frac{\text{count}(t)}{\text{count}(t) + 1.5}$$

#### Stage 2: Vector Cosine Reranking

Candidate chunks undergo cosine similarity reranking against the top match's vector. Scores are normalised to $[0, 1]$:

$$\text{normalisedKw} = \frac{\text{keywordScore}}{\text{keywordScore} + 1}$$

$$\text{finalScore} = (\text{normalisedKw} \times 0.6) + (\text{cosineSimilarity} \times 0.4)$$

## Index File Format Schema

### manifest.json Schema

```json
{
  "version": 3,
  "model": "Xenova/all-MiniLM-L6-v2",
  "dimensions": 384,
  "status": "complete",
  "totalChunks": 1247,
  "batchCount": 3,
  "files": {
    "docs/index.md": { "mtime": 1714500000, "size": 2048 },
    "docs/guide.md": { "mtime": 1714500100, "size": 4096 }
  }
}
```

### batch-NNN.json Schema

```json
{
  "batchId": 0,
  "dimensions": 384,
  "compression": "none",
  "vectorCount": 500,
  "chunks": [
    {
      "file": "docs/index.md",
      "heading": "Getting Started",
      "text": "Run docmd-search...",
      "range": [0, 256]
    }
  ],
  "vectors": "..."
}
```
