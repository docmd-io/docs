---
title: "Browser API"
description: "Client-side APIs for docmd, isomorphic rendering engine and dev-mode WebSocket plugin communication."
---

docmd exposes two client-side APIs: the **Isomorphic Compilation Engine** for rendering Markdown in browser contexts, and the **Dev-Mode Plugin API** for communicating with the local dev server.

## Isomorphic Compilation Engine

The Markdown rendering engine runs smoothly inside browser environments. Use this to construct live editor previews, interactive playgrounds, or embedded documentation widgets.

### CDN Integration

```html
<!-- Main Theme Styles -->
<link rel="stylesheet" href="https://unpkg.com/@docmd/ui/assets/css/docmd-main.css">

<!-- Isomorphic Rendering Engine -->
<script src="https://unpkg.com/@docmd/live/public/docmd-live.js"></script>
```

### `docmd.compile(markdown, config)`

Compiles raw Markdown into a complete HTML document using docmd page templates.

* **`markdown`** (`string`): Raw Markdown source text.
* **`config`** (`object`): Configuration overrides (matching `docmd.config.json` schema).
* **Returns**: `Promise<string>` resolving to the compiled HTML document.

### Live Preview Implementation Example

Render outputs inside `<iframe>` elements using `srcdoc` to guarantee complete style isolation:

```javascript
const editor = document.getElementById("editor");
const preview = document.getElementById("preview");

async function updatePreview() {
  const html = await docmd.compile(editor.value, {
    title: "Preview",
    theme: { appearance: "light" }
  });
  preview.srcdoc = html;
}

editor.addEventListener("input", updatePreview);
```

## Dev-Mode Plugin API

During `npx @docmd/core dev` execution, a `window.docmd` global object is injected into served pages. This interface allows browser-side plugin components to interact with server-side action handlers via WebSocket RPC.

::: callout info "Development Mode Only" icon:code
The dev-mode plugin API is available exclusively during `npx @docmd/core dev` sessions and is omitted from production builds.
:::

### `docmd.call(action, payload)`

Dispatches RPC calls to server-side action handlers registered by plugins. Returns a promise resolving to the handler output:

```javascript
const threads = await docmd.call("threads:get-threads", {
  file: "docs/getting-started.md"
});
console.log(threads);
```

### `docmd.send(name, data)`

Transmits fire-and-forget events to the dev server without awaiting responses:

```javascript
docmd.send("analytics:page-view", {
  path: window.location.pathname
});
```

### `docmd.on(name, callback)`

Subscribes to server-pushed WebSocket events. Returns an unsubscription function:

```javascript
const unsubscribe = docmd.on("threads:updated", (data) => {
  console.log("Threads updated:", data);
});

unsubscribe();
```

### State Persistence across Hot Reloads

```javascript
// Stash context before hot-reload
docmd.scheduleReload("scroll-restore", {
  scrollY: window.scrollY
});

// Restore context post-reload
docmd.afterReload("scroll-restore", (ctx) => {
  window.scrollTo(0, ctx.scrollY);
});
```

## Universal Modal API (`window.docmd.modal`)

`docmd` provides a unified, accessible modal dialog engine powered by the native HTML `<dialog>` element. It is available in the browser runtime across all official templates and provides top-layer isolation, scroll containment, and keyboard navigation.

### `window.docmd.modal.open(options)`

Opens the universal modal dialog with custom content, icon, and optional title:

* **`content`** (`HTMLElement | string`): A DOM node or HTML string to mount inside the modal body.
* **`icon`** (`string`, optional): A preset icon identifier (`'table'`, `'image'`, `'code'`) or custom inline SVG markup.
* **`title`** (`string`, optional): Modal title string. Omit for an icon-only header without text labels.
* **`type`** (`string`, optional): Content category identifier (`'table'`, `'image'`, `'generic'`). Sets the `data-modal-type` attribute for scoped CSS styling.

```javascript
// Example: Open custom interactive widget in the modal
const widget = document.createElement('div');
widget.innerHTML = '<p>Custom interactive preview mounted in the universal modal.</p>';

window.docmd.modal.open({
  content: widget,
  icon: 'code',
  title: 'Widget Inspector',
  type: 'generic'
});
```

### `window.docmd.modal.close()`

Closes the active modal dialog and automatically restores keyboard focus to the triggering element.

### `window.docmd.modal.isOpen()`

Returns a `boolean` indicating whether the universal modal is currently open.