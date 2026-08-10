---
title: "Secciones Destacadas (Hero)"
description: "Construye encabezados impactantes para páginas de inicio y destacados de marketing en Markdown en docmd."
---

El contenedor `hero` crea encabezados visualmente atractivos para páginas de destino con soporte para división de medios y carruseles.

## Sintaxis de Contenedor (Container Syntax)

```markdown
::: hero [layout:split|slider] [glow:true|false] # Apertura del contenedor hero
::: slide # Apertura de diapositiva individual
# Motor Isomórfico Central
Renderiza estáticamente y se ejecuta fluidamente en el cliente.
::: /slide # Cierre explícito de diapositiva

::: slide # Segunda diapositiva
# Optimización de Contexto IA
Análisis estructurado para agentes LLM.
::: /slide
::: /hero # Cierre explícito del contenedor hero
```

## Características y Atributos Soportados

| Parámetro / Propiedad | Tipo | Descripción |
| :--- | :--- | :--- |
| **Variante de Diseño** | `layout:split` \| `layout:slider` | `split` divide en áreas de texto y medios; `slider` crea un carrusel. |
| **Efecto Glow** | `glow:true` \| `glow:false` | Inyecta un resplandor radial sutil detrás de la sección hero. |
| **Subcontenedores** | `::: slide` ... `::: /slide` | Define diapositivas individuales. Se admite la sintaxis heredada `== slide`. |
| **Etiquetas de Cierre** | `::: /hero`, `::: /slide`, `:::` | Soporta etiquetas de cierre explícitas o marcadores genéricos `:::`. |

::: callout info "Estandarización de Sintaxis de Contenedores v0.9.1+" icon:sparkles
A partir de **v0.9.1**, `docmd` introduce etiquetas de apertura y cierre explícitas (ej. `::: card` ... `::: /card`, `::: tab` ... `::: /tab`), propiedades clave-valor explícitas (`title:"..."`, `url:"..."`) y comentarios al final `# comentario`. Esta sintaxis modernizada se recomienda para toda nueva documentación. Se mantiene la compatibilidad hacia atrás completa para marcadores heredados (`== tab`, `1.`) y valores posicionales.
:::

## Ejemplos de Uso (Usage Examples)

### Diseño Dividido (Split Layout)

Utilice el separador `== side` para dividir el contenido en un área de texto principal y un área de medios secundaria:

```markdown
::: hero layout:split glow:true # Diseño de encabezado dividido
# docmd
Motor de ejecución isomórfico. Documentación optimizada para IA.

::: button title:"Guía de Inicio Rápido" url:"../../getting-started/quick-start.md" color:blue

== side
::: embed url:"https://www.youtube.com/watch?v=0CSyIBHQy9g"
::: /hero
```

::: hero layout:split glow:true
# docmd
Motor de ejecución isomórfico. Documentación optimizada para IA.

::: button "Guía de Inicio Rápido" ../../getting-started/quick-start.md color:blue

== side
::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"
::: /hero

### Diseño de Deslizador (Slider Layout)

Utilice subcontenedores explícitos `::: slide` para crear un carrusel interactivo de paneles de contenido hero:

```markdown
::: hero layout:slider # Contenedor deslizador interactivo
::: slide # Panel 1
# Motor Central Isomórfico
Se renderiza de forma estática y se ejecuta en el cliente sin problemas.
::: /slide

::: slide # Panel 2
# Optimización de Contexto de IA
Análisis adaptado a la estructura para agentes LLM.
::: /slide
::: /hero
```

::: hero layout:slider
::: slide
# Motor Central Isomórfico
Se renderiza de forma estática y se ejecuta en el cliente sin problemas.
::: /slide

::: slide
# Optimización de Contexto de IA
Análisis adaptado a la estructura para agentes LLM.
::: /slide
::: /hero

::: callout tip "Mejores Prácticas de Diseño Hero" icon:lightbulb
Utilice `glow:true` en sitios con temas oscuros para obtener un efecto visual superior. Coloque los elementos `::: button` en la sección de texto principal antes de `== side` para garantizar el orden de apilamiento móvil adecuado.
:::