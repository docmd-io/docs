---
title: "CLI Reference"
description: "Complete command-line reference for docmd-search. All commands, flags, and usage examples."
---

docmd-search provides a single command with flags for different modes of operation.

## Usage

```bash
docmd-search [directory] [options]
```

If no directory is specified, the current working directory is used.

## Commands

### Index + interactive search

```bash
docmd-search ./docs
```

Indexes the directory and opens an interactive terminal search. If an index already exists, only changed files are re-indexed.

### Index + web UI

```bash
docmd-search ./docs --ui
```

Indexes the directory and launches a browser-based search interface powered by docmd.

### Settings

```bash
docmd-search --settings
```

Opens the settings TUI to change your embedding model or reconfigure global options.

### Help

```bash
docmd-search --help
```

### Version

```bash
docmd-search --version
```

## Options

| Flag | Description |
| :--- | :---------- |
| `--ui` | Launch the web UI in the browser after indexing |
| `--dev` | Verbose output — shows directory paths, model info, and debug details |
| `--model <id>` | Override the embedding model for this run (does not modify config files) |
| `--settings` | Open the settings TUI to configure model and options |
| `--version`, `-v` | Print the version number |
| `--help`, `-h` | Show help message |

## Examples

::: tabs
== tab "Basic indexing" icon:folder
```bash
# Index the docs/ folder in current directory
docmd-search ./docs

# Index current directory
docmd-search .

# Index with no arguments (uses current dir)
docmd-search
```
== tab "Web UI" icon:globe
```bash
# Index and launch browser UI
docmd-search ./docs --ui

# With verbose output
docmd-search ./docs --ui --dev
```
== tab "Model override" icon:cpu
```bash
# Use a specific model for one run
docmd-search ./docs --model Xenova/bge-small-en-v1.5

# Use the highest quality model
docmd-search ./docs --model Xenova/all-mpnet-base-v2
```
== tab "CI/CD" icon:git-branch
```bash
# Index as part of a build pipeline
docmd-search ./docs
# The .docmd-search/ directory is the output artifact
```
:::

## Exit codes

| Code | Meaning |
| :--- | :------ |
| `0` | Success |
| `1` | Error — missing peer dependencies, invalid directory, or indexing failure |

## Environment

docmd-search respects the following environment:

- **Global config**: `~/.docmd-search/config.json` — model selection and wizard state
- **Project config**: `.docmd-search/config.json` — per-project overrides
- **Model cache**: `~/.docmd-search/` — downloaded ONNX model files

::: callout info "Peer dependencies"
Embedding generation requires `@huggingface/transformers` and `onnxruntime-node`. If they are missing, the CLI prints installation instructions and exits with code `1`.
:::
