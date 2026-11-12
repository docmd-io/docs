---
title: "Custom Styles & Scripts"
description: "Inject custom CSS and JavaScript files into your docmd site to extend layout styles, brand identity, and client behaviour."
---

While `docmd` themes provide flexible visual defaults, you can inject custom stylesheets and interactive scripts via the `theme.customCss` and `theme.customJs` array options in `docmd.config.json`.

## Custom Styles & Scripts Configuration

Custom stylesheets and client-side scripts are symmetrically configured under the `theme` block:

```json "docmd.config.json"
{
  "theme": {
    "name": "default",
    "customCss": [
      "/assets/css/branding.css"
    ],
    "customJs": [
      "/assets/js/feedback-widget.js"
    ]
  }
}
```

::: callout info title:"Backwards Compatibility" icon:history
In earlier versions of docmd, custom JavaScript was configured via a top-level `"customJs"` array and custom CSS via `"customCss"`. Both top-level keys remain fully supported as fallbacks, but nesting under `"theme"` is the recommended modern standard.
:::

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

Use `theme.customJs` to inject client scripts that add interactive capabilities or integrate third-party analytics:

```json "docmd.config.json"
{
  "theme": {
    "customJs": [
      "/assets/js/feedback-widget.js"
    ]
  }
}
```

### SPA Router Lifecycle Awareness

Custom scripts load at the bottom of the `<body>` element. Because `docmd` operates as a **Single Page Application (SPA)** during client navigation:

* Full page reloads do not occur when clicking internal links.
* Scripts that inspect or attach event listeners to DOM elements should subscribe to SPA router lifecycle events.

For complete event signatures and code examples, see [Client-Side Events](../reference/client-side-events.md).

## Cascade Order

Stylesheets and scripts load in a predictable three-stage order so your custom rules always take precedence:

1. **Core and Theme**: Base styles and colour palettes load first.
2. **Templates and Plugins**: Structural layout templates and plugin assets load next.
3. **Custom CSS and JS**: Your `customCss` and `customJs` files load last, ensuring your custom declarations override defaults.

To learn more about structural layout overrides, explore [Templates](templates.md).

::: callout tip "Scoped Custom Styles" icon:lightbulb
Maintain clean asset organisation by separating `/css` and `/js` subdirectories under `assets/`. Using explicit class names in `branding.css` prevents style conflicts with core `docmd` container rules.
:::