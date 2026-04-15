---
title: "Browser API (Client-Side)"
description: "Interact with docmd from the browser — live compilation and dev-mode plugin communication."
---

`docmd` provides two browser APIs: the **isomorphic compile engine** for rendering markdown in the browser, and the **dev-mode plugin API** for real-time communication with the dev server.

## Isomorphic Compile Engine

The same engine that generates static sites in Node.js can run entirely within a web browser. This is ideal for building CMS previews, interactive playgrounds, or embedding documentation into existing web applications.

### Installation via CDN

```html
<!-- Core Styles -->
<link rel="stylesheet" href="https://unpkg.com/@docmd/ui/assets/css/docmd-main.css">

<!-- The Isomorphic Engine -->
<script src="https://unpkg.com/@docmd/live/dist/docmd-live.js"></script>
```

### `docmd.compile(markdown, config)`

Compiles raw Markdown into a full HTML document string using the default `docmd` layout.

**Parameters:**
- `markdown` (String): The raw Markdown content.
- `config` (Object): Configuration overrides (same schema as `docmd.config.js`).

**Returns:** `Promise<String>`: The complete HTML document.

### Example: Live Preview

To ensure style isolation, it is recommended to render the output inside an `<iframe>` using the `srcdoc` attribute.

```javascript
const editor = document.getElementById('editor');
const preview = document.getElementById('preview');

async function updatePreview() {
  const html = await docmd.compile(editor.value, {
    title: 'Preview',
    theme: { appearance: 'light' }
  });
  preview.srcdoc = html;
}

editor.addEventListener('input', updatePreview);
```

## Dev-Mode Plugin API

During `docmd dev`, a `window.docmd` global is automatically injected into every page. This API enables real-time communication between browser-side plugin code and server-side action handlers via WebSocket RPC.

::: callout info "Dev Mode Only"
The plugin API methods below are only available during `docmd dev`. They are not included in production builds.
:::

### `docmd.call(action, payload)`

Call a server-side action handler registered by a plugin. Returns a promise that resolves with the handler's return value.

```javascript
// Call a plugin action and get a result
const threads = await docmd.call('threads:get-threads', {
  file: 'docs/getting-started.md'
});
console.log(threads); // Array of thread objects
```

If the action modifies source files, the page automatically reloads after the promise resolves.

### `docmd.send(name, data)`

Send a fire-and-forget event to the server. No response is returned.

```javascript
// Notify the server of a page view (no response expected)
docmd.send('analytics:page-view', {
  path: window.location.pathname
});
```

### `docmd.on(name, callback)`

Subscribe to server-pushed events. Returns an unsubscribe function.

```javascript
// Listen for server-broadcast events
const unsub = docmd.on('threads:updated', (data) => {
  console.log('Threads updated:', data);
});

// Later: unsubscribe
unsub();
```

### `docmd.afterReload(name, callback)`

Declare a handler that runs after a page reload. If context was stashed with `scheduleReload`, the callback receives it.

```javascript
// Restore scroll position after a live-reload
docmd.afterReload('scroll-restore', (ctx) => {
  window.scrollTo(0, ctx.scrollY);
});
```

### `docmd.scheduleReload(name, context)`

Stash context into `sessionStorage` for a named `afterReload` handler. The matching handler fires with this context after the next page reload.

```javascript
// Before a file edit triggers a reload, save state
docmd.scheduleReload('scroll-restore', {
  scrollY: window.scrollY
});
```

## Considerations

- **No File System**: The browser engine cannot scan folders. You must provide the `navigation` array explicitly in the config object if you need a sidebar.
- **Node-Only Plugins**: Plugins that rely on Node.js APIs (like Sitemap or LLM text generation) are disabled in the browser environment.
- **WebSocket Connection**: The dev-mode API requires an active WebSocket connection to the dev server. It will auto-reconnect with exponential backoff if the connection drops.