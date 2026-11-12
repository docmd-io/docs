---
title: "OpenAPI Generation"
description: "Integrate OpenAPI and Swagger REST schemas into docmd workflows for automated API documentation rendering."
---

Manually maintaining REST API documentation is prone to drift as code endpoints evolve. Automation ensures your documentation remains the single source of truth, updated automatically during build steps.

docmd provides native rendering for OpenAPI / Swagger specifications via `@docmd/plugin-openapi` or automated pre-build Markdown generation.

## Configuration

Enable OpenAPI rendering in `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "openapi": {
      "spec": "./schemas/openapi.json",
      "route": "/api/reference"
    }
  }
}
```

## Automated Pre-Build Markdown Pipeline

Alternatively, compile schemas to Markdown before running `docmd build`:

```json "package.json"
{
  "scripts": {
    "docs:generate-api": "npx widdershins --search false openapi.yaml -o docs/api/reference.md",
    "docs:build": "npm run docs:generate-api && npx @docmd/core build"
  }
}
```

## Optimising API Layouts

API references contain wide parameter tables and response payloads. Use `layout: "full"` in page frontmatter to grant maximum horizontal width:

```markdown
---
title: "REST API Reference"
layout: "full"
---
```

::: callout tip "Multi-Language Request Examples" icon:code
Enhance generated endpoint pages by wrapping multi-language code snippets inside [Tabs Containers](../../content/containers/tabs.md) for cURL, JavaScript, Python, and Go request examples.
:::