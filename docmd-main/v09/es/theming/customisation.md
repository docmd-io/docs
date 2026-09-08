---
title: "Personalización y variables CSS"
description: "Guía de referencia de variables CSS, tokens de diseño y clases de componentes de docmd para estilos avanzados."
---

`docmd` está fundamentado en un sistema de tokens de diseño estructurado mediante variables CSS. Puede redefinir los estilos de los temas y componentes sobreescribiendo las propiedades personalizadas en `:root` dentro de una hoja de estilo propia.

## Referencia de variables CSS

| Variable CSS | Por defecto (Modo claro) | Por defecto (Modo oscuro) | Elemento de interfaz objetivo |
| :--- | :--- | :--- | :--- |
| `--bg-color` | `#ffffff` | `#0d0d0f` | Fondo principal de la página |
| `--text-color` | `#27272a` | `#d4d4d8` | Tipografía principal del cuerpo |
| `--text-heading` | `#09090b` | `#fafafa` | Títulos y encabezados (`h1`–`h6`) |
| `--link-color` | `#068ad5` | `#38bdf8` | Color de enlaces y acentos primarios |
| `--border-color` | `#e4e4e7` | `#27272a` | Líneas divisorias y bordes de tarjetas |
| `--sidebar-bg` | `#fafafa` | `#09090b` | Fondo de la barra lateral de navegación |
| `--ui-border-radius` | `6px` | `6px` | Radio de esquinas para botones, tarjetas y etiquetas |
| `--sidebar-width` | `260px` | `260px` | Ancho de la columna de navegación lateral |

## Ejemplos de personalización CSS

Para cambiar el color de acento principal del sitio en los modos claro y oscuro, añada reglas personalizadas en `assets/css/branding.css`:

```css
:root {
  --link-color: #f43f5e; /* Acento rosa (Modo claro) */
}

body[data-theme="dark"] {
  --link-color: #fb7185; /* Acento rosa (Modo oscuro) */
}
```

## Clases principales de componentes

Aplique estilos sobre elementos específicos mediante las clases de diseño centrales:

* `.main-content`: Contenedor del contenido Markdown renderizado.
* `.sidebar-nav`: Lista del árbol de navegación dentro de la barra lateral.
* `.page-header`: Barra superior de menús.
* `.docmd-search-modal`: Ventana modal de búsqueda de texto completo.
* `.docmd-tabs`: Bloques contenedores con pestañas interactivas.
* `.callout`: Contenedores de notas, consejos y alertas.

## Modificaciones estructurales del diseño

Si redefinir variables CSS no resulta suficiente y necesita modificar la estructura HTML (por ejemplo, barras laterales o pies de página personalizados), cree un **plugin de plantilla**. Las plantillas aportan parciales `.ejs` personalizados que se combinan directamente con los temas visuales.

Consulte [Plantillas](templates.md) para acceder a la guía de creación de plantillas.
