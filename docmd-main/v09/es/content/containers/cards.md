---
title: "Tarjetas (Cards)"
description: "Organice la información en contenedores marcados y visualmente distintos para rejillas de características y páginas de inicio en docmd."
---

Las tarjetas encapsulan contenido relacionado en un marco bordeado y distinto con un encabezado opcional, proporcionando una jerarquía visual clara en todas sus páginas de documentación.

## Sintaxis de Contenedor (Container Syntax)

```markdown
::: card [title:"Título de encabezado"] [icon:nombre_icono] # Apertura de tarjeta
Bloque de contenido que admite Markdown, código, botones y avisos...
::: /card # Etiqueta de cierre explícita
```

## Características y Atributos Soportados

| Parámetro / Propiedad | Tipo | Descripción |
| :--- | :--- | :--- |
| **Título** | `"String"` \| `title:"..."` | Título de encabezado opcional (1er parámetro posicional o `title:"..."`). |
| **Iconografía** | `icon:NOMBRE` | Opcional. Agrega un icono de [Lucide](external:https://lucide.dev/icons) junto al título. |
| **Contenido Markdown** | Texto libre | Admite cualquier elemento Markdown, listas, código, botones y contenedores anidados. |
| **Etiquetas de Cierre** | `::: /card`, `:::` | Soporta etiquetas de cierre `::: /card` o marcadores genéricos `:::`. |

::: callout info "Estandarización de Sintaxis de Contenedores v0.9.1+" icon:sparkles
A partir de **v0.9.1**, `docmd` introduce etiquetas de apertura y cierre explícitas (ej. `::: card` ... `::: /card`, `::: tab` ... `::: /tab`), propiedades clave-valor explícitas (`title:"..."`, `url:"..."`) y comentarios al final `# comentario`. Esta sintaxis modernizada se recomienda para toda nueva documentación. Se mantiene la compatibilidad hacia atrás completa para marcadores heredados (`== tab`, `1.`) y valores posicionales.
:::


## Ejemplos de uso

### Tarjeta de característica destacada

Utilice una tarjeta para enmarcar una sola capacidad técnica con un título e icono explícitos:

```markdown
::: card title:"Generación asíncrona" icon:zap
El motor principal utiliza una canalización de E/S no bloqueante, compilando miles de páginas en milisegundos.
::: /card
```

::: card "Generación asíncrona" icon:zap
El motor principal utiliza una canalización de E/S no bloqueante, compilando miles de páginas en milisegundos.
:::

### Composición de contenido enriquecido

Las tarjetas aceptan cualquier contenido Markdown, incluidos fragmentos de código y contenedores de botones:

```markdown
::: card title:"Localización instantánea"
Prepare su documentación para una audiencia global utilizando el soporte i18n integrado.

```bash
npx @docmd/core build
```

::: button title:"Guía de estrategia de localización" url:"../localisation/translated-content.md"
:::
```

::: card "Localización instantánea"
Prepare su documentación para una audiencia global utilizando el soporte i18n integrado.

```bash
npx @docmd/core build
```

::: button "Guía de estrategia de localización" ../localisation/translated-content.md
:::

### Diseño de múltiples columnas

Envuelva múltiples tarjetas dentro de un contenedor `grids` para un diseño de múltiples columnas adaptable:

```markdown
::: grids
    ::: grid
        ::: card title:"Nodo principal"
        Opciones de configuración para instancias maestras.
        ::: /card
    ::: /grid
    ::: grid
        ::: card title:"Nodo secundario"
        Opciones de configuración para instancias de réplica.
        ::: /card
    ::: /grid
::: /grids
```

::: grids
    ::: grid
        ::: card "Nodo principal"
        Opciones de configuración para instancias maestras.
        :::
    :::
    ::: grid
        ::: card "Nodo secundario"
        Opciones de configuración para instancias de réplica.
        :::
    :::
:::

::: callout tip "Agrupación semántica para IA" icon:lightbulb
En el flujo de contexto `llms.txt`, el contenido envuelto en una `card` se analiza como un **Grupo de temas cohesivo**. El uso de tarjetas para segmentar conceptos evita la filtración de contexto en secciones no relacionadas.
:::