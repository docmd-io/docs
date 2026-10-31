---
title: "Plugin Playground"
description: "Ejecutor de código interactivo en vivo y playground de componentes con captura de consola en tiempo real, vistas previas de HTML y contenedores Markdown sin configuración."
---

El plugin `@docmd/plugin-playground` añade bloques de código ejecutables interactivos y vistas previas de componentes en vivo directamente a su sitio de `docmd`. Permite a los autores de documentación incrustar ejecuciones de JavaScript independientes, componentes HTML/CSS y archivos de scripts activos desde su repositorio, sin las dependencias pesadas habituales en otros entornos.

::: callout success "Plugin principal integrado en @docmd/core" icon:zap
A partir de la versión **v0.9.9**, `@docmd/plugin-playground` se incluye directamente con `@docmd/core` y viene habilitado por defecto. Gracias a la carga condicional de recursos de `docmd`, las páginas sin bloques de playground cargan **0 KB de recursos adicionales**.
:::

## Características principales

::: cards
::: card title="Activación sin configuración" icon:play
Escriba ` ```js playground ` o `::: playground` para crear instantáneamente un entorno interactivo.
:::
::: card title="Incrustación de archivos activos" icon:file-code
Enlace directamente scripts de su repositorio mediante `::: playground src="./counter.js" /:::` para mantener los ejemplos sincronizados automáticamente.
:::
::: card title="Captura de consola en tiempo real" icon:terminal
Intercepta `console.log()`, `console.info()`, `console.warn()` y `console.error()` con formato claro y valores de retorno evaluados.
:::
::: card title="Sandbox HTML y CSS en vivo" icon:layout
Renderiza widgets y componentes interactivos dentro de un panel de vista previa aislado con cambio de pestañas.
:::
::: card title="Integración con docmd-runtime" icon:braces
Acceso directo a la API en cliente `window.docmd` y variables reactivas con `docmd.var.get()` y `docmd.var.set()`.
:::
::: card title="Ultra ligero y rápido" icon:feather
JavaScript y CSS puro (< 10 KB totales) con atajos de teclado (`Cmd+Enter` / `Ctrl+Enter` para ejecutar, `Tab` para indentar).
:::
:::

## Configuración del plugin

Como `@docmd/plugin-playground` es un plugin principal, funciona sin configuración previa. Puede personalizar opciones o desactivarlo en `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "playground": {
      "enabled": true,
      "theme": "default",
      "defaultLayout": "split"
    }
  }
}
```

::: callout tip "Desactivar el plugin" icon:slash
Para desactivar la ejecución de código en todo el sitio, establezca `"playground": false` dentro de `"plugins"` en `docmd.config.json`.
:::
