---
title: "docmd-search"
description: "Offline semantic search engine for documentation. Local embeddings, browser-ready indexes."
---

Offline semantic search engine for documentation. Vector embeddings are generated locally at build time using ONNX Runtime. The browser client performs keyword matching and integer vector cosine similarity  -  sending no data to cloud services and shipping no neural network weights to the user.

::: callout tip "Zero-Config CLI"
Run `npx docmd-search ./docs` in any directory. Works out of the box with no setup, API keys, or manual config files.
:::

## Ways to Use It

`docmd-search` works as a standalone command-line tool or as a plugin for [docmd](https://docmd.io) documentation sites.

::: grid

::: card "Standalone CLI" icon:terminal
Run `docmd-search ./my-folder` to index any directory and search directly from your terminal. Add `--ui` to open a local browser interface.
:::

::: card "docmd plugin" icon:puzzle
Add `semantic: true` to your `docmd.config.js` to build search indexes automatically when building your site.
:::

:::

## Overview

```
Build time (Node.js)                    Search time (Browser, <3KB)
───────────────────                     ──────────────────────────
 Crawl markdown files                    Load manifest.json
   → Heading-aware chunking                → Load batches/000.json (search immediately)
     → ONNX vector embedding                 → Load remaining batches in background
       → Float32 → Int8 quantisation           → BM25 keyword + cosine scoring
         → Product / ternary compression         → Display ranked search results
           → Save index files (_docmd-search/)
```

At build time, embeddings are calculated using ONNX Runtime on your computer. The browser client receives pre-computed integer vectors and calculates term matching and vector scores locally.

## Key Features

::: grid

::: card "Runs Locally" icon:wifi-off
All vector embeddings are generated on your machine using ONNX Runtime. No data leaves your computer and no cloud API keys are needed.
:::

::: card "Fast Batch Loading" icon:zap
Search is ready as soon as the first batch loads. Incremental re-indexing checks modification times and only re-indexes changed files.
:::

::: card "Tiny Client Runtime" icon:package
The browser runtime is under **3KB gzipped**. It runs without neural network weights or heavy WASM modules.
:::

::: card "Resumable Builds" icon:refresh-cw
If indexing is interrupted, it resumes from the last completed batch. Output index files stay usable even if partial.
:::

:::

## Quick Start

::: tabs
== tab "Standalone CLI" icon:terminal
```bash
# Install globally
npm install -g docmd-search

# Install embedding dependencies (one-time setup)
npm install -g @huggingface/transformers onnxruntime-node

# Index any folder
docmd-search ./my-folder

# Launch browser preview
docmd-search ./my-folder --ui
```
== tab "docmd plugin" icon:puzzle
```bash
# In your docmd project repository
npm install docmd-search
```

Enable semantic search in your config file:

```js
// docmd.config.js
export default {
  plugins: {
    search: {
      semantic: true,  // Activates the docmd-search indexer
    }
  }
};
```
:::

On your first run, a interactive prompt helps you select an embedding model. Your documentation is crawled, split into sections by heading, embedded, and saved to `_docmd-search/`.

## Documentation Pages

| Page | Description |
| :--- | :---------- |
| [Getting Started](getting-started) | Installation, first run, and model selection |
| [Configuration](configuration) | Global, project, and command-line configuration options |
| [How It Works](how-it-works) | Architecture, chunking, quantisation, and hybrid scoring |
| [CLI Reference](cli) | Command-line options, flags, and exit codes |
| [Programmatic API](api) | Node.js API methods for custom build scripts |
| [Browser Client](browser-client) | Browser client integration API and scoring logic |

## Architecture

`docmd-search` and `docmd` are independent tools designed to work seamlessly together:

```
┌─────────────────────────────────────────────────────────────────────┐
│                        docmd-search (standalone)                    │
│                                                                     │
│  CLI → Index directory → _docmd-search/ batches → Terminal search   │
│                              │                                      │
│                              │ --ui flag                            │
│                              ▼                                      │
│                    Start docmd preview server                       │
│                    (docmd serves the web UI)                        │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                        docmd (documentation engine)                 │
│                                                                     │
│  Config → Build site → plugin-search execution                      │
│                              │                                      │
│                              │ semantic: true                       │
│                              ▼                                      │
│                    Run docmd-search indexer                         │
│                    (Generates _docmd-search/ asset bundle)          │
└─────────────────────────────────────────────────────────────────────┘
```

When running standalone with the `--ui` flag:
1. `docmd-search` builds the search index.
2. It generates a temporary `docmd` config pointing to `_docmd-search/`.
3. It starts `docmd` as a local preview server to display the search UI.

When used as a plugin (`semantic: true`):
1. `docmd` imports `docmd-search` during site builds.
2. The indexer writes multi-batch JSON files into `_docmd-search/` in the output build directory.
3. The browser client searches these pre-built index files directly.