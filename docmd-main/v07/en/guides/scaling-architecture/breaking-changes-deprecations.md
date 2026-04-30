---
title: "Breaking Changes & Deprecations"
description: "How to communicate API changes and migration paths effectively using versioned documentation and contextual callouts."
---

## Problem

When a product introduces a major version change, certain APIs, features, or configurations are inevitably deprecated or removed. Users browsing the latest documentation must be clearly warned if they are using outdated patterns, yet the documentation should remain focused on the modern implementation to avoid confusion.

## Why it matters

Failure to explicitly surface breaking changes leads to developers wasting hours debugging code that the engine no longer supports. Contextual warnings and clear migration paths are essential for maintaining user trust, reducing support requests, and ensuring a smooth transition to the latest version of your software.

## Approach

Combine `docmd`'s [Versioning Engine](../../configuration/versioning.md) with [Callout Containers](../../content/containers/callouts.md) to create a clear distinction between legacy and modern content. The strategy is to move full legacy documentation to an archived version while providing "migration anchors" in the current version that link back to the archived content.

## Implementation

### 1. Archiving Legacy Content

When releasing a new major version (e.g., v2.0), move your existing documentation to an archived directory (e.g., `docs-v1/`). This ensures that the full context of the previous version is preserved for users who haven't migrated yet.

### 2. Contextual Migration Callouts

In your latest documentation, use `warning` or `important` callouts at the top of pages where significant changes have occurred. This provides immediate value to users who are attempting to use legacy patterns.

```markdown
# Configuration API

::: callout warning "Migration: Breaking Change in v2.0"
The `siteTitle` property has been removed. It has been replaced by the global `title` property.

* **Migrating from v1.x?** Please update your `docmd.config.js`.
* **Need latest docs?** Refer to the [Configuration Guide](../../configuration/overview.md).
:::
```

### 3. Maintaining AI Accuracy

By strictly separating deprecated content from the active version, you significantly improve the accuracy of AI tools. `docmd`'s [LLMs Plugin](../../plugins/llms.md) generates context files based on the active version. Archiving legacy content prevents AI models from "hallucinating" and recommending outdated APIs to users who are looking for modern solutions.

## Trade-offs

Actively managing migration callouts adds maintenance overhead. If left indefinitely, pages can become cluttered with old warnings. We recommend a policy of removing migration callouts once the legacy version reaches its End-of-Life (EOL) or after one full major release cycle to keep the documentation lean and focused.
