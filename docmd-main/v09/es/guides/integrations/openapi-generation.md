---
title: "Generación de OpenAPI"
description: "Integre esquemas REST OpenAPI y Swagger en los flujos de trabajo de docmd para el renderizado automatizado de la documentación de API."
---

Mantener manualmente la documentación de la API REST es propenso a desviaciones a medida que evolucionan los extremos del código. La automatización garantiza que su documentación siga siendo la única fuente de verdad, actualizándose automáticamente durante los pasos de compilación.

docmd proporciona un renderizado nativo para especificaciones OpenAPI / Swagger a través de `@docmd/plugin-openapi` o la generación automatizada de Markdown previa a la compilación.

## Configuración

Habilite el renderizado de OpenAPI en `docmd.config.json`:

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

## Canalización de Markdown previa a la compilación automatizada

Alternativamente, compile esquemas a Markdown antes de ejecutar `docmd build`:

```json "package.json"
{
  "scripts": {
    "docs:generate-api": "npx widdershins --search false openapi.yaml -o docs/api/reference.md",
    "docs:build": "npm run docs:generate-api && npx @docmd/core build"
  }
}
```

## Optimización de los diseños de API

Las referencias de API contienen tablas de parámetros anchas y cargas útiles de respuesta. Utilice `layout: "full"` en el frontmatter de la página para otorgar el ancho horizontal máximo:

```markdown
---
title: "Referencia de API REST"
layout: "full"
---
```

::: callout tip "Ejemplos de solicitud multilingüe" icon:code
Mejore las páginas de extremos generadas envolviendo fragmentos de código multilingües dentro de [Contenedores de pestañas](../../content/containers/tabs.md) para ejemplos de solicitudes cURL, JavaScript, Python y Go.
:::