---
title: "Scaling Documentation to 1000+ Pages with docmd"
description: "A comprehensive guide on 1000+ pages."
---

## Problem

As software products mature, their documentation naturally expands. When a project grows to hundreds or thousands of markdown files, documentation generators often suffer from sluggish build times, sluggish dev server hot-reloading, and navigation structures that overwhelm both maintainers and users.

## Why it matters

If documentation generation takes minutes, authors are discouraged from making small corrections, leading to stale content. Furthermore, if users encounter a massive, unorganized sidebar menu, finding the right information becomes frustrating, increasing support burdens.

## Approach

`docmd` is architected specifically to handle enormous document graphs efficiently using its isomorphic `lite-hl` engine. By combining a granular file structure, lazy-computed navigation, and the underlying static site generation mechanics, `docmd` processes thousands of pages in fractions of a second.

## Implementation

### 1. Leverage Static Output
`docmd` produces pure static HTML by default. This eliminates runtime overhead when delivering 1000+ pages. Because `docmd` also uses SPA routing, navigating through these HTML files feels instantaneous.

### 2. Segment Your Build Strategy
For extremely large sites, segment documentation strictly by version or locale, utilizing `docmd.config.js` to define localized scopes.

```javascript
// docmd.config.js
export default defineConfig({
  versions: {
    current: 'v3',
    all: [
      { id: 'v3', dir: 'docs-v3', label: 'v3.x' },
      { id: 'v2', dir: 'docs-v2', label: 'v2.x' }
    ]
  }
});
```

### 3. Disaggregate Navigation
Don't rely entirely on auto-generated sidebars for large sites. Create distinct `navigation.json` files per language or version to explicitly control the hierarchy and lazy-load subsections logically.

```json
[
  { "title": "Core Platform", "path": "/platform" },
  { "title": "API Reference", "path": "/api" } // APIs deserve their own dedicated top-level group
]
```

## Trade-offs

While segmenting navigation keeps sidebars clean, it does mean that content discovery across vastly different system modules might require users to rely more heavily on the global search. Fortunately, `docmd`'s built-in MiniSearch indexes scale remarkably well and support precise scoping per version/locale.
