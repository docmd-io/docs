---
title: "CLI Reference"
description: "Complete command-line reference for docmd-search. All commands, flags, and usage examples."
---

`docmd-search` provides a command-line interface to index documentation and search your files directly.

## Usage Syntax

```bash
docmd-search [directory] [options]
```

If no target directory is specified, `docmd-search` indexes the current directory (`.`).

## Primary Commands & Modes

### Index & Terminal Search

```bash
docmd-search ./docs
```

Indexes the specified folder and launches an interactive terminal search interface. Incremental indexing automatically skips unchanged files.

### Index & Web Interface Server

```bash
docmd-search ./docs --ui
```

Indexes the folder and starts a local web server to preview the web search interface.

### Interactive Settings Menu

```bash
docmd-search --settings
```

Opens the terminal configuration menu to select embedding models or update global preferences.

### Help

```bash
docmd-search --help
```

### Version

```bash
docmd-search --version
```

## Command Line Flags

| Flag | Abbreviation | Description |
| :--- | :----------- | :---------- |
| `--ui` | | Starts a local browser preview server after indexing completes |
| `--dev` | | Enables verbose logging output (file paths, model settings, debug timing) |
| `--model <id>` | | Overrides the embedding model for the current run |
| `--settings` | | Opens the interactive terminal settings menu |
| `--version` | `-v` | Displays the installed package version number |
| `--help` | `-h` | Displays usage syntax and available flags |

## Usage Examples

::: tabs
== tab "Directory Indexing" icon:folder
```bash
# Index the docs/ subfolder in your workspace
docmd-search ./docs

# Index current directory
docmd-search .

# Run without arguments (indexes current directory)
docmd-search
```
== tab "Web Interface Server" icon:globe
```bash
# Index and launch browser preview UI
docmd-search ./docs --ui

# Launch with verbose logging enabled
docmd-search ./docs --ui --dev
```
== tab "Model Overrides" icon:cpu
```bash
# Force multilingual model for i18n site build
docmd-search ./docs --model Xenova/paraphrase-multilingual-MiniLM-L12-v2

# Force high-dimensional multilingual model
docmd-search ./docs --model Xenova/paraphrase-multilingual-mpnet-base-v2

# Override model without changing global config.json
docmd-search ./docs --model Xenova/all-MiniLM-L6-v2
```
== tab "CI/CD Build Pipelines" icon:git-branch
```bash
# Index docs as part of a build script
docmd-search ./docs
# The _docmd-search/ folder is generated as a static output asset
```
:::

## Exit Codes

| Exit Code | Meaning |
| :-------- | :------ |
| `0` | Success (indexing completed, terminal search exited normally, or help/version printed) |
| `1` | Failure (missing required peer dependencies, invalid path, or unexpected error) |

## File & Configuration Paths

- **Global Config File**: `~/.docmd-search/config.json` (Stores global model selection and settings)
- **Project Config File**: `_docmd-search/config.json` (Stores project-level overrides)
- **Model Weight Cache**: `~/.docmd-search/models/` (Stores cached ONNX model files)

::: callout info "Peer Dependencies"
Generating vector embeddings requires `@huggingface/transformers` and `onnxruntime-node`. If they are not installed, the CLI displays installation instructions and exits with code `1`.
:::