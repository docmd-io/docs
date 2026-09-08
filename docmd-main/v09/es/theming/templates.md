---
title: "Plantillas y temas"
description: "Configure plantillas de diseño y esquemas de color CSS integrados en docmd. Combine estructuras HTML, parciales EJS y paletas visuales."
---

En `docmd`, las **Plantillas** definen la estructura HTML fundamental, la disposición de la interfaz, los parciales EJS y las ranuras (slots) de componentes para su documentación.

::: callout info "Estructuras de diseño frente a esquemas de color" icon:info
* **Plantillas**: Controlan la arquitectura estructural en HTML (encabezado, barra lateral, tabla de contenidos, pie de página, anuncios, parciales EJS).
* **Esquemas de color**: Aportan temas visuales mediante CSS (`default`, `sky`, `ruby`, `retro`) que se superponen directamente sobre las plantillas.
:::

Una **plantilla** es un paquete npm que declara `capabilities: ['template']` y distribuye archivos de diseño `.ejs` y paquetes de recursos personalizados. El solucionador de `@docmd/ui` utiliza una cadena de prioridades con retroceso ordenado, asegurando que cualquier ranura no especificada recurra sin fisuras al diseño por defecto.

## Guía de inicio rápido

### 1. Instalar un paquete de plantilla

```bash
npx @docmd/core add summer
```

### 2. Habilitar la plantilla en la configuración

Defina `theme.name` en `docmd.config.json`. `docmd` detecta automáticamente si el nombre corresponde a un esquema de color integrado (`default`, `sky`, `ruby`, `retro`) o a un paquete estructural de plantilla (`summer`, etc.):

```json "docmd.config.json"
{
  "theme": {
    "name": "summer"
  }
}
```

Cada página se procesará a partir de ese momento con la estructura de `summer`. Las ranuras no especificadas recurrirán automáticamente a los parciales estándar de `@docmd/ui`.

## Esquemas de color integrados (Plantilla por defecto)

La plantilla predeterminada incluye cuatro paletas de color CSS seleccionadas que pueden activarse asignando `theme.name`:

| Esquema de color | Recomendado para | Estética visual |
| :--- | :--- | :--- |
| `default` | Documentación minimalista | Paleta neutra, limpia y ligera |
| `sky` | Documentación de producto | Estándar corporativo moderno de alto contraste |
| `ruby` | Identidad de marca | Tipografías con serifa en títulos y acentos vivos |
| `retro` | Herramientas para desarrolladores | Tipografía monoespaciada con tonos verdes fósforo |

::: callout info title:"Superposición de esquemas de color en plantillas externas" icon:info
Para aplicar un esquema de color CSS específico (`sky`, `ruby`, `retro`) sobre una plantilla estructural personalizada, defina `theme.template` junto a `theme.name`:
```json "docmd.config.json"
{
  "theme": {
    "name": "sky",
    "template": "summer"
  }
}
```
Esto genera la estructura de **summer** vestida con la paleta de color de **sky**.
:::

### 3. Anulaciones de plantilla por página

Cambie de plantilla para páginas individuales utilizando el frontmatter:

```markdown
---
title: "Historial de versiones"
template: "template-changelog"
---

# Historial de versiones
```

## Cadena de prioridades de resolución

Al compilar cada página, `docmd` evalúa las rutas de plantillas en este orden descendente:

| Prioridad | Origen | Ejemplo de sintaxis |
| :--- | :--- | :--- |
| **1** | `frontmatter.template` | `template: "template-changelog"` |
| **2** | `config.templates[patrón]` | `"blog/*": "template-blog"` |
| **3** | `config.theme.template` *(Explícito)* | `"template": "summer"` |
| **4** | `config.theme.name` *(Autopromovido)* | `"name": "summer"` |
| **5** | Retirada por defecto | Plantillas `.ejs` incluidas en `@docmd/ui` |

Los nombres `default`, `sky`, `ruby` y `retro` están reservados para los temas de color CSS. Cualquier otro valor en `theme.name` se interpreta como el nombre de un paquete de plantilla.

## Ranuras de diseño admitidas

Las plantillas pueden anular cualquiera de las 12 ranuras de interfaz:

| Ranura | Parcial por defecto | Propósito técnico |
| :--- | :--- | :--- |
| `layout` | `templates/layout.ejs` | Estructura principal del documento HTML |
| `404` | `templates/404.ejs` | Página de error no encontrado |
| `toc` | `templates/toc.ejs` | Tabla de contenidos de navegación derecha |
| `navigation` | `templates/navigation.ejs` | Árbol de navegación lateral principal |
| `footer` | `templates/partials/footer.ejs` | Pie de página del sitio |
| `menubar` | `templates/partials/menubar.ejs` | Barra superior de navegación |
| `options-menu` | `templates/partials/options-menu.ejs` | Menú de controles de búsqueda, tema y perfil |
| `project-switcher` | `templates/partials/project-switcher.ejs` | Conmutador multiproyecto para monorrepositorios |
| `version-dropdown` | `templates/partials/version-dropdown.ejs` | Selector desplegable de versiones |
| `language-switcher` | `templates/partials/language-switcher.ejs` | Selector desplegable de idioma |
| `banner` | `templates/partials/banner.ejs` | Barra global de anuncios del sitio |
| `cookie-consent` | `templates/partials/cookie-consent.ejs` | Modal de consentimiento de cookies |

::: callout alert "Aislamiento en páginas sin estilo" icon:alert-circle
Las páginas configuradas con `noStyle: true` omiten por completo las plantillas activas y se renderizan exclusivamente con `templates/no-style.ejs`.
:::

## Orden de prioridad de recursos

Cuando intervienen múltiples plantillas y estilos de usuario, el motor los ordena según su peso de prioridad:

| Peso de prioridad | Capa | Comportamiento |
| :--- | :--- | :--- |
| `0` | Núcleo base (`docmd-main.css`, `docmd-main.js`) | Estilos fundacionales |
| `5` | Paleta de tema (`docmd-theme-sky.css`, etc.) | Esquema visual de color |
| `10` | Estilos de estructura de plantilla | Reglas de disposición espacial |
| `15` | `customCss` / `customJs` del usuario | **Prioridad máxima** sobre las plantillas |
| `20` | Recursos de plugins | Estilos de búsqueda, analíticas o ampliaciones |
| `25+` | Anulaciones de plantilla especializadas | Extensiones de plantillas específicas |

Para anular las reglas por defecto de una plantilla, añada sus declaraciones en `theme.customCss` (Prioridad `15`).

## Localización de plantillas

Las plantillas reciben el código del idioma activo durante el renderizado. Las cadenas de texto localizadas se resuelven mediante el asistente `t(key)` apoyándose en los archivos `assets/i18n/<idioma>.json`.

## Recursos relacionados

- [Estilos y scripts personalizados](custom-css-js.md) — Superponga reglas CSS sobre las plantillas activas.
- [Diseño de páginas de inicio](landing-pages.md) — Personalice la página principal mediante contenedores Markdown.
- [Referencia de configuración](../configuration/overview.md) — Opciones generales del sitio.
