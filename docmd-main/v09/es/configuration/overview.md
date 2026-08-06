---
title: "Visión General de Configuración"
description: "Aprenda a personalizar docmd mediante el archivo docmd.config.json y las opciones globales del proyecto."
---

`docmd` está diseñado para funcionar sin configuración por defecto, pero permite una personalización completa a través de `docmd.config.json`.

## Estructura del Archivo de Configuración

```json
{
  "title": "Mi Documentación",
  "url": "https://docs.mi-sitio.com",
  "src": "docs",
  "theme": {
    "name": "default",
    "appearance": "light"
  },
  "layout": {
    "spa": true,
    "breadcrumbs": true
  }
}
```

## Modelo de Precedencia en 3 Capas

`docmd` aplica las configuraciones siguiendo este orden jerárquico (de mayor a menor prioridad):

1. **Banderas de la CLI**: Opciones pasadas directamente en la línea de comandos (ej. `--port 8080`).
2. **`docmd.config.json`**: Ajustes declarados en el archivo de configuración del proyecto.
3. **Valores Predeterminados (Heurística)**: Ajustes automáticos de cero configuración.
