---
title: "Managing Multi-Version Documentation"
description: "How to maintain multiple versions of your documentation with a unified switcher and path preservation."
---

## Problem

As software products evolve, users often remain on older LTS versions. Dropping documentation for v1 when v2 releases leaves users stranded. Maintaining separate sites for each version fragments the user experience and cannibalises SEO.

## Why it matters

Without a seamless way to switch versions, developers mistakenly apply instructions from the latest docs to legacy environments. This causes errors and increases support overhead. A unified versioning system ensures users know their context and can jump between versions easily.

## Approach

docmd features a native [Versioning Engine](../../configuration/versioning.md) that treats versions as first-class citizens. It isolates builds into version-prefixed directories, provides "Sticky Switching" to preserve paths, and scopes search results to the active version.

## Implementation

### 1. Organise Source Directories

Keep your latest documentation in a standard directory (e.g., `docs/`). Place legacy versions in sibling directories (e.g., `docs-v1/`).

```text
my-project/
├── docs/             # v2.x (Current)
├── docs-v1/          # v1.x (Legacy LTS)
└── docmd.config.json
```

### 2. Configure the Version Map

Define your version structure in `docmd.config.json`. The `current` version is served at the root URL. Others are served at `/{id}/`.

```json
  "versions": {
    "current": "v2",           
    "position": "sidebar-top", 
    "all": [
      { "id": "v2", "dir": "docs",    "label": "v2.x (Latest)" },
      { "id": "v1", "dir": "docs-v1", "label": "v1.x (LTS)" }
    ]
  }
```

### 3. Per-Version Navigation

If the navigation structure differs between versions, place a `navigation.json` file inside each version's source directory. docmd will detect and use it for that specific version.

```json
// docs-v1/navigation.json
[
  { "title": "Legacy Setup", "path": "/legacy-setup" },
  { "title": "Migration to v2", "path": "/migration" }
]
```

### 4. Path Preservation (Sticky Switching)

docmd attempts to preserve the user's current path when they switch versions. If a user is at `/api/auth` on the `v2` site and switches to `v1`, the engine routes them to `/v1/api/auth`. If the page doesn't exist, it falls back to the version's homepage.

## Trade-offs

Storing multiple versions in a single repository increases repository size over time. For massive documentation sets, consider using CI/CD to pull legacy directories dynamically during the build process instead of committing them to the main branch.
