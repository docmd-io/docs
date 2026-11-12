---
title: "Playground"
description: "Inserte entornos ejecutables de JavaScript, vistas previas de componentes HTML en vivo, selectores de pestañas Live/Code y scripts activos con el contenedor ::: playground."
---

El contenedor `::: playground` transforma los ejemplos de código estáticos en entornos de pruebas interactivos y autónomos. Los lectores pueden editar el código directamente en el navegador, ejecutarlo con un solo clic o atajo de teclado, inspeccionar salidas estructuradas de la consola, alternar entre el resultado en vivo y el código fuente, y previsualizar componentes HTML/CSS en tiempo real.

::: callout info "Arquitectura Zero-Config" icon:zap
El entorno de ejecución de playground está construido con JavaScript estándar y CSS puro, sin dependencias pesadas. Las páginas que no utilizan playgrounds cargan **0 KB de recursos adicionales**.
:::

## Sintaxis del Contenedor

````markdown
# Contenedor de Bloque Estándar
::: playground [title:"Título de Barra"] [icon:nombre_icono] [live] [view:"code"|"live"] [tab:"preview"|"console"]
// Código JavaScript o HTML/CSS
::: /playground # Cierre explícito del contenedor

# Contenedor de Autocierre con Script Externo
::: playground src="./ruta/al/script.js" [title:"Título de Barra"] [icon:nombre_icono] [live] /:::

# Bloque de Código Delimitado Rápido
```js playground [title:"Título de Barra"] [icon:nombre_icono] [live]
// Código JavaScript
```
````

## Características y Atributos Admitidos

| Parámetro / Atributo | Tipo | Valor Predeterminado | Descripción |
| :--- | :--- | :--- | :--- |
| **Título** | `"String"` \| `title:"..."` | Derivado o `"Playground"` | Título mostrado en la barra de herramientas (1.º parámetro posicional o `title:"..."`). |
| **Archivo Fuente** | `src:RUTA` \| `file:RUTA` | Ninguno | Ruta relativa a un archivo de código local para cargar en el editor. |
| **Iconografía** | `icon:NAME` | `"play"` | Opcional. Nombre de icono [Lucide](external:https://lucide.dev/icons) junto al título (p. ej. `icon:code`, `icon:cpu`, `icon:layout`). |
| **Lenguaje** | `lang:LENG` | Derivado (`"js"`) | Lenguaje explícito (`js`, `html`, `css`). Deducido de extensiones o bloques de código. |
| **Ejecución Automática** | `live` | `false` | Ejecuta el código automáticamente cuando la página se carga. |
| **Vista Inicial** | `view:"code"` \| `view:"live"` | `"live"` | Modo de visualización inicial activo (`"live"` para salida/vista previa o `"code"` para abrir directamente en el editor). |
| **Pestaña de Salida** | `tab:"preview"` \| `tab:"console"` | `"console"` o `"preview"` | Subpestaña de salida activa (`"preview"` o `"console"`). También admite la etiqueta `preview`. |
| **Modo Sin Código** | `nocode` | `false` | Oculta el botón de código mostrando directamente la vista previa en vivo (también `code:false`). |
| **Solo Lectura** | `readonly` | `false` | Bloquea el editor contra modificaciones permitiendo la ejecución. |
| **Disposición** | `layout:"stacked"` \| `"split"` | `"stacked"` | Disposición visual: panel único con selector Play/Code por defecto o `"split"` para lado a lado. |
| **Etiquetas de Cierre** | `::: /playground`, `/:::`, `:::` | Cierre estándar | Admite cierre explícito `::: /playground`, autocierre `/:::`, o cierre genérico `:::`. |

::: callout warning "Aviso de Seguridad y Ejecución de Scripts" icon:shield-alert
Todo el código del playground se ejecuta completamente en el lado del cliente dentro de la sesión del navegador del lector. Las vistas previas de HTML se ejecutan en un iframe aislado con origen opaco (`null`), impidiendo el acceso al DOM o cookies superiores. Al utilizar ejecución automática (`live`), asegúrese de que los fragmentos de código provengan de fuentes de documentación confiables.
:::

## Ejemplos de Uso

### Ejecución Interactiva de JavaScript

Playground de bloque estándar demostrando `console.log`, `console.info`, `console.warn` y valores de retorno:

````markdown
::: playground title="Demostración de Consola y Retorno" icon:code live
```js
console.log("¡Hola desde docmd!");
console.info("Carga útil de estado:", { status: "active", version: "0.9.9" });
console.warn("Aviso: advertencia de prueba");
return "Ejecución completada con éxito";
```
::: /playground
````

::: playground title="Demostración de Consola y Retorno" icon:code live
```js
console.log("¡Hola desde docmd!");
console.info("Carga útil de estado:", { status: "active", version: "0.9.9" });
console.warn("Aviso: advertencia de prueba");
return "Ejecución completada con éxito";
```
::: /playground

### Vista Previa de Componentes HTML en Vivo

Cuando el lenguaje se establece en `html` (o `lang:html`), el playground selecciona automáticamente el panel de **Vista Previa** y procesa el HTML/CSS dentro de un marco aislado:

````markdown
::: playground title="Vista Previa de Componente Interactivo" icon:layout live
```html
<div style="padding: 18px; border-radius: 10px; background: #0f172a; color: #38bdf8; font-family: system-ui, sans-serif; border: 1px solid #1e293b;">
  <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
    <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#10b981;"></span>
    <strong style="color:#f8fafc; font-size:14px;">Vista Previa Instantánea</strong>
  </div>
  <p style="margin:0 0 12px 0; font-size:13px; color:#94a3b8; line-height:1.5;">
    Alterne entre la representación en vivo en <strong>Play</strong> y la vista de <strong>Code</strong> mediante el selector de la barra de herramientas.
  </p>
  <button style="padding:6px 14px; background:#0284c7; color:#fff; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer;" onclick="console.log('¡Acción disparada desde la vista previa!')">
    Disparar Registro de Consola
  </button>
</div>
```
::: /playground
````

::: playground title="Vista Previa de Componente Interactivo" icon:layout live
```html
<div style="padding: 18px; border-radius: 10px; background: #0f172a; color: #38bdf8; font-family: system-ui, sans-serif; border: 1px solid #1e293b;">
  <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
    <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#10b981;"></span>
    <strong style="color:#f8fafc; font-size:14px;">Vista Previa Instantánea</strong>
  </div>
  <p style="margin:0 0 12px 0; font-size:13px; color:#94a3b8; line-height:1.5;">
    Alterne entre la representación en vivo en <strong>Play</strong> y la vista de <strong>Code</strong> mediante el selector de la barra de herramientas.
  </p>
  <button style="padding:6px 14px; background:#0284c7; color:#fff; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer;" onclick="console.log('¡Acción disparada desde la vista previa!')">
    Disparar Registro de Consola
  </button>
</div>
```
::: /playground

### Variables Reactivas e Integración con docmd Runtime

Los playgrounds tienen acceso al objeto global de tiempo de ejecución `window.docmd` y a las variables reactivas:

````markdown
::: playground title="Explorador de Variables Reactivas" icon:sparkles live
```js
const buildYear = docmd.var.get("docmd.buildYear");
const siteTitle = docmd.var.get("site.title");

console.log("Título del Sitio:", siteTitle);
console.log("Año de Compilación:", buildYear);

// Modificar una variable reactiva del cliente
docmd.var.set("user.plan", "Enterprise");
console.info("Plan actualizado a:", docmd.var.get("user.plan"));
return `Año Actual: ${buildYear}`;
```
::: /playground
````

::: playground title="Explorador de Variables Reactivas" icon:sparkles live
```js
const buildYear = docmd.var.get("docmd.buildYear");
const siteTitle = docmd.var.get("site.title");

console.log("Título del Sitio:", siteTitle);
console.log("Año de Compilación:", buildYear);

// Modificar una variable reactiva del cliente
docmd.var.set("user.plan", "Enterprise");
console.info("Plan actualizado a:", docmd.var.get("user.plan"));
return `Año Actual: ${buildYear}`;
```
::: /playground

### Vista Inicial con Código Primero (`view:"code"`)

Configure el playground para que se abra directamente en el editor de código al cargar la página, manteniendo accesible el selector de reproducción:

````markdown
::: playground view:"code" title="Algoritmo Factorial (Código Primero)" icon:code live
```js
// Calcular factorial recursivamente
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

const num = 5;
const result = factorial(num);
console.log(`Factorial de ${num} es:`, result);
return result;
```
::: /playground
````

::: playground view:"code" title="Algoritmo Factorial (Código Primero)" icon:code live
```js
// Calcular factorial recursivamente
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

const num = 5;
const result = factorial(num);
console.log(`Factorial de ${num} es:`, result);
return result;
```
::: /playground

### Script Activo del Repositorio (`src`)

Enlace directamente a un script activo en su repositorio usando el atributo `src`:

````markdown
::: playground src="./snippets/counter.js" title="Script Activo del Repositorio" icon:cpu live /:::
````

::: playground src="./snippets/counter.js" title="Script Activo del Repositorio" icon:cpu live /:::

::: callout tip "Sincronización Continua de Código" icon:refresh-cw
Al utilizar `src="./ruta/al/archivo"`, `docmd` resuelve el archivo en tiempo de compilación de forma relativa a la página de documentación o a la raíz del espacio de trabajo. Cuando el código base se actualiza, la documentación se refresca automáticamente en la siguiente compilación. Si falta un archivo, se muestra una advertencia sin interrumpir el proceso de compilación.
:::

### Bloque de Código Delimitado Rápido

Para fragmentos breves sin anidamiento de contenedores, añada `playground` directamente a cualquier bloque de código delimitado estándar:

````markdown
```js playground title="Ejecutor Rápido de Fibonacci" icon:zap
function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

console.log("Fib(10) =", fib(10));
return fib(10);
```
````

```js playground title="Ejecutor Rápido de Fibonacci" icon:zap
function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

console.log("Fib(10) =", fib(10));
return fib(10);
```

## Atajos de Teclado

El editor de playground ofrece atajos de teclado estándar:

| Atajo | Descripción |
| :--- | :--- |
| <kbd class="docmd-kbd">Cmd</kbd> + <kbd class="docmd-kbd">Enter</kbd> / <kbd class="docmd-kbd">Ctrl</kbd> + <kbd class="docmd-kbd">Enter</kbd> | Ejecuta el bloque de código activo. |
| <kbd class="docmd-kbd">Tab</kbd> | Inserta una sangría de 2 espacios en lugar de cambiar el foco del navegador. |
| <kbd class="docmd-kbd">Shift</kbd> + <kbd class="docmd-kbd">Tab</kbd> | Elimina la sangría de la línea actual o selección. |

## Documentación Relacionada

Para detalles técnicos profundos sobre hooks de análisis AST, resolución de scripts en tiempo de compilación y opciones de configuración global del plugin, consulte la **[Arquitectura y Referencia Técnica del Plugin Playground](../../plugins/playground.md)**.