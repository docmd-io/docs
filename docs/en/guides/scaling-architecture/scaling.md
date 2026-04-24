---
title: "Scaling to 1000+ Pages"
description: "How to maintain high performance and usability in massive documentation projects with docmd."
---

## Problem

As a software product matures, its documentation naturally expands. When a project grows to hundreds or thousands of Markdown files, many documentation generators suffer from sluggish build times, slow development server hot-reloading, and navigation structures that overwhelm both maintainers and users.

## Why it matters

If documentation generation takes minutes instead of seconds, authors are discouraged from making small corrections, leading to stale and inaccurate content. For users, a massive, unorganized sidebar menu makes finding information frustrating, leading to increased support tickets and a poor developer experience.

## Approach

`docmd` is architected for speed and scalability. By utilizing a high-performance parsing engine and a granular file-based build strategy, it can process thousands of pages in seconds. Its optimized SPA (Single Page Application) delivery ensures that navigating through a large site remains instantaneous for the end user.

## Implementation

### 1. Granular Project Structure

Avoid placing all files in a single flat directory. Use a deeply nested folder structure that mirrors your product's architecture. This makes the project easier to maintain and allows `docmd` to efficiently track changes during development.

### 2. Optimized Search Indexing

For large sites, the [Search Plugin](../../plugins/search) is essential. `docmd` generates a highly compressed search index that is loaded on demand. This ensures that even with thousands of pages, the initial page load remains fast while providing full-text search capabilities across the entire site.

### 3. Versioning and Archiving

Leverage the [Versioning Engine](../../configuration/versioning) to separate legacy content from active documentation. By isolating older versions into their own build contexts, you reduce the number of pages that need to be re-processed during daily updates, significantly improving development velocity.

```javascript
// docmd.config.js
export default {
  versions: {
    current: 'v3',
    all: [
      { id: 'v3', dir: 'docs/current', label: 'v3.x (Latest)' },
      { id: 'v2', dir: 'docs/v2',      label: 'v2.x (Legacy)' }
    ]
  }
};
```

### 4. Component-Based Navigation

Break down your navigation into logical segments using `navigation.json` files. This allows you to define distinct sidebar hierarchies for different sections of your site, preventing the main navigation from becoming cluttered.

## Trade-offs

A large site naturally consumes more disk space and memory during the build process. To maintain sub-second build times at extreme scales (10,000+ pages), consider using a high-performance CI/CD environment with SSD storage and ample RAM to handle the parallel processing of files.
