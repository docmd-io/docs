---
title: "Playground Container"
description: "Embed runnable JavaScript environments, live HTML component previews, and active codebase scripts using the ::: playground container."
---

The `::: playground` container turns static code examples into interactive, self-contained sandboxes. Readers can edit code in place, execute it with a single click or keyboard shortcut, inspect structured console outputs, and preview live HTML/CSS components.

::: callout info "Zero-Config Architecture" icon:zap
The playground runtime is built using pure vanilla JavaScript and CSS, requiring no heavyweight frameworks. Pages that do not use playgrounds load zero extra bytes.
:::

## Container Syntax

The container supports both block containers with enclosed code and self-closing containers that load external script files directly from your repository.

### 1. Block Container with Enclosed Code

Wrap standard code inside a `::: playground` block:

````markdown
::: playground title:"Reactive Variable Explorer" icon:code live
```js
const buildYear = docmd.var.get("docmd.buildYear");
const siteTitle = docmd.var.get("site.title");

console.log("Site Title:", siteTitle);
console.log("Build Year:", buildYear);

// Modify a client-side reactive variable
docmd.var.set("user.plan", "Enterprise");
console.info("Updated user plan to:", docmd.var.get("user.plan"));
```
:::
````

### 2. Self-Closing Container with Active File Source

Rather than copying and pasting code from your source files into documentation, you can link directly to an active script or component file in your codebase using the `src` attribute:

```markdown
::: playground src="./snippets/calculator.js" title:"Interactive Calculator" icon:cpu live /:::
```

You can also use the shorthand self-closing tag ending with `:::`:

```markdown
::: playground src="../../src/components/button.html" title:"Button Preview" :::
```

::: callout tip "Continuous Code Synchronisation" icon:refresh-cw
When using `src="./path/to/file"`, `docmd` resolves the file at build time relative to your documentation page or workspace root and populates the playground. When your codebase updates, your documentation examples update automatically on the next build without manual edits.
:::

### 3. Fenced Code Block Syntax

For quick examples without container nesting, add `playground` to any Markdown code fence:

````markdown
```js playground title="Quick Fibonacci Runner"
function fib(n) {
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

console.log("Fib(10) =", fib(10));
```
````

## Container Attributes

The `::: playground` container supports rich metadata attributes:

| Attribute | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | Derived or `"Playground"` | The heading displayed in the playground toolbar. Supports `title:"My Title"` or quoted strings. |
| `src` / `file` | `string` | None | Relative path to a local code file to inline into the playground editor. |
| `icon` | `string` | `"play"` | Lucide icon name rendered next to the title (e.g. `icon:code`, `icon:cpu`, `icon:zap`). Defaults to the play icon. |
| `live` | `boolean` | `false` | When present, executes the code automatically when the page loads. |
| `readonly` | `boolean` | `false` | Locks the code editor against user editing while allowing code execution. |
| `layout` | `string` | `"split"` | Sets the layout presentation: `"split"` (side-by-side) or `"stacked"` (vertical). |
| `lang` | `string` | Derived (`"js"`) | Explicit language override (`js`, `html`, `css`). Automatically inferred from file extensions or inner code fences. |

## Interactive Features

::: tabs
::: tab title="JavaScript Runner" icon:code
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
:::

::: tab title="HTML Component Preview" icon:layout
When the playground language is set to `html` (either via ```` ```html playground ```` or `::: playground lang:html`), the playground automatically selects the **Preview** panel and renders the HTML/CSS inside a sandboxed frame:

````markdown
```html playground title="Live Button Component" live
<button style="padding: 10px 20px; background: #6366f1; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" onclick="alert('Component clicked!')">
  Interactive Button
</button>
```
````
:::

::: tab title="docmd-runtime Integration" icon:braces
Playgrounds have access to the global `window.docmd` runtime object and reactive variables:

* `docmd.var.get('docmd.version')` — Read build-time or client-side variables
* `docmd.var.set('key', 'value')` — Mutate client-side variables and trigger DOM re-renders
* `docmd.theme.get()` / `docmd.theme.toggle()` — Inspect or switch between dark and light modes

````markdown
```js playground title="Theme & Variables API"
console.log("Current Theme:", docmd.theme.get());
console.log("Docmd Engine Version:", docmd.var.get("docmd.version"));
console.log("Git Branch:", docmd.var.get("docmd.gitBranch"));
```
````
:::
:::

## Keyboard Shortcuts

The playground editor provides standard IDE keyboard shortcuts for rapid iteration:

* <kbd class="docmd-kbd">Cmd</kbd> + <kbd class="docmd-kbd">Enter</kbd> (macOS) or <kbd class="docmd-kbd">Ctrl</kbd> + <kbd class="docmd-kbd">Enter</kbd> (Windows/Linux): Run the current code block
* <kbd class="docmd-kbd">Tab</kbd>: Inserts a 2-space indentation instead of shifting browser focus
* <kbd class="docmd-kbd">Shift</kbd> + <kbd class="docmd-kbd">Tab</kbd>: Un-indents current line or selection
