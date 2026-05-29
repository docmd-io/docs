---
title: "docmd-search"
description: "Offline semantic search engine for documentation. Local embeddings, browser-ready indexes."
---

Offline semantic search engine for documentation. Embeddings are generated locally at build time. The browser runtime is pure math — no model weights, no cloud APIs, no data leaving your machine.

::: callout tip "Zero config"
Run `npx docmd-search ./docs` in any folder. No setup, no API keys, no config file needed.
:::

## Two ways to use it

docmd-search is a **completely standalone tool**. It can also integrate with [docmd](https://docmd.io) when you want semantic search in your documentation site.

::: grid

::: card "Standalone CLI" icon:terminal
Run `docmd-search ./any-folder` to index any directory and get an interactive terminal search. Add `--ui` to launch a web interface powered by docmd.
:::

::: card "docmd plugin" icon:puzzle
Add `semantic: true` to your docmd config and docmd-search powers the search. No code changes — just a config flag.
:::

:::

## How it works

```
Build time (Node.js)                    Search time (Browser, <3KB)
───────────────────                     ──────────────────────────
 Crawl files                             Load manifest.json
   → Chunk by heading                      → Load batch 000 (instant)
     → Embed via ONNX                        → Background-load rest
       → Quantize Float32 → Int8               → Keyword + cosine
         → Compress (ternary/PQ)                 → Ranked results
           → Save multi-batch index
```

All embedding computation happens at build time using ONNX Runtime on your machine. The browser receives only pre-computed integer vectors and performs keyword matching + cosine similarity — no neural network inference, just arithmetic.

## Key capabilities

::: grid

::: card "Offline by default" icon:wifi-off
All embeddings generated locally with ONNX Runtime. No data leaves your machine. No cloud API keys needed.
:::

::: card "Instant search" icon:zap
Progressive indexing means search is available from the first batch. Incremental re-indexing only processes changed files.
:::

::: card "Tiny client" icon:package
Browser runtime under **3KB gzipped**. No model weights shipped to the browser. Hybrid keyword + vector scoring.
:::

::: card "Resumable" icon:refresh-cw
Interrupted indexing resumes from the last checkpoint. Batch-based output means partial indexes are always usable.
:::

:::

## Quick start

::: tabs
== tab "Standalone" icon:terminal
```bash
# Install globally
npm install -g docmd-search

# Install embedding dependencies (one-time)
npm install -g @huggingface/transformers onnxruntime-node

# Index any directory
docmd-search ./my-folder

# Or launch web UI (requires docmd)
docmd-search ./my-folder --ui
```
== tab "docmd plugin" icon:puzzle
```bash
# In your docmd project
npm install docmd-search
```

Then enable semantic search in your config:

```js
// docmd.config.js
export default {
  plugins: {
    search: {
      semantic: true,  // ← activates docmd-search
    }
  }
};
```
:::

On first run, a setup wizard lets you choose an embedding model. After that, files are crawled, chunked, embedded, and search is ready.

## What's next

| Page | Description |
| :--- | :---------- |
| [Getting Started](getting-started) | Installation, first run, and model selection |
| [Configuration](configuration) | Global, project, and CLI configuration options |
| [How It Works](how-it-works) | Architecture, chunking, compression, and scoring |
| [CLI Reference](cli) | All commands, flags, and examples |
| [Programmatic API](api) | Use docmd-search in scripts and CI pipelines |
| [Browser Client](browser-client) | Integrate search into any web page |

## Architecture: two independent tools

docmd-search and docmd are **completely independent projects** from the same brand (docmd.io). They can work together but neither depends on the other.

```
┌─────────────────────────────────────────────────────────────────────┐
│                        docmd-search (standalone)                    │
│                                                                     │
│  CLI → Index directory → .docmd-search/ batches → TUI search       │
│                              │                                      │
│                              │ --ui flag?                           │
│                              ▼                                      │
│                    Spawn docmd with config                          │
│                    (docmd is just the UI shell)                     │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                        docmd (documentation engine)                 │
│                                                                     │
│  Config → Build docs → plugin-search runs                           │
│                              │                                      │
│                              │ semantic: true?                      │
│                              ▼                                      │
│                    Import docmd-search, build index                 │
│                    (docmd-search is just the indexer)               │
└─────────────────────────────────────────────────────────────────────┘
```

When docmd-search launches docmd as its UI (`--ui` flag), it:
1. Builds the semantic index first (its own job)
2. Generates a docmd config pointing at the pre-built index
3. Spawns docmd — which reads the index but never calls back to docmd-search

When docmd uses docmd-search as a plugin (`semantic: true`), it:
1. Dynamically imports docmd-search at build time
2. Runs the indexer to build `.docmd-search/` batches
3. Serves the semantic client bundle — no runtime dependency on docmd-search