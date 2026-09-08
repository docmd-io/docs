---
title: "Tipografías personalizadas e imagen de marca"
description: "Adapte la apariencia de su documentación a las directrices corporativas empleando variables CSS y fuentes web en docmd."
---

La documentación es un elemento representativo de la identidad corporativa. `docmd` utiliza un sistema de variables CSS que le permite adaptar tipografías y paletas de color corporativas sin intervenir en los archivos internos del motor.

## Personalización de tokens visuales

`docmd` establece sus tokens visuales como propiedades CSS personalizadas en `:root`. Puede redefinirlos en una hoja de estilo propia (por ejemplo, `assets/css/branding.css`).

### 1. Crear la hoja de estilo personalizada

```css
/* Importar tipografía web */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap');

:root {
  /* Pila tipográfica corporativa */
  --font-family-sans: "Outfit", system-ui, -apple-system, sans-serif;

  /* Colores de marca (Modo claro) */
  --link-color: #8a2be2;          /* Color de acento principal */
  --link-colour-hover: #7b1fa2;
  --bg-color: #fcfcfd;            /* Tono suave de fondo */
}

/* Anulaciones para el modo oscuro */
:root[data-theme="dark"] {
  --bg-color: #0d1117;
  --link-color: #a855f7;
}
```

### 2. Registrar el archivo CSS personalizado

Indique la ruta de su hoja de estilo en `docmd.config.json` bajo `theme.customCss`:

```json "docmd.config.json"
{
  "theme": {
    "customCss": [
      "/assets/css/branding.css"
    ]
  }
}
```

::: callout tip "Rendimiento y carga de fuentes" icon:lightbulb
Aloje las fuentes web localmente en `assets/fonts/` siempre que sea posible para minimizar latencias de red. Declare `font-display: swap` en sus reglas `@font-face` para evitar retrasos de visualización de texto (FOUT).
:::
