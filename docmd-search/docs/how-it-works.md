---
title: "How It Works"
description: "Architecture deep-dive: file discovery, heading-aware chunking, ONNX embedding, vector compression, multi-batch indexing, and hybrid browser search."
---

docmd-search splits the work into two distinct phases: a heavy **build-time** pipeline that runs on Node.js, and a lightweight **search-time** runtime that runs in the browser using only arithmetic.

## Architecture overview

```
┌─────────────────────────────────────────────────────────┐
│                    BUILD TIME (Node.js)                  │
│                                                         │
│  Crawl → Chunk → Embed (ONNX) → Quantize → Compress    │
│                        │                                │
│                        ▼                                │
│              .docmd-search/                             │
│              ├── manifest.json                          │
│              ├── batch-000.json                         │
│              ├── batch-001.json                         │
│              └── navigation.json                        │
└─────────────────────────────────────────────────────────┘
                         │
                    deploy / serve
                         │
┌─────────────────────────────────────────────────────────┐
│                  SEARCH TIME (Browser, <3KB)             │
│                                                         │
│  Load manifest → Load batch 000 → Search immediately    │
│                → Background-load remaining batches      │
│                → Keyword scoring + Cosine similarity     │
│                → Ranked results                         │
└─────────────────────────────────────────────────────────┘
```

## Build-time pipeline

### 1. Crawl

The crawler walks your directory and discovers files matching the `include` patterns while respecting `exclude` patterns. Default file types: `.md`, `.txt`, `.html`.

For incremental indexing, the crawler compares each file's modification time and size against the stored manifest. Unchanged files are skipped entirely.

### 2. Chunk

Each file is split into chunks using heading-aware boundaries:

- Markdown headings (`#`, `##`, `###`, etc.) create natural chunk boundaries
- Chunks respect the configured `chunkSize` (in tokens, default: 256)
- Adjacent chunks share `chunkOverlap` tokens (default: 32) to prevent information loss at boundaries
- Each chunk retains its source file path, heading context, and byte range

```
# Installation Guide              ← chunk boundary

## Prerequisites                  ← chunk boundary
You need Node.js 18+...
Make sure npm is installed...

## Quick Start                    ← chunk boundary
Run the following command...
```

### 3. Embed

Each chunk's text is fed through an ONNX Runtime model to produce a dense vector embedding — a fixed-length array of floating-point numbers that captures the chunk's semantic meaning.

::: callout info "Why ONNX?"
ONNX Runtime runs models locally without Python, CUDA, or cloud APIs. The models are downloaded once and cached globally. No data ever leaves your machine.
:::

### 4. Quantize

Raw embeddings are Float32 arrays (e.g., 384 dimensions × 4 bytes = 1,536 bytes per chunk). Quantization compresses them to Int8 (1 byte per dimension), reducing size by **75%** with negligible impact on search quality.

```
Float32: [0.234, -0.891, 0.045, ...]  →  Int8: [30, -114, 6, ...]
```

### 5. Compress

For larger indexes, additional compression kicks in automatically:

| Chunk count | Compression | Ratio | Description |
| :---------- | :---------- | :---- | :---------- |
| ≤ 100 | None | 1:1 | Raw Int8 vectors, no overhead |
| 101–1000 | Ternary | ~12:1 | Vectors reduced to {-1, 0, +1} values |
| > 1000 | Product Quantization | ~24:1 | Codebook-based, highest compression |

::: callout tip "Automatic selection"
You don't need to configure compression. The indexer selects the optimal strategy based on the number of chunks.
:::

### 6. Save (multi-batch)

Chunks and vectors are saved in batches:

```
.docmd-search/
├── manifest.json         # Index metadata, batch list, file records
├── batch-000.json        # First 500 chunks + vectors
├── batch-001.json        # Next 500 chunks + vectors
├── ...
└── navigation.json       # Auto-generated nav tree from file structure
```

Each batch is independently loadable. The manifest tracks which files are indexed, their modification times, and the batch structure. This enables:

- **Progressive loading** — search from batch 0, load rest in background
- **Incremental updates** — only rebuild batches containing changed files
- **Resumable indexing** — interrupted runs resume from the last complete batch

## Search-time runtime

The browser client is under **3KB gzipped**. It contains no model weights — only arithmetic for keyword matching and vector comparison.

### Loading strategy

::: steps

### Fetch manifest

The client loads `manifest.json` to learn how many batches exist and the vector dimensions.

### Load batch 0

The first batch loads and search becomes available immediately.

### Background-load remaining

Using `requestIdleCallback` (or `setTimeout` as fallback), remaining batches load without blocking the UI. Search results improve as more content becomes available.

:::

### Hybrid scoring

Each search query produces results using a two-phase scoring algorithm:

**Phase 1 — Keyword matching (BM25-like)**

The query is split into terms. Each chunk is scored by how many times each term appears, with BM25-style saturation to prevent long documents from dominating:

```
keywordScore = Σ count(term) / (count(term) + 1.5)
```

**Phase 2 — Vector reranking**

The top keyword result's pre-built vector is used as the query vector. All candidate results are reranked by cosine similarity:

```
finalScore = keywordScore × 0.6 + cosineSimilarity × 0.4
```

::: callout info "No browser-side embedding"
The browser never runs a neural network. The "query vector" is approximated from the best keyword match's pre-built vector. This keeps the runtime at pure arithmetic — no WASM, no model download, no GPU.
:::

## Index format

### manifest.json

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

### batch-NNN.json

```json
{
  "batchId": 0,
  "dimensions": 384,
  "compression": "ternary",
  "vectorCount": 500,
  "chunks": [
    {
      "file": "docs/index.md",
      "heading": "Getting Started",
      "text": "Run docmd-search...",
      "range": [0, 256]
    }
  ],
  "vectors": "<base64-encoded compressed vectors>"
}
```
