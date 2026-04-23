---
title: "Migrating Documentation from MkDocs to docmd"
description: "A comprehensive guide on from mkdocs."
---

## Problem

Python-reliant teams have utilized MkDocs (and MkDocs Material) for years. However, wrestling with `pip` dependency environments, `requirements.txt` mismatches in CI, and Python versioning can be frustrating for JS/TS heavy organizations.

## Why it matters

Consolidating your documentation toolchain into the NPM ecosystem (where the rest of your web developers operate) improves internal contribution rates and speeds up your Vercel/Netlify deployments.

## Approach

`docmd` embraces highly similar paradigms to MkDocs Material (native versioning, search, tabs). The primary migration effort revolves around moving `mkdocs.yml` logic into `docmd.config.js`.

## Implementation

1. **Move Configuration:**
Translate your YAML configuration to JS.
```yaml
# mkdocs.yml
site_name: My Project
theme:
  name: material
  palette:
    scheme: slate
```

Becomes:
```javascript
// docmd.config.js
export default defineConfig({
  title: 'My Project',
  theme: { appearance: 'dark' }
});
```

2. **Admonitions & Plugins:**
MkDocs `!!! warning` admonitions use a different syntax. Use a quick regex substitution to convert them to `docmd` callouts:
- Search: `!!! warning "(.+)"`
- Replace: `::: callout warning "$1"`

3. **Versioning:**
Replace the complex `mike` mkdocs plugin with `docmd`'s native `versions:` array. `docmd` handles the compilation natively without needing external python utilities.

## Trade-offs

MkDocs Material has an absolutely massive plugin ecosystem via PyPI (e.g., pdf exporters, strict linters). While `docmd`'s plugin ecosystem is modern and growing, you may find specific obscure MkDocs plugins do not yet have 1:1 Javascript equivalents in `docmd`.
