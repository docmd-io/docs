---
title: "Playground Container"
description: "Embed runnable JavaScript environments, live HTML component previews, tabbed Live/Code toggles, and active codebase scripts using the ::: playground container."
---

The `::: playground` container turns static code examples into interactive, self-contained sandboxes. Readers can edit code in place, execute it with a single click or keyboard shortcut, inspect structured console outputs, toggle between live component outputs and underlying code, and preview live HTML/CSS components.

::: callout info "Zero-Config Architecture" icon:zap
The playground runtime is built using pure vanilla JavaScript and CSS, requiring no heavyweight frameworks. Pages that do not use playgrounds load zero extra bytes.
:::

## Container Syntax

The container supports block containers with enclosed code, self-closing containers that load external script files directly from your repository, and quick fenced code blocks.

### 1. Block Container with Enclosed Code

Wrap standard code inside a `::: playground` block:

````markdown
::: playground title="Reactive Variable Explorer" icon:code live
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
:::
````

Here is the live working example rendered directly by `docmd`:

::: playground title="Reactive Variable Explorer" icon:code live
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
:::

### 2. Live and Code Tab Switching (`tabs`)

When `tabs` (or `mode="tabs"`) is enabled in the container settings, the header renders interactive **Live** and **Code** tabs, allowing readers to toggle seamlessly between the running component output and the underlying source code:

````markdown
::: playground tabs title="Interactive Component (Live & Code Switcher)" icon:layout live
```html
<div style="padding: 18px; border-radius: 10px; background: #0f172a; color: #38bdf8; font-family: system-ui, sans-serif; border: 1px solid #1e293b;">
  <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
    <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#10b981;"></span>
    <strong style="color:#f8fafc; font-size:14px;">Tabbed Preview Mode Active</strong>
  </div>
  <p style="margin:0 0 12px 0; font-size:13px; color:#94a3b8; line-height:1.5;">
    Switch between the <strong>Live</strong> rendering and <strong>Code</strong> view using the tabs in the top-right toolbar.
  </p>
  <button style="padding:6px 14px; background:#0284c7; color:#fff; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer;" onclick="console.log('Action triggered from tabbed component preview!')">
    Trigger Console Log
  </button>
</div>
```
:::
````

Here is the live working container with tab switching enabled:

::: playground tabs title="Interactive Component (Live & Code Switcher)" icon:layout live
```html
<div style="padding: 18px; border-radius: 10px; background: #0f172a; color: #38bdf8; font-family: system-ui, sans-serif; border: 1px solid #1e293b;">
  <div style="display:flex; align-items:center; gap:8px; margin-bottom:8px;">
    <span style="display:inline-block; width:10px; height:10px; border-radius:50%; background:#10b981;"></span>
    <strong style="color:#f8fafc; font-size:14px;">Tabbed Preview Mode Active</strong>
  </div>
  <p style="margin:0 0 12px 0; font-size:13px; color:#94a3b8; line-height:1.5;">
    Switch between the <strong>Live</strong> rendering and <strong>Code</strong> view using the tabs in the top-right toolbar.
  </p>
  <button style="padding:6px 14px; background:#0284c7; color:#fff; border:none; border-radius:6px; font-size:12px; font-weight:600; cursor:pointer;" onclick="console.log('Action triggered from tabbed component preview!')">
    Trigger Console Log
  </button>
</div>
```
:::

### 3. Tabbed Container Starting on Code View (`tabs:code`)

You can configure the container to present the code by default while retaining the instant "Live" switcher by specifying `tabs:code` or `tabs view="code"`:

````markdown
::: playground tabs:code title="Tabbed Container (Code First)" icon:code live
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
:::
````

Live working example starting in code view:

::: playground tabs:code title="Tabbed Container (Code First)" icon:code live
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
:::

### 4. Self-Closing Container with Active File Source

Rather than copying and pasting code from your source files into documentation, you can link directly to an active script or component file in your codebase using the `src` attribute:

```markdown
::: playground src="./snippets/counter.js" title="Active Sourced Script" icon:cpu live /:::
```

Here is the live working example sourcing [./snippets/counter.js](file:///Users/mac/Workspace/GitHub/docmd-io/docs/docmd-main/v09/en/content/containers/snippets/counter.js):

::: playground src="./snippets/counter.js" title="Active Sourced Script" icon:cpu live /:::

::: callout tip "Continuous Code Synchronisation" icon:refresh-cw
When using `src="./path/to/file"`, `docmd` resolves the file at build time relative to your documentation page or workspace root. When your codebase updates, your documentation examples update automatically on the next build without manual edits.
:::

### 5. Graceful Warning on Missing Script Source

If a source script path is invalid or has been relocated, `docmd` displays a clear warning banner and prints clean fallback code in the editor without failing the build:

```markdown
::: playground src="./snippets/missing-script.js" title="Missing Script Graceful Warning" icon:alert-triangle /:::
```

Live working demonstration of graceful warning handling:

::: playground src="./snippets/missing-script.js" title="Missing Script Graceful Warning" icon:alert-triangle /:::

### 6. Fenced Code Block Syntax

For quick examples without container nesting, add `playground` to any Markdown code fence:

````markdown
```js playground title="Quick Fibonacci Runner" icon:zap
function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

console.log("Fib(10) =", fib(10));
return fib(10);
```
````

Live working fenced code block:

```js playground title="Quick Fibonacci Runner" icon:zap
function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

console.log("Fib(10) =", fib(10));
return fib(10);
```

## Container Attributes

The `::: playground` container supports rich metadata attributes:

| Attribute | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | Derived or `"Playground"` | The heading displayed in the playground toolbar. Supports `title:"My Title"` or quoted strings. |
| `src` / `file` | `string` | None | Relative path to a local code file to inline into the playground editor. |
| `icon` | `string` | `"play"` | Lucide icon name rendered next to the title (e.g. `icon:code`, `icon:cpu`, `icon:layout`). Defaults to the play icon. |
| `live` | `boolean` | `false` | When present, executes the code automatically when the page loads. |
| `tabs` / `mode` | `string` \| `boolean` | `false` | Enables header view switching between "Live" and "Code" in a full-width single panel view. Supports `tabs:code` to start in code view. |
| `tab` | `string` | `"console"` or `"preview"` | Default output tab to display (`"preview"` or `"console"`). Also supports the bare `preview` attribute flag. |
| `nocode` | `boolean` | `false` | When present (or `code:false`), hides the "Code" button from the header tabs, presenting only the Live preview. |
| `readonly` | `boolean` | `false` | Locks the code editor against user editing while allowing code execution. |
| `layout` | `string` | `"split"` | Sets the layout presentation: `"split"` (side-by-side) or `"stacked"` (vertical). In `tabs` mode, single full-width panel is used. |
| `lang` | `string` | Derived (`"js"`) | Explicit language override (`js`, `html`, `css`). Inferred from file extensions or inner code fences. |

## Interactive Features

::: tabs
::: tab "JavaScript Runner" icon:code
Playgrounds execute JavaScript in an isolated evaluation context. The runner intercepts:

* `console.log(...)` — Standard log formatting with syntax colour highlighting
* `console.info(...)` — Informational messages with blue indicator
* `console.warn(...)` — Warning logs with amber indicator
* `console.error(...)` — Error traces with red indicator and stack details
* Expression Returns — Any final return expression (e.g. `10 + 20`) is displayed as a return value: `=> 30`

```js playground title="Console Demonstration"
console.log("Hello from docmd!");
console.info("Information payload:", { status: "active", version: "0.9.9" });
console.warn("Notice: demo warning");
return "Execution completed successfully";
```
::: /tab

::: tab "HTML Component Preview" icon:layout
When the playground language is set to `html` (either via ```` ```html playground ```` or `::: playground lang:html`), the playground automatically selects the **Preview** panel and renders the HTML/CSS inside a sandboxed frame:

```html playground title="Live Button Component" live
<button style="padding: 10px 20px; background: #6366f1; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" onclick="alert('Component clicked!')">
  Interactive Button
</button>
```
::: /tab

::: tab "docmd-runtime Integration" icon:braces
Playgrounds have access to the global `window.docmd` runtime object and reactive variables:

* `docmd.var.get('docmd.version')` — Read build-time or client-side variables
* `docmd.var.set('key', 'value')` — Mutate client-side variables and trigger DOM re-renders
* `docmd.theme.get()` / `docmd.theme.toggle()` — Inspect or switch between dark and light modes

```js playground title="Theme & Variables API" live
console.log("Current Theme:", window.docmd?.theme?.get() || "light");
console.log("Docmd Engine Version:", window.docmd?.var?.get("docmd.version") || "0.9.9");
console.log("Git Branch:", window.docmd?.var?.get("docmd.gitBranch") || "main");
return "SDK accessible";
```
::: /tab
::: /tabs

## Keyboard Shortcuts

The playground editor provides standard IDE keyboard shortcuts for rapid iteration:

* <kbd class="docmd-kbd">Cmd</kbd> + <kbd class="docmd-kbd">Enter</kbd> (macOS) or <kbd class="docmd-kbd">Ctrl</kbd> + <kbd class="docmd-kbd">Enter</kbd> (Windows/Linux): Run the current code block
* <kbd class="docmd-kbd">Tab</kbd>: Inserts a 2-space indentation instead of shifting browser focus
* <kbd class="docmd-kbd">Shift</kbd> + <kbd class="docmd-kbd">Tab</kbd>: Un-indents current line or selection

## Related Plugin Documentation

For deep technical details on AST parsing hooks, build-time script resolution, graceful error handling mechanics, and global plugin configuration options, see the **[Playground Plugin Architecture & Technical Reference](../../plugins/playground.md)**.