---
title: Client-Side Events
description: Hook into the docmd SPA router for custom interactive features.
---

# Client-Side Events

`docmd` uses a lightweight Single Page Application (SPA) router to provide instant page transitions. Because the page does not fully reload when navigating, standard `DOMContentLoaded` scripts might not trigger on subsequent page views.

To solve this, `docmd` dispatches a custom event called `docmd:page-mounted` whenever a new page renders.

## The `docmd:page-mounted` Event

You can listen for this event in your custom JavaScript files to re-initialize libraries or trigger custom logic.

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

## Example: Integrating MathJax

If you want to use MathJax for LaTeX equations, standard integration won't work with SPA navigation. Use the event listener:

```javascript
// assets/js/math-support.js
(function() {
    // 1. Load MathJax (if not using CDN in head)
    // ...

    // 2. Define the render function
    function renderMath() {
        if (window.MathJax) {
            window.MathJax.typesetPromise();
        }
    }

    // 3. Hook into events
    document.addEventListener('DOMContentLoaded', renderMath);
    document.addEventListener('docmd:page-mounted', renderMath);
})();
```