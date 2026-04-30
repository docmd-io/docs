---
title: "Browser Client"
description: "Integrate semantic search into any web page. Under 3KB gzipped, no model weights, pure math scoring."
---

The browser client is a lightweight runtime (under 3KB gzipped) that loads pre-built search indexes and performs hybrid keyword + vector search using only arithmetic. No neural network inference, no WASM, no external dependencies.

## Installation

::: tabs
== tab "npm" icon:package
```bash
npm install docmd-search
```

```javascript
import { load, search, isReady } from 'docmd-search/client';
```
== tab "CDN" icon:globe
```html
<script src="https://unpkg.com/docmd-search/dist/client/index.js"></script>
<script>
  const { load, search, isReady } = window.DocmdSearch;
</script>
```
:::

## Quick start

```javascript
import { load, search } from 'docmd-search/client';

// Load the index (path to .docmd-search directory)
await load('/assets/search-index');

// Search
const results = search('deploy kubernetes', 10);

for (const result of results) {
  console.log(`${result.chunk.file} → ${result.chunk.heading} (${result.score.toFixed(2)})`);
}
```

## API reference

### load(basePath, onBatchLoaded?)

Loads the search index from a URL path. Fetches `manifest.json`, loads batch 0 for instant search, then background-loads remaining batches.

```typescript
function load(
  basePath: string,
  onBatchLoaded?: (loaded: number, total: number) => void
): Promise<void>
```

**Parameters:**

| Parameter | Type | Description |
| :-------- | :--- | :---------- |
| `basePath` | `string` | URL path to the directory containing `manifest.json` and batch files |
| `onBatchLoaded` | `function` | Optional callback fired after each batch loads |

**Example with progress:**

```javascript
await load('/search-index', (loaded, total) => {
  const pct = Math.round((loaded / total) * 100);
  console.log(`Loading: ${pct}% (${loaded}/${total} batches)`);
});
```

::: callout info "Progressive availability"
Search becomes available as soon as batch 0 loads. The `onBatchLoaded` callback lets you update the UI to show loading progress while remaining batches load in the background.
:::

### search(query, topK?)

Searches the loaded index using hybrid scoring.

```typescript
function search(query: string, topK?: number): SearchResult[]
```

**Parameters:**

| Parameter | Type | Default | Description |
| :-------- | :--- | :------ | :---------- |
| `query` | `string` | — | Search query text |
| `topK` | `number` | `10` | Maximum number of results |

**Returns:** `SearchResult[]`

```typescript
interface SearchResult {
  score: number;       // Relevance score (0–1)
  chunk: {
    file: string;      // Source file path
    heading?: string;   // Section heading
    text: string;       // Chunk text content
    range: [number, number]; // Byte offset in source file
  };
}
```

::: callout warning "Call load() first"
Calling `search()` before `load()` completes throws an error. Check `isReady()` if you need to guard against this.
:::

### isReady()

Returns `true` if at least one batch has loaded and the index is searchable.

```typescript
function isReady(): boolean
```

### getProgress()

Returns the current loading progress.

```typescript
function getProgress(): { loaded: number; total: number }
```

### getChunkCount()

Returns the total number of chunks loaded so far.

```typescript
function getChunkCount(): number
```

## Integration example

A complete search box integration:

```html
<input type="text" id="search-input" placeholder="Search docs..." disabled />
<div id="search-results"></div>

<script type="module">
  import { load, search, isReady } from 'docmd-search/client';

  const input = document.getElementById('search-input');
  const resultsEl = document.getElementById('search-results');

  // Load index
  await load('/assets/.docmd-search', (loaded, total) => {
    input.placeholder = `Loading... ${Math.round((loaded / total) * 100)}%`;
  });

  input.placeholder = 'Search docs...';
  input.disabled = false;
  input.focus();

  // Search on input
  let debounce;
  input.addEventListener('input', () => {
    clearTimeout(debounce);
    debounce = setTimeout(() => {
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

## Scoring algorithm

The client uses a two-phase hybrid scoring approach:

::: steps

### Phase 1 — Keyword matching

The query is split into terms. Each chunk is scored with BM25-style saturation:

```
keywordScore = Σ count(term) / (count(term) + 1.5)
```

### Phase 2 — Vector reranking

The best keyword match's pre-built vector serves as the query vector. All candidates are reranked using cosine similarity:

```
finalScore = keywordScore × 0.6 + cosineSimilarity × 0.4
```

:::

::: callout tip "No browser-side embedding"
The browser never runs a neural network. The top keyword match is used as a proxy for semantic similarity, which is surprisingly effective in practice.
:::

## Legacy format support

The client automatically detects and loads legacy single-file indexes (`search-index.json`) when no `manifest.json` is found. No code changes needed — the same `load()` function handles both formats.