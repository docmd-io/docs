---
title: "Instalación"
description: "Requisitos del sistema e instrucciones de instalación para docmd utilizando npm, pnpm o yarn."
---

`docmd` está disponible como un paquete de Node.js y se puede ejecutar directamente mediante herramientas como `npx` o instalarse localmente en su proyecto.

## Requisitos del Sistema

* **Node.js**: Versión 18.0.0 o superior.
* **Sistema Operativo**: macOS, Linux o Windows.

## Métodos de Instalación

::: tabs

== tab "npx (Recomendado)" icon:terminal
No requiere instalación global. Ejecute los comandos directamente:

```bash
npx @docmd/core build
```

== tab "npm" icon:box
Instale `docmd` como dependencia de desarrollo en su `package.json`:

```bash
npm install --save-dev @docmd/core
```

== tab "pnpm" icon:package
```bash
pnpm add -D @docmd/core
```

:::

::: callout info "Modo Cero Configuración" icon:info
No es obligatorio tener un archivo `docmd.config.json`. Si ejecuta `docmd build` en una carpeta con archivos Markdown, el motor inferirá la estructura automáticamente.
:::
