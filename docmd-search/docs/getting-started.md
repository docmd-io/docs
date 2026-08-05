---
title: "Getting Started"
description: "Install docmd-search, configure an embedding model, and index a documentation directory."
---

Set up offline semantic search for your documentation without third-party cloud services or API keys.

## System Requirements

::: callout info "Prerequisites"
- **Node.js 20.0.0+**
- ~50 MB disk space for default model weights (Int8 quantised, ~23 MB initial download)
- Works on macOS, Linux, and Windows
:::

## Installation

::: tabs
== tab "Global Installation" icon:globe
```bash
npm install -g docmd-search
```

Install global embedding engine dependencies:

```bash
npm install -g @huggingface/transformers onnxruntime-node
```
== tab "npx Execution" icon:zap
```bash
npx docmd-search ./docs
```

Global embedding dependencies (`@huggingface/transformers` and `onnxruntime-node`) must be installed on your environment path.
== tab "Project Dependency" icon:package
```bash
npm install -D docmd-search @huggingface/transformers onnxruntime-node
```

Add execution scripts to `package.json`:

```json
{
  "scripts": {
    "search:index": "docmd-search ./docs",
    "search:ui": "docmd-search ./docs --ui"
  }
}
```
:::

## First Run

Run `docmd-search` against any directory containing Markdown or HTML files:

```bash
docmd-search ./docs
```

### Initial Configuration Prompt

On your first run, an interactive CLI prompt appears so you can choose an embedding model.

### Available Embedding Models

Choose a model based on the languages in your documentation:

| Model | Dimensions | Quantised Size | Languages | Recommended For |
| :---- | :--------- | :------------- | :-------- | :-------------- |
| **MiniLM L6 v2** (Default) | 384 | ~23 MB | English only | Fast search for English-only docs |
| Multilingual MiniLM L12 | 384 | ~118 MB | 50+ languages | Multilingual and i18n sites |
| Multilingual E5 Small | 384 | ~118 MB | 100+ languages | Wide language coverage |
| Multilingual MPNet Base | 768 | ~270 MB | 50+ languages | High-precision multilingual search |

::: callout warning "Multilingual Content"
If your documentation includes non-English text (such as Chinese, German, or Spanish), choose a multilingual model. The default English-only model will produce poor search results for non-English text.
:::

### Model Storage & Caching

The selected model downloads automatically on initial setup. Models are cached globally at `~/.docmd-search/models/` and shared across all local projects. All models run in Int8-quantised form (`q8`).

### Configuration Persistence

Your settings are saved in `~/.docmd-search/config.json` so you do not need to configure them again.

::: callout tip "Reconfiguring Models"
Run `docmd-search --settings` at any time to change your global model, or pass `--model <id>` on the command line to override the model for a single run.
:::

## Indexing Steps

When indexing runs, the tool completes six steps:

1. **Crawl**: Discovers target files (`.md`, `.txt`, `.html`) while skipping excluded patterns.
2. **Chunk**: Splits documents into sections by heading (default: 256 tokens per chunk, 32 token overlap).
3. **Embed**: Generates vector embeddings using the selected ONNX model.
4. **Quantise**: Converts Float32 vectors to Int8 values (reducing memory usage by 75%).
5. **Compress**: Applies ternary or product quantisation when chunk counts are large.
6. **Save**: Writes multi-batch index JSON files to `_docmd-search/`.

```
_docmd-search/
├── manifest.json         # Index metadata, schema version, and file timestamps
├── navigation.json       # Navigation tree structure
└── batches/
    ├── 000.json          # First batch chunk metadata
    ├── 000.bin           # First batch vector data
    └── ...
```

::: callout info "Progressive Batch Loading"
Search is ready as soon as `batches/000.json` and `batches/000.bin` are written. Subsequent batches load asynchronously in the background.
:::

## Interactive Terminal Search

Once indexing completes, an interactive terminal search interface opens automatically:

```
   ◆ Search: deploy kubernetes

   1. docs/deployment/kubernetes.md → Deploying to Kubernetes    0.94
   2. docs/deployment/docker.md → Container Orchestration        0.71
   3. docs/getting-started/production.md → Production Setup      0.63
```

Press `Ctrl+C` to exit terminal search.

## Web Browser Interface

To launch a local web interface served by docmd:

```bash
docmd-search ./docs --ui
```

This starts a local development server with a web search UI, navigation tree, and theme support.

## Incremental Re-Indexing

On subsequent runs, the indexer checks file modification times (`mtime`) and file sizes against `manifest.json`. Unchanged files are skipped:

```bash
docmd-search ./docs
```

## Related Documentation

- [Configuration](configuration)  -  Options for chunking, glob exclusions, and paths
- [CLI Reference](cli)  -  Command line options and flags
- [Programmatic API](api)  -  Node.js API methods