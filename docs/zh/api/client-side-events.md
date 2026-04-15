---
title: "客户端事件"
description: "Hook into the docmd SPA lifecycle to add interactive features."
---

`docmd` utilises a lightweight Single Page Application (SPA) router to provide instant page transitions. Because the browser does not perform a full reload during navigation, scripts relying on `DOMContentLoaded` will not re-execute.

To handle this, `docmd` dispatches custom lifecycle events that you can listen for in your `customJs` files.

## `docmd:page-mounted`

This event is dispatched whenever a new page has been successfully fetched and injected into the DOM.

### Usage

Add a listener to the `document` object to re-initialize third-party libraries or trigger custom animations.

```javascript
document.addEventListener('docmd:page-mounted', (event) => {
  const { url } = event.detail;
  console.log(`Navigated to: ${url}`);

  // Re-initialize components
  // Example: Prism.highlightAll();
});
```

### Event Details (`event.detail`)

| Property | Type | Description |
| :--- | :--- | :--- |
| `url` | `String` | The absolute URL of the page that was just mounted. |

## Best Practices

1.  **Idempotency**: Ensure your initialization logic can be safely called multiple times on the same page or cleaned up before the next navigation.
2.  **Global Scope**: Scripts added via `customJs` are executed in the global scope. Use an IIFE (Immediately Invoked Function Expression) to avoid polluting the `window` object.
3.  **Cleanup**: If your script adds global event listeners (e.g., `window.onresize`), consider tracking the current path to remove them when the user navigates away.