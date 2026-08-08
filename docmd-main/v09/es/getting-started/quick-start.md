---
title: "Inicio rápido"
description: "Pase de un directorio vacío a un sitio de documentación en funcionamiento en menos de un minuto."
---

Ejecute `docmd` dentro de cualquier directorio que contenga archivos Markdown. Sin archivo de configuración, sobrecarga de instalación ni experiencia previa en frameworks.

::: steps

### 1. Iniciar el servidor de desarrollo

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core dev
```
== tab "pnpm" icon:boxes
```bash
pnpm dlx @docmd/core dev
```
== tab "yarn" icon:scroll
```bash
yarn dlx @docmd/core dev
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core dev
```
:::

Esto abre `http://localhost:3000`. Su documentación ahora está en vivo.

<img width="500" class="with-border" src="/assets/previews/terminal-npx-dev.webp">

::: callout tip "Conmutación por error automática de puerto" icon:info
Si el puerto `3000` está actualmente en uso, `docmd` detecta y se vincula automáticamente al siguiente puerto disponible (por ejemplo, `3001`).
:::

### 2. Resolución automática de características

El motor configura todas las funciones esenciales automáticamente:

1. **Detección de directorio**: Busca `docs/`, `src/docs/`, `documentation/`, `content/` o cualquier archivo `.md` en la raíz del proyecto.
2. **Estructuración de navegación**: Construye un árbol de navegación de barra lateral anidado directamente desde la jerarquía de su directorio.
3. **Resolución de títulos**: Extrae los títulos de las páginas de la primera etiqueta de encabezado `H1` automáticamente.
4. **Indexación de búsqueda**: Genera un índice de búsqueda de texto completo en el cliente al instante.
5. **Caché inteligente**: Activa recompilaciones en menos de 200 ms automáticamente al guardar archivos.

No se requiere `docmd.config.json`. Agregue uno más tarde para personalizar diseños, plugins o ajustes de control de versiones.

### 3. Compilar para producción

Compile sus archivos Markdown en un sitio web de producción estático y optimizado.

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core build
```
== tab "pnpm" icon:boxes
```bash
pnpm dlx @docmd/core build
```
== tab "yarn" icon:scroll
```bash
yarn dlx @docmd/core build
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core build
```
:::

El compilador genera un sitio estático en `./site/`. Aloje esta salida estática en cualquier lugar, como GitHub Pages, Vercel, Netlify o cualquier servidor HTTP estático.

:::

::: callout info "Próximos pasos" icon:compass
¿Listo para configurar su proyecto? Aprenda cómo estructurar su repositorio en la [Guía de estructura del proyecto](./project-structure.md) o explore opciones de instalación local en [Instalación](./installation.md).
:::
