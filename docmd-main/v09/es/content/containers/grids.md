---
title: "Rejillas (Grids)"
description: "Organice diseños adaptables de múltiples columnas utilizando contenedores flexbox nativos de Markdown en docmd."
---

Las rejillas proporcionan un sistema de diseño nativo impulsado por Markdown. Utilice el contenedor `grids` para estructurar elementos lado a lado. Las columnas equilibran automáticamente el espacio disponible y se apilan verticalmente en ventanas gráficas móviles.

## Referencia de sintaxis

```markdown
::: grids
    ::: grid
        Contenido para la primera columna.
    :::
    ::: grid
        Contenido para la segunda columna.
    :::
:::
```

| Contenedor | Descripción |
| :--- | :--- |
| **`::: grids`** | Contenedor envolvente exterior que inicia el diseño flexbox adaptable. |
| **`::: grid`** | Contenedor de columna interior. Declare tantos bloques `grid` como sea necesario. |

## Ejemplos de uso

### Tarjetas lado a lado

Combine `grids` con `cards` para presentar múltiples bloques de características en una fila adaptable:

```markdown
::: grids
    ::: grid
        ::: card "Velocidad" icon:zap
        Creado sobre un motor de E/S asíncrono no bloqueante para un rendimiento máximo.
        :::
    :::
    ::: grid
        ::: card "Escalabilidad" icon:layers
        Diseñado para grandes monorepositorios y espacios de trabajo multiproyecto.
        :::
    :::
:::
```

::: grids
    ::: grid
        ::: card "Velocidad" icon:zap
        Creado sobre un motor de E/S asíncrono no bloqueante para un rendimiento máximo.
        :::
    :::
    ::: grid
        ::: card "Escalabilidad" icon:layers
        Diseñado para grandes monorepositorios y espacios de trabajo multiproyecto.
        :::
    :::
:::

### Diseño de tres columnas

Agregue un tercer bloque `grid` para crear una fila de tres columnas:

```markdown
::: grids
    ::: grid
        ::: card "Motor de búsqueda" icon:search
        Indexador de búsqueda de texto completo integrado.
        :::
    :::
    ::: grid
        ::: card "Localización" icon:globe
        Enrutamiento de directorios multilingüe e índices de búsqueda localizados.
        :::
    :::
    ::: grid
        ::: card "Motor de temas" icon:palette
        Modo oscuro integrado y personalización completa de variables CSS.
        :::
    :::
:::
```

::: grids
    ::: grid
        ::: card "Motor de búsqueda" icon:search
        Indexador de búsqueda de texto completo integrado.
        :::
    :::
    ::: grid
        ::: card "Localización" icon:globe
        Enrutamiento de directorios multilingüe e índices de búsqueda localizados.
        :::
    :::
    ::: grid
        ::: card "Motor de temas" icon:palette
        Modo oscuro integrado y personalización completa de variables CSS.
        :::
    :::
:::

::: callout tip "Señales estructurales limpias" icon:lightbulb
El contenedor `grids` mantiene la estructura de diseño puramente en Markdown. Esto elimina el exceso de HTML sin procesar y garantiza que los indexadores de contexto de IA interpreten limpiamente las señales de relación lado a lado.
:::