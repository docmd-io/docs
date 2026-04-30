---
title: "Configuration"
description: "Global, project, and CLI configuration options for docmd-search. Override models, chunk sizes, include/exclude patterns, and output directories."
---

No configuration is required to get started. docmd-search uses sensible defaults and a tiered config system that lets you override settings at each level.

## Config resolution

Settings are merged in order — each layer overrides the previous:

::: steps

### Defaults

Built-in values that work for most projects.

### Global config

`~/.docmd-search/config.json` — applies to all projects on your system. Created by the first-run wizard.

### Project config

`.docmd-search/config.json` — per-project overrides that live in your repository.

### CLI flags

Command-line flags take highest priority and override everything else.

:::

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
| `model` | `string` | `Xenova/all-MiniLM-L6-v2` | Embedding model identifier |
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
Downloaded models are cached inside `~/.docmd-search/`. Switching models does not delete previous downloads — you can switch back without re-downloading.
:::

## Project config

Create `.docmd-search/config.json` in your project root to override settings for a specific project.

```json
{
  "model": "Xenova/bge-small-en-v1.5",
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
docmd-search ./docs --model Xenova/bge-base-en-v1.5
```

## Chunk sizing guide

Chunk size affects search quality and index size:

| Scenario | Recommended `chunkSize` | Notes |
| :------- | :---------------------- | :---- |
| Short API docs | `128` | Smaller chunks = more precise matches |
| General documentation | `256` (default) | Good balance of precision and context |
| Long-form guides | `512` | Keeps more context per result |
| Technical references | `128–256` | Precise matches for specific parameters |

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