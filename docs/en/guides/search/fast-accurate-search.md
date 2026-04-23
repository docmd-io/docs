---
title: "Designing Documentation for Fast and Accurate Search Results"
description: "A comprehensive guide on speed & accuracy."
---

## Problem

When documentation reaches hundreds of pages, the compiled Search Index JSON file becomes massive. A 30MB index file blocks the main thread during browser download, delaying the documentation's "Time to Interactive" and causing search input fields to freeze.

## Why it matters

The key metric for documentation is "Time to Answer." If a user clicks `Cmd+K` and has to wait 4 seconds for the search modal to appear because the browser is parsing a monolithic JSON index, the benefit of the search tool is completely destroyed.

## Approach

Keep the index lightweight. Do this through **Scoping**, **Pre-computation**, and **Field Stripping**. `docmd`'s MiniSearch integration allows fine-grained control over exactly what gets indexed and how it is fetched.

## Implementation

### 1. Scope Searches by Locale or Version
By default, `docmd` builds separate search indices for every configured language locale and version. This mathematically divides the index size.

If a user is browsing `/zh/v2`, they only download the `search-index-zh-v2.json`.

### 2. Strip Useless Content
Exclude common Stop Words (the, and, or) and completely index out structural code symbols that bloat the index without adding search value. Use frontmatter to entirely exclude utility or internal pages from the index.

```yaml
---
title: "Internal Branding Guidelines"
search: false
---
```

### 3. Lazy Loading
`docmd` does not load the search index on initial page load. It is prefetched lazily in the background using `requestIdleCallback`, or fetched immediately upon the user hitting `Cmd+K`.

## Trade-offs

Excluding utility pages hides them from users entirely. You must ensure you aren't hiding content that occasionally needs to be found. Additionally, lazy loading the index means a user executing a search literally 0.1 seconds after the page loads might experience a 100ms stutter.
