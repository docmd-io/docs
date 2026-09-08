---
title: "Plugin de SEO"
description: "Optimice su sitio de documentación para motores de búsqueda, tarjetas para redes sociales y políticas de rastreo de IA."
---

El plugin `@docmd/plugin-seo` genera metadatos semánticos y etiquetas de vista previa social para cada página de su documentación. Garantiza una indexación eficaz por parte de motores de búsqueda, una adecuada presentación en plataformas sociales y el cumplimiento de directivas para rastreadores de IA.

## Opciones de configuración

Configure los valores predeterminados de SEO en `docmd.config.json`. Las opciones definidas en el frontmatter de cada página prevalecen sobre estos valores globales.

| Opción | Tipo | Por defecto | Descripción técnica |
| :--- | :--- | :--- | :--- |
| `defaultDescription` | `string` | `null` | Descripción alternativa para páginas que carezcan de descripción explícita. |
| `aiBots` | `boolean` | `true` | Permite (`true`) o bloquea (`false`) rastreadores de entrenamiento de IA (GPTBot, ChatGPT-User, Google-Extended, CCBot). |
| `openGraph` | `object` | `null` | Metadatos de Open Graph para redes sociales (Facebook, LinkedIn). |
| `twitter` | `object` | `null` | Configuración de tarjetas de Twitter (X), incluyendo usuario y tipo de tarjeta. |

### Ejemplo de configuración global

```json "docmd.config.json"
{
  "plugins": {
    "seo": {
      "defaultDescription": "Documentación técnica integral sobre la plataforma docmd.",
      "aiBots": false,
      "twitter": {
        "siteUsername": "@docmd_io",
        "cardType": "summary_large_image"
      }
    }
  }
}
```

## Capacidades principales

* **Generación automática de `robots.txt`**: Crea un archivo `robots.txt` en la raíz de salida incluyendo ubicaciones de mapas del sitio y directivas de rastreadores de IA.
* **Extractos inteligentes**: Extrae automáticamente los primeros 150 caracteres del texto si no se ha definido una descripción manual.
* **Control de rastreadores de IA**: Establezca `aiBots: false` para impedir el scraping de entrenamiento de IA sin afectar la indexación de motores de búsqueda habituales.
* **Emisión de URL canónica**: Inyecta elementos `<link rel="canonical">` para prevenir problemas de contenido duplicado.
* **Tarjetas sociales**: Genera etiquetas de Open Graph y Twitter Cards.
* **Datos estructurados (JSON-LD)**: Incluye bloques Schema JSON-LD de tipo Article para fragmentos enriquecidos en los resultados de búsqueda.

## Orden de resolución de `robots.txt`

El plugin determina qué archivo `robots.txt` utilizar siguiendo este orden:

1. **Raíz del sitio compilado** (`site/robots.txt`): Si ya existe, se preserva su contenido intacto.
2. **Carpeta de recursos fuente** (`assets/robots.txt`): Si existe en su directorio de recursos, se copia automáticamente a la salida (`site/robots.txt`).
3. **Generación automática**: Si no se detecta ningún archivo personalizado, `docmd` lo genera dinámicamente según la configuración del plugin.

Estructura de archivos recomendada:

```text
mi-documentacion/
├── assets/
│   └── robots.txt    ← Redacte sus reglas personalizadas aquí
├── index.md
└── docmd.config.json
```

## Anulaciones a nivel de página

Anule los valores globales de SEO para páginas específicas usando el [Frontmatter de página](../content/frontmatter.md):

```yaml
---
title: "Arquitectura avanzada de motores"
noindex: true # Oculta la página de motores de búsqueda
seo:
  keywords: ["docmd", "arquitectura", "motor"]
  aiBots: true # Permite rastreadores de IA en esta página
  ldJson: true # Inyecta esquema Article
---
```

::: callout tip "Configuración de la URL base" icon:link
Defina la propiedad `url` en `docmd.config.json` (por ejemplo, `https://docs.docmd.io`) para habilitar enlaces canónicos absolutos y rutas completas para las imágenes de tarjetas sociales.
:::
