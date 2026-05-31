---
title: "v0.1.0-alpha.0 — First Public Alpha"
description: "Release notes for the first public alpha of docmd-search — offline semantic search for documentation and beyond."
date: "2026-05-31"
---

We built something we're rather proud of.

**`docmd-search`** is, to our knowledge, the first fully offline semantic search engine designed for documentation — and it isn't tied to any particular framework or engine. It runs entirely in the browser, requires no server, no API keys, and sends nothing to anyone. Plug it into docmd, a custom static site, or any webpage. It just works.

This is an early alpha. Things will change, improve, and grow. But the foundation — private, offline, genuinely intelligent search — is already here.

---

### What's in This Release

**Core Engine**

*   **Local semantic indexing** — Generates dense vector embeddings for your content at build time using `Xenova/all-MiniLM-L6-v2` (runs entirely in Node.js via `@xenova/transformers`; no Python, no GPU required)
*   **Browser-side search** — The browser client fetches pre-built index batches and performs cosine similarity ranking entirely client-side
*   **Chunked indexing** — Content is split into configurable overlapping chunks so long pages don't drown out shorter, more relevant results
*   **Multi-version support** — When used with docmd's versioned documentation, each version is indexed independently and merged with path-prefixed routing

**CLI**

*   `docmd-search` — Index a directory of Markdown files into `.docmd-search/`
*   `docmd-search --ui` — Spin up a full docmd-powered search UI on top of the pre-built index, no rebuild required
*   `--output`, `--model`, `--chunk-size`, `--chunk-overlap` flags for full control

**Search UI Options (via docmd plugin)**

| Option | Default | Description |
| :--- | :--- | :--- |
| `semantic` | `false` | Enable semantic search |
| `showConfidence` | `false` | Show `%` match badge on each result |
| `showFilters` | `true` | Show version filter bar (set `false` to hide) |
| `indexDir` | — | Path to pre-built index (skip re-indexing) |

**Automatic Fallback**

If `docmd-search` is not installed, the `@docmd/plugin-search` plugin falls back silently to keyword search. Your documentation remains fully searchable regardless.

---

### Known Limitations

*   **English-only models** — The default model (`all-MiniLM-L6-v2`) performs best on English content. Multilingual models are available but less tested at this stage
*   **No incremental updates** — Full re-indexing is required when content changes; incremental indexing is planned
*   **First load latency** — The browser must fetch the WASM model and index batches on first use; subsequent searches are instant
*   **Memory usage** — Expect approximately 50–100 MB browser memory usage while the model is loaded

---

### What's Next

*   Incremental index updates
*   Multilingual model support
*   Smaller, quantised model variants
*   Structured result ranking (title boost, recency)
*   Standalone browser bundle (no docmd dependency for the UI)

---

### Thanks 💖

This wouldn't exist without the brilliant work of the [Transformers.js](https://github.com/xenova/transformers.js) team, who made it possible to run state-of-the-art language models in the browser. And to everyone who asked for smarter documentation search — this one's for you.

GitHub: https://github.com/docmd-io/docmd-search  
npm: https://www.npmjs.com/package/docmd-search
