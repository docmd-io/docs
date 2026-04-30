---
title: "Programmatic API"
description: "Use docmd-search in scripts, CI pipelines, and custom tooling. Full Node.js API reference with examples."
---

Import docmd-search as a library to build custom indexing pipelines, integrate with CI/CD workflows, or create your own search interfaces.

```bash
npm install docmd-search
```

## Core pipeline

### indexDirectory

The primary function for indexing a directory. Returns a `SearchIndex` object containing all chunks and vectors.

```typescript
import { indexDirectory } from 'docmd-search';

const index = await indexDirectory(
  {
    rootDir: './docs',
    outDir: '.docmd-search',
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

**Options:**

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| `rootDir` | `string` | Directory to index |
| `outDir` | `string` | Output directory for the index |
| `model` | `string` | Embedding model identifier |
| `include` | `string[]` | Glob patterns for files to index |
| `exclude` | `string[]` | Glob patterns to skip |
| `chunkSize` | `number` | Max tokens per chunk |
| `chunkOverlap` | `number` | Token overlap between chunks |
| `config` | `SearchConfig` | Full config object (overrides individual options) |

**Progress callback phases:**

| Phase | Description |
| :---- | :---------- |
| `crawling` | Discovering files |
| `chunking` | Splitting content into chunks |
| `downloading-model` | Downloading the ONNX model (first run only) |
| `embedding` | Generating vector embeddings |
| `saving` | Writing batches to disk |
| `complete` | Indexing finished |

## Index I/O

### Loading indexes

```typescript
import { loadAllBatches, loadBatch, loadManifest, hasSearchableIndex } from 'docmd-search';

// Check if a valid index exists
if (hasSearchableIndex('.docmd-search')) {
  // Load everything
  const index = await loadAllBatches('.docmd-search');

  // Or load individual batches
  const manifest = await loadManifest('.docmd-search');
  const batch0 = await loadBatch('.docmd-search', 0);
}
```

### Creating indexes manually

```typescript
import { createSearchIndex, saveBatch, saveManifest, createEmptyManifest } from 'docmd-search';

// Create an index from existing data
const index = createSearchIndex(chunks, vectors, {
  model: 'Xenova/all-MiniLM-L6-v2',
  dimensions: 384,
});

// Or build batches manually
const manifest = createEmptyManifest('Xenova/all-MiniLM-L6-v2', 384);
await saveBatch('.docmd-search', 0, chunks, vectors, 384);
await saveManifest('.docmd-search', manifest);
```

### Compression

```typescript
import { compressVectors, decompressVectors, getCompressionType } from 'docmd-search';

// Determine compression based on chunk count
const type = getCompressionType(chunkCount);
// Returns: 'none' | 'ternary' | 'pq'

// Compress vectors
const compressed = compressVectors(vectors, type);

// Decompress
const restored = decompressVectors(compressed, dimensions, type);
```

## Configuration

### Resolve config

```typescript
import { resolveConfig, loadGlobalConfig, loadProjectConfig } from 'docmd-search';

// Full resolution: defaults → global → project → overrides
const config = await resolveConfig('./my-project', {
  chunkSize: 512,
});

// Or load individual layers
const global = await loadGlobalConfig();
const project = await loadProjectConfig('./my-project');
```

### Model profiles

```typescript
import { AVAILABLE_MODELS, getModelProfile, getDefaultModel } from 'docmd-search';

// List all available models
for (const model of AVAILABLE_MODELS) {
  console.log(`${model.name} (${model.dimensions}d, ${model.size})`);
}

// Get a specific model's profile
const profile = getModelProfile('Xenova/bge-small-en-v1.5');

// Get the default recommended model
const defaultModel = getDefaultModel();
```

## Embedding model

### Create and use the model manager

```typescript
import { createModelManager, checkPeerDeps, formatMissingDepsMessage } from 'docmd-search';

// Check if peer dependencies are installed
const missing = checkPeerDeps();
if (missing) {
  console.error(formatMissingDepsMessage(missing.missing));
  process.exit(1);
}

// Create a model manager
const model = await createModelManager(
  'Xenova/all-MiniLM-L6-v2',
  (progress) => {
    console.log(`Model: ${progress.status} ${progress.progress}%`);
  }
);

// Generate embeddings
const vectors = await model.embed(['Hello world', 'Another text']);
```

::: callout warning "Peer dependencies required"
The model manager requires `@huggingface/transformers` and `onnxruntime-node` to be installed. These are optional peer dependencies — the rest of the API works without them.
:::

## Types

All types are exported from the main package:

```typescript
import type {
  // Core
  SearchIndex,
  SearchResult,
  Chunk,
  VectorEntry,
  IndexOptions,

  // Config
  SearchConfig,
  ModelProfile,
  GlobalConfig,

  // Index I/O
  IndexManifest,
  BatchMeta,
  NavNode,
  CompressionType,
  FileRecord,

  // Pipeline
  IndexDirectoryOptions,
  IndexProgress,
  IndexPhase,

  // Model
  ModelManager,
  ModelProgress,
} from 'docmd-search';
```
