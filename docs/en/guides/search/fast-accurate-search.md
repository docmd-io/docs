---
title: "Fast & Accurate Search"
description: "How docmd optimizes search indexing for speed and accuracy, even in large-scale documentation projects."
---

## Problem

As documentation grows to hundreds or thousands of pages, the compiled search index can become quite large. A monolithic index file can block the browser's main thread during download and parsing, delaying the "Time to Interactive" and causing the search interface to feel sluggish or unresponsive.

## Why it matters

The primary goal of documentation search is "Time to Answer." If a user triggers the search modal and has to wait several seconds for the index to load, the utility of the search tool is lost. Fast, accurate search results are essential for providing a professional developer experience and helping users find information without friction.

## Approach

`docmd` utilizes an optimized indexing strategy powered by a high-performance search library. It employs **Scoping**, **Incremental Loading**, and **Field Optimization** to ensure that search results are delivered almost instantaneously, regardless of the size of the documentation site.

## Implementation

### 1. Scoped Search Indices

`docmd` automatically generates separate search indices for every [Locale](../../configuration/localisation) and [Version](../../configuration/versioning). This ensures that a user only downloads the index relevant to their current context. For example, a user browsing the Chinese version of your documentation only downloads the Chinese search index, significantly reducing the payload size.

### 2. Intelligent Field Stripping

The [Search Plugin](../../plugins/search) allows you to control exactly what content is indexed. By default, it prioritizes headers and frontmatter metadata while stripping out common "stop words" and unnecessary code symbols that bloat the index without adding value. You can also exclude specific pages from the index using the `search` property in your [Frontmatter](../../content/frontmatter).

```yaml
---
title: "Internal Developer Guide"
search: false  # This page will not appear in search results
---
```

### 3. Lazy Loading & Prefetching

To keep the initial page load fast, `docmd` does not load the search index immediately. Instead, it is fetched lazily in the background or triggered the moment a user interacts with the search UI (e.g., by clicking the search bar or using the `Cmd+K` / `Ctrl+K` shortcut).

### 4. Result Ranking

Results are ranked based on a weighted scoring system. Keywords found in the page `title` or `h1` headers are weighted significantly higher than those found in the body text. This ensures that the most relevant pages appear at the top of the results list.

## Trade-offs

Excluding utility or internal pages from the search index makes them harder to discover. You should use the `search: false` property sparingly to ensure that valuable information remains findable. While lazy loading improves initial performance, users on extremely slow connections may experience a brief delay the first time they trigger a search.
