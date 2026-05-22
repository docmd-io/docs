---
title: "Breaking Changes & Deprecations"
description: "How to communicate API changes and migration paths effectively using versioned documentation and contextual callouts."
---

## Problem

When a product introduces a major version change, APIs or configurations are inevitably deprecated. Users browsing the latest docs must be warned if they use outdated patterns. However, the documentation should remain focused on the modern implementation.

## Why it matters

Failure to surface breaking changes leads to developers debugging code the engine no longer supports. Contextual warnings and clear migration paths maintain user trust, reduce support requests, and ensure a smooth transition.

## Approach

Combine docmd's [Versioning Engine](../../configuration/versioning.md) with [Callout Containers](../../content/containers/callouts.md). This creates a clear distinction between legacy and modern content. Move full legacy documentation to an archived version while providing "migration anchors" in the current version.

## Implementation

### 1. Archiving Legacy Content

When releasing a new major version, move existing documentation to an archived directory (e.g., `docs-v1/`). This preserves the context of the previous version for users who haven't migrated.

### 2. Contextual Migration Callouts

In your latest documentation, use `warning` or `important` callouts where significant changes occurred. This provides immediate value to users attempting to use legacy patterns.

```markdown
# Configuration API

::: callout warning "Migration: Breaking Change in v2.0"
The `siteTitle` property has been removed. It has been replaced by the global `title` property.

* **Migrating from v1.x?** Please update your `docmd.config.json`.
* **Need latest docs?** Refer to the [Configuration Guide](../../configuration/overview.md).
:::
```

### 3. Maintaining AI Accuracy

Separating deprecated content from the active version improves the accuracy of AI tools. docmd's [LLMs Plugin](../../plugins/llms.md) generates context files based on the active version. Archiving legacy content prevents AI models from recommending outdated APIs.

## Trade-offs

Actively managing migration callouts adds maintenance overhead. If left indefinitely, pages become cluttered with old warnings. Remove migration callouts once the legacy version reaches End-of-Life (EOL) or after one full major release cycle. This keeps documentation lean and focused.
