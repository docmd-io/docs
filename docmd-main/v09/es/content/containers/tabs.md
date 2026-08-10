---
title: "Pestañas (Tabs)"
description: "Organiza fragmentos de código alternativos, instrucciones por plataforma y contenido multilingüe en pestañas intercambiables en docmd."
---

Las pestañas presentan conjuntos de datos alternativos (como gestores de paquetes o comandos del sistema operativo) en contenedores interactivos y limpios.

## Sintaxis de Contenedor (Container Syntax)

```markdown
::: tabs # Apertura del contenedor del grupo de pestañas
::: tab [title:"Etiqueta de Pestaña"] [icon:nombre_icono] # Apertura de pestaña individual
Contenido de la pestaña 1 (bloques de código, texto, listas)...
::: /tab # Cierre explícito de pestaña individual

::: tab [title:"Etiqueta 2"] [icon:nombre_icono] # Segunda pestaña
Contenido de la pestaña 2...
::: /tab
::: /tabs # Cierre explícito del grupo de pestañas
```

## Características y Atributos Soportados

| Parámetro / Propiedad | Tipo | Descripción |
| :--- | :--- | :--- |
| **Etiqueta de Pestaña** | `"String"` \| `title:"..."` | Texto mostrado en el botón selector de la pestaña (1er parám posicional o `title:"..."`). |
| **Iconografía** | `icon:NOMBRE` | Opcional. Añade un icono [Lucide](external:https://lucide.dev/icons) antes de la etiqueta. |
| **Subcontenedores** | `::: tab` ... `::: /tab` | Envoltorios de pestañas explícitos. La sintaxis heredada `== tab` es totalmente compatible. |
| **Etiquetas de Cierre** | `::: /tabs`, `::: /tab`, `:::` | Soporta etiquetas de cierre explícitas o marcadores genéricos `:::`. |

::: callout info "Estandarización de Sintaxis de Contenedores v0.9.1+" icon:sparkles
A partir de **v0.9.1**, `docmd` introduce etiquetas de apertura y cierre explícitas (ej. `::: card` ... `::: /card`, `::: tab` ... `::: /tab`), propiedades clave-valor explícitas (`title:"..."`, `url:"..."`) y comentarios al final `# comentario`. Esta sintaxis modernizada se recomienda para toda nueva documentación. Se mantiene la compatibilidad hacia atrás completa para marcadores heredados (`== tab`, `1.`) y valores posicionales.
:::


## Ejemplos de Uso

```markdown
::: tabs # Opciones de gestor de paquetes
::: tab "pnpm" icon:box # Recomendado
```bash
pnpm add @docmd/core
```
::: /tab

::: tab "npm" icon:terminal
```bash
npm install @docmd/core
```
::: /tab

::: tab "yarn" icon:package
```bash
yarn add @docmd/core
```
::: /tab
::: /tabs
```

::: tabs # Opciones de gestor de paquetes
::: tab "pnpm" icon:box # Recomendado
```bash
pnpm add @docmd/core
```
::: /tab

::: tab "npm" icon:terminal
```bash
npm install @docmd/core
```
::: /tab

::: tab "yarn" icon:package
```bash
yarn add @docmd/core
```
::: /tab
::: /tabs

::: callout note "Sintaxis Heredada == tab" icon:archive
La documentación existente con sintaxis `== tab` continúa procesándose sin problemas:

```markdown
::: tabs
== tab "JavaScript"
console.log("Sintaxis heredada");
::: /tabs
```
:::