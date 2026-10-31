---
title: "Plugin Playground"
description: "Entorno interactivo de ejecución de código y componentes con captura de consola en tiempo real, vistas previas de HTML y contenedores Markdown sin configuración."
---

El plugin `@docmd/plugin-playground` incorpora bloques de código ejecutables e interactivos y vistas previas de componentes en vivo directamente en su sitio `docmd`. Permite a los autores de documentación insertar ejecuciones autónomas de JavaScript, componentes HTML/CSS y archivos de script reales de su repositorio sin dependencias pesadas como Monaco o React.

::: callout success "Plugin Principal Incluido con @docmd/core" icon:zap
A partir de **v0.9.9**, `@docmd/plugin-playground` se incluye directamente con `@docmd/core` y está activado de forma predeterminada. Gracias a la carga condicional de recursos de `docmd`, las páginas sin bloques de playground cargan **0 KB de recursos adicionales**.
:::

## Características Principales

::: cards
::: card title="Activación Zero-Config" icon:play
Utilice ` ```js playground ` o `::: playground` para desplegar inmediatamente un entorno interactivo sin configuración previa.
:::
::: card title="Incrustación de Archivos Activos" icon:file-code
Vincule scripts reales de su repositorio mediante `::: playground src="./counter.js" /:::` para mantener la documentación sincronizada automáticamente con el proyecto.
:::
::: card title="Captura de Consola en Tiempo Real" icon:terminal
Intercepta `console.log()`, `console.info()`, `console.warn()` y `console.error()` en tiempo real y muestra los valores devueltos de forma clara.
:::
::: card title="Sandbox de HTML y CSS en Vivo" icon:layout
Renderiza componentes visuales en un panel de vista previa aislado con alternancia sencilla entre consola y vista previa.
:::
::: card title="Integración con docmd-runtime" icon:braces
Acceso directo al entorno de ejecución `window.docmd` y a las variables reactivas mediante `docmd.var.get()` y `docmd.var.set()`.
:::
::: card title="Selector de Vista Live y Code" icon:columns
Pestañas interactivas en la barra de herramientas superior para alternar fluidamente entre la salida visual y el código fuente (`tabs`).
:::
::: card title="Tolerancia a Fallos y Avisos" icon:shield-alert
Los scripts faltantes muestran un banner de aviso sin interrumpir la compilación; las excepciones de ejecución se reportan con claridad en la consola.
:::
::: card title="Ultra Ligero y Rápido" icon:feather
Construido exclusivamente con JavaScript y CSS estándar (< 10 KB en total) con atajos de teclado (`Cmd+Enter` / `Ctrl+Enter` para ejecutar, `Tab` para sangría).
:::
:::

## Configuración del Plugin

Al ser un plugin principal, no se requiere configuración para comenzar a utilizarlo. No obstante, puede personalizar los ajustes globales o desactivarlo en `docmd.config.json`:

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

### Opciones de Configuración

| Opción | Tipo | Valor Predeterminado | Descripción |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | Habilita o deshabilita la generación de playgrounds de forma global. |
| `theme` | `string` | `"default"` | Tema visual según el diseño de `docmd` activo (`default`, `dark`, `light`). |
| `defaultLayout` | `string` | `"split"` | Disposición predeterminada (`split` para lado a lado o `stacked` para vertical). |

::: callout tip "Desactivación del Plugin" icon:slash
Para desactivar la ejecución de código en el cliente en todo el sitio, configure `"playground": false` bajo `"plugins"` en `docmd.config.json`. Todos los bloques de playground se representarán como bloques de código resaltados estándar.
:::

## Opciones de Uso

`docmd` admite múltiples modalidades para redactar playgrounds:

1. **[Guía de Sintaxis de Contenedores](../content/containers/playground.md)**: Recomendada para configuraciones flexibles con `title`, `icon`, `live`, `tabs`, `readonly` e incrustación de scripts vía `src="..."`.
2. **Bloques Delimitados Estándar**: Utilice ` ```js playground ` o ` ```html playground ` para ejemplos rápidos en línea.
3. **Contenedores de Autocierre**: Utilice `::: playground src="..." /:::` para vincular archivos directamente desde su código fuente.

Para consultar la referencia completa de sintaxis y ejemplos interactivos en vivo, visite la **[Referencia del Contenedor Playground](../content/containers/playground.md)**.