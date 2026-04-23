---
title: "Handling Breaking Changes and Deprecations in Versioned Docs"
description: "A comprehensive guide on breaking changes."
---

## Problem

When a new major version of a product is introduced, certain APIs, CLI commands, or concepts are deprecated or entirely removed. Users browsing the latest documentation need to be clearly warned if they are using outdated strategies.

## Why it matters

If a breaking change isn't surfaced explicitly, developers will waste hours debugging syntax that the engine no longer supports. Contextual warnings are the key to smooth migration paths.

## Approach

Use `docmd`'s extensive container syntax (specifically Callouts and Component level tagging) to visually interrupt the reader with migration contexts, while removing the deprecated content entirely from the active version.

## Implementation

When you cut a new version (e.g. from `v1` to `v2`):
1. Create the `docs-v1/` archive folder.
2. In the active `docs/` folder, completely remove or rewrite the documentation for the deprecated feature.
3. At the top of the new feature replacement, utilize `docmd` callouts to explicitly point out the breaking change to migrating users.

```markdown
# Configuration Engine

::: callout warning "Breaking Change in v2.0"
The `siteTitle` property has been officially deprecated. It has been replaced by the more concise `title` property. If you are migrating from v1.x, you must update your `docmd.config.js` immediately.

[Read the Configuration documentation here](../../configuration/general.md)
:::

export default {
  title: 'My Project'
}
```

For AI ingestion, dropping the deprecated content from `docs/` ensures `llms-full.txt` only trains the AI on your modern syntax, while human users get the visual breadcrumbs they need to migrate safely.

## Trade-offs

Actively curating breaking-change warnings in new documentation layers adds maintenance overhead. Over time, pages can become cluttered with "Legacy Notes." To combat this, establish a policy of removing migration callouts after the legacy version reaches its End-of-Life (EOL).
