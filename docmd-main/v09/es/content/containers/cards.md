---
title: "Tarjetas (Cards)"
description: "Organice la información en contenedores marcados y visualmente distintos para rejillas de características y páginas de inicio en docmd."
---

Las tarjetas encapsulan contenido relacionado en un marco bordeado y distinto con un encabezado opcional, proporcionando una jerarquía visual clara en todas sus páginas de documentación.

## Referencia de sintaxis

```markdown
::: card "Texto del título" [propiedad:valor...]
Esta es el área de contenido principal de la tarjeta.
:::
```

| Parámetro | Tipo | Descripción |
| :--- | :--- | :--- |
| **Título** | `"String"` | Título de encabezado opcional renderizado en la parte superior del marco de la tarjeta. |
| **Icono** | `icon:NOMBRE` | Opcional. Agrega un icono de [Lucide](external:https://lucide.dev/icons) junto al título del encabezado. |

## Ejemplos de uso

### Tarjeta de característica destacada

Utilice una tarjeta para enmarcar una sola capacidad técnica con un título e icono explícitos:

```markdown
::: card "Generación asíncrona" icon:zap
El motor principal utiliza una canalización de E/S no bloqueante, compilando miles de páginas en milisegundos.
:::
```

::: card "Generación asíncrona" icon:zap
El motor principal utiliza una canalización de E/S no bloqueante, compilando miles de páginas en milisegundos.
:::

### Composición de contenido enriquecido

Las tarjetas aceptan cualquier contenido Markdown, incluidos fragmentos de código y contenedores de botones:

```markdown
::: card "Localización instantánea"
Prepare su documentación para una audiencia global utilizando el soporte i18n integrado.

```bash
npx @docmd/core build
```

::: button "Guía de estrategia de localización" ../localisation/translated-content.md
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