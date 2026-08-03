---
title: "Versioning Workflows"
description: "How to synchronise documentation releases with software deployment using docmd's versioning engine and promotion strategies."
---

## Problem

Synchronising software releases with corresponding documentation updates is a coordination challenge. Frequently, documentation updates on the live site before new code deploys (confusing current users) or delays several days (frustrating early adopters).

## Why it matters

Desynchronisation between software behaviour and its documentation causes developer friction. For documentation to be effective, it must strictly map to the software version the user is running. Providing correct context for every version ensures smooth onboarding and troubleshooting.

## Approach

Isolate active development documentation using docmd's [Versioning Engine](../../configuration/versioning.md). This allows your team to draft content for upcoming features asynchronously in a separate directory (e.g., `docs-next/`). Promote it to "Stable" status only when the official software release occurs.

## Implementation

### 1. Structure Your Directories

Maintain your stable documentation in the primary `docs/` folder. Create a dedicated directory for the upcoming release.

```text
project-root/
├── docs/       # Current Stable (v1.x)
├── docs-v2/    # Upcoming Release (v2.0)
└── docmd.config.json
```

### 2. Configure Versions

Register both versions in your configuration. Label the upcoming version as "Beta" or "Next" to signal its status to users through the version switcher.

```json
  "versions": {
    "current": "v1.0",
    "all": [
      { "id": "v1.0", "dir": "docs", "label": "v1.x (Stable)" },
      { "id": "v2.0", "dir": "docs-v2", "label": "v2.0 (Beta)" }
    ]
  }
```

### 3. The Promotion Process

When you are ready to officially release the new version:
1.  **Update Config**: Change the `current` version ID in `docmd.config.json` to `v2.0`.
2.  **Update Labels**: Remove the "(Beta)" tag from the `label` in the `all` array.
3.  **Archive Old Docs**: Keep the `v1.0` entry in the `all` array so users on older versions can still access relevant documentation.

## Trade-offs

### Maintenance Overhead
Maintaining multiple versions of documentation requires discipline. If a critical typo or security warning is fixed in the stable version, ensure it is also applied to the upcoming version directory to prevent regressions.

### SEO and Search
Multiple versions can occasionally lead to search results pointing to older documentation. Use the `seo` plugin and proper canonical tags to ensure the "Current" version is always prioritised by search engines. See [Handling Breaking Changes](../scaling-architecture/breaking-changes-deprecations.md) for more details.
