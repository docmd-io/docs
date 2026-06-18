---
title: "OpenAPI Plugin"
description: "Static API reference documentation rendered directly from OpenAPI 3.x specifications at build-time."
---

The `@docmd/plugin-openapi` plugin converts OpenAPI 3.x specification files into structured, searchable API reference pages. It follows the Docmd "Zero-JS" philosophy - rendering every endpoint, parameter, and response into semantic HTML tables during the build process, ensuring maximum performance and SEO.

## Configuration

The OpenAPI plugin is included by default in `@docmd/core`. You can configure global rendering options in your `docmd.config.json`.

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `info` | `boolean` | `true` | Display the API title, version, and description from the spec's `info` object. |
| `download` | `boolean` | `false` | If true, adds a link to the header of the spec to download the raw JSON/YAML file. |
| `summaryOnly` | `boolean` | `false` | If true, only renders the method, path, and summary. Useful for large API indexes. |
| `allowRawHtml` | `boolean` | `false` | If true, prevents escaping of HTML tags in descriptions. |

### Example

```json
{
  "plugins": {
    "openapi": {
      "info": true,
      "download": true,
      "summaryOnly": false
    }
  }
}
```

## Usage

Embed an OpenAPI specification anywhere in your Markdown using a fenced code block with the `openapi` tag. The path is resolved relative to your project source.

````markdown
```openapi
assets/openapi.json
```
````

### Rendering Result

```openapi
assets/docmd-api.json
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
All rendering happens at build time. The generated pages are static, with no client-side JavaScript required to display them. This gives you fast page loads, full search indexation, and SEO-friendly HTML.
:::

## Capability Support

| Feature | Support |
| :--- | :--- |
| OpenAPI 3.x | ✓ (JSON & YAML*) |
| Swagger 2.x | ✗ (Convert to 3.x first) |
| `$ref` Resolution | ✓ (Internal schemas) |
| `oneOf` / `anyOf` | ✓ (Shown as union types) |
| `deprecated` flag | ✓ |

*\*YAML support requires the `js-yaml` package to be installed in your project.*