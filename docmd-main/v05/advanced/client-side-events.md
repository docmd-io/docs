---
title: Client-Side Events
description: Hook into the docmd SPA router for custom interactive features.
---

`docmd` uses a lightweight Single Page Application (SPA) router for instant page transitions. Because the page does not fully reload, standard `DOMContentLoaded` scripts might not trigger on subsequent page navigations.

To solve this, `docmd` dispatches a custom event called `docmd:page-mounted` whenever a new page renders.

## The `docmd:page-mounted` Event

Listen for this event in your custom JavaScript files to re-initialize libraries or trigger custom logic.

### Usage

Create a custom script (e.g., `assets/js/my-plugin.js`) and add it to your `docmd.config.js` under `customJs`.

```javascript
document.addEventListener('docmd:page-mounted', (e) => {
    console.log('New page loaded:', e.detail.url);

    // Re-initialize your libraries here
    // Example: MathJax.typeset();
});
```

### Event Detail

The event object contains a `detail` property with the following data:

| Property | Type | Description |
| :--- | :--- | :--- |
| `url` | `string` | The full URL of the page that just loaded. |
| `initial` | `boolean` | `true` if this is the first initial load, `undefined` on navigation. |

::: callout tip
When building AI-powered Search or Chat widgets for `docmd`, always bind their initialization to `docmd:page-mounted`. This ensures the AI features remain active and aware of the current page context as the user navigates.
:::

## Example: Integrating MathJax

Standard integration won't work with SPA navigation. Use the event listener:

```javascript
// assets/js/math-support.js
(function() {
    function renderMath() {
        if (window.MathJax) {
            window.MathJax.typesetPromise();
        }
    }

    document.addEventListener('DOMContentLoaded', renderMath);
    document.addEventListener('docmd:page-mounted', renderMath);
})();
```