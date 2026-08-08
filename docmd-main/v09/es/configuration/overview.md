---
title: "Configuración general"
description: "Domine docmd.config.json para gestionar la marca, metadatos del sitio, enrutamiento, zonas de diseño y compiladores en docmd."
---

El archivo `docmd.config.json` sirve como manifiesto central de configuración para su espacio de trabajo de documentación. Gestiona la marca del sitio, las barras laterales de navegación, los parámetros de localización y las opciones del compilador del sitio estático.

## Formatos del esquema de configuración

JSON es el formato de configuración primario, lo que permite una serialización de alto rendimiento entre hilos de trabajo durante compilaciones paralelas:

```json "docmd.config.json"
{
  "title": "Mi Documentación Técnica",
  "url": "https://docs.ejemplo.com",
  "src": "docs",
  "out": "site",
  "base": "/"
}
```

Para configuraciones dinámicas que requieren variables de entorno o lógica programática, `docmd.config.ts` y `docmd.config.js` son totalmente compatibles:

::: tabs
== tab "TypeScript" icon:code-2
```typescript "docmd.config.ts"
import { UserConfig } from '@docmd/api';

const config: UserConfig = {
  title: process.env.DOCS_TITLE || 'Mi Documentación Técnica',
  src: 'docs',
  out: 'site'
};

export default config;
```
== tab "JavaScript" icon:file-code
```javascript "docmd.config.js"
module.exports = {
  title: process.env.DOCS_TITLE || 'Mi Documentación Técnica',
  src: 'docs',
  out: 'site'
};
```
:::

## Ajustes principales

Estas propiedades de nivel superior configuran las rutas base y las opciones globales del compilador:

| Propiedad | Tipo | Predeterminado | Descripción |
| :--- | :--- | :--- | :--- |
| `title` | `String` | `"Documentation"` | Título formal del sitio mostrado en los encabezados de navegación y pestañas del navegador. |
| `url` | `String` | `""` | URL canónica del sitio. Esencial para la optimización en motores de búsqueda, generación de mapas del sitio y metadatos OpenGraph. |
| `src` | `String` | `"docs"` | Directorio relativo que contiene los archivos Markdown (`.md`) de origen. |
| `out` | `String` | `"site"` | Ruta relativa donde el compilador genera el paquete estático de producción. |
| `base` | `String` | `"/"` | Prefijo de ruta URL raíz (por ejemplo, `/docs/` cuando se aloja en una subcarpeta). |
| `tmp` | `String` | `null` | Directorio temporal de caché de compilación. Por defecto es una carpeta temporal aislada del sistema. |
| `i18n` | `Object` | `null` | Parámetros multilingües. Consulte la [Guía de localización](./localisation/translated-content.md). |
| `plugins` | `Object` | `{}` | Mapa de configuración de plugins estándar y de terceros. Consulte la [Guía de plugins](../plugins/usage.md). |
| `engine` | `String` | `"js"` | Motor de procesamiento: `"js"` o `"rust"` (vista previa alpha). |

## Marca e identidad

Configure logotipos de marca y favicons de navegador en `docmd.config.json`:

```json "docmd.config.json"
{
  "logo": {
    "light": "assets/images/logo-dark.png",
    "dark": "assets/images/logo-light.png",
    "href": "/",
    "alt": "Logotipo de la Empresa",
    "height": "32px"
  },
  "favicon": "assets/favicon.ico"
}
```

## Diseño y comportamiento de la interfaz

Configure encabezados, barras laterales, ubicación de búsqueda y conmutadores de tema:

```json "docmd.config.json"
{
  "layout": {
    "spa": true,
    "header": {
      "enabled": true
    },
    "sidebar": {
      "collapsible": true,
      "defaultCollapsed": false
    },
    "optionsMenu": {
      "position": "header",
      "components": {
        "search": true,
        "themeSwitch": true
      }
    }
  }
}
```

Consulte la guía de [Diseño y zonas de la interfaz](./layout-ui.md) para conocer las opciones completas de personalización visual.

## Opciones del compilador principal

Ajuste cómo `docmd` analiza y transforma su contenido Markdown:

```json "docmd.config.json"
{
  "minify": true,
  "autoTitleFromH1": true,
  "copyCode": true,
  "pageNavigation": true,
  "markdown": {
    "breaks": true
  }
}
```

| Opción | Tipo | Predeterminado | Descripción |
| :--- | :--- | :--- | :--- |
| `minify` | `Boolean` | `true` | Minimiza recursos HTML, CSS y JS compilados para un rendimiento de carga máximo. |
| `autoTitleFromH1` | `Boolean` | `true` | Utiliza el primer encabezado `# H1` del documento como título cuando se omite el `title` en el frontmatter. |
| `copyCode` | `Boolean` | `true` | Renderiza un botón "Copiar código" en los bloques de código con resaltado de sintaxis. |
| `pageNavigation` | `Boolean` | `true` | Renderiza enlaces de navegación de página "Anterior" y "Siguiente" en la parte inferior de los artículos. |
| `markdown.breaks` | `Boolean` | `true` | Convierte saltos de línea suaves en saltos de línea. Establezca en `false` si ajusta el texto manualmente a 80 columnas. |

::: callout info "La integración con Git reemplaza a editLink" icon:git-branch
La configuración independiente de `editLink` se ha unificado en el [plugin de Git](../plugins/git.md) nativo. Muestra enlaces de edición, marcas de tiempo de confirmación y metadatos de colaboradores.
:::
