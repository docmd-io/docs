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


::: hero layout:slider
::: slide
# Motor Isomórfico Central
Renderiza estáticamente y se ejecuta fluidamente en el cliente.
::: /slide

::: slide
# Optimización de Contexto IA
Análisis estructurado para agentes LLM.
::: /slide
::: /hero