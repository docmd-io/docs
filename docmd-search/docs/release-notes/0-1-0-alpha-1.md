---
title: "v0.1.0-alpha.1 - Semantic Indexing Preview"
description: "Release notes for the second public alpha of docmd-search - TUI management, browser-ready index, and engine task integration."
date: "2026-06-24"
---

The second public alpha of **docmd-search**. This release brings the TUI, the browser-ready index format, and the engine-task integration. APIs and behaviour may still change before 0.1.0.

## What's in This Release

### TUI for index management and search

A first-class terminal interface for the indexer, model manager, and search runner. First run walks you through a setup wizard; subsequent runs land in a search TUI. Settings (model, cache dir, project root) are reachable from a settings panel inside the TUI.

### Embedding model support

Loads models from the `@huggingface/transformers` registry. Default is `Xenova/all-MiniLM-L6-v2` (English-only, ~23 MB). Models are downloaded on first use and cached in `~/.cache/huggingface`.

### Browser-ready index

Index is written as a single `manifest.json` plus N batch files of vector records. The search plugin's client code reads the manifest, downloads only the batch it needs, and runs cosine-similarity ranking in the browser via the same model. No server round-trip per query. Batches are Int8-quantised by default.

### Engines

Uses the same engine task protocol as the rest of the docmd ecosystem: `search:chunk` for splitting pages into overlapping windows, `search:quantize` for Int8 per-vector quantisation, `search:cosine` for batch scoring. Rust engine is used when present, then JS engine, then a built-in inline implementation. No engine is required.

## Known Limitations

- English-only default model
- No incremental updates — full rebuild required after any content change
- Browser memory usage roughly 50–100 MB during a query
- First load is slower as the embedding model is fetched and cached
- Dist-tag is `alpha` until 0.1.0 ships

## What's Next

- 0.1.0 (stable) will add the `default` condition to `exports`, adopt the `docmd` namespace, and switch the publish workflow off `--tag alpha` so the dist-tag becomes `latest`.