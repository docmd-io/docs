---
title: "OpenAPI Generation"
description: "How to integrate OpenAPI/Swagger schemas into your docmd workflow for automated and synchronised API reference documentation."
---

## Problem

Manually maintaining REST API documentation is an operational risk. When an engineer modifies an endpoint or updates a schema in code, documentation becomes obsolete. Keeping these in sync manually is tedious, error-prone, and frequently leads to integration failures for consumers.

## Why it matters

Inaccurate API references cause developer frustration and increase support tickets. Automation ensures your documentation remains the "source of truth", reflecting the actual state of your API at every build. This allows engineers to focus on building features rather than updating tables manually.

## Approach

Implement an asynchronous build pipeline that converts your `openapi.json` or `swagger.yaml` schema into standard Markdown files. Because docmd excels at rendering Markdown with complex [Containers](../../content/containers/index.md), the resulting API reference feels integrated and visually consistent with the rest of your documentation.

## Implementation

### 1. Build Pipeline Integration

Use a tool like `widdershins` or a custom script to generate Markdown from your OpenAPI schema as a pre-build step in your CI/CD pipeline.

```json
// package.json
{
  "scripts": {
    "docs:generate-api": "npx widdershins --search false openapi.yaml -o docs/api/reference.md",
    "docs:build": "npm run docs:generate-api && npx @docmd/core build"
  }
}
```

### 2. Optimising API Layouts

API references are often content-dense, with large tables for parameters and nested schemas. Use [Frontmatter](../../content/frontmatter.md) to optimise the page layout for readability.

```markdown
---
title: "REST API Reference"
layout: "full"  # Maximises horizontal space for dense tables
---
```

Setting `layout: "full"` removes the right-hand Table of Contents sidebar, providing more room for wide code blocks and response examples.

### 3. Enhancing with docmd Containers

Post-process the generated Markdown to inject docmd features like [Tabs](../../content/containers/tabs.md) for multi-language code samples or [Callouts](../../content/containers/callouts.md) for authentication warnings.

````markdown
::: tabs

  == tab "cURL"
    ```bash
    curl -X GET "https://api.example.com/v1/users"
    ```

  == tab "Node.js"
    ```javascript
    const users = await client.getUsers();
    ```

:::
````

## Trade-offs

Machine-generated documentation is excellent for technical accuracy but lacks the "human touch" required for effective learning. We recommend using OpenAPI generation for the **Technical Reference** (endpoints, parameters, schemas) while providing handwritten **Tutorials** and **Conceptual Guides** to explain the context and use cases.