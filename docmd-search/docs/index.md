# Semantic Search

Offline semantic search for any documentation. Zero runtime dependencies, works with any docs.

## What is docmd search?

docmd search generates vector embeddings from your documentation at build time and ships a tiny client-side search engine (under 3KB) that performs instant semantic search in the browser — no server, no cloud APIs, no data leaving the user's machine.

## Quick Start

```bash
npx docmd-search ./docs
```

That's it. Files are discovered, chunked, and indexed automatically.

## Key Features

- **Offline by default** — all embeddings generated locally with ONNX Runtime
- **Instant search** — progressive indexing means search is available from the first batch
- **Tiny client** — browser runtime under 3KB gzipped, no model weights in the browser
- **Zero config** — sensible defaults, optional deep customisation