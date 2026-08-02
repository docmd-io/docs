---
title: "Semantic Search Integration"
description: "How to configure and deploy client-side hybrid semantic search in docmd using local vector embeddings."
---

## Problem

Traditional full-text search relies entirely on exact keyword matches. If a user searches for "authentication" but the page only uses terms like "OAuth2" or "login", a standard keyword search engine will fail to find it. This forces writers to perform unnatural keyword-stuffing and leaves readers frustrated when they cannot find what they need.

## Why it matters

Modern developers expect natural language interfaces that understand intent, synonyms, and context. Implementing server-side semantic search typically requires setting up complex infrastructure like vector databases (e.g., Pinecone or pgvector), hosting models, and building APIs, which increases maintenance overhead, monthly hosting costs, and introduces security and privacy concerns.

## Approach

Use docmd's native **Semantic Search Plugin**. It operates entirely client-side using a highly optimised browser runtime. It generates structured vector chunk indices at build time using local Hugging Face model pipelines, then re-ranks matches using hybrid BM25 keyword frequency and vector cosine similarity. No data is ever sent to third-party APIs.

## Implementation

### 1. Enable Semantic Search in Configuration

Add the `search` plugin options within your `docmd.config.json`. Configure `semantic` to `true` and enable `showConfidence` to visually identify semantic matching in search results:

```json "docmd.config.json"
{
  "plugins": {
    "search": {
      "semantic": true,
      "showConfidence": true
    }
  }
}
```

### 2. Choose the Right Embedding Model

docmd supports both lightweight English-only models and comprehensive multilingual models. Update your model profile using `docmd-search --settings` or define it explicitly:

| Model ID | Dimensions | Size | Languages | Best For |
| :--- | :---: | :---: | :--- | :--- |
| `Xenova/all-MiniLM-L6-v2` | 384 | ~90 MB | English only | Fast, high-accuracy English docs |
| `Xenova/LaBSE` | 768 | ~470 MB | 100+ languages | Absolute best multilingual quality |
| `Xenova/paraphrase-multilingual-MiniLM-L12-v2` | 384 | ~220 MB | 50+ languages | Excellent multi-language balance |

### 3. Pre-Building Index in CI/CD

To prevent overhead in the browser during first-load, pre-generate the search chunks during your build or CI/CD pipeline using the CLI:

```bash
# Build the semantic search index
npx docmd-search --build

# Run docmd build afterwards
npx @docmd/core build
```

This generates highly optimised static Vecto-JSON chunks in `.docmd-search/`. When a user performs a search, the client progressively loads these chunks in the background, keeping the UI instantly interactive.

::: callout tip
**Commit or Cache `.docmd-search/`:** Because `docmd-search` supports incremental indexing, committing the generated `.docmd-search/` directory to your git repository or caching it in your CI/CD workflow will make subsequent builds run instantly (under 300ms) by only re-indexing changed files.
:::

## Trade-offs

### Initial Asset Size
Client-side vector embeddings require the browser to download a WebAssembly runtime and the pre-trained ONNX model file on the first search. Although these assets are persistently cached in the browser's Cache Storage, the first-load search latency may be slightly higher on slower connections (~1-2 seconds delay).

### Search Quality vs Payload Size
Choosing larger models like `LaBSE` offers exceptional multilingual quality but results in larger downloads. For standard international documentation websites, the `paraphrase-multilingual-MiniLM-L12-v2` model is the recommended sweet spot between accuracy and network payload.