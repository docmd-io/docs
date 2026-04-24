---
title: "Managing Multi-Version Documentation"
description: "How to maintain multiple versions of your documentation (v1, v2, legacy) with a unified switcher and path preservation."
---

## Problem

As software products evolve, enterprise users often remain on older LTS (Long Term Support) versions. Dropping documentation for v1 when v2 is released leaves those users stranded, while maintaining completely separate sites for each version leads to a fragmented user experience and SEO cannibalization.

## Why it matters

Without a seamless way to switch versions, developers often mistakenly apply instructions from the latest documentation to legacy environments, leading to errors and increased support overhead. A unified versioning system ensures that users always know which context they are in and can easily jump between versions of the same page.

## Approach

`docmd` features a native [Versioning Engine](../../configuration/versioning) that treats versions as first-class citizens. It isolates builds into version-prefixed directories, provides a "Sticky Switching" mechanism that preserves the current page path, and correctly scopes search results to the active version context.

## Implementation

### 1. Organize Source Directories

Keep your latest documentation in a standard directory (e.g., `docs/`) and place legacy versions in sibling directories (e.g., `docs-v1/`).

```text
my-project/
├── docs/             # v2.x (Current)
├── docs-v1/          # v1.x (Legacy LTS)
└── docmd.config.js
```

### 2. Configure the Version Map

Define your version structure in `docmd.config.js`. The `current` version is served at the root URL, while others are served at `/{id}/`.

```javascript
// docmd.config.js
export default {
  versions: {
    current: 'v2',           // Served at /
    position: 'sidebar-top', // Switcher location
    all: [
      { id: 'v2', dir: 'docs',    label: 'v2.x (Latest)' },
      { id: 'v1', dir: 'docs-v1', label: 'v1.x (LTS)' }
    ]
  }
};
```

### 3. Per-Version Navigation

If the navigation structure differs between versions, you can place a `navigation.json` file inside each version's source directory. `docmd` will automatically detect and use it for that specific version.

```json
// docs-v1/navigation.json
[
  { "title": "Legacy Setup", "path": "/legacy-setup" },
  { "title": "Migration to v2", "path": "/migration" }
]
```

### 4. Path Preservation (Sticky Switching)

`docmd` automatically attempts to preserve the user's current path when they switch versions. If a user is at `/api/auth` on the `v2` site and switches to `v1`, the engine will attempt to route them to `/v1/api/auth`. If the page doesn't exist in the target version, it falls back to the version's homepage.

## Trade-offs

Storing multiple versions in a single repository increases the repository size over time. For very large documentation sets, consider using CI/CD to pull in legacy documentation directories dynamically during the build process instead of committing them to the main branch.
