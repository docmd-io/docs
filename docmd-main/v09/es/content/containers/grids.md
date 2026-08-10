---
title: "Rejillas (Grids)"
description: "Organice diseños adaptables de múltiples columnas utilizando contenedores flexbox nativos de Markdown en docmd."
---

Las rejillas proporcionan un sistema de diseño nativo impulsado por Markdown. Utilice el contenedor `grids` para estructurar elementos lado a lado. Las columnas equilibran automáticamente el espacio disponible y se apilan verticalmente en ventanas gráficas móviles.

## Sintaxis de Contenedor (Container Syntax)

```markdown
::: grids # Apertura del contenedor flexbox exterior
    ::: grid # Apertura del contenedor de columna interior
        Contenido para la columna 1 (tarjetas, texto, botones, código)...
    ::: /grid # Cierre explícito de la columna

    ::: grid # Apertura de la columna 2
        Contenido para la columna 2...
    ::: /grid
::: /grids # Cierre explícito del contenedor exterior
```

## Características y Atributos Soportados

| Contenedor / Elemento | Tipo | Descripción |
| :--- | :--- | :--- |
| **`::: grids`** | Contenedor Exterior | Envoltorio que inicia el diseño flexbox adaptable. |
| **`::: grid`** | Subcontenedor | Contenedor de columna. Declare múltiples bloques `grid` dentro de `grids`. |
| **Distribución Flex** | Adaptable | Las columnas se distribuyen horizontalmente en escritorio y se apilan en móvil. |
| **Etiquetas de Cierre** | `::: /grids`, `::: /grid`, `:::` | Soporta etiquetas de cierre explícitas o marcadores genéricos `:::`. |

::: callout info "Estandarización de Sintaxis de Contenedores v0.9.1+" icon:sparkles
A partir de **v0.9.1**, `docmd` introduce etiquetas de apertura y cierre explícitas (ej. `::: card` ... `::: /card`, `::: tab` ... `::: /tab`), propiedades clave-valor explícitas (`title:"..."`, `url:"..."`) y comentarios al final `# comentario`. Esta sintaxis modernizada se recomienda para toda nueva documentación. Se mantiene la compatibilidad hacia atrás completa para marcadores heredados (`== tab`, `1.`) y valores posicionales.
:::


## Ejemplos de uso

### Tarjetas lado a lado

Combine `grids` con `cards` para presentar múltiples bloques de características en una fila adaptable:

```markdown
::: grids
    ::: grid
        ::: card title:"Velocidad" icon:zap
        Creado sobre un motor de E/S asíncrono no bloqueante para un rendimiento máximo.
        ::: /card
    ::: /grid
    ::: grid
        ::: card title:"Escalabilidad" icon:layers
        Diseñado para grandes monorepositorios y espacios de trabajo multiproyecto.
        ::: /card
    ::: /grid
::: /grids
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
        ::: card title:"Motor de búsqueda" icon:search
        Indexador de búsqueda de texto completo integrado.
        ::: /card
    ::: /grid
    ::: grid
        ::: card title:"Localización" icon:globe
        Enrutamiento de directorios multilingüe e índices de búsqueda localizados.
        ::: /card
    ::: /grid
    ::: grid
        ::: card title:"Motor de temas" icon:palette
        Modo oscuro integrado y personalización completa de variables CSS.
        ::: /card
    ::: /grid
::: /grids
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