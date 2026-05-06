---
title: "OpenAPI Plugin"
description: "Render OpenAPI 3.x API reference documentation directly from JSON or YAML spec files inside your Markdown pages."
---

The **OpenAPI plugin** turns OpenAPI 3.x specification files into structured API reference pages - rendered at build time with no client-side JavaScript and no third-party dependencies. Every endpoint, parameter, request body, and response is converted to semantic HTML tables.

::: callout info "Core Plugin"
The OpenAPI plugin is **included** by default in `@docmd/core`. There is no need to install it separately. It follows the Docmd philosophy of build-time rendering - the plugin reads your spec and outputs clean, accessible HTML tables with zero client-side JavaScript.
:::

## Installation

```bash
docmd add openapi
# or manually:
npm install @docmd/plugin-openapi
```

Enable in your config:

```javascript
export default defineConfig({
  plugins: {
    openapi: {}
  }
});
```

## Usage

Embed an OpenAPI spec in any Markdown page using a fenced code block with the `openapi` language tag:

````markdown
### Live Example

```openapi
assets/docmd-api.json
```
````

### Result

```openapi
assets/docmd-api.json
```

The path is resolved relative to your `src` directory. Both **JSON** and **YAML** formats are supported. YAML requires `js-yaml` to be installed:

```bash
npm install js-yaml
```

## What Gets Rendered

For each path and HTTP method in the spec, the plugin renders:

- **Method badge** - colour-coded (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`)
- **Path** - the full endpoint path with parameters highlighted
- **Summary and description** - from the operation object
- **Parameters table** - name, location (`path`, `query`, `header`, `cookie`), type, required flag, description
- **Request body table** - schema properties with types and defaults
- **Responses table** - status codes with descriptions and response schema types
- **Deprecated notice** - operations marked `deprecated: true` are flagged inline

::: callout tip "Build-Time Rendering"
All rendering happens at build time. The generated pages are fully static - no JavaScript is needed to display the API docs, which means fast page loads and full search indexation. This approach is intentionally chosen over dynamic tools like Swagger UI or Redoc to ensure zero-JS performance and SEO-friendliness.
:::

## Supported OpenAPI Features

| Feature | Support |
| :--- | :--- |
| OpenAPI 3.x | ✓ |
| Swagger 2.x | ✗ (convert to 3.x first) |
| Swagger UI / Redoc | ✗ (intentionally omitted) |
| JSON format | ✓ |
| YAML format | ✓ (requires `js-yaml`) |
| `$ref` resolution | ✓ (internal `#/components/schemas/` refs) |
| `oneOf` / `anyOf` types | ✓ (shown as union type strings) |
| Nested schema tables | ✓ |
| Operation tags | ✓ (shown in the spec header area) |
| `deprecated` flag | ✓ |
| External `$ref` (remote URLs) | ✗ (local refs only) |

## Example Spec

Given an `openapi.json` in your docs source:

```json
{
  "openapi": "3.0.0",
  "info": { "title": "My API", "version": "1.0.0" },
  "paths": {
    "/users/{id}": {
      "get": {
        "summary": "Get user by ID",
        "parameters": [
          {
            "name": "id",
            "in": "path",
            "required": true,
            "schema": { "type": "string" }
          }
        ],
        "responses": {
          "200": { "description": "User object" },
          "404": { "description": "User not found" }
        }
      }
    }
  }
}
```

Embedded in Markdown:

````markdown
# API Reference

```openapi
./openapi.json
```
````

The plugin renders a formatted endpoint block inline with the rest of your page content.

## Configuration

The OpenAPI plugin can be configured in your `docmd.config.js`:

```javascript
export default defineConfig({
  plugins: {
    openapi: {
      info: true,           // Show the API title and version header
      download: true,       // Provide a 'Download JSON/YAML' link in the UI
      summaryOnly: false,    // Only show summaries, hide parameters/responses
      allowRawHtml: false    // Allow HTML in descriptions (use with caution)
    }
  }
});
```

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `info` | `boolean` | `true` | Display the API title, version, and description from the spec's `info` object. |
| `download` | `boolean` | `false` | If true, adds a link to the header of the spec to download/view the raw JSON/YAML file. **Recommended for AI accessibility.** |
| `summaryOnly` | `boolean` | `false` | If true, only renders the method, path, and summary. Useful for large API indexes. |
| `allowRawHtml` | `boolean` | `false` | If true, prevents escaping of HTML tags in descriptions. |

## Per-Page Control

Disable the plugin for specific pages via frontmatter:

```markdown
---
title: "Internal Notes"
plugins:
  openapi: false
---
```