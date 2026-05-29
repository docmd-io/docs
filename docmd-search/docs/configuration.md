---
title: "Configuration"
description: "Global, project, and CLI configuration options for docmd-search. Override models, chunk sizes, include/exclude patterns, and output directories."
---

No configuration is required to get started. docmd-search uses sensible defaults and a tiered config system that lets you override settings at each level.

## Config resolution

Settings are merged in order  -  each layer overrides the previous:

### Defaults

Built-in values that work for most projects.

### Global config

`~/.docmd-search/config.json`  -  applies to all projects on your system. Created by the first-run wizard.

### Project config

`.docmd-search/config.json`  -  per-project overrides that live in your repository.

### CLI flags

Command-line flags take highest priority and override everything else.

## Default values

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
    "**/.docmd-search/**"
  ],
  "outDir": ".docmd-search",
  "incremental": true,
  "topK": 10
}
```

## All options

| Option | Type | Default | Description |
| :----- | :--- | :------ | :---------- |
| `model` | `string` | `Xenova/all-MiniLM-L6-v2` | Embedding model identifier (see [Model selection](#model-selection) below) |
| `chunkSize` | `number` | `256` | Maximum tokens per chunk |
| `chunkOverlap` | `number` | `32` | Overlap between adjacent chunks (in tokens) |
| `include` | `string[]` | `["**/*.md", "**/*.txt", "**/*.html"]` | Glob patterns for files to index |
| `exclude` | `string[]` | *(see above)* | Glob patterns for files to skip |
| `outDir` | `string` | `.docmd-search` | Output directory for the index (relative to project root) |
| `incremental` | `boolean` | `true` | Only re-index changed files on subsequent runs |
| `topK` | `number` | `10` | Maximum search results to return |

## Global config

Located at `~/.docmd-search/config.json`. Created automatically by the first-run wizard. Contains your model selection and wizard status.

```json
{
  "model": "Xenova/all-MiniLM-L6-v2",
  "wizardCompleted": true
}
```

To reconfigure:

```bash
docmd-search --settings
```

::: callout tip "Model cache"
Downloaded models are cached at `~/.docmd-search/models/` - a stable location that survives `npm install` and package upgrades. Switching models does not delete previous downloads, so you can switch back without re-downloading.
:::

## Project config

Create `.docmd-search/config.json` in your project root to override settings for a specific project.

```json
{
  "model": "Xenova/paraphrase-multilingual-MiniLM-L12-v2",
  "chunkSize": 512,
  "chunkOverlap": 64,
  "include": ["docs/**/*.md"],
  "exclude": ["docs/drafts/**", "docs/archive/**"]
}
```

::: callout info "Partial overrides"
You only need to specify the fields you want to change. Unspecified fields inherit from the global config or defaults.
:::

## CLI overrides

The `--model` flag overrides the model for a single run without modifying any config file:

```bash
# Use the multilingual model for a single run
docmd-search ./docs --model Xenova/paraphrase-multilingual-MiniLM-L12-v2
```

## Chunk sizing guide

Chunk size affects search quality and index size:

| Scenario | Recommended `chunkSize` | Notes |
| :------- | :---------------------- | :---- |
| Short API docs | `128` | Smaller chunks = more precise matches |
| General documentation | `256` (default) | Good balance of precision and context |
| Long-form guides | `512` | Keeps more context per result |
| Technical references | `128-256` | Precise matches for specific parameters |

::: callout warning "Overlap matters"
`chunkOverlap` ensures content near chunk boundaries isn't lost. A value of `32` (default) works well for most cases. Set to `0` only if your content has very clear section boundaries.
:::

## Include/exclude patterns

Patterns follow standard glob syntax:

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

The exclude list always includes common system directories (`node_modules`, `.git`, `dist`, `build`, etc.) by default. Your custom excludes are added on top.

## Model selection

All models run in **Int8-quantized form** (`q8`) - 4× smaller and 2-3× faster than full precision with minimal quality loss. Models are downloaded once and cached at `~/.docmd-search/models/`.

| Model | Size | Languages | Speed | Best for |
| :---- | :--- | :-------- | :---- | :------- |
| `Xenova/all-MiniLM-L6-v2` *(default)* | ~23 MB | English only | ⚡ Fastest | English-only documentation |
| `Xenova/paraphrase-multilingual-MiniLM-L12-v2` | ~118 MB | 50+ languages | Fast | **i18n docs** (Chinese, German, etc.) |
| `Xenova/multilingual-e5-small` | ~118 MB | 100+ languages | Fast | Wide language coverage |
| `Xenova/paraphrase-multilingual-mpnet-base-v2` | ~270 MB | 50+ languages | Medium | Best multilingual quality |

::: callout warning "English-only default"
The default model (`all-MiniLM-L6-v2`) is trained on English text only. If your docs include Chinese, German, French, or other languages, switch to a multilingual model or search quality will be poor for non-English content.
:::

::: callout tip "Custom models"
You can use any HuggingFace model with ONNX weights compatible with Transformers.js. Browse at [huggingface.co/models](https://huggingface.co/models?pipeline_tag=feature-extraction&library=transformers.js) and filter by `transformers.js` library. Ensure the model repo contains an `onnx/` folder.
:::

## docmd integration

When using docmd-search as a plugin inside a [docmd](https://docmd.io) project, configuration happens in your `docmd.config.js`:

```js
// docmd.config.js
export default {
  plugins: {
    search: {
      semantic: true,              // ← enables docmd-search
      model: 'Xenova/bge-small-en-v1.5',  // optional model override
      chunkSize: 512,              // optional
      chunkOverlap: 64,            // optional
    }
  }
};
```

### How it works

When `semantic: true` is set:

1. docmd's plugin-search dynamically imports `docmd-search` at build time
2. The indexer runs over your docs source directory
3. The semantic index is written to `<outputDir>/.docmd-search/`
4. The browser client bundle is served instead of MiniSearch

If `docmd-search` is not installed, plugin-search falls back to keyword search and prints a helpful install message.

### Pre-built index (advanced)

If you've already built an index with the standalone CLI, you can tell docmd to use it directly:

```js
// docmd.config.js
export default {
  plugins: {
    search: {
      semantic: true,
      indexDir: '/path/to/.docmd-search',  // ← use pre-built index
    }
  }
};
```

When `indexDir` is provided and contains a valid `manifest.json`, plugin-search skips indexing entirely and just serves from that directory. This is how `docmd-search --ui` works - it builds the index first, then spawns docmd with a config pointing at the pre-built index.