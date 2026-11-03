---
title: "Plugin Playground"
description: "Entorno interactivo de ejecución de código y componentes con captura de consola en tiempo real, vistas previas de HTML y contenedores Markdown sin configuración."
---

El plugin `@docmd/plugin-playground` incorpora bloques de código ejecutables e interactivos y vistas previas de componentes en vivo directamente en su sitio `docmd`. Permite a los autores de documentación insertar ejecuciones autónomas de JavaScript, componentes HTML/CSS y archivos de script reales de su repositorio sin dependencias pesadas como Monaco o React.

::: callout success "Plugin Principal Incluido con @docmd/core" icon:zap
A partir de **v0.9.9**, `@docmd/plugin-playground` se incluye directamente con `@docmd/core` y está activado de forma predeterminada. Gracias a la carga condicional de recursos de `docmd`, las páginas sin bloques de playground cargan **0 KB de recursos adicionales**.
:::

## Características Principales

::: grids
::: card "Activación Zero-Config" icon:play
Utilice ```` ```js playground ```` o `::: playground` para desplegar inmediatamente un entorno interactivo sin configuración previa.
:::
::: card "Incrustación de Archivos Activos" icon:file-code
Vincule scripts reales de su repositorio mediante `::: playground src="./snippets/demo.js" /:::` para mantener la documentación sincronizada automáticamente con el proyecto.
:::
::: card "Captura de Consola en Tiempo Real" icon:terminal
Intercepta `console.log()`, `console.info()`, `console.warn()` y `console.error()` en tiempo real y muestra los valores devueltos de forma clara.
:::
::: card "Sandbox de HTML y CSS en Vivo" icon:layout
Renderiza componentes visuales en un panel de vista previa aislado con alternancia sencilla entre consola y vista previa.
:::
::: card "Integración con docmd-runtime" icon:braces
Acceso directo al entorno de ejecución `window.docmd` y a las variables reactivas mediante `docmd.var.get()` y `docmd.var.set()`.
:::
::: card "Selector de Vista Live y Code" icon:columns
Pestañas interactivas en la barra de herramientas superior para alternar fluidamente entre la salida visual y el código fuente en un panel único limpio (`tabs`).
:::
::: card "Tolerancia a Fallos y Avisos" icon:shield-alert
Los scripts faltantes muestran un banner de aviso sin interrumpir la compilación; las excepciones de ejecución se reportan con claridad en la consola.
:::
::: card "Ultra Ligero y Rápido" icon:feather
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

## Arquitectura Técnica e Información Interna

El plugin Playground está diseñado con una arquitectura ligera sin dependencias externas:

```mermaid
flowchart TD
    MD[Fuente Markdown] --> AST[Analizador AST Markdown-It]
    AST --> Check{¿Contiene Playground?}
    Check -->|No| Clean[0 KB de recursos adicionales]
    Check -->|Sí| Assets[Cargar docmd-playground.css & js]
    AST --> SourceCheck{¿Tiene atributo src?}
    SourceCheck -->|Sí| ReadFile[Resolver e incorporar script local]
    SourceCheck -->|No| ParseFence[Analizar bloque de código inline]
    ReadFile -->|Archivo no encontrado| WarnBlock[Emitir banner de advertencia]
    ReadFile -->|Éxito| Container[Generar HTML del contenedor]
    ParseFence --> Container
    Container --> Browser[Navegador del cliente]
    Browser --> Exec[Sandbox de ejecución y proxy de consola]
    Browser --> RT[Reactividad docmd-runtime docmd.var]
```

### 1. Intercepción AST en Tiempo de Compilación
- **Ganchos de Contenedor y Bloques**: Registra reglas de procesamiento para `playground` en `markdown-it`.
- **Carga Condicional de Recursos**: Solo las páginas que contienen bloques de playground inyectan los estilos y scripts correspondientes.

### 2. Motor de Resolución de Scripts con `src`
- Resuelve rutas relativas al documento activo o a la raíz del proyecto.
- Si un archivo no se encuentra, genera una alerta estructurada (`.docmd-playground-missing-alert`) sin detener el proceso de compilación.

### 3. Entorno de Ejecución Sandbox
- Intercepta llamadas a `console.log`, `info`, `warn` y `error`, mostrándolas con formato en el panel de resultados.
- Totalmente integrado con `docmd-runtime` (`docmd.var.get()`, `docmd.var.set()`).

::: callout info "Modelo de Aislamiento y Seguridad" icon:shield-check
- **Ejecución Exclusiva en el Cliente**: No existe ejecución en el servidor ni superficie de ataque en el backend; todo el código se ejecuta en el navegador del lector.
- **Aislamiento por Iframe**: Las vistas previas de HTML se ejecutan en un iframe aislado con `sandbox="allow-scripts allow-modals allow-forms"` sin `allow-same-origin`, bloqueando el acceso a cookies, LocalStorage y DOM de la página principal.
- **Aislamiento de Dominio**: Como práctica recomendada para producción, aloje la documentación en un subdominio dedicado (por ejemplo, `docs.ejemplo.com`).
:::


## Ejemplos Basados en Scripts y Flujos de Trabajo

### Ejemplo de Script 1: Enlace a Scripts Locales con `src`

```markdown
::: playground src="./snippets/demo.js" title="Script Vinculado" icon:cpu live /:::
```

::: playground src="./snippets/demo.js" title="Script Vinculado" icon:cpu live /:::

### Ejemplo de Script 2: Vista Previa de Componentes HTML y CSS

Los playgrounds renderizan componentes interactivos directamente en el sandbox del navegador. Los lectores visualizan la interfaz en la pestaña **Play** y pueden alternar a **Code** para examinar el código:

````markdown
::: playground title="Tarjeta Interactiva de Notificación" icon:bell live
```html
<div style="padding: 16px; border-radius: 8px; background: #0f172a; border: 1px solid #1e293b; color: #f8fafc; font-family: system-ui, sans-serif;">
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
    <strong style="color: #38bdf8; font-size: 14px;">Notificación en Tiempo Real</strong>
    <span style="font-size: 11px; background: #0369a1; padding: 2px 8px; border-radius: 10px; color: white;">En línea</span>
  </div>
  <p style="margin: 0 0 12px 0; font-size: 13px; color: #94a3b8; line-height: 1.4;">
    Alterne entre las vistas <strong>Play</strong> y <strong>Code</strong> en la barra superior para explorar o modificar el código fuente.
  </p>
  <button style="padding: 6px 14px; background: #10b981; color: white; border: none; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer;" onclick="alert('¡Acción de notificación ejecutada!')">
    Confirmar Acción
  </button>
</div>
```
:::
````

Componente renderizado en vivo:

::: playground title="Tarjeta Interactiva de Notificación" icon:bell live
```html
<div style="padding: 16px; border-radius: 8px; background: #0f172a; border: 1px solid #1e293b; color: #f8fafc; font-family: system-ui, sans-serif;">
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
    <strong style="color: #38bdf8; font-size: 14px;">Notificación en Tiempo Real</strong>
    <span style="font-size: 11px; background: #0369a1; padding: 2px 8px; border-radius: 10px; color: white;">En línea</span>
  </div>
  <p style="margin: 0 0 12px 0; font-size: 13px; color: #94a3b8; line-height: 1.4;">
    Alterne entre las vistas <strong>Play</strong> y <strong>Code</strong> en la barra superior para explorar o modificar el código fuente.
  </p>
  <button style="padding: 6px 14px; background: #10b981; color: white; border: none; border-radius: 6px; font-size: 12px; font-weight: 600; cursor: pointer;" onclick="alert('¡Acción de notificación ejecutada!')">
    Confirmar Acción
  </button>
</div>
```
:::

### Ejemplo de Script 3: Ejecución de Scripts con Salida por Consola

Ejecute scripts de JavaScript en un sandbox del cliente con captura de `console.log`, `info` y valores devueltos:

::: playground title="Agregador de Métricas del Cliente" icon:cpu live
```js
const buildYear = window.docmd?.var?.get("docmd.buildYear") || 2026;
const version = window.docmd?.var?.get("docmd.version") || "0.9.9";

console.log("Versión del motor Docmd:", version);
console.info("Año de compilación:", buildYear);
console.info("Entorno activo: Sandbox del cliente en navegador");

return `Estado del sistema: Operativo (v${version})`;
```
:::

## Documentación Relacionada

* **[Documentación del Contenedor Playground](../content/containers/playground.md)**: Sintaxis completa de contenedores, pestañas, opciones de diseño y ejemplos.
* **[Variables y Personalización](../variables/overview.md)**: Integración con `docmd-runtime` para reactividad en cliente.
* **[Resumen de Contenedores](../content/containers/index.md)**: Catálogo de todos los contenedores nativos en `docmd`.