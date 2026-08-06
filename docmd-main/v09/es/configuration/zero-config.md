---
title: "Cero Configuración (Zero-Config)"
description: "Descubra cómo docmd infiere automáticamente rutas, títulos y navegación sin necesidad de manifiestos."
---

`docmd` incluye un motor de descubrimiento heurístico que analiza su árbol de archivos Markdown y genera automáticamente la estructura completa de navegación.

## Reglas Heurísticas

* **Página Principal**: Cualquier archivo llamado `index.md` o `readme.md` en la raíz se convierte en la página principal.
* **Títulos**: Se extraen del primer encabezado `# H1` o del campo `title` en el Frontmatter.
* **Orden de Carpetas**: La barra lateral sigue la estructura alfabética o numérica de sus directorios.
