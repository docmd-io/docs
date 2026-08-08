---
title: "Semantic Search Integration"
description: "Configure and deploy client-side hybrid semantic search in docmd using local vector embeddings."
---

Traditional full-text search relies on exact keyword matches. If a user searches for "authentication" but the page only uses terms like "OAuth2" or "login", standard keyword search engines fail to discover it.

docmd provides client-side **Hybrid Semantic Search** powered by `@docmd/plugin-search`. It runs local Hugging Face ONNX model pipelines inside the browser, combining BM25 keyword frequency with vector cosine similarity for natural language understanding without third-party API calls.

## Configuration

Enable semantic search in `docmd.config.json`:

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

## Embedding Model Profiles

| Model ID | Dimensions | Size | Languages | Primary Use Case |
| :--- | :---: | :---: | :--- | :--- |
| `Xenova/all-MiniLM-L6-v2` | 384 | ~90 MB | English only | High-accuracy English documentation. |
| `Xenova/LaBSE` | 768 | ~470 MB | 100+ languages | Comprehensive multi-language support. |
| `Xenova/paraphrase-multilingual-MiniLM-L12-v2` | 384 | ~220 MB | 50+ languages | Recommended balance for international sites. |

## Pre-Building Vectors in CI/CD

Pre-generate vector index chunks during build steps to accelerate browser execution:

```bash
# Build semantic search vector chunks
npx docmd-search --build

# Compile static site
npx @docmd/core build
```

This emits static Vecto-JSON chunks into `.docmd-search/`.

::: callout tip "Caching Vector Chunks" icon:zap
Commit `.docmd-search/` to version control or cache it in CI/CD workflows. `docmd-search` performs incremental re-indexing, completing subsequent builds in under 300ms.
:::