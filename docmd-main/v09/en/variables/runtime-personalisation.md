---
title: Client Runtime & Personalisation
description: Use the client-side docmd-runtime.js SDK and window.docmd to power live user sessions, interactive code blocks, and dynamic personalisation without page reloads.
---

# Client Runtime & Personalisation

docmd includes a lightweight, headless client runtime script, `docmd-runtime.js`, bundled automatically into every layout template (including the default template and custom themes like `summer`).

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

When docmd compiles your pages, any variable marked as dynamic (or prefixed with `user.`) is wrapped in a reactive marker:

```html
<span data-docmd-var="user.apiKey" class="docmd-var">pk_test_sample</span>
```

## Browser JavaScript API: `window.docmd`

The client runtime provides a clean, ergonomic API:

::: grids
    ::: grid
        ::: card "Set Variables" icon:sliders
        `window.docmd.var.set(key, val)`
        Updates variable values across the DOM, text nodes, and code snippets in real time.
        :::
    :::
    ::: grid
        ::: card "Get Variables" icon:search
        `window.docmd.var.get(key)`
        Retrieves the active value of any registered runtime variable.
        :::
    :::
::: /grids

::: grids
    ::: grid
        ::: card "List Variables" icon:list
        `window.docmd.var.list()`
        Returns an object containing all currently registered dynamic variables and values.
        :::
    :::
    ::: grid
        ::: card "Synchronise DOM" icon:refresh-cw
        `window.docmd.var.sync()`
        Re-scans and rehydrates newly injected HTML or dynamically loaded components.
        :::
    :::
::: /grids

### Code Example: Updating Variables

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

## Interactive Code Snippets Example

One of the most powerful uses of runtime personalisation is allowing readers to test API endpoints with their own keys:

```markdown
### Authenticating with the API

Run the following command in your terminal:

```bash
curl -X GET https://api.acme.com/v1/profile \
  -H "Authorization: Bearer \{{ user.apiKey || 'YOUR_API_KEY' }}"
```
```

::: card "Live Interactive Code Block Demo" icon:play
Try typing a custom API key into the input field below to observe the curl command updating live:

<div style="margin: 12px 0;">
  <label style="display:block; font-size:12px; font-weight:600; margin-bottom:6px; opacity:0.8;">YOUR TEST API KEY:</label>
  <input 
    type="text" 
    id="apiKeyInputDemo" 
    placeholder="e.g. sk_test_my_secure_token_123" 
    style="width: 100%; max-width: 400px; padding: 8px 12px; border: 1px solid var(--docmd-border-color, #e2e8f0); border-radius: 6px; background: var(--docmd-bg-secondary, #f8fafc); font-family: monospace;"
    oninput="if(window.docmd && window.docmd.var) { window.docmd.var.set('user.apiKey', this.value || 'YOUR_API_KEY'); }"
  />
</div>

```bash
curl -X GET https://api.acme.com/v1/profile \
  -H "Authorization: Bearer {{ user.apiKey || 'YOUR_API_KEY' }}"
```
:::

## Framework Integration

::: tabs
::: tab "Vanilla JavaScript" icon:code
```javascript
// Listen for user login and update documentation variables
function onUserLogin(session) {
  window.docmd.var.set({
    'user.name': session.fullName,
    'user.apiKey': session.activeToken,
    'user.orgId': session.organisationId
  });
}
```
::: /tab

::: tab "React / Next.js" icon:atom
```tsx
import { useEffect } from 'react';

export function DocsPersonaliser({ user }: { user: any }) {
  useEffect(() => {
    if (typeof window !== 'undefined' && (window as any).docmd) {
      (window as any).docmd.var.set({
        'user.name': user.name,
        'user.apiKey': user.apiKey
      });
    }
  }, [user]);

  return null;
}
```
::: /tab

::: tab "Vue / Nuxt" icon:feather
```vue
<script setup>
import { watchEffect } from 'vue';

const props = defineProps(['currentUser']);

watchEffect(() => {
  if (typeof window !== 'undefined' && window.docmd) {
    window.docmd.var.set({
      'user.name': props.currentUser?.name,
      'user.apiKey': props.currentUser?.token
    });
  }
});
</script>
```
::: /tab
::: /tabs

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

::: callout tip "Universal Headless Architecture" icon:cpu
`docmd-runtime.js` has zero UI dependencies. It operates entirely on data markers (`data-docmd-var`), making it safe to use alongside complex SPA routers, light/dark themes, and interactive plugins without causing DOM regressions.
:::