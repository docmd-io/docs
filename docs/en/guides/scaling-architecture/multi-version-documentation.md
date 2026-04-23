---
title: "Managing Multi-Version Documentation (v1, v2, Legacy) in docmd"
description: "A comprehensive guide on multi-version docs."
---

## Problem

Software products evolve, but enterprise users often remain on older, LTS (Long Term Support) versions. Dropping documentation for v1 when v2 is released abandons those users, but maintaining disparate documentation sites for every version creates operational nightmares.

## Why it matters

Without a seamless way to browse multiple versions, users inevitably apply v2 instructions to a v1 environment, causing catastrophic errors, frustration, and increased support tickets.

## Approach

`docmd` provides a native, multi-dimensional versioning engine. It isolates builds into separate directories, ensures URL path preservation when switching versions, and correctly restricts global search to the active version context.

## Implementation

**1. Isolate Source Folders:** Keep your `main` branch documentation representing the current version, and copy legacy documentation into isolated directories prefixed with `docs-`.

```text
my-project/
├── docs/             # v2 (Current)
├── docs-v1.x/        # v1 (Legacy LTS)
└── docmd.config.js
```

**2. Configure the Engine:** Define the version map in `docmd.config.js`. 

```javascript
export default defineConfig({
  versions: {
    current: 'v2',           // Renders at the root '/'
    position: 'sidebar-top', // Places the pill-switcher prominently
    all: [
      { id: 'v2', dir: 'docs',      label: 'v2.0 (Latest)' },
      { id: 'v1.x', dir: 'docs-v1.x', label: 'v1.x (LTS)' }
    ]
  }
});
```

Because `docmd` executes **Path Preservation**, a user reading `href="/api/auth"` in version `v2` who clicks the version switcher to `v1.x` will automatically be routed to `/v1.x/api/auth`.

## Trade-offs

Keeping older version folders directly inside your primary repository implies the repo size will grow substantially over consecutive years. For massive codebases, consider pulling in older documentation directories dynamically at build time via CI/CD pipelines rather than committing them statically to your active `main` branch.
