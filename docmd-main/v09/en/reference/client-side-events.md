---
title: "Client-Side Events"
description: "Subscribe to client-side lifecycle events in docmd Single Page Application (SPA) navigation."
---

docmd incorporates a lightweight Single Page Application (SPA) router to execute client-side page transitions. Because client-side routing dynamically updates DOM elements without triggering full browser reloads, standard `DOMContentLoaded` listeners will not fire on sub-page transitions.

To accommodate custom UI scripts and component re-initialisation, docmd emits dedicated DOM lifecycle events.

## `docmd:page-mounted`

Dispatched on the `document` node immediately after a new page payload is rendered into the DOM.

### Implementation Pattern

Attach an event listener to `document` to re-initialise interactive libraries or trigger UI transitions:

```javascript
document.addEventListener("docmd:page-mounted", (event) => {
  const { url } = event.detail;
  console.log(`Mounted route: ${url}`);
});
```

### Event Payload (`event.detail`)

| Attribute | Type | Technical Description |
| :--- | :--- | :--- |
| `url` | `string` | Absolute URL path of the newly mounted page view. |

## Implementation Guidelines

1. **Idempotent Execution**: Structure setup handlers to ensure they execute safely across repeated route changes without binding duplicate event handlers.
2. **Global Namespace Protection**: Wrap custom scripts inside IIFE (Immediately Invoked Function Expression) blocks to avoid scope pollution.
3. **Event Cleanup**: Detach window-level event listeners (e.g. `resize` or `scroll`) prior to handling subsequent route transitions.