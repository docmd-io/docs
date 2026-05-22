---
title: "Scaling to 1000+ Pages"
description: "How to maintain high performance and usability in massive documentation projects with docmd."
---

## Problem

Documentation naturally expands as software matures. When projects grow to thousands of Markdown files, traditional generators suffer. Build times drag, hot-reloading slows, and navigation structures overwhelm maintainers and users alike.

## Why it matters

If builds take minutes, authors avoid making small corrections. Content becomes stale and inaccurate. For users, a massive, unorganised sidebar menu makes finding information frustrating. This increases support tickets and degrades the developer experience.

## Approach

docmd is built for speed and scalability. By using a high-performance parsing engine and a granular file-based strategy, it processes thousands of pages in seconds. Its optimised SPA delivery ensures navigation remains instantaneous for end users.

## Implementation

### 1. Granular Project Structure

Avoid flat directories. Use a deeply nested folder structure that mirrors your product's architecture. This eases maintenance and allows docmd to track changes efficiently during development.

### 2. Optimised Search Indexing

For large sites, the [Search Plugin](../../plugins/search.md) is essential. docmd generates a highly compressed search index loaded on demand. This keeps the initial page load fast while providing full-text search across thousands of pages.

### 3. Versioning and Archiving

Use the [Versioning Engine](../../configuration/versioning.md) to separate legacy content. Isolating older versions into distinct build contexts reduces the number of pages processed during daily updates. This improves development velocity.

```json
  "versions": {
    "current": "v3",
    "all": [
      { "id": "v3", "dir": "docs/current", "label": "v3.x (Latest)" },
      { "id": "v2", "dir": "docs/v2",      "label": "v2.x (Legacy)" }
    ]
  }
```

### 4. Component-Based Navigation

Break navigation into logical segments using `navigation.json` files. This lets you define distinct sidebar hierarchies for different sections, preventing main navigation clutter.

## Trade-offs

A massive site naturally consumes more disk space and memory during builds. To maintain sub-second build times at extreme scales (10,000+ pages), use a high-performance CI/CD environment with SSD storage and ample RAM to handle parallel file processing.
