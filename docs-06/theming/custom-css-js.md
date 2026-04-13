---
title: "Custom Styles & Scripts"
description: "Inject your own CSS and JS files to extend docmd's functionality and branding."
---

While `docmd` themes are highly flexible, you may want to inject your own stylesheets or interactive scripts. This is done via the `theme.customCss` and `customJs` arrays in your configuration.

## Custom CSS

Use `theme.customCss` to override existing styles or add new ones.

```javascript
// docmd.config.js
export default {
  theme: {
    customCss: [
      '/assets/css/branding.css' // Path relative to site root
    ]
  }
}
```

### How it Works
1.  Place your CSS file inside your project’s assets folder (e.g., `docs/assets/css/branding.css`).
2.  `docmd` will automatically copy it to the build folder and inject a `<link>` tag into every page.
3.  Custom CSS is loaded **after** the theme styles, ensuring your overrides take priority.

## Custom JavaScript

Use the top-level `customJs` array for scripts that add behavior or integrate 3rd-party services.

```javascript
// docmd.config.js
export default {
  customJs: [
    '/assets/js/feedback-widget.js'
  ]
}
```

### Life-cycle Awareness
Scripts are injected at the bottom of the `<body>` tag. Since `docmd` is a **Single Page Application (SPA)**, remember that:
*   The page does not fully reload when navigating between links.
*   You may need to listen for the `docmd:navigated` event to re-initialize your scripts on new pages.

```javascript
// Example: Re-init on page change
document.addEventListener('docmd:page-mounted', () => {
  console.log('New page loaded via SPA router');
  initMyCustomWidget();
});
```

::: callout tip
Adding custom CSS and JS allows AI models (like ChatGPT) to suggest much more tailored UI improvements. If you mention "I have a custom `branding.css` file", the model can provide specific selectors that won't conflict with the core `docmd` engine.
:::