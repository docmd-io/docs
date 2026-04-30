---
title: "Getting Started"
description: "Install docmd-search, choose an embedding model, and index your first documentation project."
---

Go from zero to working semantic search in under two minutes. No cloud accounts, no API keys, no configuration files.

## Requirements

::: callout info "System requirements"
- **Node.js 18+** (LTS recommended)
- ~200 MB disk space for the default model
- Works on macOS, Linux, and Windows
:::

## Installation

::: tabs
== tab "Global (recommended)" icon:globe
```bash
npm install -g docmd-search
```

Then install the embedding dependencies (one-time):

```bash
npm install -g @huggingface/transformers onnxruntime-node
```
== tab "npx (no install)" icon:zap
```bash
npx docmd-search ./docs
```

You will still need the embedding dependencies installed globally.
== tab "Project dependency" icon:package
```bash
npm install -D docmd-search @huggingface/transformers onnxruntime-node
```

Add to `package.json` scripts:

```json
{
  "scripts": {
    "search:index": "docmd-search ./docs",
    "search:ui": "docmd-search ./docs --ui"
  }
}
```
:::

## First run

Run docmd-search against any directory containing Markdown files:

```bash
docmd-search ./docs
```

### Setup wizard

On first run, the setup wizard appears:

::: steps

### Model selection

Choose an embedding model. The default (MiniLM L6 v2) works well for most projects.

| Model | Dimensions | Size | Best for |
| :---- | :--------- | :--- | :------- |
| **MiniLM L6 v2** ★ | 384 | ~30 MB | Fast, general purpose |
| BGE Small (English) | 384 | ~45 MB | English-optimised |
| BGE Base (English) | 768 | ~110 MB | Higher quality |
| MPNet Base v2 | 768 | ~110 MB | Multilingual |

### Model download

The selected model downloads automatically on first use. This is a one-time download — the model is cached in `~/.docmd-search/` and reused across all projects.

### Global config

A global configuration file is created at `~/.docmd-search/config.json`. This stores your model choice and wizard status so you are never prompted again.

:::

::: callout tip "Change model later"
Run `docmd-search --settings` at any time to switch models or reconfigure.
:::

## What happens during indexing

After the wizard, the indexer runs automatically:

1. **Crawl** — discovers all `.md`, `.txt`, and `.html` files (respects exclude patterns)
2. **Chunk** — splits each file into heading-aware sections (default: 256 tokens per chunk, 32 token overlap)
3. **Embed** — generates vector embeddings using the selected ONNX model
4. **Quantize** — compresses Float32 vectors to Int8 (75% size reduction, negligible quality loss)
5. **Compress** — applies ternary or product quantization for large indexes
6. **Save** — writes a multi-batch index to `.docmd-search/`

```
.docmd-search/
├── manifest.json         # Index metadata + batch listing
├── batch-000.json        # First batch (search available immediately)
├── batch-001.json        # Additional batches...
└── navigation.json       # Generated navigation tree
```

::: callout info "Progressive indexing"
Search is available as soon as the first batch is written. Remaining batches load in the background, progressively improving result coverage.
:::

## Interactive search

After indexing, an interactive terminal search opens automatically. Type a query and results appear instantly with file paths, headings, and relevance scores.

```
   ◆ Search: deploy kubernetes

   1. docs/deployment/kubernetes.md → Deploying to Kubernetes    0.94
   2. docs/deployment/docker.md → Container Orchestration        0.71
   3. docs/getting-started/production.md → Production Setup      0.63
```

Press `Ctrl+C` to exit.

## Web UI

Launch a browser-based search interface powered by docmd:

```bash
docmd-search ./docs --ui
```

This starts a local server and opens your browser with a full-featured search UI including navigation, syntax highlighting, and theme support.

## Incremental re-indexing

On subsequent runs, only changed files are re-indexed:

```bash
docmd-search ./docs
```

The indexer compares file modification times and sizes. Unchanged files are skipped, making re-indexing near-instant for small changes.

## Next steps

- [Configuration](configuration) — customise chunk size, include/exclude patterns, output directory
- [CLI Reference](cli) — all available commands and flags
- [Programmatic API](api) — use in scripts, CI pipelines, or custom tooling