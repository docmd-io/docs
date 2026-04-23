---
title: "Generating API Documentation from OpenAPI with docmd"
description: "A comprehensive guide on openapi generation."
---

## Problem

Manually maintaining API documentation means that the moment an engineer changes a REST endpoint, the documentation is immediately obsolete.

## Why it matters

Inaccurate API references directly cause integration failures for your clients. Manually syncing payload schemas is tedious, error-prone, and a waste of engineering time.

## Approach

Use an asynchronous pipeline to convert `swagger.json` or `openapi.yaml` into static `docmd` Markdown files. Since `docmd` natively supports complex layouts (Grids, Callouts, Code blocks), the generated output looks highly curated.

## Implementation

There is no native OpenAPI plugin in `docmd` yet, but it integrates perfectly with standard generators like `widdershins` or custom scripts.

1. **The Build Step**
Add a pre-build step in `package.json` to fetch the schema and generate markdown.

```json
"scripts": {
  "prebuild": "npx widdershins --search false --language_tabs 'shell:cURL' 'javascript:Node' openapi.yaml -o docs/api/reference.md",
  "build": "docmd build"
}
```

2. **Layout Overrides**
Force API reference pages into a "fullscreen" or "no-sidebar" layout to accommodate wide JSON response tables using frontmatter.

```yaml
---
title: "API Reference"
layout: "fullscreen"
---
```

## Trade-offs

Widdershins-generated markdown can be dense and lacks the "human touch" of handwritten guides. We highly recommend using OpenAPI generation purely for the **Reference** section, and keeping handwritten guides for the **Tutorials**, utilizing docmd routing to link between them seamlessly.
