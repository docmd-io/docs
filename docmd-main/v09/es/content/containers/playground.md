---
title: "Contenedor Playground"
description: "Inserte entornos ejecutables de JavaScript, vistas previas de componentes HTML en vivo, selectores de pestañas Live/Code y scripts activos con el contenedor ::: playground."
---

El contenedor `::: playground` transforma los ejemplos de código estáticos en entornos de pruebas interactivos y autónomos. Los lectores pueden editar el código directamente en el navegador, ejecutarlo con un solo clic o atajo de teclado, inspeccionar salidas estructuradas de la consola, alternar entre el resultado en vivo y el código fuente, y previsualizar componentes HTML/CSS en tiempo real.

::: callout info "Arquitectura Zero-Config" icon:zap
El entorno de ejecución de playground está construido con JavaScript estándar y CSS puro, sin dependencias pesadas. Las páginas que no utilizan playgrounds cargan **0 KB de recursos adicionales**.
:::

## Sintaxis del Contenedor

El contenedor admite bloques con código encerrado, contenedores de autocierre que cargan scripts externos desde su repositorio y bloques de código delimitados estándar.

### 1. Contenedor de Bloque con Código

Encapsule código estándar dentro de un bloque `::: playground`:

````markdown
::: playground title="Explorador de Variables Reactivas" icon:code live
```js
const buildYear = docmd.var.get("docmd.buildYear");
const siteTitle = docmd.var.get("site.title");

console.log("Título del Sitio:", siteTitle);
console.log("Año de Compilación:", buildYear);

// Modificar una variable reactiva del cliente
docmd.var.set("user.plan", "Enterprise");
console.info("Plan de usuario actualizado a:", docmd.var.get("user.plan"));
return `Año actual: ${buildYear}`;
```
:::
````

A continuación se muestra el ejemplo funcional en vivo renderizado directamente por `docmd`:

::: playground title="Explorador de Variables Reactivas" icon:code live
```js
const buildYear = docmd.var.get("docmd.buildYear");
const siteTitle = docmd.var.get("site.title");

console.log("Título del Sitio:", siteTitle);
console.log("Año de Compilación:", buildYear);

// Modificar una variable reactiva del cliente
docmd.var.set("user.plan", "Enterprise");
console.info("Plan de usuario actualizado a:", docmd.var.get("user.plan"));
return `Año actual: ${buildYear}`;
```
:::

### 2. Alternancia de Pestañas Live y Code (`tabs`)

Al habilitar `tabs` (o `mode="tabs"`) en los ajustes del contenedor, la barra de herramientas añade pestañas interactivas **Live** y **Code**, permitiendo a los lectores alternar fluidamente entre la salida del componente y el código fuente:

````markdown
::: playground tabs title="Componente Interactivo (Selector Live & Code)" icon:layout live
```html
<div style="padding: 18px; border-radius: 10px; background: #0f172a; color: #38bdf8; font-family: system-ui, sans-serif; border: 1px solid #1e293b;">
  <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
    <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#10b981;"></span>
    <strong style="color:#f8fafc; font-size:14px;">Modo de Vista Previa por Pestañas Activo</strong>
  </div>
  <p style="margin:0 0 12px 0; font-size:13px; color:#94a3b8; line-height:1.5;">
    Alterne entre la vista <strong>Live</strong> en vivo y la vista <strong>Code</strong> mediante las pestañas de la barra de herramientas superior.
  </p>
  <button style="padding:6px 14px; background:#0284c7; color:#fff; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer;" onclick="console.log('¡Acción activada en vista previa!')">
    Activar Registro en Consola
  </button>
</div>
```
:::
````

Ejemplo funcional en vivo con alternancia de pestañas:

::: playground tabs title="Componente Interactivo (Selector Live & Code)" icon:layout live
```html
<div style="padding: 18px; border-radius: 10px; background: #0f172a; color: #38bdf8; font-family: system-ui, sans-serif; border: 1px solid #1e293b;">
  <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
    <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#10b981;"></span>
    <strong style="color:#f8fafc; font-size:14px;">Modo de Vista Previa por Pestañas Activo</strong>
  </div>
  <p style="margin:0 0 12px 0; font-size:13px; color:#94a3b8; line-height:1.5;">
    Alterne entre la vista <strong>Live</strong> en vivo y la vista <strong>Code</strong> mediante las pestañas de la barra de herramientas superior.
  </p>
  <button style="padding:6px 14px; background:#0284c7; color:#fff; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer;" onclick="console.log('¡Acción activada en vista previa!')">
    Activar Registro en Consola
  </button>
</div>
```
:::

### 3. Contenedor por Pestañas con Inicio en Código (`tabs:code`)

Puede configurar el contenedor para mostrar el código de forma predeterminada mientras mantiene el acceso instantáneo a la pestaña en vivo mediante `tabs:code` o `tabs view="code"`:

````markdown
::: playground tabs:code title="Contenedor con Pestañas (Código Primero)" icon:code live
```js
// Calcular factorial de forma recursiva
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

const num = 5;
const resultado = factorial(num);
console.log(`Factorial de ${num} es:`, resultado);
return resultado;
```
:::
````

Demostración funcional en vivo con vista inicial en código:

::: playground tabs:code title="Contenedor con Pestañas (Código Primero)" icon:code live
```js
// Calcular factorial de forma recursiva
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

const num = 5;
const resultado = factorial(num);
console.log(`Factorial de ${num} es:`, resultado);
return resultado;
```
:::

### 4. Contenedor de Autocierre con Archivo Fuente Activo

En lugar de copiar y pegar código en la documentación, puede vincular directamente archivos de script o componentes de su proyecto mediante el atributo `src`:

```markdown
::: playground src="./snippets/counter.js" title="Script Vinculado Activo" icon:cpu live /:::
```

Ejemplo funcional en vivo que carga [./snippets/counter.js](file:///Users/mac/Workspace/GitHub/docmd-io/docs/docmd-main/v09/es/content/containers/snippets/counter.js):

::: playground src="./snippets/counter.js" title="Script Vinculado Activo" icon:cpu live /:::

::: callout tip "Sincronización Continua de Código" icon:refresh-cw
Al utilizar `src="./ruta/al/archivo"`, `docmd` resuelve el archivo en tiempo de compilación de forma relativa a la página o raíz del espacio de trabajo. Cuando el código fuente del proyecto se actualiza, la documentación se actualiza automáticamente en la siguiente compilación.
:::

### 5. Tolerancia a Fallos ante Scripts Inexistentes

Si la ruta de un script no es válida o ha sido reubicada, `docmd` muestra un banner de advertencia claro y presenta código de reserva limpio sin interrumpir la compilación:

```markdown
::: playground src="./snippets/script-inexistente.js" title="Aviso de Script Faltante" icon:alert-triangle /:::
```

Demostración en vivo de tolerancia a fallos:

::: playground src="./snippets/script-inexistente.js" title="Aviso de Script Faltante" icon:alert-triangle /:::

### 6. Sintaxis de Bloques Delimitados

Para ejemplos rápidos sin contenedores anidados, agregue `playground` a cualquier delimitador de código Markdown:

````markdown
```js playground title="Ejecutor Rápido de Fibonacci" icon:zap
function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

console.log("Fib(10) =", fib(10));
return fib(10);
```
````

Ejemplo delimitado en vivo:

```js playground title="Ejecutor Rápido de Fibonacci" icon:zap
function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

console.log("Fib(10) =", fib(10));
return fib(10);
```

## Atributos del Contenedor

El contenedor `::: playground` admite completos atributos de metadatos:

| Atributo | Tipo | Valor Predeterminado | Descripción |
| :--- | :--- | :--- | :--- |
| `title` | `string` | Derivado o `"Playground"` | Título mostrado en la barra de herramientas. Admite `title:"Mi Título"` o cadenas entre comillas. |
| `src` / `file` | `string` | Ninguno | Ruta relativa a un archivo de código local para cargar en el editor. |
| `icon` | `string` | `"play"` | Nombre de icono Lucide (p. ej. `icon:code`, `icon:cpu`, `icon:layout`). |
| `live` | `boolean` | `false` | Ejecuta el código automáticamente cuando la página se carga. |
| `tabs` / `mode` | `string` \| `boolean` | `false` | Habilita pestañas en la cabecera para alternar entre "Live" y "Code" en panel único de ancho completo. Admite `tabs:code` para iniciar en código. |
| `tab` | `string` | `"console"` o `"preview"` | Pestaña de salida predeterminada (`"preview"` o `"console"`). También admite el atributo `preview`. |
| `nocode` | `boolean` | `false` | Oculta la pestaña de código mostrando directamente la vista previa en vivo (también `code:false`). |
| `readonly` | `boolean` | `false` | Bloquea el editor contra modificaciones permitiendo la ejecución. |
| `layout` | `string` | `"split"` | Disposición visual: `"split"` (lado a lado) o `"stacked"` (vertical). |
| `lang` | `string` | Derivado (`"js"`) | Lenguaje explícito (`js`, `html`, `css`). Deducido de extensiones o bloques de código. |

## Características Interactivas

::: tabs
::: tab "Ejecutor de JavaScript" icon:code
Los playgrounds ejecutan JavaScript en un contexto de evaluación aislado. La consola captura:

* `console.log(...)` — Salidas estándar con resaltado de sintaxis
* `console.info(...)` — Mensajes informativos con indicador azul
* `console.warn(...)` — Avisos de advertencia con indicador ámbar
* `console.error(...)` — Registros de error con indicador rojo y seguimiento de pila
* Expresiones de Retorno — Cualquier expresión final se muestra como valor devuelto: `=> 30`

```js playground title="Demostración de Consola"
console.log("¡Hola desde docmd!");
console.info("Carga útil:", { estado: "activo", versión: "0.9.9" });
console.warn("Aviso: advertencia de prueba");
return "Ejecución completada con éxito";
```
::: /tab

::: tab "Vista Previa de Componentes HTML" icon:layout
Cuando el lenguaje se establece en `html` (mediante ```` ```html playground ```` o `::: playground lang:html`), el playground selecciona automáticamente el panel de **Vista Previa** y renderiza el contenido dentro de un marco aislado:

```html playground title="Botón Interactivo en Vivo" live
<button style="padding: 10px 20px; background: #6366f1; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" onclick="alert('¡Componente pulsado!')">
  Botón Interactivo
</button>
```
::: /tab

::: tab "Integración con docmd-runtime" icon:braces
Los playgrounds tienen acceso total al objeto global `window.docmd` y a las variables reactivas:

* `docmd.var.get('docmd.version')` — Leer variables de compilación o del cliente
* `docmd.var.set('key', 'value')` — Actualizar variables y provocar la reactualización del DOM
* `docmd.theme.get()` / `docmd.theme.toggle()` — Consultar o alternar el tema visual

```js playground title="API de Tema y Variables" live
console.log("Tema Actual:", window.docmd?.theme?.get() || "light");
console.log("Versión de docmd:", window.docmd?.var?.get("docmd.version") || "0.9.9");
console.log("Rama Git:", window.docmd?.var?.get("docmd.gitBranch") || "main");
return "SDK disponible";
```
::: /tab
::: /tabs

## Atajos de Teclado

El editor de playground ofrece atajos de teclado estándar para máxima productividad:

* <kbd class="docmd-kbd">Cmd</kbd> + <kbd class="docmd-kbd">Enter</kbd> (macOS) o <kbd class="docmd-kbd">Ctrl</kbd> + <kbd class="docmd-kbd">Enter</kbd> (Windows/Linux): Ejecutar el código actual
* <kbd class="docmd-kbd">Tab</kbd>: Inserta sangría de 2 espacios sin perder el foco del navegador
* <kbd class="docmd-kbd">Shift</kbd> + <kbd class="docmd-kbd">Tab</kbd>: Elimina la sangría de la línea o selección

## Documentación Relacionada del Plugin

Para conocer detalles técnicos avanzados sobre ganchos de análisis AST, resolución de scripts en tiempo de compilación, gestión de fallos y opciones de configuración global, consulte la **[Referencia y Arquitectura Técnica del Plugin Playground](../../plugins/playground.md)**.