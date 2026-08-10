---
title: "Custom Styles & Scripts"
description: "Inject custom CSS and JavaScript files into your docmd site to extend layout styles, brand identity, and client behaviour."
---

While `docmd` themes provide flexible visual defaults, you can inject custom stylesheets and interactive scripts via the `theme.customCss` and `customJs` array options in `docmd.config.json`.

## Custom CSS Overrides

Use `theme.customCss` to override default theme variables or introduce new layout rules:

```json "docmd.config.json"
{
  "theme": {
    "customCss": [
      "/assets/css/branding.css"
    ]
  }
}
```

### Execution Steps

1. Place your CSS file inside your project's assets directory (e.g. `docs/assets/css/branding.css`).
2. `docmd` copies assets to the compiled output directory during build and injects `<link>` tags into page headers automatically.
3. Custom CSS files load **after** theme styles, ensuring your custom rules override default theme declarations cleanly.

## Custom JavaScript Integration

Use the top-level `customJs` array for scripts that add interactive capabilities or integrate third-party analytics:

```json "docmd.config.json"
{
  "customJs": [
    "/assets/js/feedback-widget.js"
  ]
}
```

### SPA Router Lifecycle Awareness

Custom scripts load at the bottom of the `<body>` element. Because `docmd` operates as a **Single Page Application (SPA)** during client navigation:

* Full page reloads do not occur when clicking internal links.
* Scripts that inspect or attach event listeners to DOM elements should subscribe to SPA router lifecycle events.

For complete event signatures and code examples, see [Client-Side Events](../reference/client-side-events.md).

## Asset Priority Order

Every CSS and JS asset registered in a `docmd` build is assigned a **priority weight** that dictates cascade load order (lower numbers load earlier):

| Priority Weight | Layer | Technical Description |
| :--- | :--- | :--- |
| `0` | Base Core (`docmd-main.css`, `docmd-main.js`) | Always present in all builds. |
| `5` | Theme Palette Overlay (`docmd-theme-sky.css`, etc.) | Loaded via `theme.name`. |
| `10` | Structural Template Styles | Injected by active template plugins. |
| `15` | User `customCss` / `customJs` | **Highest priority for user overrides**. |
| `20` | Plugin Assets | Lightbox, search, and analytics assets. |

Within each priority bucket, files load in the order they were registered. To learn more about structural layout overrides, explore [Templates](templates.md).

::: callout tip "Scoped Custom Styles" icon:lightbulb
Maintain clean asset organization by separating `/css` and `/js` subdirectories under `assets/`. Using explicit class names in `branding.css` prevents style conflicts with core `docmd` container rules.
:::
