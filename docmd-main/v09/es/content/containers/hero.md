---
title: "Secciones Hero"
description: "Cree encabezados de páginas de inicio de gran impacto y destacados de marketing en Markdown en docmd."
---

El contenedor `hero` crea encabezados de páginas de inicio visualmente impactantes. Gestiona diseños de medios divididos, efectos de resplandor de fondo y carruseles interactivos sin requerir marcado HTML sin procesar.

## Referencia de sintaxis

```markdown
::: hero [propiedad:valor...]
    # Título de la página
    Un eslogan secundario corto.

    ::: button "Llamada a la acción" ./#target-url
:::
```

| Parámetro | Tipo | Descripción |
| :--- | :--- | :--- |
| **Diseño** | `layout:split` \| `layout:slider` | `split` divide el hero en áreas de texto principal y medios secundarios. `slider` crea un carrusel con desplazamiento horizontal. |
| **Resplandor** | `glow:true` | Inyecta un resplandor de gradiente radial sutil detrás del encabezado hero. |
| **Separador lateral** | `== side` | Delimitador para `layout:split`. El contenido después de esto se renderiza en el área de medios de la derecha. |
| **Separador de diapositiva** | `== slide` | Delimitador para `layout:slider`. Cada `== slide` define un nuevo panel de carrusel. |

## Ejemplos de uso

### Diseño dividido

Utilice el separador `== side` para dividir el contenido en un área de texto hero principal y un área de medios secundaria:

```markdown
::: hero layout:split glow:true
    # docmd
    Motor de ejecución isomórfico. Documentación optimizada para IA.

    ::: button "Guía de inicio rápido" ../../getting-started/quick-start.md color:blue

    == side
        ::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"
:::
```

::: hero layout:split glow:true
# docmd
Motor de ejecución isomórfico. Documentación optimizada para IA.

::: button "Guía de inicio rápido" ../../getting-started/quick-start.md color:blue

== side
::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"
:::

### Diseño deslizante

Utilice separadores `== slide` para crear un carrusel interactivo de paneles de contenido hero:

```markdown
::: hero layout:slider
    == slide
        # Motor principal isomórfico
        Se renderiza estáticamente y se ejecuta del lado del cliente sin problemas.
    == slide
        # Optimización de contexto de IA
        Análisis sintáctico consciente de la estructura para agentes LLM.
:::
```

::: hero layout:slider
    == slide
        # Motor principal isomórfico
        Se renderiza estáticamente y se ejecuta del lado del cliente sin problemas.
    == slide
        # Optimización de contexto de IA
        Análisis sintáctico consciente de la estructura para agentes LLM.
:::

::: callout tip "Mejores prácticas de diseño Hero" icon:lightbulb
Utilice `glow:true` en sitios de tema oscuro para obtener un efecto visual de primera calidad. Coloque los elementos `::: button` en la sección de texto principal antes de `== side` para garantizar un orden de apilamiento móvil adecuado.
:::