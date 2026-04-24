---
title: "Local-First Search Optimization"
description: "How to optimize your documentation content for docmd's high-performance, client-side search engine."
---

## Problem

Local-first search engines run entirely in the browser, providing instant results without a server round-trip. However, this means they are constrained by the browser's memory and processing limits. If a search index is not properly optimized, it can consume excessive RAM, causing the browser tab to stutter or even crash, especially on mobile devices.

## Why it matters

A seamless search experience is essential for developer productivity. If the search tool causes performance issues or consumes too much memory, users will avoid using it. Optimizing your content for local-first search ensures that your documentation remains fast, responsive, and reliable across all devices and network conditions.

## Approach

`docmd`'s [Search Plugin](../../plugins/search) uses a build-time extraction pipeline to create a highly optimized index. By pruning unnecessary data and focusing on high-value semantic fields, it ensures that the resulting index is both comprehensive and lightweight.

## Implementation

### 1. Build-Time Extraction

During the build process, `docmd` processes your Markdown files to extract only the most relevant text for indexing. It automatically strips out:
*   HTML tags and structural boilerplate.
*   Markdown syntax characters that don't add semantic value.
*   Formatting-only elements that would otherwise bloat the index.

This ensures that the indexer only receives clean, meaningful text, which significantly reduces the final index size.

### 2. Strategic Indexing with Frontmatter

You can use [Frontmatter](../../content/frontmatter) to explicitly control how a page is indexed. For example, if a page contains large amounts of repetitive data (like raw JSON logs) that aren't useful for search, you can choose to index only the headers and metadata.

```yaml
---
title: "API Log Reference"
search:
  indexBody: false  # Only index the title and headers
---
```

### 3. Client-Side Memory Management

`docmd` manages the search index lifecycle carefully in the browser. It uses an on-demand loading strategy, meaning the search engine is only initialized when the user first interacts with it. This keeps the initial page load footprint small and ensures that system resources are only used when needed.

## Trade-offs

Aggressively pruning content from the search index (e.g., excluding large code blocks) can sometimes result in missing niche results. You must balance the need for a lightweight, fast index with the requirement for thorough search coverage. We recommend prioritizing headers and conceptual descriptions, as these are the most common search targets for developers.
