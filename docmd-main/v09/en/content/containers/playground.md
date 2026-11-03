---
title: "Playground"
description: "Embed runnable JavaScript environments, live HTML component previews, tabbed Live/Code toggles, and active codebase scripts using the ::: playground container."
---

The `::: playground` container turns static code examples into interactive, self-contained sandboxes. Readers can edit code in place, execute it with a single click or keyboard shortcut, inspect structured console outputs, toggle between live component outputs and underlying code, and preview live HTML/CSS components.

::: callout info "Zero-Config Architecture" icon:zap
The playground runtime is built using pure vanilla JavaScript and CSS, requiring no heavyweight frameworks. Pages that do not use playgrounds load zero extra bytes.
:::

## Container Syntax

````markdown
# Standard Block Container
::: playground [title:"Toolbar Title"] [icon:icon_name] [live] [view:"code"|"live"] [tab:"preview"|"console"]
// JavaScript or HTML/CSS code snippet
::: /playground # Explicit container closer

# Self-Closing Sourced Script
::: playground src="./path/to/script.js" [title:"Toolbar Title"] [icon:icon_name] [live] /:::

# Shorthand Fenced Code Block
```js playground [title:"Toolbar Title"] [icon:icon_name] [live]
// JavaScript code snippet
```
````

## Features & Supported Attributes

| Parameter / Attribute | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **Title** | `"String"` \| `title:"..."` | Derived or `"Playground"` | Toolbar heading label (positional 1st parameter or `title:"..."`). |
| **Source File** | `src:PATH` \| `file:PATH` | None | Relative path to an external script file to inline into the playground editor. |
| **Iconography** | `icon:NAME` | `"play"` | Optional. [Lucide](external:https://lucide.dev/icons) icon name rendered next to the title (e.g. `icon:code`, `icon:cpu`, `icon:layout`). |
| **Language** | `lang:LANG` | Derived (`"js"`) | Explicit language override (`js`, `html`, `css`). Inferred from file extensions or inner code fences. |
| **Auto-Execution** | `live` | `false` | When present, executes the code automatically when the page loads. |
| **Initial View** | `view:"code"` \| `view:"live"` | `"live"` | Active initial view mode (`"live"` for output/preview or `"code"` to open directly in the editor). |
| **Output Sub-Tab** | `tab:"preview"` \| `tab:"console"` | `"console"` or `"preview"` | Active output sub-tab to display (`"preview"` or `"console"`). Bare `preview` flag is also supported. |
| **No-Code Mode** | `nocode` | `false` | When present (or `code:false`), hides the "Code" button from the header switcher, presenting only the Live preview. |
| **Read-Only** | `readonly` | `false` | Locks the code editor against user editing while allowing code execution. |
| **Layout** | `layout:"stacked"` \| `"split"` | `"stacked"` | Sets the layout presentation: unified single-panel view with Play/Code switcher by default, or `"split"` for side-by-side. |
| **Closing Tags** | `::: /playground`, `/:::`, `:::` | Standard closing | Supports explicit closing tag `::: /playground`, self-closing `/:::`, or generic `:::`. |

::: callout warning "Security Notice & Script Execution" icon:shield-alert
All playground code runs entirely client-side inside the reader's browser session. HTML previews execute inside a sandboxed iframe with an opaque origin (`null`), preventing access to parent DOM or cookies. When using `live` auto-execution, ensure code snippets originate from trusted documentation sources.
:::

## Usage Examples

### Interactive JavaScript Runner

Standard block playground demonstrating `console.log`, `console.info`, `console.warn`, and expression returns:

````markdown
::: playground title="JavaScript Console & Return Demo" icon:code live
```js
console.log("Hello from docmd!");
console.info("Status payload:", { status: "active", version: "0.9.9" });
console.warn("Notice: demo warning");
return "Execution completed successfully";
```
::: /playground
````

::: playground title="JavaScript Console & Return Demo" icon:code live
```js
console.log("Hello from docmd!");
console.info("Status payload:", { status: "active", version: "0.9.9" });
console.warn("Notice: demo warning");
return "Execution completed successfully";
```
::: /playground

### Live HTML Component Preview

When the playground language is set to `html` (or `lang:html`), the playground automatically selects the **Preview** panel and renders the HTML/CSS inside a sandboxed frame:

````markdown
::: playground title="Interactive Component Preview" icon:layout live
```html
<div style="padding: 18px; border-radius: 10px; background: #0f172a; color: #38bdf8; font-family: system-ui, sans-serif; border: 1px solid #1e293b;">
  <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
    <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#10b981;"></span>
    <strong style="color:#f8fafc; font-size:14px;">Instant Component Preview</strong>
  </div>
  <p style="margin:0 0 12px 0; font-size:13px; color:#94a3b8; line-height:1.5;">
    Switch between the <strong>Play</strong> live rendering and <strong>Code</strong> view using the toolbar switcher.
  </p>
  <button style="padding:6px 14px; background:#0284c7; color:#fff; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer;" onclick="console.log('Action triggered from component preview!')">
    Trigger Console Log
  </button>
</div>
```
::: /playground
````

::: playground title="Interactive Component Preview" icon:layout live
```html
<div style="padding: 18px; border-radius: 10px; background: #0f172a; color: #38bdf8; font-family: system-ui, sans-serif; border: 1px solid #1e293b;">
  <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
    <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#10b981;"></span>
    <strong style="color:#f8fafc; font-size:14px;">Instant Component Preview</strong>
  </div>
  <p style="margin:0 0 12px 0; font-size:13px; color:#94a3b8; line-height:1.5;">
    Switch between the <strong>Play</strong> live rendering and <strong>Code</strong> view using the toolbar switcher.
  </p>
  <button style="padding:6px 14px; background:#0284c7; color:#fff; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer;" onclick="console.log('Action triggered from component preview!')">
    Trigger Console Log
  </button>
</div>
```
::: /playground

### Reactive Variables & docmd Runtime Integration

Playgrounds have access to the global `window.docmd` runtime object and reactive variables:

````markdown
::: playground title="Reactive Variable Explorer" icon:sparkles live
```js
const buildYear = docmd.var.get("docmd.buildYear");
const siteTitle = docmd.var.get("site.title");

console.log("Site Title:", siteTitle);
console.log("Build Year:", buildYear);

// Modify a client-side reactive variable
docmd.var.set("user.plan", "Enterprise");
console.info("Updated user plan to:", docmd.var.get("user.plan"));
return `Current Year: ${buildYear}`;
```
::: /playground
````

::: playground title="Reactive Variable Explorer" icon:sparkles live
```js
const buildYear = docmd.var.get("docmd.buildYear");
const siteTitle = docmd.var.get("site.title");

console.log("Site Title:", siteTitle);
console.log("Build Year:", buildYear);

// Modify a client-side reactive variable
docmd.var.set("user.plan", "Enterprise");
console.info("Updated user plan to:", docmd.var.get("user.plan"));
return `Current Year: ${buildYear}`;
```
::: /playground

### Code-First Initial View (`view:"code"`)

Configure the playground to open directly in the code editor on page load while keeping the instant "Play" toggle accessible:

````markdown
::: playground view:"code" title="Factorial Algorithm (Code First)" icon:code live
```js
// Compute factorial recursively
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

const num = 5;
const result = factorial(num);
console.log(`Factorial of ${num} is:`, result);
return result;
```
::: /playground
````

::: playground view:"code" title="Factorial Algorithm (Code First)" icon:code live
```js
// Compute factorial recursively
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

const num = 5;
const result = factorial(num);
console.log(`Factorial of ${num} is:`, result);
return result;
```
::: /playground

### Active Sourced Script (`src`)

Link directly to an active script in your repository using the `src` attribute:

````markdown
::: playground src="./snippets/counter.js" title="Active Sourced Script" icon:cpu live /:::
````

::: playground src="./snippets/counter.js" title="Active Sourced Script" icon:cpu live /:::

::: callout tip "Continuous Code Synchronisation" icon:refresh-cw
When using `src="./path/to/file"`, `docmd` resolves the file at build time relative to your documentation page or workspace root. When your codebase updates, your documentation examples update automatically on the next build without manual edits. If a source file is missing or relocated, `docmd` displays a graceful warning banner without failing the build.
:::

### Shorthand Fenced Code Block

For quick snippets without container block nesting, append `playground` directly to any standard Markdown code fence:

````markdown
```js playground title="Quick Fibonacci Runner" icon:zap
function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

console.log("Fib(10) =", fib(10));
return fib(10);
```
````

```js playground title="Quick Fibonacci Runner" icon:zap
function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

console.log("Fib(10) =", fib(10));
return fib(10);
```

## Keyboard Shortcuts

The playground editor provides standard IDE keyboard shortcuts for rapid iteration:

| Shortcut | Description |
| :--- | :--- |
| <kbd class="docmd-kbd">Cmd</kbd> + <kbd class="docmd-kbd">Enter</kbd> / <kbd class="docmd-kbd">Ctrl</kbd> + <kbd class="docmd-kbd">Enter</kbd> | Run the active code block. |
| <kbd class="docmd-kbd">Tab</kbd> | Inserts a 2-space indentation instead of shifting browser focus. |
| <kbd class="docmd-kbd">Shift</kbd> + <kbd class="docmd-kbd">Tab</kbd> | Un-indents the current line or selection. |

## Related Documentation

For deep technical details on AST parsing hooks, build-time script resolution, graceful error handling mechanics, and global plugin configuration options, see the **[Playground Plugin Architecture & Technical Reference](../../plugins/playground.md)**.