---
title: "Fast & Accurate Search"
description: "How docmd optimises search indexing for speed and accuracy, even in large-scale documentation projects."
---

## Problem

As documentation grows, the compiled search index can become large. A monolithic index file blocks the browser's main thread during download and parsing. This delays the "Time to Interactive" and causes the search interface to feel sluggish.

## Why it matters

The primary goal of documentation search is "Time to Answer". If a user waits several seconds for the index to load, the tool's utility is lost. Fast, accurate search results are essential for providing a professional developer experience.

## Approach

docmd utilises an optimised indexing strategy powered by a high-performance search library. It employs **Scoping**, **Incremental Loading**, and **Field Optimisation** to ensure search results are delivered instantaneously, regardless of site size.

## Implementation

### 1. Scoped Search Indices

docmd automatically generates separate search indices for every [Locale](../../configuration/localisation/index.md) and [Version](../../configuration/versioning.md). Users only download the index relevant to their current context. For example, a user browsing the Chinese version only downloads the Chinese search index, significantly reducing payload size.

### 2. Intelligent Field Stripping

The [Search Plugin](../../plugins/search.md) lets you control exactly what content is indexed. By default, it prioritises headers and frontmatter metadata while stripping common "stop words". You can exclude specific pages from the index using the `search` property in your [Frontmatter](../../content/frontmatter.md).

```yaml
---
title: "Internal Developer Guide"
search: false  # This page will not appear in search results
---
```

### 3. Lazy Loading & Prefetching

To keep initial page loads fast, docmd fetches the search index lazily in the background. It also triggers immediately when a user interacts with the search UI (e.g., clicking the search bar or using the `Cmd+K` / `Ctrl+K` shortcut).

### 4. Result Ranking

Results are ranked based on a weighted scoring system. Keywords found in the page `title` or `h1` headers are weighted significantly higher than those in body text. This ensures the most relevant pages appear at the top.

## Trade-offs

Excluding utility or internal pages from the search index makes them harder to discover. Use the `search: false` property sparingly to ensure valuable information remains findable. While lazy loading improves initial performance, users on slow connections may experience a brief delay the first time they trigger a search.
