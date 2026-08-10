---
title: "Páginas sin estilo (No-Style)"
description: "Cree páginas de inicio personalizadas y diseños únicos omitiendo el diseño de documentación predeterminado en docmd."
---

`docmd` le permite omitir el diseño de la documentación estándar (Barra lateral, Encabezado, Pie de página) en función de cada página. Esto es ideal para crear páginas de inicio de gran impacto o paneles de control personalizados mientras conserva el acceso al analizador de contenedores del motor.

## Habilitación del modo No-Style

Para desactivar los componentes globales de la interfaz, establezca `noStyle: true` en el frontmatter de su página:

```yaml
---
title: "Exhibición del producto"
noStyle: true
components:
  meta: true      # Conserva las etiquetas de metadatos SEO y OpenGraph
  favicon: true   # Conserva el favicon del sitio
  css: true       # Inyecta docmd-main.css para tipografía y sistemas de rejilla
---

<!-- HTML personalizado o contenedores Markdown especializados -->
<div class="hero">
  <h1>Motor de documentación de última generación</h1>
  <p>Cero configuración. Ejecución isomórfica. Optimizado para IA.</p>
</div>

::: callout info title:"Soporte de anidamiento infinito" icon:info
Incluso con `noStyle: true`, todos los contenedores estándar de docmd (como `::: card`, `::: tabs` y `::: hero`) son totalmente compatibles y se pueden componer libremente.
::: /callout
```

## Controles de inclusión de componentes

Cuando `noStyle: true` está activo, comienza con un lienzo en blanco. Vuelva a habilitar selectivamente los componentes principales del sistema según sea necesario:

| Componente | Descripción técnica |
| :--- | :--- |
| `meta` | Inyecta `<title>`, etiquetas meta SEO y metadatos estructurados de OpenGraph. |
| `favicon` | Inyecta el enlace del favicon de todo el proyecto. |
| `css` | Inyecta `docmd-main.css`. Recomendado para utilidades de rejilla principales y reglas de tipografía. |
| `menubar` | Inyecta la barra de menú de navegación superior. |
| `theme` | Inyecta las variables CSS del tema activo y las anulaciones de apariencia. |
| `scripts` | Inyecta scripts de cliente de contenedor interactivo (requiere `mainScripts: true`). |
| `spa` | Habilita la navegación del enrutador de aplicación de una sola página (requiere `scripts: true`). |

## Páginas de inicio componibles

La principal ventaja de `noStyle` es usar los contenedores de `docmd` como bloques de construcción en un lienzo en blanco. En lugar de escribir HTML detallado sin procesar, puede crear diseños de páginas de inicio utilizando Markdown puro:

```yaml
---
title: "Bienvenido"
noStyle: true
components:
  meta: true
  css: true
  menubar: true    # Conserva la barra de navegación del sitio
  scripts: true    # Habilita scripts de contenedor interactivo
  mainScripts: true
---

::: hero layout:split glow:true
# Cree documentación que deslumbre.
El motor de documentación de cero configuración para equipos de ingeniería modernos.

::: button title:"Primeros pasos" url:"../getting-started/quick-start.md" color:blue
::: button title:"Repositorio de GitHub" url:"external:https://github.com/docmd-io/docmd" color:gray

== side
::: embed url:"https://www.youtube.com/watch?v=dQw4w9WgXcQ"
::: /hero
:::

::: grids
  ::: card title:"Cero configuración"
  Cree contenido en Markdown sin complejos scripts de compilación de frontend.
  ::: /card
  ::: card title:"Optimizado para IA"
  Análisis sintáctico consciente de la estructura para el ecosistema LLM.
  ::: /card
  ::: card title:"Rendimiento isomórfico"
  Compilación estática con navegación rápida por SPA.
  ::: /card
::: /grids
```

::: callout tip "Diseños generados por IA" icon:sparkles
Debido a que las páginas `noStyle` aceptan HTML junto con contenedores de `docmd`, son ideales para la **creación de prototipos de interfaz impulsada por IA**. Solicite a un agente de IA: *"Diseñe una sección de inicio moderna utilizando clases de utilidad y contenedores de botones de docmd."*
:::

## Reemplazo de cadenas (i18n para páginas noStyle)

Cuando su sitio tiene [i18n configurado](../configuration/localisation/index.md), las páginas de documentación estándar reciben traducciones en el servidor automáticamente. Sin embargo, las páginas `noStyle` a menudo usan elementos HTML personalizados. `docmd` proporciona **reemplazo de cadenas** para traducir HTML a través de atributos `data-i18n` y mapas de traducción JSON.

::: callout info "Alcance del reemplazo de cadenas" icon:info
El reemplazo de cadenas coincide con los elementos con atributos `data-i18n` e intercambia su contenido de texto. El contenido Markdown estándar se compila en etiquetas `<p>`, `<h2>`, `<li>` simples sin estos atributos. Para contenido Markdown estándar, utilice el [Modo directorio](../configuration/localisation/translated-content.md).
:::

### Modos operativos

El reemplazo de cadenas admite dos modelos de ejecución:

- **En el servidor (recomendado)**: Con `stringMode: true` en su configuración i18n, `docmd` resuelve los atributos `data-i18n` **en el momento de la compilación**. Genera HTML estático totalmente traducido en directorios `/{locale}/` para motores de búsqueda.
- **En el cliente**: El script `docmd-i18n-strings.js` carga mapas de traducción en tiempo de ejecución a través de XHR. Esto habilita el cambio de idioma instantáneo en el lugar sin recargas completas de la página.

Ambos modos comparten una notación de atributos `data-i18n` y esquemas de traducción JSON idénticos.

1. Almacene mapas de traducción JSON dentro de `assets/i18n/` (un archivo por idioma):

```text
assets/
  i18n/
    en.json
    hi.json
    zh.json
```

2. Formatee cada archivo JSON como un mapa plano de clave-valor:

```json "assets/i18n/en.json"
{
  "hero.title": "Markdown → Documentación en producción",
  "hero.subtitle": "El motor de documentación de cero configuración.",
  "nav.docs": "Documentación",
  "nav.editor": "Editor en vivo",
  "cta.getStarted": "Primeros pasos",
  "cta.install": "npm i @docmd/core"
}
```

3. Adjunte atributos `data-i18n` a sus elementos HTML:

```html
<h1 data-i18n="hero.title">Markdown → Documentación en producción</h1>
<p data-i18n="hero.subtitle">El motor de documentación de cero configuración.</p>
<a data-i18n="nav.docs" href="/docs">Documentación</a>
```

### Traducción de atributos

Para traducir atributos como `placeholder`, `title` o `aria-label`, utilice la notación `data-i18n-{attr}`:

```html
<input data-i18n-placeholder="search.placeholder" placeholder="Buscar...">
<button data-i18n-aria-label="nav.menuLabel" aria-label="Abrir menú">☰</button>
<a data-i18n-title="nav.tooltip" title="Ir a docs">Docs</a>
```

### Traducción de contenido HTML sin procesar

Para claves que contienen marcado HTML, utilice `data-i18n-html` en lugar de `data-i18n`:

```html
<p data-i18n-html="hero.desc">HTML estático para SEO. <br>Enrutador SPA para velocidad.</p>
```

### API global de i18n

El módulo de cadenas i18n expone una API global en `window.DOCMD_I18N_STRINGS`:

```javascript
// Cambiar idioma activo
DOCMD_I18N_STRINGS.switchLocale("de");

// Acceder a la cadena del idioma activo
console.log(DOCMD_I18N_STRINGS.locale); 

// Obtener el array de idiomas compatibles
console.log(DOCMD_I18N_STRINGS.locales);
```

Cree un selector de idiomas personalizado utilizando esta API:

```html
<select onchange="DOCMD_I18N_STRINGS.switchLocale(this.value)">
  <option value="en">English</option>
  <option value="de">Deutsch</option>
  <option value="zh">中文</option>
</select>
```

### Ciclo de vida de eventos

Escuche el evento `docmd:i18n-applied` para ejecutar lógica personalizada después de que se complete la sustitución de cadenas:

```javascript
document.addEventListener("docmd:i18n-applied", function(e) {
  console.log("Idioma:", e.detail.locale);
  console.log("Cadenas:", e.detail.strings);
});
```

::: callout info title:"Detección automática de idioma" icon:info
El script del cliente detecta los idiomas activos a partir del prefijo de la ruta URL. Para el idioma predeterminado, inspecciona `localStorage` en busca de preferencias guardadas. La función `switchLocale()` gestiona la navegación de URL automáticamente.
::: /callout

### Configuración del modo en el lugar

Para aplicaciones de una sola página o portales de inicio, establezca `inPlace: true` en su configuración i18n para intercambiar valores de cadenas sin navegación de URL:

```json "docmd.config.json"
{
  "i18n": {
    "default": "en",
    "locales": [
      { "id": "en", "label": "English" },
      { "id": "de", "label": "Deutsch" },
      { "id": "zh", "label": "中文" }
    ],
    "inPlace": true
  }
}
```

Con `inPlace: true`, llamar a `switchLocale()` obtiene el mapa de traducción para el idioma solicitado y reemplaza todos los valores `data-i18n` en el lugar sin activar recargas de página.