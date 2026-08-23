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

### Salida Renderizada en Vivo

A continuación se muestra una representación interactiva en vivo de `assets/docmd-api.json`:

```openapi
assets/docmd-api.json
```

### Salida de la Especificación

El plugin analiza y renderiza:

* **Insignias de Método HTTP**: Insignias codificadas por colores (`GET`, `POST`, `PUT`, `PATCH`, `DELETE`).
* **Rutas de Endpoints**: Cadenas de rutas parametrizadas.
* **Tablas de Parámetros**: Nombre, posición (`path`, `query`, `header`, `cookie`), tipo de datos, indicador de obligatoriedad y descripciones.
* **Modelos de Petición y Respuesta**: Tablas de esquemas estructuradas con tipos de campo, formatos, restricciones y valores por defecto.
* **Ejemplos y Cargas Útiles**: Ejemplos multiformato para cuerpos de solicitud y respuesta (`application/json`, `application/xml`, etc.).
* **Desplazamiento Aislado de Esquemas**: Los modelos de esquemas anidados se desplazan limpiamente dentro de su contenedor `.oa-table-wrap` sin desbordar la página horizontalmente.
* **Banners de Obsolescencia**: Advertencias en línea para endpoints marcados con `deprecated: true`.

::: callout tip "Ejecución en Tiempo de Compilación Zero-JS" icon:zap
Todas las especificaciones OpenAPI se analizan a HTML estático durante la compilación. No se cargan bibliotecas de JavaScript pesadas en el cliente en tiempo de ejecución, manteniendo los tiempos de carga mínimos e indexables.
:::

## Compatibilidad Técnica

| Característica de Especificación | Nivel de Compatibilidad |
| :--- | :--- |
| OpenAPI 3.x (JSON) | Soporte nativo |
| OpenAPI 3.x (YAML) | Soportado (dependencia `js-yaml`) |
| Swagger 2.0 | Heredado (Convertir a OpenAPI 3.x antes de compilar) |
| Ejemplos de Petición y Respuesta | Soporte completo (mapas de ejemplo único y múltiple) |
| Esquemas `$ref` Internos | Resolución completa |
| Polimorfismo `oneOf` / `anyOf` | Renderizado como tipos de unión |
| Operaciones Obsoletas | Soportado en línea |