---
title: "Creación de plantillas"
description: "Cree un paquete de plantilla para docmd: estructura de directorios, descriptor, contexto EJS, prioridades de recursos y referencia de API."
---

# Creación de plantillas

::: callout info "Uso de plantillas" icon:palette
**Para creadores de plantillas.** Si lo que desea es *usar* una plantilla en su documentación, consulte [Plantillas](../theming/templates.md).
:::

Una plantilla es un paquete npm regular que declara `capabilities: ['template']` y proporciona una matriz `templates[]` con anulaciones de archivos `.ejs`. El solucionador de plantillas en `@docmd/ui` gestiona la resolución página por página, respeta el frontmatter y la configuración global, y recurre a la plantilla por defecto ante cualquier imprevisto.

## Estructura del paquete

```
@docmd/template-summer/
├── package.json
├── index.js                # Punto de entrada — exporta templates[] y templateAssets[]
├── templates/
│   ├── layout.ejs
│   ├── partials/
│   │   ├── menubar.ejs     # Solo los parciales que necesite anular
│   │   └── footer.ejs
└── assets/
    ├── css/
    │   └── summer.css      # Se superpone sobre docmd-main.css sin reemplazarlo.
    └── js/
        └── summer.js
```

## `package.json`

```json "package.json"
{
  "name": "@docmd/template-summer",
  "version": "0.1.0",
  "type": "module",
  "main": "index.js",
  "peerDependencies": {
    "@docmd/core": ">=0.8.7"
  },
  "docmd": {
    "kind": "template",
    "displayName": "Summer",
    "description": "Diseño luminoso inspirado en el verano para el sistema de plantillas 0.8.7+."
  }
}
```

## Exportaciones ESM — la condición `default`

El archivo `package.json` de su plantilla **debe** incluir una condición `"default"` en `exports["."]`, junto con la condición `import`:

```json
"exports": {
  ".": {
    "types": "./dist/index.d.ts",
    "import": "./dist/index.js",
    "default": "./dist/index.js"
  }
}
```

Si declara únicamente `import`, el instalador automático fallará en su primer intento con `ERR_PACKAGE_PATH_NOT_EXPORTED`. Consulte la [guía de desarrollo de plugins](building-plugins.md#exportaciones-esm--la-condicion-default) para conocer los detalles.

## `index.js`

```js "index.js"
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  plugin: {
    name: 'template-summer',
    version: '0.1.0',
    capabilities: ['template'],
  },

  templates: [
    // Solo las ranuras que realmente desee anular.
    { type: 'layout',   templatePath: path.join(__dirname, 'templates/layout.ejs') },
    { type: 'menubar',  templatePath: path.join(__dirname, 'templates/partials/menubar.ejs') },
    { type: 'footer',   templatePath: path.join(__dirname, 'templates/partials/footer.ejs') },
  ],

  templateAssets: [
    {
      type: 'css',
      path: path.join(__dirname, 'assets/css/summer.css'),
      priority: 10,           // mayor que theme (5), menor que customCss (15)
      position: 'head',
    },
    {
      type: 'js',
      path: path.join(__dirname, 'assets/js/summer.js'),
      priority: 10,
      position: 'body',
    },
  ],
};
```

## Contexto de `layout.ejs`

Las plantillas reciben el mismo contexto EJS que el diseño por defecto. Las variables locales más frecuentes son:

| Variable local | Descripción |
|---|---|
| `config` | La configuración normalizada del sitio. |
| `frontmatter` | Frontmatter específico de la página. |
| `relativePathToRoot` | Ej., `./` o `../` — útil para construir URLs relativas. |
| `renderIcon(name, opts)` | Renderiza un icono de Lucide. |
| `t(key, params?)` | Función de traducción. |
| `buildRelativeUrl(url)` | Resuelve una URL relativa a la página actual. |
| `pageTitle`, `siteTitle`, `appearance` | Cadenas y estados habituales. |
| `_template` | Metadatos de la plantilla resuelta (nuevo en 0.8.7). |

Puede incluir parciales por defecto de `@docmd/ui` leyéndolos durante la compilación. El patrón más simple es conservar una copia de los parciales que reutilice; las plantillas no heredan rutas parciales automáticamente.

## Cadena de prioridades de recursos (Assets)

Los estilos CSS y scripts JS se cargan en este orden estricto (valores menores cargan primero, valores mayores prevalecen en empates de cascada):

| Prioridad | Capa | Notas |
|---|---|---|
| 0  | Base (`docmd-main.css`, `docmd-main.js`) | Siempre presentes. |
| 5  | Capa de color de tema (`docmd-theme-sky.css`, etc.) | Proviene de `theme.name`. Se omite si el nombre se convirtió en plantilla. |
| 10 | **Estructura de la plantilla** (por defecto) | CSS de su plantilla — valor por defecto si omite `priority`. |
| 15 | `customCss` / `customJs` del usuario | Siempre prevalecen sobre la plantilla. |
| 20 | CSS/JS de plugins | lightbox, búsqueda, analíticas, etc. |
| 25+ | Mayor prioridad de plantilla | **Utilizar solo cuando deba prevalecer sobre plugins.** La plantilla Summer oficial declara `priority: 25` para cargar tras el CSS de plugins. |

::: callout warning title:"No utilice !important"
Las plantillas deben escribir reglas CSS que puedan ser anuladas por `customCss` con prioridad 15. Usar `!important` rompe el contrato y fuerza al usuario a usar `!important` en sus propias hojas de estilo.
::: /callout

## Autopromoción de `theme.name`

La promoción de `theme.name` a `theme.template` se realiza dentro de `normalizeConfig()`:
- Cuando `theme.name` no es un valor reservado y `theme.template` no está definido, la configuración se reescribe a `theme.template = theme.name` y `theme._noCssOverlay = true`.
- En el momento de la resolución, el solucionador solo interactúa con `theme.template`.

## Localización de plantillas

La configuración `i18n` sigue siendo válida: el idioma activo se transmite a su plantilla como una variable local ordinaria y las cadenas se consultan con el asistente `t(key)`.

## Referencia de API

### `resolveTemplate(ctx)` desde `@docmd/ui`

```ts
import { resolveTemplate } from '@docmd/ui';

const resolved = resolveTemplate({
  type: 'layout',                       // cualquier TemplateSlot
  pagePath: '/guide/intro.html',
  frontmatter: page.frontmatter,        // puede incluir `template: "..."`
  config,                                 // configuración normalizada
  localeId: 'es',                         // opcional
  versionId: '0.8',                       // opcional
});
```

### Tipos desde `@docmd/api`

```ts
import type {
  TemplateSlot,         // unión de 12 nombres de ranuras
  TemplateHook,         // { type, templatePath, priority?, pages?, exclude? }
  TemplateAssetHook,    // { type: 'css'|'js', path, priority?, position? }
  ResolvedTemplate,
  TemplateResolutionContext,
  Capability,           // incluye 'template'
} from '@docmd/api';
```

## Solución de problemas

### "La plantilla declaró la ranura X pero el archivo no existe"

El archivo `index.js` especificó una ruta `templatePath` inexistente en disco. Compruebe que la ruta sea absoluta (mediante `fileURLToPath(import.meta.url)`) y que el archivo esté incluido en el campo `files` de su paquete publicado.

### El CSS de mi plantilla es anulado por otras reglas

La prioridad CSS es definitiva: el archivo `customCss` del usuario (prioridad 15) siempre gana. Documente las clases públicas para facilitar la personalización.
