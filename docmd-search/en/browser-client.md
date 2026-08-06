---
title: "Browser Client"
description: "Integrate semantic search into any web page. Under 3KB gzipped, no model weights, pure arithmetic scoring."
---

The browser client is a lightweight search runtime (<3KB gzipped) that loads pre-built static search index files and scores results using keyword matching and integer vector cosine similarity without web workers, WASM, or neural network model weights.

## Package Installation & Import

::: tabs
== tab "npm Package" icon:package
```bash
npm install docmd-search
```

```javascript
import { load, search, isReady } from 'docmd-search/client';
```
== tab "CDN Bundle" icon:globe
```html
<script src="https://unpkg.com/docmd-search/dist/client/index.js"></script>
<script>
  const { load, search, isReady } = window.DocmdSearch;
</script>
```
:::

## Basic Usage Example

```javascript
import { load, search } from 'docmd-search/client';

// Initialise index from pre-built _docmd-search directory
await load('/assets/_docmd-search');

// Execute search query
const results = search('deploy kubernetes', 10);

for (const result of results) {
  console.log(`${result.chunk.file} → ${result.chunk.heading} (${result.score.toFixed(2)})`);
}
```

## Client API Reference

### load(basePath, onBatchLoaded?)

Fetches index files from `basePath`. Reads `manifest.json`, loads `batches/000.json` so search is ready immediately, and streams remaining index batches asynchronously in the background.

```typescript
function load(
  basePath: string,
  onBatchLoaded?: (loaded: number, total: number) => void
): Promise<void>
```

**Parameters:**

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| `basePath` | `string` | Relative or absolute URL path containing `manifest.json` and batch files |
| `onBatchLoaded` | `function` | Callback triggered whenever a batch finishes loading |

**Batch Stream Callback Example:**

```javascript
await load('/_docmd-search', (loaded, total) => {
  const percent = Math.round((loaded / total) * 100);
  console.log(`Index loading progress: ${percent}% (${loaded}/${total} batches)`);
});
```

::: callout info "Asynchronous Batch Availability"
Search works as soon as `batches/000.json` completes loading. The `onBatchLoaded` callback lets you update loading indicators in your UI while background batches stream in.
:::

### search(query, topK?)

Evaluates queries against loaded index batches using hybrid scoring.

```typescript
function search(query: string, topK?: number): SearchResult[]
```

**Parameters:**

| Parameter | Type | Default | Description |
| :-------- | :--- | :------ | :---------- |
| `query` | `string` |  -  | Search query string |
| `topK` | `number` | `10` | Maximum results returned |

**Return Value:** `SearchResult[]`

```typescript
interface SearchResult {
  score: number;       // Normalised relevance score (0.0 to 1.0)
  chunk: {
    file: string;      // Relative source document file path
    heading?: string;  // Heading section context
    text: string;      // Chunk text snippet
    range: [number, number]; // Offset byte range in original source
  };
}
```

::: callout warning "Call load() First"
Running `search()` before `load()` finishes will throw an error. Use `isReady()` to check if the index is loaded before searching.
:::

### isReady()

Returns `true` if at least one batch has loaded and search is ready.

```typescript
function isReady(): boolean
```

### getProgress()

Returns current batch loading progress.

```typescript
function getProgress(): { loaded: number; total: number }
```

### getChunkCount()

Returns the total count of document chunks loaded into memory.

```typescript
function getChunkCount(): number
```

## HTML UI Integration Example

A complete standalone search bar integration:

```html
<input type="text" id="search-input" placeholder="Loading search index..." disabled />
<div id="search-results"></div>

<script type="module">
  import { load, search, isReady } from 'docmd-search/client';

  const input = document.getElementById('search-input');
  const resultsEl = document.getElementById('search-results');

  // Load static search index
  await load('/assets/_docmd-search', (loaded, total) => {
    input.placeholder = `Loading index... ${Math.round((loaded / total) * 100)}%`;
  });

  input.placeholder = 'Search documentation...';
  input.disabled = false;
  input.focus();

  // Debounced input search
  let timer;
  input.addEventListener('input', () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      if (!isReady()) return;
      const results = search(input.value, 8);
      resultsEl.innerHTML = results
        .map(r => `
          <a href="/${r.chunk.file.replace('.md', '/')}">
            <strong>${r.chunk.heading || r.chunk.file}</strong>
            <p>${r.chunk.text.slice(0, 120)}...</p>
          </a>
        `)
        .join('');
    }, 150);
  });
</script>
```

## Hybrid Scoring System

Query ranking calculates candidate scores through a two-phase hybrid algorithm:

### Stage 1: BM25 Term Matching

Term occurrences in document text are scored with term-saturation dampening:

$$\text{keywordScore} = \sum \frac{\text{count}(t)}{\text{count}(t) + 1.5}$$

### Stage 2: Vector Cosine Reranking

The top keyword match vector serves as candidate reference. Cosine similarity is computed against candidate vectors, and scores are normalised to $[0, 1]$:

$$\text{normalisedKw} = \frac{\text{keywordScore}}{\text{keywordScore} + 1}$$

$$\text{finalScore} = (\text{normalisedKw} \times 0.6) + (\text{cosineSimilarity} \times 0.4)$$

## Index Version Compatibility

The client automatically detects legacy single-file search index schemas (`search-index.json`) when `manifest.json` is missing, maintaining full backward compatibility with older docmd versions.