---
title: "Recipe: Integrating Custom Fonts"
description: "Personalize your site's typography via Google Fonts and CSS variable overrides."
---

`docmd` utilises a robust CSS variable system to manage design tokens. Personalizing your site's typography involves importing external font assets and overriding the core root variables.

## 1. Define Your Typography Manifest

Establish a custom CSS file within your project (e.g., `assets/css/typography.css`).

Identify your target font family on [Google Fonts](https://fonts.google.com) and utilise the `@import` directive to fetch the assets. Then, map these fonts to the `docmd` Typography tokens.

```css
/* assets/css/typography.css */

/* 1. Import font assets */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&family=JetBrains+Mono&display=swap');

:root {
  /* 2. Override the primary Sans-Serif stack */
  --font-family-sans: "Outfit", -apple-system, system-ui, sans-serif;
  
  /* 3. Override the Monospace (Code Block) stack */
  --font-family-mono: "JetBrains Mono", monospace;
}
```

## 2. Register the Stylesheet

Inject your custom manifest into the build pipeline via the `docmd.config.js` file.

```javascript
export default {
  // ...
  theme: {
    name: 'sky',
    appearance: 'dark',
    customCss: [
      '/assets/css/typography.css' // Path is absolute relative to the site/ directory
    ]
  }
}
```

## 3. Verify Changes

Execute `docmd dev` to preview the typographical changes. The engine will automatically bundle the custom CSS and apply the variable overrides across all documentation nodes.