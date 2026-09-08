---
title: "Personalización de favicons y metadatos"
description: "Configure favicons, tarjetas OpenGraph y metadatos de Twitter en docmd para redes sociales y motores de búsqueda."
---

Los favicons y metadatos OpenGraph garantizan que su documentación ofrezca una apariencia profesional al guardarse en favoritos o compartirse en redes sociales y canales de comunicación.

## Configuración del favicon

Ubique su archivo de favicon (por ejemplo, `favicon.svg` o `favicon.ico`) en el directorio `assets/` e indíquelo mediante la propiedad `favicon` en `docmd.config.json`:

```json "docmd.config.json"
{
  "title": "Documentación central",
  "favicon": "/assets/favicon.svg"
}
```

`docmd` resolverá las rutas y gestionará automáticamente los encabezados de invalidación de caché durante la compilación.

## Metadatos globales para SEO y redes sociales

Configure el [Plugin de SEO](../plugins/seo.md) integrado en `docmd.config.json` para generar etiquetas sociales de manera global:

```json "docmd.config.json"
{
  "url": "https://docs.docmd.io",
  "plugins": {
    "seo": {
      "defaultDescription": "Documentación técnica para docmd.",
      "openGraph": {
        "defaultImage": "/assets/og-banner.png"
      },
      "twitter": {
        "siteUsername": "@docmd_io",
        "cardType": "summary_large_image"
      }
    }
  }
}
```

## Anulaciones de metadatos por página

Personalice los valores de SEO para documentos concretos a través de la propiedad `seo` en el [Frontmatter de página](../content/frontmatter.md):

```yaml
---
title: "Anuncio de lanzamiento principal"
description: "Resumen de las nuevas funcionalidades introducidas en docmd."
seo:
  image: "/assets/v09-banner.png"
  keywords: ["lanzamiento", "v09", "documentacion", "rendimiento"]
---
```

::: callout tip "Favicons multirresolución" icon:lightbulb
La propiedad `favicon` de nivel superior satisface las necesidades estándar del navegador. Si requiere juegos de iconos para distintos dispositivos (como Apple Touch Icons o manifiestos para Android), inserte las etiquetas `<link>` pertinentes mediante plugins personalizados o ranuras de encabezado de plantillas.
:::
