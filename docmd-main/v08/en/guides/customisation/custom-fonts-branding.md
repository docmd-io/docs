---
title: "Custom Fonts and Branding"
description: "How to match your documentation's appearance to your corporate identity using CSS variables."
---

## Problem

Ensuring your documentation platform easily matches your corporate identity is critical for a professional appearance. The default font stack and colour palette ensure general readability but may not reflect your brand personality.

## Why it matters

Documentation is a key brand touchpoint. If your product uses a specific typography (like "Outfit") and a distinct primary colour, your documentation should reflect those choices. Consistency across web properties builds trust and provides a cohesive user experience.

## Approach

docmd uses a system of CSS custom properties (variables) that define the layout's visual tokens. You can easily override these variables in a custom stylesheet without modifying the core engine.

## Implementation

### 1. Create a Custom Stylesheet

Create a file named `custom.css` in your source directory and override the `:root` variables.

```css
/* Import your brand font */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap');

:root {
  /* Brand Typography */
  --font-family-sans: "Outfit", system-ui, -apple-system, sans-serif;
  
  /* Brand Colours (Light Mode) */
  --link-color: #8a2be2;      /* Your primary brand colour */
  --link-color-hover: #7b1fa2;
  --bg-color: #fcfcfd;        /* Subtle background tint */
}

/* Dark Mode Overrides */
:root[data-theme="dark"] {
  --bg-color: #0d1117;
  --link-color: #a855f7;
}
```

### 2. Register the Stylesheet

Add your custom CSS file to the `theme.customCss` array in your `docmd.config.json`.

```json
  "theme": {
    "customCss": ["/custom.css"]
  }
```

## Trade-offs

Importing external fonts (like Google Fonts) adds latency to the initial page load. To optimise performance, consider hosting your font files locally. Use `font-display: swap` to prevent a "Flash of Unstyled Text" (FOUT) while the custom font loads.