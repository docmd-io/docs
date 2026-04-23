---
title: "Versioning and Release Workflows for Documentation Systems"
description: "A comprehensive guide on release workflows."
---

## Problem

Releasing software `v2.0` simultaneously with the `v2.0` documentation is stressful. Often, the docs are updated on the live site before the code is actually deployed (confusing current users) or deployed days after (confusing new users).

## Why it matters

Desync between code behavior and documentation behavior is the #1 cause of developer frustration. Accuracy must map strictly to chronography.

## Approach

Isolate active development documentation into a "Next" or "Beta" version directory using `docmd`'s version engine, and only promote it to "Current" upon semantic release.

## Implementation

During the development cycle of `v2.0`:

1. Maintain `docs/` as the current `v1.0` production environment.
2. Create a `docs-next/` directory for writers to draft `v2.0` features asynchronously.

```javascript
// docmd.config.js
export default defineConfig({
  versions: {
    current: 'v1.0',
    all: [
      { id: 'v1.0', dir: 'docs', label: 'v1.0 (Stable)' },
      { id: 'next', dir: 'docs-next', label: 'v2.0 (Beta)' }
    ]
  }
});
```

*When Release Day arrives:*
1. Rename `docs/` to `docs-v1/`.
2. Rename `docs-next/` to `docs/`.
3. Update config: `current: 'v2.0'`.

This workflow ensures PRs for the new version can be merged continuously without accidentally leaking beta documentation to stable users.

## Trade-offs

This approach requires writers to maintain two separate folders simultaneously for months. If a hotfix typo is corrected in `docs/` (v1.0), the writer must deliberately cherry-pick that fix into `docs-next/` (v2.0) to prevent the typo from returning upon release promotion.
