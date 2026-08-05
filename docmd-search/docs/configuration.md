---
title: "Configuration"
description: "Global, project, and CLI configuration options for docmd-search. Override models, chunk sizes, include/exclude patterns, and output directories."
---

`docmd-search` uses a simple four-tier configuration system where settings resolve from defaults up to command-line flags.

## Configuration Resolution Order

Settings merge in order of priority (higher numbers override lower numbers):

1. **Defaults**: Built-in default values.
2. **Global Config** (`~/.docmd-search/config.json`): System-wide settings chosen during setup.
3. **Project Config** (`_docmd-search/config.json`): Repository settings stored in your project folder.
4. **CLI Options**: Command-line flags passed when running the command.

## Default Configuration Schema

```json
{
  "model": "Xenova/all-MiniLM-L6-v2",
  "chunkSize": 256,
  "chunkOverlap": 32,
  "include": ["**/*.md", "**/*.txt", "**/*.html"],
  "exclude": [
    "**/node_modules/**",
    "**/dist/**",
    "**/build/**",
    "**/site/**",
    "**/.git/**",
    "**/_docmd-search/**",
    "**/.cache/**",
    "**/.next/**",
    "**/.nuxt/**",
    "**/coverage/**",
    "**/.svn/**",
    "**/.hg/**",
    "**/vendor/**"
  ],
  "outDir": "_docmd-search",
  "incremental": true,
  "topK": 10
}
```

## Available Options

| Option | Type | Default | Description |
| :----- | :--- | :------ | :---------- |
| `model` | `string` | `Xenova/all-MiniLM-L6-v2` | HuggingFace embedding model ID |
| `chunkSize` | `number` | `256` | Maximum tokens per chunk |
| `chunkOverlap` | `number` | `32` | Token overlap between neighbouring chunks |
| `include` | `string[]` | `["**/*.md", "**/*.txt", "**/*.html"]` | Glob matching patterns for files to index |
| `exclude` | `string[]` | *(see defaults above)* | Glob patterns for excluded files and folders |
| `outDir` | `string` | `_docmd-search` | Destination folder relative to project root |
| `incremental` | `boolean` | `true` | Skips re-indexing unchanged files based on `mtime` and `size` |
| `topK` | `number` | `10` | Maximum results returned per query |

## Global Configuration File

Stored at `~/.docmd-search/config.json`. Created automatically during initial setup:

```json
{
  "model": "Xenova/all-MiniLM-L6-v2",
  "wizardCompleted": true
}
```

To edit global settings interactively:

```bash
docmd-search --settings
```

::: callout tip "Model Weight Cache"
Downloaded ONNX model files are cached in `~/.docmd-search/models/`. Model files stay available across project builds and reinstallations.
:::

## Project Configuration File

Create `_docmd-search/config.json` in your project root to set project-specific options:

```json
{
  "model": "Xenova/paraphrase-multilingual-MiniLM-L12-v2",
  "chunkSize": 512,
  "chunkOverlap": 64,
  "include": ["docs/**/*.md"],
  "exclude": ["docs/drafts/**", "docs/archive/**"]
}
```

::: callout info "Partial Merging"
You only need to specify the properties you want to change. Unspecified properties inherit values from the global config or system defaults.
:::

## Command-Line Overrides

Use the `--model` flag to override the model for a single run without altering JSON configuration files:

```bash
docmd-search ./docs --model Xenova/paraphrase-multilingual-MiniLM-L12-v2
```

## Chunk Sizing Guide

Selecting a chunk size depends on the nature of your documentation:

| Document Type | Recommended `chunkSize` | Reason |
| :------------ | :---------------------- | :----- |
| Short API References | `128` | High precision for discrete parameters and function names |
| General Documentation | `256` (Default) | Balanced trade-off between term precision and context |
| Long-Form Guides | `512` | Keeps more context within each section vector |
| Technical Manuals | `128-256` | Matches concise section headings and code blocks |

::: callout warning "Overlap Consideration"
`chunkOverlap` keeps context across chunk boundaries. The default value (`32` tokens) prevents phrase fragmentation across section splits.
:::

## Glob Pattern Definitions

Include and exclude arrays use standard glob syntax:

```json
{
  "include": [
    "docs/**/*.md",
    "guides/**/*.md",
    "api/**/*.html"
  ],
  "exclude": [
    "**/node_modules/**",
    "**/drafts/**",
    "**/*.draft.md",
    "docs/internal/**"
  ]
}
```

Built-in system exclusions (`node_modules`, `.git`, `dist`, `_docmd-search`) are automatically added to your custom exclude rules.

## Model Selection Reference

Models operate in **Int8 quantised form** (`q8`), reducing storage by ~75% and speeding up matrix operations:

| Model ID | Quantised Size | Languages | Speed | Recommended Target |
| :------- | :------------- | :-------- | :---- | :----------------- |
| `Xenova/all-MiniLM-L6-v2` *(Default)* | ~23 MB | English only | Fast | Monolingual English documentation |
| `Xenova/paraphrase-multilingual-MiniLM-L12-v2` | ~118 MB | 50+ languages | Moderate | Multilingual & i18n sites |
| `Xenova/multilingual-e5-small` | ~118 MB | 100+ languages | Moderate | Broad multi-language documentation |
| `Xenova/paraphrase-multilingual-mpnet-base-v2` | ~270 MB | 50+ languages | Moderate | High-precision multi-language search |

::: callout tip "HuggingFace ONNX Compatibility"
Custom models must include ONNX weights compatible with Transformers.js. Check that target repositories on HuggingFace contain an `onnx/` folder with model graph definitions.
:::

## docmd Integration

When configured inside a [docmd](https://docmd.io) documentation site, options are declared under `plugins.search` in `docmd.config.js`:

```js
// docmd.config.js
export default {
  plugins: {
    search: {
      semantic: true,                       // Enables docmd-search indexer
      model: 'Xenova/bge-small-en-v1.5',   // Optional model override
      chunkSize: 512,                       // Token limit per chunk
      chunkOverlap: 64,                     // Token overlap length
    }
  }
};
```

### Pre-Built Index Hosting

To point docmd at a pre-built static search index folder:

```js
// docmd.config.js
export default {
  plugins: {
    search: {
      semantic: true,
      indexDir: '_docmd-search',  // Pre-built index directory
    }
  }
};
```

When `indexDir` points to a folder containing a valid `manifest.json`, `docmd` skips building the index and serves the pre-built files directly.