---
title: "Custom Fonts & Branding"
description: "Match your documentation site appearance to corporate identity guidelines using CSS variables and web fonts in docmd."
---

Documentation serves as a critical brand touchpoint. `docmd` uses a CSS variable token system, allowing you to override default font stacks and brand color palettes without modifying core engine stylesheets.

## Customising Visual Tokens

`docmd` defines visual tokens as CSS custom properties on `:root`. Override these variables in a custom stylesheet (e.g. `assets/css/branding.css`).

### 1. Author Custom Stylesheet

```css
/* Import web typography */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap');

:root {
  /* Brand Typography Stack */
  --font-family-sans: "Outfit", system-ui, -apple-system, sans-serif;

  /* Brand Colours (Light Mode) */
  --link-color: #8a2be2;          /* Primary accent colour */
  --link-colour-hover: #7b1fa2;
  --bg-color: #fcfcfd;            /* Subtle background tint */
}

/* Dark Mode Palette Overrides */
:root[data-theme="dark"] {
  --bg-color: #0d1117;
  --link-color: #a855f7;
}
```

### 2. Register Custom CSS

Register your stylesheet in `docmd.config.json` under `theme.customCss`:

```json "docmd.config.json"
{
  "theme": {
    "customCss": [
      "/assets/css/branding.css"
    ]
  }
}
```

::: callout tip "Performance & Font Loading" icon:lightbulb
Host custom font files locally within `assets/fonts/` whenever possible to minimize network latency. Specify `font-display: swap` in `@font-face` declarations to prevent Flash of Unstyled Text (FOUT).
:::