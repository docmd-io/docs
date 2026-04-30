---
title: "Versioning Workflows"
description: "How to synchronise documentation releases with software deployment using docmd's versioning engine and promotion strategies."
---

## Problem

Synchronizing software releases with corresponding documentation updates is a significant coordination challenge. Frequently, documentation is updated on the live site before the new code is deployed (confusing current users) or delayed several days after the release (frustrating early adopters).

## Why it matters

Desynchronization between software behaviour and its documentation is a major source of developer friction. For documentation to be effective, it must strictly map to the specific version of the software the user is currently running. Providing the correct context for every version ensures a smooth onboarding and troubleshooting experience.

## Approach

Isolate active development documentation using `docmd`'s [Versioning Engine](../../configuration/versioning.md). This allows your team to draft content for upcoming features asynchronously in a separate directory (e.g., `docs-next/`), promoting it to the "Stable" or "Current" status only when the official software release occurs.

## Implementation

### 1. Structure Your Directories

Maintain your stable documentation in the primary `docs/` folder and create a dedicated directory for the upcoming release.

```text
project-root/
├── docs/       # Current Stable (v1.x)
├── docs-v2/    # Upcoming Release (v2.0)
└── docmd.config.js
```

### 2. Configure Versions

Register both versions in your configuration. You can label the upcoming version as "Beta" or "Next" to signal its status to users through the version switcher.

```javascript
// docmd.config.js
export default {
  versions: {
    current: 'v1.0',
    all: [
      { id: 'v1.0', dir: 'docs', label: 'v1.x (Stable)' },
      { id: 'v2.0', dir: 'docs-v2', label: 'v2.0 (Beta)' }
    ]
  }
};
```

### 3. The Promotion Process

When you are ready to release the new version officially:
1.  **Update Config**: Change the `current` version ID in `docmd.config.js` to `v2.0`.
2.  **Update Labels**: Remove the "(Beta)" tag from the `label` in the `all` array.
3.  **Archive Old Docs**: Keep the `v1.0` entry in the `all` array so users on older versions can still access their relevant documentation.

## Trade-offs

### Maintenance Overhead
Maintaining multiple versions of documentation requires discipline. If a critical typo or security warning is fixed in the stable version, ensure it is also applied to the upcoming version directory to prevent "regressions" in clarity.

### SEO and Search
Multiple versions can occasionally lead to search results pointing to older documentation. Use the `seo` plugin and proper canonical tags to ensure that the "Current" version is always prioritized by search engines. See [Handling Breaking Changes](../scaling-architecture/breaking-changes-deprecations.md) for more on managing transitions.
