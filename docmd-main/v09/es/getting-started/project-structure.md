---
title: "Estructura del Proyecto"
description: "Organización recomendada de archivos y carpetas para proyectos de documentación en docmd."
---

`docmd` utiliza una convención de carpetas limpia e intuitiva para mapear sus archivos Markdown directamente a la navegación de su sitio web.

## Estructura Típica de un Proyecto

```text
mi-proyecto/
├── docs/                   ← Carpeta principal de contenido Markdown
│   ├── index.md            ← Página de inicio de la documentación
│   ├── getting-started.md  ← Mapeado a /getting-started/
│   └── configuration/      ← Subcarpeta que genera categorías automáticamente
│       └── overview.md
├── assets/                 ← Recursos estáticos (imágenes, favicons, etc.)
├── docmd.config.json       ← Archivo de configuración opcional
└── package.json
```

::: callout tip "Organización de Categorías" icon:folder
Cada subdirectorio dentro de `docs/` se convierte automáticamente en un grupo desplegable en la barra lateral de navegación.
:::
