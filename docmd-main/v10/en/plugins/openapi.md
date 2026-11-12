---
title: "OpenAPI Plugin"
description: "Static API reference documentation rendered directly from OpenAPI 3.x specifications at build-time."
---

The `@docmd/plugin-openapi` plugin converts OpenAPI 3.x specification files (JSON or YAML) into structured, searchable API reference pages. Following Docmd's zero-JS runtime philosophy, every endpoint, parameter table, and schema model is compiled into static HTML during build processing.

## Configuration Options

Configure global OpenAPI rendering parameters in `docmd.config.json`:

| Option | Type | Default | Technical Description |
| :--- | :--- | :--- | :--- |
| `info` | `boolean` | `true` | Display API title, version, and description from the specification `info` block. |
| `download` | `boolean` | `false` | Add a direct download link for the raw JSON/YAML specification file. |
| `summaryOnly` | `boolean` | `false` | Render high-level method and path summaries without full parameter schemas. |
| `allowRawHtml` | `boolean` | `false` | Permit unescaped raw HTML within specification description strings. |

### Global Configuration Example

```json "docmd.config.json"
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

## Usage & Syntax

Embed OpenAPI specs using fenced code blocks tagged with `openapi`. Specify relative file paths originating from your documentation source root:

````markdown
```openapi
assets/openapi.json
```
````

### Live Rendered Output

Below is an interactive live rendering of `assets/docmd-api.json`:

```openapi
assets/docmd-api.json
```

### Specification Output

The plugin parses and renders:

* **HTTP Method Badges**: Colour-coded badges (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`).
* **Endpoint Paths**: Parameterised path strings.
* **Parameter Tables**: Name, position (`path`, `query`, `header`, `cookie`), data type, requirement flag, and descriptions.
* **Request & Response Models**: Structured schema tables containing field types, formats, constraints, and default values.
* **Examples & Payloads**: Multi-format request body and response payload examples (`application/json`, `application/xml`, etc.).
* **Contained Schema Scrolling**: Deeply nested schema models scroll cleanly within their `.oa-table-wrap` container without causing horizontal viewport blowouts.
* **Deprecation Banners**: Inline warnings for endpoints flagged with `deprecated: true`.

::: callout tip "Zero-JS Build-Time Execution" icon:zap
All OpenAPI specs are parsed into static HTML during compilation. No heavy client-side JavaScript libraries are loaded at runtime, keeping page load times minimal and ensuring full search indexability.
:::

## Technical Compatibility

| Specification Feature | Compatibility Level |
| :--- | :--- |
| OpenAPI 3.x (JSON) | Native support |
| OpenAPI 3.x (YAML) | Supported (`js-yaml` dependency) |
| Swagger 2.0 | Legacy (Convert to OpenAPI 3.x prior to build) |
| Request & Response Examples | Full support (single & multi-example maps) |
| Internal `$ref` Schemas | Full resolution |
| Polymorphic `oneOf` / `anyOf` | Rendered as union types |
| Deprecated Operations | Supported inline |