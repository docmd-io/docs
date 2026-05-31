---
title: "v0.1.0-alpha.0 - First Public Alpha"
description: "Release notes for the first public alpha of docmd-search - offline semantic search for documentation and beyond."
date: "2026-05-31"
---

We're excited to share the first alpha release of **docmd-search**.

docmd-search is a semantic search engine built for documentation sites. It runs entirely in the browser, requires no servers or API keys, and keeps all search processing local.

Although created for docmd, it isn't tied to any particular framework. It can be integrated into documentation platforms, websites, and web applications.

This is an early alpha release. APIs, models, and behaviour will continue to evolve as we gather feedback and real-world usage.

## What's in This Release

### Core Engine

- **Local semantic indexing** - Generates vector embeddings at build time using `Xenova/all-MiniLM-L6-v2`, powered by `@xenova/transformers`
- **Browser-side search** - Ranking and retrieval happen entirely in the browser using pre-built indexes
- **Chunked indexing** - Content is split into configurable overlapping chunks to improve search quality on longer pages
- **Multi-version support** - Documentation versions can be indexed independently and searched together

### CLI

```bash
docmd-search
```

Indexes a directory of Markdown files into `.docmd-search/`.

```bash
docmd-search --ui
```

Launches a standalone search UI using an existing index without rebuilding.

Additional options:

```bash
--output
--model
--chunk-size
--chunk-overlap
```

### Search UI Options

| Option | Default | Description |
|----------|----------|----------|
| `semantic` | `false` | Enable semantic search |
| `showConfidence` | `false` | Display confidence percentages on results |
| `showFilters` | `true` | Show the version filter bar |
| `indexDir` | - | Use an existing pre-built index |

### Automatic Fallback

If `docmd-search` is not installed, `@docmd/plugin-search` automatically falls back to keyword search. Documentation remains fully searchable without any additional configuration.

<!-- Screenshot: semantic search results -->

## Known Limitations

- The default model performs best on English content
- Multilingual models are available but have not yet been tested extensively
- Full re-indexing is currently required when content changes
- The first search may take longer while the browser loads the model and search index
- Browser memory usage typically ranges between 50-100 MB while the model is loaded

## What's Next

We're currently exploring:

- Incremental index updates
- Improved multilingual support
- Smaller and quantised model variants
- Additional ranking signals and relevance improvements
- A standalone search UI that can be used outside of docmd

## Thanks 💖

A huge thank you to the Transformers.js team for making browser-based language models practical and accessible.

And thank you to everyone who asked for better documentation search, tested early builds, shared feedback, and helped shape the project.

GitHub: https://github.com/docmd-io/docmd-search

npm: https://www.npmjs.com/package/docmd-search