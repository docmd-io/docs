---
title: "Programmatic API"
description: "Use docmd-search in scripts, CI pipelines, and custom tooling. Full Node.js API reference with examples."
---

Import `docmd-search` as a library to build custom indexing pipelines, integrate with CI/CD build workflows, or create search applications.

```bash
npm install docmd-search
```

## Primary Pipeline Methods

### indexDirectory

Indexes a documentation directory programmatically. Returns a Promise that resolves to a `SearchIndex` object containing chunks and vector arrays.

```typescript
import { indexDirectory } from 'docmd-search';

const index = await indexDirectory(
  {
    rootDir: './docs',
    outDir: '_docmd-search',
    model: 'Xenova/all-MiniLM-L6-v2',
    include: ['**/*.md'],
    exclude: ['**/drafts/**'],
    chunkSize: 256,
    chunkOverlap: 32,
  },
  (progress) => {
    console.log(`${progress.phase}: ${progress.current}/${progress.total}`);
  }
);

console.log(`Indexed ${index.chunks.length} chunks`);
```

**Options Schema:**

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| `rootDir` | `string` | Path to the directory to index |
| `outDir` | `string` | Destination folder for index files (default: `_docmd-search`) |
| `model` | `string` | HuggingFace embedding model ID |
| `include` | `string[]` | Glob patterns for included file types |
| `exclude` | `string[]` | Glob patterns for excluded directories |
| `chunkSize` | `number` | Maximum tokens per chunk |
| `chunkOverlap` | `number` | Token overlap between neighbouring chunks |
| `config` | `SearchConfig` | Full configuration object (overrides individual options) |

**Progress Callback Phases:**

| Phase Identifier | Description |
| :--------------- | :---------- |
| `crawling` | Discovering files matching glob patterns |
| `chunking` | Splitting files into token-bounded chunks |
| `downloading-model` | Downloading ONNX model weights (first run only) |
| `embedding` | Generating vector embeddings using ONNX Runtime |
| `saving` | Writing JSON index batch files to disk |
| `complete` | Indexing finished |

## Index Storage & I/O

### Reading Index Files

```typescript
import { loadAllBatches, loadBatch, loadManifest, hasSearchableIndex } from 'docmd-search';

// Check if a valid index exists
if (hasSearchableIndex('_docmd-search')) {
  // Load complete index into memory
  const index = await loadAllBatches('_docmd-search');

  // Or read manifest and specific batches individually
  const manifest = await loadManifest('_docmd-search');
  const batch0 = await loadBatch('_docmd-search', 0);
}
```

### Manual Index Construction

```typescript
import { createSearchIndex, saveBatch, saveManifest, createEmptyManifest } from 'docmd-search';

// Create an in-memory index object
const index = createSearchIndex(chunks, vectors, {
  model: 'Xenova/all-MiniLM-L6-v2',
  dimensions: 384,
});

// Save batches and manifest manually
const manifest = createEmptyManifest('Xenova/all-MiniLM-L6-v2', 384);
await saveBatch('_docmd-search', 0, chunks, vectors, 384);
await saveManifest('_docmd-search', manifest);
```

### Vector Quantisation & Compression

```typescript
import { compressVectors, decompressVectors, getCompressionType } from 'docmd-search';

// Select compression scheme based on chunk count
const type = getCompressionType(chunkCount);
// Returns: 'none' | 'ternary' | 'pq'

// Compress raw vector array
const compressed = compressVectors(vectors, type);

// Decompress stored vectors
const restored = decompressVectors(compressed, dimensions, type);
```

## Configuration Resolution

### Resolving Config Hierarchies

```typescript
import { resolveConfig, loadGlobalConfig, loadProjectConfig } from 'docmd-search';

// Full tier merging: defaults → global → project → CLI overrides
const config = await resolveConfig('./my-project', {
  chunkSize: 512,
});

// Or load individual configuration layers
const globalConfig = await loadGlobalConfig();
const projectConfig = await loadProjectConfig('./my-project');
```

### Model Inspection API

```typescript
import { AVAILABLE_MODELS, getModelProfile, getDefaultModel } from 'docmd-search';

// List pre-configured model profiles
for (const model of AVAILABLE_MODELS) {
  console.log(`${model.name} (${model.dimensions}d, ${model.size})`);
}

// Get metadata for a specific model ID
const profile = getModelProfile('Xenova/bge-small-en-v1.5');

// Get default system model profile
const defaultModel = getDefaultModel();
```

## Model Initialisation & Embedding

### Initialising the Model Manager

```typescript
import { createModelManager, checkPeerDeps, formatMissingDepsMessage } from 'docmd-search';

// Check required peer dependencies
const missing = checkPeerDeps();
if (missing) {
  console.error(formatMissingDepsMessage(missing.missing));
  process.exit(1);
}

// Initialise ONNX model manager
const modelManager = await createModelManager(
  'Xenova/all-MiniLM-L6-v2',
  (progress) => {
    console.log(`Model status: ${progress.status} ${progress.progress}%`);
  }
);

// Generate vector embeddings for text strings
const vectors = await modelManager.embed(['Text string 1', 'Text string 2']);
```

::: callout warning "Peer Dependency Notice"
The ONNX model manager requires `@huggingface/transformers` and `onnxruntime-node`. Index loading and query utilities function independently without native embedding dependencies.
:::

## Exported Types

All TypeScript type definitions are exported directly from `docmd-search`:

```typescript
import type {
  // Core Data Structures
  SearchIndex,
  SearchResult,
  Chunk,
  VectorEntry,
  IndexOptions,

  // Configuration Types
  SearchConfig,
  ModelProfile,
  GlobalConfig,

  // Index Storage & Manifests
  IndexManifest,
  BatchMeta,
  NavNode,
  CompressionType,
  FileRecord,

  // Pipeline Progress
  IndexDirectoryOptions,
  IndexProgress,
  IndexPhase,

  // Model Manager Types
  ModelManager,
  ModelProgress,
} from 'docmd-search';
```