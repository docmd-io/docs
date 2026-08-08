---
title: "Secciones plegables (Collapsible)"
description: "Incruste despegables de acordeón interactivos para preguntas frecuentes, datos técnicos detallados y contenido opcional en docmd."
---

El contenedor `collapsible` crea un acordeón HTML `<details>` interactivo y conmutable. Es ideal para preguntas frecuentes y opciones de configuración extensas, manteniendo los detalles secundarios accesibles sin sobrecargar la vista de la documentación principal.

::: callout info "Soporte de alias de VitePress" icon:info
Al migrar desde VitePress, `:::details` funciona como un alias nativo para `:::collapsible`. La sintaxis sin espacios como `:::collapsible` también es compatible.
:::

## Referencia de sintaxis

```markdown
::: collapsible [open] "Texto del título" [propiedad:valor...]
El contenido principal va aquí.
:::
```

| Parámetro | Tipo | Descripción |
| :--- | :--- | :--- |
| **Estado abierto** | `open` | Opcional. Inicializa el elemento de acordeón en un estado expandido. |
| **Título** | `"String"` | Texto de encabezado renderizado en la barra de resumen. Por defecto es "Haga clic para expandir". |
| **Icono** | `icon:NOMBRE` | Opcional. Agrega un icono de [Lucide](external:https://lucide.dev/icons) antes de la cadena del título. |

## Ejemplos de uso

### Estado cerrado predeterminado

Una sección plegable se cierra de forma predeterminada, reduciendo la densidad visual inicial:

```markdown
::: collapsible "¿Cómo actualizo @docmd/core?"
Ejecute `npm update -g @docmd/core` para instalar el último lanzamiento estable del motor.
:::
```

::: collapsible "¿Cómo actualizo @docmd/core?"
Ejecute `npm update -g @docmd/core` para instalar el último lanzamiento estable del motor.
:::

### Acordeón abierto inicialmente

Utilice la palabra clave `open` para secciones que deben renderizarse expandidas de forma predeterminada mientras se permite a los usuarios colapsarlas:

```markdown
::: collapsible open "Requisitos previos del entorno"
1. Node.js v18+ (LTS recomendado)
2. Gestor de paquetes pnpm, npm o yarn
:::
```

::: collapsible open "Requisitos previos del entorno"
1. Node.js v18+ (LTS recomendado)
2. Gestor de paquetes pnpm, npm o yarn
:::

### Contenido Markdown enriquecido

Los contenedores plegables aceptan cualquier contenido Markdown, incluidos fragmentos de código y avisos anidados:

````markdown
::: collapsible "Carga útil de respuesta de API de muestra"
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