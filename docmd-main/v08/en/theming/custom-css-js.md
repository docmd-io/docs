---
title: "Custom Styles & Scripts"
description: "Inject your own CSS and JS files to extend docmd's functionality and branding."
---

While `docmd` themes are highly flexible, you may want to inject your own stylesheets or interactive scripts. This is done via the `theme.customCss` and `customJs` arrays in your configuration.

## Custom CSS

Use `theme.customCss` to override existing styles or add new ones.

```json "docmd.config.json"
{
  "theme": {
    "customCss": [
      "/assets/css/branding.css"
    ]
  }
}
```

### How it Works
1.  Place your CSS file inside your project’s assets folder (e.g., `docs/assets/css/branding.css`).
2.  `docmd` will automatically copy it to the build folder and inject a `<link>` tag into every page.
3.  Custom CSS is loaded **after** the theme styles, ensuring your overrides take priority.

## Custom JavaScript

Use the top-level `customJs` array for scripts that add behaviour or integrate 3rd-party services.

```json "docmd.config.json"
{
  "customJs": [
    "/assets/js/feedback-widget.js"
  ]
}
```

### Life-cycle Awareness
Scripts are injected at the bottom of the `<body>` tag. Since `docmd` is a **Single Page Application (SPA)**, remember that:
*   The page does not fully reload when navigating between links.
*   You may need to listen for custom lifecycle events to re-initialise your scripts on new pages.

For the full event list and usage examples, see [Client-Side Events](../api/client-side-events.md).

::: callout tip
Adding custom CSS and JS allows AI models (like ChatGPT) to suggest much more tailored UI improvements. If you mention "I have a custom `branding.css` file", the model can provide specific selectors that won't conflict with the core `docmd` engine.
:::
## Asset Priority Chain (new in 0.8.7)

Every CSS and JS file in a docmd build is assigned a **priority** that determines its load order. Lower priorities load first.

| Priority | Layer | Notes |
|---|---|---|
| 0  | Base (`docmd-main.css`, `docmd-main.js`) | Always present. |
| 5  | Theme colour overlay (`docmd-theme-sky.css`, etc.) | From `theme.name`. |
| 10 | **Template structure** (new) | Loaded by template plugins. |
| 15 | User `customCss` / `customJs` | **Always wins** — that's the contract. |
| 20 | Plugin CSS/JS | lightbox, search, analytics, etc. |

Within a priority bucket, files load in the order they were registered. If you need finer control, author a small plugin that returns `Asset[]` entries with explicit `priority` values.

See [Templates](templates.md) for the full template plugin authoring guide.
