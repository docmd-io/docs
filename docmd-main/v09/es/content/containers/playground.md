---
title: "Contenedor Playground"
description: "Inserte entornos ejecutables de JavaScript, vistas previas de componentes HTML en vivo, selectores de pestañas Live/Code y scripts activos con el contenedor ::: playground."
---

El contenedor `::: playground` transforma los ejemplos de código estáticos en entornos de pruebas interactivos y autónomos. Los lectores pueden editar el código directamente en el navegador, ejecutarlo con un solo clic o atajo de teclado, inspeccionar salidas estructuradas de la consola, alternar entre el resultado en vivo y el código fuente, y previsualizar componentes HTML/CSS en tiempo real.

::: callout info "Arquitectura Zero-Config" icon:zap
El entorno de ejecución de playground está construido con JavaScript estándar y CSS puro, sin dependencias pesadas. Las páginas que no utilizan playgrounds cargan **0 KB de recursos adicionales**.
:::

## Sintaxis del Contenedor

```markdown
# Contenedor de Bloque (Código Encapsulado y Salida)
::: playground [title:"Título"] [icon:NAME] [live] [view:"code"] [tab:"preview"|"console"] [nocode] [readonly]
```js
// Código JavaScript o HTML/CSS
```
::: /playground

# Contenedor de Autocierre (Script Activo del Repositorio)
::: playground src="./snippets/counter.js" [title:"Título"] [icon:NAME] [live] /:::

# Bloque de Código Delimitado Rápido
```js playground [title:"Título"] [icon:NAME] [live]
// Código aquí
```
```

## Características y Atributos Admitidos

| Parámetro / Atributo | Tipo | Valor Predeterminado | Descripción |
| :--- | :--- | :--- | :--- |
| **Título** | `string` \| `title:"..."` | Derivado o `"Playground"` | Título mostrado en la barra de herramientas. Admite `title:"Mi Título"` o cadenas entre comillas. |
| **Archivo Fuente** | `src:RUTA` \| `file:RUTA` | Ninguno | Ruta relativa a un archivo de código local en el repositorio para cargar en el editor. |
| **Iconografía** | `icon:NAME` | `"play"` | Opcional. Nombre de icono [Lucide](external:https://lucide.dev/icons) junto al título (p. ej. `icon:code`, `icon:cpu`, `icon:layout`). |
| **Ejecución Automática** | `live` | `false` | Ejecuta el código automáticamente cuando la página se carga. |
| **Vista Inicial** | `view:"code"` \| `view:"live"` | `"live"` | Modo de visualización inicial activo (`"live"` para salida/vista previa o `"code"` para abrir directamente en el editor). |
| **Pestaña de Salida** | `tab:"preview"` \| `tab:"console"` | `"console"` o `"preview"` | Subpestaña de salida activa (`"preview"` o `"console"`). También admite la etiqueta `preview`. |
| **Modo Sin Código** | `nocode` | `false` | Oculta el botón de código mostrando directamente la vista previa en vivo (también `code:false`). |
| **Solo Lectura** | `readonly` | `false` | Bloquea el editor contra modificaciones permitiendo la ejecución. |
| **Disposición** | `layout:"stacked"` \| `"split"` | `"stacked"` | Disposición visual: panel único con selector Play/Code por defecto o `"split"` para lado a lado. |
| **Lenguaje** | `lang:LENG` | Derivado (`"js"`) | Lenguaje explícito (`js`, `html`, `css`). Deducido de extensiones o bloques de código. |
| **Etiquetas de Cierre** | `::: /playground`, `/:::`, `:::` | Cierre estándar | Admite cierre explícito `::: /playground`, autocierre `/:::`, o cierre genérico `:::`. |

::: callout warning "Aviso de Seguridad y Ejecución de Scripts" icon:shield-alert
Todo el código del playground se ejecuta completamente en el lado del cliente dentro de la sesión del navegador del lector. Las vistas previas de HTML se ejecutan en un iframe aislado con origen opaco (`null`), impidiendo el acceso al DOM o cookies superiores. Al utilizar ejecución automática (`live`), asegúrese de que los fragmentos de código provengan de fuentes de documentación confiables.
:::


## Ejemplos de Uso

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

### 2. Alternancia de Vistas Play y Code

Cada playground incorpora un selector dos-en-uno de **Play** y **Code** en la barra superior. El cuerpo del playground se visualiza en ancho completo como un panel unificado:

````markdown
::: playground title="Componente Interactivo (Selector Play & Code)" icon:layout live
```html
<div style="padding: 18px; border-radius: 10px; background: #0f172a; color: #38bdf8; font-family: system-ui, sans-serif; border: 1px solid #1e293b;">
  <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
    <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#10b981;"></span>
    <strong style="color:#f8fafc; font-size:14px;">Vista Previa Instantánea del Componente</strong>
  </div>
  <p style="margin:0 0 12px 0; font-size:13px; color:#94a3b8; line-height:1.5;">
    Alterne entre la vista <strong>Play</strong> en vivo y la vista <strong>Code</strong> mediante los botones de la barra de herramientas superior.
  </p>
  <button style="padding:6px 14px; background:#0284c7; color:#fff; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer;" onclick="console.log('¡Acción activada en vista previa!')">
    Activar Registro en Consola
  </button>
</div>
```
:::
````

Ejemplo funcional en vivo con alternancia de vistas:

::: playground title="Componente Interactivo (Selector Play & Code)" icon:layout live
```html
<div style="padding: 18px; border-radius: 10px; background: #0f172a; color: #38bdf8; font-family: system-ui, sans-serif; border: 1px solid #1e293b;">
  <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
    <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#10b981;"></span>
    <strong style="color:#f8fafc; font-size:14px;">Vista Previa Instantánea del Componente</strong>
  </div>
  <p style="margin:0 0 12px 0; font-size:13px; color:#94a3b8; line-height:1.5;">
    Alterne entre la vista <strong>Play</strong> en vivo y la vista <strong>Code</strong> mediante los botones de la barra de herramientas superior.
  </p>
  <button style="padding:6px 14px; background:#0284c7; color:#fff; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer;" onclick="console.log('¡Acción activada en vista previa!')">
    Activar Registro en Consola
  </button>
</div>
```
:::

### 3. Contenedor con Inicio en Código (`view="code"`)

Puede configurar el contenedor para mostrar el editor de código de forma predeterminada mediante `view="code"`, manteniendo el acceso directo a la vista Play:

````markdown
::: playground view="code" title="Algoritmo de Factorial (Código Primero)" icon:code live
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

::: playground view="code" title="Algoritmo de Factorial (Código Primero)" icon:code live
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
console.log("Versión de docmd:", window.docmd?.var?.get("docmd.version"));
console.log("Rama Git:", window.docmd?.var?.get("docmd.gitBranch"));
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