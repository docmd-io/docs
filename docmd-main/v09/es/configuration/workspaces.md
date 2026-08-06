---
title: "Espacios de Trabajo (Workspaces)"
description: "Gestione múltiples proyectos de documentación y repositorios monorepo desde una única configuración centralizada."
---

Los Espacios de Trabajo (Workspaces) en `docmd` permiten compilar y servir múltiples sitios de documentación independientes desde una única raíz.

## Ejemplo de Configuración de Workspace

```json
{
  "workspace": {
    "projects": [
      { "name": "Core API", "path": "docs/core" },
      { "name": "SDK Python", "path": "docs/python" }
    ]
  }
}
```

::: callout tip "Monorepos para Equipos" icon:layers
Utilice espacios de trabajo para mantener la documentación de cada microservicio en su propio directorio mientras comparte activos estáticos y temas.
:::
