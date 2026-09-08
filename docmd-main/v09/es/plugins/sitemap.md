---
title: "Plugin de sitemap"
description: "Genere automáticamente archivos sitemap.xml conformes al estándar para sitios de documentación con múltiples versiones en docmd."
---

El plugin `@docmd/plugin-sitemap` genera un archivo `sitemap.xml` estándar en la raíz del directorio de salida durante la compilación. Facilita que los rastreadores y motores de búsqueda descubran y recorran eficientemente todas las páginas y versiones de su documentación.

## Opciones de configuración

Configure los parámetros del mapa del sitio en `docmd.config.json`:

| Opción | Tipo | Por defecto | Descripción técnica |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | Habilita o deshabilita la generación del sitemap. |
| `defaultChangefreq` | `string` | `'weekly'` | Sugerencia de frecuencia de rastreo para los motores de búsqueda. |
| `defaultPriority` | `number` | `0.8` | Ponderación de prioridad para páginas estándar (`0.0` a `1.0`). |
| `rootPriority` | `number` | `1.0` | Ponderación de prioridad para la página de inicio del sitio (`index.md`). |

### Ejemplo de configuración global

```json "docmd.config.json"
{
  "url": "https://docs.docmd.io",
  "plugins": {
    "sitemap": {
      "defaultChangefreq": "weekly",
      "defaultPriority": 0.8
    }
  }
}
```

## Capacidades principales

* **Mapeo de dominio canónico**: Resuelve rutas relativas a URLs absolutas a partir de `config.url`.
* **Indexación de rutas por versión**: Indexa automáticamente páginas de todas las versiones configuradas (`/v09/`, `/v08/`, etc.).
* **Exclusión individual**: Omite páginas que contengan `sitemap: false` o `noindex: true` en su frontmatter.
* **Cumplimiento de estándares**: Produce XML válido conforme a la especificación oficial de sitemaps.org.

## Controles a nivel de página

Anule los parámetros del sitemap para documentos específicos mediante el [Frontmatter de página](../content/frontmatter.md):

```yaml
---
title: "Guía de migración heredada"
priority: 0.3          # Menor prioridad de rastreo para contenido antiguo
changefreq: "monthly"   # Sugerencia de frecuencia para rastreadores
sitemap: false         # Excluye la página de sitemap.xml
---
```

::: callout tip "Verificación del sitemap" icon:check-circle
Tras la compilación, encontrará el archivo en `site/sitemap.xml`. Puede enviar esta URL directamente a las consolas de motores de búsqueda para acelerar el descubrimiento de su contenido.
:::
