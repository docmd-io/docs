---
title: "Diseño y zonas de la interfaz"
description: "Configure regiones de diseño de documentación, widgets de encabezado, árboles de barra lateral y parámetros de pie de página en docmd.config.json."
---

Una página estándar de `docmd` consta de seis zonas funcionales principales en la interfaz de usuario:

1. **Barra de menú**: Barra de navegación superior de ancho completo para enlaces globales entre proyectos.
2. **Encabezado**: Encabezado secundario persistente que muestra el título de la página, las migas de pan y el menú de opciones.
3. **Barra lateral**: Árbol de navegación principal para la estructura de contenido del sitio.
4. **Área de contenido**: Container central de renderizado Markdown con migas de pan automatizadas.
5. **Tabla de contenidos (TOC)**: Navegación de encabezados a la derecha para artículos activos.
6. **Pie de página**: Región inferior que muestra avisos de derechos de autor, atribución de marca y columnas de enlaces de pie de página.

## Opciones de diseño de componentes

Configure las zonas de la interfaz en la sección `layout` de su manifiesto `docmd.config.json`.

### La zona de la barra de menú

La barra de menú proporciona navegación global por el sitio, admitiendo logotipos, enlaces y menús desplegables anidados:

- **Ubicación**: Fijada en la parte `top` absoluta de la ventana gráfica o posicionada dentro del `header`.
- **Documentación**: Consulte la [Configuración de la barra de menú](./menubar.md) para conocer las propiedades completas y opciones de personalización.

### La zona del encabezado de página

El encabezado muestra los títulos de las páginas activas, las migas de pan y los menús de opciones:

- **Interruptor global**: Habilite o deshabilite el encabezado globalmente a través de `layout.header.enabled`. Active o desactive las migas de pan a través de `layout.breadcrumbs`.
- **Anulación por página**: Agregue `hideTitle: true` al [Frontmatter](../content/frontmatter.md) de un documento para ocultar el título de su encabezado localmente.

### Formato de título y delimitadores

Configure cómo se componen los títulos de los documentos y del sitio en sus plantillas de documentación:

```json "docmd.config.json"
{
  "layout": {
    "titleSeparator": "-",
    "titleAppend": true
  }
}
```

- `titleSeparator`: El delimitador entre el título de la página y el título del sitio en el `<title>` de la pestaña del navegador y en las vistas previas de tarjetas sociales. El valor predeterminado es un guion medio estándar (`"-"`). El compilador formatea automáticamente los separadores no vacíos con espacios individuales alrededor (`" - "`), por lo que puede proporcionar caracteres simples como `"-"` o `"|"`.
- `titleAppend`: Determina si el título del sitio se añade a los títulos de las páginas (`true` por defecto). Establezca en `false` para mostrar solo el título de la página. También se puede anular por página en el frontmatter (`titleAppend: false`).

### Widgets de copia de contexto y de impresión

Directamente encima del contenido del artículo, `docmd` proporciona utilidades de lectura contextual: copia con un solo clic del código fuente Markdown no procesado, indicaciones de contexto de IA estructuradas (que contienen la URL de la página, título, descripción y prosa) e impresión de páginas:

```json "docmd.config.json"
{
  "layout": {
    "copyWidgets": {
      "enabled": true,
      "raw": true,
      "context": true
    },
    "print": false
  }
}
```

- `copyWidgets.enabled`: Establezca en `false` para desactivar la barra de widgets de copia por completo.
- `copyWidgets.raw`: Establezca en `false` para ocultar el botón "Copiar Markdown".
- `copyWidgets.context`: Establezca en `false` para ocultar el botón "Copiar contexto".
- `print`: Deshabilitado (`false`) por defecto. Cuando se habilita (`true`), muestra un botón de impresión en la fila de acciones junto a los widgets de copia (y en la barra de herramientas de Modo de enfoque). El botón de impresión nunca se coloca en el encabezado o la barra de menús.

### Modo de Enfoque (Lectura sin distracciones)

El Modo de Enfoque colapsa las barras laterales, los encabezados, la tabla de contenidos y los elementos flotantes, presentando un lienzo limpio optimizado para leer documentación técnica:

```json "docmd.config.json"
{
  "layout": {
    "focusMode": false
  }
}
```

- **Estado predeterminado**: Deshabilitado (`false`) por defecto.
- **Cuando está habilitado**: Muestra un conmutador de enfoque en el menú de opciones y habilita el atajo <kbd>Alt</kbd>+<kbd>F</kbd>.
- **Controles en el Modo de Enfoque**: Solo tres controles esenciales aparecen en la esquina superior derecha: Imprimir (si `layout.print` está habilitado), conmutador de tema claro/oscuro y Salir del Modo de Enfoque (<kbd>Esc</kbd> o <kbd>Alt</kbd>+<kbd>F</kbd>).

::: callout info title:"Compatibilidad con versiones anteriores" icon:sparkles
Para proyectos existentes, docmd resuelve automáticamente las configuraciones anteriores, como `print`, `focusMode`, `customJs` a nivel raíz y `theme.copyWidgets`, con total compatibilidad hacia atrás.
:::

### Menú de opciones (Utilidades)

El `optionsMenu` agrupa utilidades globales como **Búsqueda**, **Conmutador de modo de tema**, **Modo de Enfoque** y **Enlaces de patrocinio**:

```json "docmd.config.json"
{
  "layout": {
    "optionsMenu": {
      "position": "header", 
      "components": {
        "search": true,      
        "themeSwitch": true,
        "focusMode": true,
        "sponsor": "https://github.com/sponsors/mgks"
      }
    }
  }
}
```

::: callout info title:"Respaldo de reubicación automática" icon:sparkles
Si `optionsMenu` se asigna a un contenedor que está desactivado, el compilador mueve automáticamente el menú de opciones a `sidebar-top` para preservar la accesibilidad.
:::

### Barra lateral y navegación

La barra lateral sirve como la jerarquía de navegación principal:

- **Comportamiento**: Admite colapso en escritorio, transiciones de estado suaves y seguimiento de rutas persistente.
- **Documentación**: Consulte la [Configuración de navegación](./navigation.md).

### Región del pie de página

`docmd` proporciona diseños de pie de página `minimal` y `complete`:

```json "docmd.config.json"
{
  "layout": {
    "footer": {
      "style": "complete", 
      "description": "Documentación creada con docmd.",
      "branding": true,
      "columns": [
        {
          "title": "Comunidad",
          "links": [
            { "text": "GitHub", "url": "https://github.com/docmd-io/docmd" }
          ]
        }
      ]
    }
  }
}
```

::: callout tip "Directrices de jerarquía visual" icon:lightbulb
Reserve la barra de menú superior para la navegación entre dominios y use la barra lateral para la estructura detallada de la documentación. Una separación clara mantiene la navegación intuitiva tanto para los usuarios como para los rastreadores web.
:::