---
title: "Secciones plegables (Collapsible)"
description: "Incruste despegables de acordeón interactivos para preguntas frecuentes, datos técnicos detallados y contenido opcional en docmd."
---

El contenedor `collapsible` crea un acordeón HTML `<details>` interactivo y conmutable. Es ideal para preguntas frecuentes y opciones de configuración extensas, manteniendo los detalles secundarios accesibles sin sobrecargar la vista de la documentación principal.

## Sintaxis de Contenedor (Container Syntax)

```markdown
::: collapsible [open] [title:"Texto del resumen"] [icon:nombre_icono] # Apertura de sección plegable
Contenido interior interactivo (texto Markdown, código, listas, avisos)...
::: /collapsible # Etiqueta de cierre explícita
```

## Características y Atributos Soportados

| Parámetro / Propiedad | Tipo | Descripción |
| :--- | :--- | :--- |
| **Estado abierto** | `open` | Opcional. Inicializa el acordeón en un estado expandido en la carga inicial. |
| **Título del resumen** | `"String"` \| `title:"..."` | Texto en la barra de resumen (1er parám posicional o `title:"..."`). |
| **Iconografía** | `icon:NOMBRE` | Opcional. Agrega un icono de [Lucide](external:https://lucide.dev/icons) antes del título. |
| **Alias** | `::: details` | Se admite `::: details` y la sintaxis sin espacios `:::collapsible` como alias nativos. |
| **Etiquetas de Cierre** | `::: /collapsible`, `::: /details`, `:::` | Soporta etiquetas de cierre explícitas o marcadores genéricos `:::`. |

::: callout info "Estandarización de Sintaxis de Contenedores v0.9.1+" icon:sparkles
A partir de **v0.9.1**, `docmd` introduce etiquetas de apertura y cierre explícitas (ej. `::: card` ... `::: /card`, `::: tab` ... `::: /tab`), propiedades clave-valor explícitas (`title:"..."`, `url:"..."`) y comentarios al final `# comentario`. Esta sintaxis modernizada se recomienda para toda nueva documentación. Se mantiene la compatibilidad hacia atrás completa para marcadores heredados (`== tab`, `1.`) y valores posicionales.
:::


## Ejemplos de uso

### Estado cerrado predeterminado

Una sección plegable se cierra de forma predeterminada, reduciendo la densidad visual inicial:

```markdown
::: collapsible title:"¿Cómo actualizo @docmd/core?"
Ejecute `npm update -g @docmd/core` para instalar el último lanzamiento estable del motor.
::: /collapsible
```

::: collapsible "¿Cómo actualizo @docmd/core?"
Ejecute `npm update -g @docmd/core` para instalar el último lanzamiento estable del motor.
:::

### Acordeón abierto inicialmente

Utilice la palabra clave `open` para secciones que deben renderizarse expandidas de forma predeterminada mientras se permite a los usuarios colapsarlas:

```markdown
::: collapsible open title:"Requisitos previos del entorno"
1. Node.js v18+ (LTS recomendado)
2. Gestor de paquetes pnpm, npm o yarn
::: /collapsible
```

::: collapsible open "Requisitos previos del entorno"
1. Node.js v18+ (LTS recomendado)
2. Gestor de paquetes pnpm, npm o yarn
:::

### Contenido Markdown enriquecido

Los contenedores plegables aceptan cualquier contenido Markdown, incluidos fragmentos de código y avisos anidados:

````markdown
::: collapsible title:"Carga útil de respuesta de API de muestra"
```json
{
  "status": "success",
  "data": { "version": "0.9.0" }
}
```
:::
````

::: collapsible "Carga útil de respuesta de API de muestra"
```json
{
  "status": "success",
  "data": { "version": "0.9.0" }
}
```
:::

::: callout tip "Búsqueda e indexación para IA" icon:sparkles
El contenido dentro de los contenedores plegables está totalmente indexado por el motor de búsqueda del lado del cliente y se incluye en el flujo de contexto `llms.txt`. Los agentes de IA pueden acceder a detalles técnicos secundarios mientras mantienen limpia la interfaz humana principal.
:::