---
title: "Local-First Search Optimisation"
description: "How to optimise your documentation content for docmd's high-performance, client-side search engine."
---

## Problem

Local-first search engines run entirely in the browser. They provide instant results without a server round-trip. However, they are constrained by browser memory and processing limits. An unoptimised search index consumes excessive RAM. This causes the browser tab to stutter or crash, especially on mobile devices.

## Why it matters

A seamless search experience is essential for productivity. If the search tool causes performance issues or memory bloat, users abandon it. Optimising content for local-first search ensures documentation remains fast, responsive, and reliable across all devices and network conditions.

## Approach

docmd's [Search Plugin](../../plugins/search.md) uses a build-time extraction pipeline to create an optimised index. By pruning unnecessary data and focusing on high-value semantic fields, the resulting index is comprehensive and lightweight.

## Implementation

### 1. Build-Time Extraction

During the build process, docmd processes Markdown files to extract relevant text for indexing. It automatically strips out:
*   HTML tags and structural boilerplate.
*   Markdown syntax characters that lack semantic value.
*   Formatting-only elements that bloat the index.

This ensures the indexer only receives clean, meaningful text, reducing the final index size significantly.

### 2. Strategic Indexing with Frontmatter

Use [Frontmatter](../../content/frontmatter.md) to explicitly control how a page is indexed. If a page contains repetitive data (like raw JSON logs) that aren't useful for search, index only the headers and metadata.

```yaml
---
title: "API Log Reference"
search:
  indexBody: false  # Only index the title and headers
---
```

### 3. Client-Side Memory Management

docmd manages the search index lifecycle carefully in the browser. It uses an on-demand loading strategy. The search engine is only initialised when the user first interacts with it. This keeps the initial page load footprint small and conserves system resources.

## Trade-offs

Aggressively pruning content from the search index (e.g., excluding large code blocks) can cause missing niche results. You must balance the need for a lightweight index with thorough search coverage. We recommend prioritising headers and conceptual descriptions, as these are the most common search targets.
