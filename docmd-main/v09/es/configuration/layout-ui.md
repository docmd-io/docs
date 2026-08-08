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

### Widgets de copia de contexto

La región del encabezado incluye utilidades de copia contextual: copia en un solo clic del código fuente Markdown no procesado y avisos de contexto de IA estructurados (que contienen la URL de la página, título, descripción y prosa):

```json "docmd.config.json"
{
  "theme": {
    "copyWidgets": {
      "enabled": true,
      "raw": true,
      "context": true
    }
  }
}
```

- `enabled`: Establezca en `false` para desactivar la barra de widgets de copia por completo.
- `raw`: Establezca en `false` para ocultar el botón "Copiar Markdown".
- `context`: Establezca en `false` para ocultar el botón "Copiar contexto".

### Menú de opciones (Utilidades)

El `optionsMenu` agrupa utilidades globales como **Búsqueda**, **Conmutador de modo de tema** y **Enlaces de patrocinio**:

```json "docmd.config.json"
{
  "layout": {
    "optionsMenu": {
      "position": "header", 
      "components": {
        "search": true,      
        "themeSwitch": true, 
        "sponsor": "https://github.com/sponsors/mgks"
      }
    }
  }
}
```

::: callout info "Respaldo de reubicación automática" icon:sparkles
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