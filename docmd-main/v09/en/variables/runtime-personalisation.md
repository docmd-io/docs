---
title: Client Runtime & Personalisation
description: Use the client-side docmd-runtime.js SDK and window.docmd to power live user sessions, interactive code blocks, and dynamic personalisation without page reloads.
---

# Client Runtime & Personalisation

docmd includes a headless client runtime script, `docmd-runtime.js`, bundled automatically into every layout template (including the default template and custom themes like `summer`).

The runtime exposes the `window.docmd` browser API, allowing you to update variables dynamically based on user authentication, selected environments, or input forms without reloading the page.

## Marking Variables as Dynamic

In your `docmd.config.json`, declare which variable keys are dynamic:

```json
{
  "variables": {
    "dynamic": [
      "user.name",
      "user.apiKey",
      "selectedProject",
      "activeRegion"
    ]
  }
}
```

When docmd builds your pages, any variable marked as dynamic (or prefixed with `user.`) is wrapped in a reactive marker:

```html
<span data-docmd-var="user.apiKey" class="docmd-var">pk_test_sample</span>
```

## Browser JavaScript API: `window.docmd`

The client runtime provides a clean, ergonomic API:

### Setting Variables: `docmd.var.set()`

Update a variable in real-time across the current page and all code snippets:

```javascript
// Set a single variable
window.docmd.var.set('user.apiKey', 'sk_live_99882244');

// Set multiple variables simultaneously
window.docmd.var.set({
  'user.name': 'Sarah Connor',
  'activeRegion': 'eu-central-1'
});
```

All `<span data-docmd-var="...">` elements and code block tokens immediately update in the DOM.

### Getting Variables: `docmd.var.get()`

Retrieve the current active value of a variable:

```javascript
const key = window.docmd.var.get('user.apiKey');
console.log('Active API key:', key);
```

### Listing Variables: `docmd.var.list()`

Inspect all registered runtime variables:

```javascript
const allVars = window.docmd.var.list();
console.table(allVars);
```

### Synchronising DOM: `docmd.var.sync()`

If you dynamically inject HTML content or navigate via client-side routing, call `docmd.sync()` to rehydrate variable markers:

```javascript
window.docmd.var.sync();
```

## Interactive Code Snippets Example

One of the most powerful uses of runtime personalisation is allowing readers to test API endpoints with their own keys:

```markdown
### Authenticating with the API

Run the following command in your terminal:

```bash
curl -X GET https://api.acme.com/v1/profile \
  -H "Authorization: Bearer {{ user.apiKey || 'YOUR_API_KEY' }}"
```
```

You can embed a simple input on your documentation portal:

```html
<input 
  type="text" 
  id="apiKeyInput" 
  placeholder="Paste your API key here..."
  oninput="window.docmd.var.set('user.apiKey', this.value || 'YOUR_API_KEY')"
/>
```

As the user types their API key into the input field, the curl snippet updates in real time!

## Listening for Variable Changes

You can listen for changes emitted by the runtime event bus:

```javascript
window.addEventListener('docmd:variable-change', (event) => {
  const { key, value } = event.detail;
  console.log(`Variable ${key} changed to:`, value);
});
```

## Cross-Frame Synchronisation (iFrames & Portals)

If your documentation is embedded inside an application iframe, the parent portal can update documentation variables using `postMessage`:

```javascript
// From the parent application window:
const docIframe = document.getElementById('docs-frame');
docIframe.contentWindow.postMessage({
  type: 'docmd:set-variables',
  variables: {
    'user.name': 'Alex',
    'user.apiKey': 'sk_live_449911'
  }
}, '*');
```

The `docmd-runtime.js` listener receives the message and updates all page variables automatically.

## Architecture: Why `docmd-runtime.js` is Universal

`docmd-runtime.js` is intentionally decoupled from layout styling, themes, and UI animations. It contains only the state machine, variable registry, event bus, and DOM hydration logic.

Because it is headless, it is safe to include in any theme or template layout without conflicting with existing scripts or triggering unnecessary re-renders.