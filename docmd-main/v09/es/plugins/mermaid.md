---
title: "Plugin de Diagramas Mermaid"
description: "Integración zero-config para diagramas Mermaid.js con sincronización automática de temas e inyección diferida de recursos."
---

El plugin `@docmd/plugin-mermaid` integra [Mermaid.js](external:https://mermaid.js.org/) en `docmd`. Registra tanto el análisis de bloques de código estándar (` ```mermaid `) como el renderizador de contenedor explícito `::: mermaid` para diagramas SVG interactivos.

::: callout info "Estandarización de Sintaxis de Contenedores v0.9.1+" icon:sparkles
A partir de **v0.9.1**, `docmd` introduce etiquetas de apertura y cierre explícitas (ej. `::: mermaid` ... `::: /mermaid`), propiedades clave-valor explícitas (`title:"..."`, `align:center`) y comentarios al final `# comentario`. Las personalizaciones por diagrama se gestionan mediante la sintaxis de contenedor, mientras que los valores por defecto globales se especifican en `docmd.config.json`.
:::

## Configuración del Plugin

Configure las opciones globales en su `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "mermaid": {
      "enabled": true,
      "theme": "default",
      "darkTheme": "dark",
      "zoom": true
    }
  }
}
```

| Opción | Tipo | Predeterminado | Descripción |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | Habilita o deshabilita la representación de diagramas a nivel global. |
| `theme` | `string` | `"default"` | Tema claro predeterminado para diagramas (`default`, `forest`, `neutral`). |
| `darkTheme` | `string` | `"dark"` | Tema oscuro predeterminado para sincronización con modo oscuro. |
| `zoom` | `boolean` | `true` | Habilita controles interactivos de desplazamiento y zoom de forma predeterminada. |

::: callout tip "Desactivación del Plugin" icon:slash
Si `@docmd/plugin-mermaid` se desactiva o se omite en `docmd.config.json`, tanto el renderizado del contenedor `::: mermaid` como el análisis del bloque de código ` ```mermaid ` se desactivan limpiamente y no se inyectan recursos JS en el cliente.
:::

## Uso y Creación de Diagramas

`docmd` admite un modelo híbrido para la creación de diagramas:

* **[Guía del Contenedor Mermaid](../content/containers/mermaid.md)**: Explore la sintaxis recomendada del contenedor `::: mermaid` para títulos por diagrama, alineación, temas personalizados y etiquetas de cierre explícitas.
* **Bloques de Código Estándar**: Utilice bloques de código estándar (` ```mermaid `) para un 100% de compatibilidad con GitHub Flavored Markdown (GFM).

### Ejemplo Rápido

```markdown
::: mermaid title:"Flujo de Autenticación" align:center zoom:true # Contenedor
sequenceDiagram
    autonumber
    Client->>Server: POST /login
    Server-->>Client: 200 OK (Token)
::: /mermaid
```

Para consultar la referencia completa de sintaxis, visite la **[Referencia del Contenedor Mermaid](../content/containers/mermaid.md)**.