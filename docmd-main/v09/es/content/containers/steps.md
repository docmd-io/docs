---
title: "Pasos (Steps)"
description: "Convierte listas ordenadas y pasos numerados en líneas de tiempo visuales y tutoriales en docmd."
---

El contenedor `steps` transforma instrucciones secuenciales en líneas de tiempo verticales numeradas con enlaces permanentes.

## Sintaxis de Contenedor (Container Syntax)

```markdown
::: steps # Apertura del contenedor de línea de tiempo secuencial
::: step [title:"Encabezado del Paso"] # Apertura del paso individual
Contenido del paso 1 (texto markdown, código, avisos, imágenes)...
::: /step # Cierre explícito del paso

::: step [title:"Encabezado del Paso 2"] # Segundo paso
Contenido del paso 2...
::: /step
::: /steps # Cierre explícito de la línea de tiempo
```

## Características y Atributos Soportados

| Parámetro / Elemento | Tipo | Descripción |
| :--- | :--- | :--- |
| **Título del Paso** | `"String"` \| `title:"..."` | Texto de encabezado en la parte superior del nodo (1er parám posicional o `title:"..."`). |
| **Nodos de Tiempo** | Automático | Cada bloque `::: step` incrementa automáticamente el índice del paso (1, 2, 3...). |
| **Subcontenedores** | `::: step` ... `::: /step` | Envoltorios de pasos explícitos. La sintaxis de lista ordenada (`1.`, `2.`) es compatible. |
| **Etiquetas de Cierre** | `::: /steps`, `::: /step`, `:::` | Soporta etiquetas de cierre explícitas o marcadores genéricos `:::`. |

::: callout info "Estandarización de Sintaxis de Contenedores v0.9.1+" icon:sparkles
A partir de **v0.9.1**, `docmd` introduce etiquetas de apertura y cierre explícitas (ej. `::: card` ... `::: /card`, `::: tab` ... `::: /tab`), propiedades clave-valor explícitas (`title:"..."`, `url:"..."`) y comentarios al final `# comentario`. Esta sintaxis modernizada se recomienda para toda nueva documentación. Se mantiene la compatibilidad hacia atrás completa para marcadores heredados (`== tab`, `1.`) y valores posicionales.
:::


## Ejemplos de Uso

```markdown
::: steps # Secuencia de inicio
::: step "Inicializar Proyecto" # Paso 1
Ejecuta `npx @docmd/core init` para crear tu estructura.
::: /step

::: step "Escribir Contenido" # Paso 2
Escribe documentación usando archivos Markdown estándar.
::: /step

::: step "Compilar y Desplegar" # Paso 3
Ejecuta `npx @docmd/core build` para compilar la salida de producción.
::: /step
::: /steps
```

::: steps # Secuencia de inicio
::: step "Inicializar Proyecto" # Paso 1
Ejecuta `npx @docmd/core init` para crear tu estructura.
::: /step

::: step "Escribir Contenido" # Paso 2
Escribe documentación usando archivos Markdown estándar.
::: /step

::: step "Compilar y Desplegar" # Paso 3
Ejecuta `npx @docmd/core build` para compilar la salida de producción.
::: /step
::: /steps