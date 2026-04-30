---
title: "docmd search"
description: "Offline semantic search for any documentation. Generate vector embeddings at build time, search with pure math in the browser."
---

Offline semantic search for any documentation. Embeddings are generated locally at build time. The browser runtime is pure math — no model weights, no cloud APIs, no data leaving the user's machine.

::: callout tip "Zero config"
Run `npx docmd-search ./docs` in any folder with Markdown files. No setup, no API keys, no config file needed.
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

::: steps

### Install

```bash
npm install -g docmd-search
```

### Install embedding dependencies

```bash
npm install -g @huggingface/transformers onnxruntime-node
```

### Index your docs

```bash
docmd-search ./docs
```

:::

On first run, a setup wizard lets you choose an embedding model. After that, files are crawled, chunked, embedded, and an interactive terminal search opens automatically.

## What's next

| Page | Description |
| :--- | :---------- |
| [Getting Started](getting-started) | Installation, first run, and model selection |
| [Configuration](configuration) | Global, project, and CLI configuration options |
| [How It Works](how-it-works) | Architecture, chunking, compression, and scoring |
| [CLI Reference](cli) | All commands, flags, and examples |
| [Programmatic API](api) | Use docmd-search in scripts and CI pipelines |
| [Browser Client](browser-client) | Integrate search into any web page |

## Part of the docmd ecosystem

docmd-search works standalone with any documentation project. It also integrates with [docmd](https://docmd.io) as a semantic search plugin.

| Tool | What it does |
| :--- | :----------- |
| [docmd](https://docmd.io) | Zero-config documentation generator |
| **docmd-search** | Offline semantic search engine |