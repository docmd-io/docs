---
title: "Migrating from MkDocs"
description: "A comprehensive guide on moving your documentation from MkDocs to docmd's zero-config, high-performance JavaScript ecosystem."
---

## Problem

Many technical teams have utilized MkDocs (and the popular MkDocs Material theme) for years. However, managing Python environments, `pip` dependencies, and complex `mkdocs.yml` configurations can be frustrating for organizations that have otherwise standardized on Node.js and the NPM ecosystem. Build times for large MkDocs sites can also become a bottleneck in CI/CD pipelines.

## Why it matters

Consolidating your documentation toolchain into the JavaScript ecosystem—where your front-end and full-stack developers already operate—improves internal contribution rates and simplifies your infrastructure. `docmd` provides a zero-config, high-performance alternative to Python-based tools, offering a more modern developer experience and faster deployment cycles.

## Approach

`docmd` embraces many of the same user-centric paradigms as MkDocs Material, such as native versioning, instant search, and rich UI containers. The migration process primarily involves translating your `mkdocs.yml` logic into a `docmd.config.js` file and updating your admonition syntax to match `docmd`'s container system.

## Implementation

### 1. Configuration Mapping

Translate your YAML-based configuration into the [Global Configuration](../../configuration/general) of `docmd`.

**Before (mkdocs.yml):**
```yaml
site_name: My Docs
theme:
  name: material
  palette:
    scheme: slate
```

**After (docmd.config.js):**
```javascript
export default {
  title: 'My Docs',
  theme: {
    appearance: 'dark' // docmd supports light/dark/system natively
  }
};
```

### 2. Admonition Substitution

MkDocs uses `!!!` or `???` syntax for admonitions. `docmd` uses a unified `::: callout` [Container](../../content/containers/callouts) syntax. You can use a global find-and-replace or regex to convert your files:

*   **MkDocs**: `!!! info "Title"`
*   **docmd**: `::: callout info "Title"`

### 3. Integrated Versioning

Replace the complex `mike` plugin and its multi-branch deployment strategy with `docmd`'s native [Versioning Engine](../../configuration/versioning). `docmd` handles multiple documentation versions in a single build pass without the need for external Python utilities.

```javascript
versions: {
  current: 'v2',
  all: [
    { id: 'v2', dir: 'docs', label: 'v2.x (Latest)' },
    { id: 'v1', dir: 'docs-v1', label: 'v1.x (Legacy)' }
  ]
}
```

## Trade-offs

The MkDocs Material ecosystem has a vast array of Python-based plugins. While `docmd`'s [Plugin System](../../customisation/extending-custom-plugins) is growing rapidly and uses modern JavaScript, some very specific MkDocs plugins may not yet have a direct equivalent. However, the significant gain in build speed, simplified environment management, and superior client-side performance often make the transition highly worthwhile for modern engineering teams.
