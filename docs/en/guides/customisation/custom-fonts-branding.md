---
title: "Custom Fonts and Branding"
description: "How to match your documentation's appearance to your corporate identity using CSS variables."
---

## Problem

Ensuring that your documentation platform seamlessly matches your corporate identity is critical for maintaining a professional appearance. The default font stack and color palette are designed for general readability but may not reflect your specific brand personality.

## Why it matters

Documentation is a key brand touchpoint. If your main product uses a specific typography (like "Outfit") and a distinct primary color, your documentation should reflect those same choices. Consistency across all your web properties builds trust and provides a more cohesive user experience.

## Approach

`docmd` uses a system of CSS custom properties (variables) that define the layout's visual tokens. You can easily override these variables in a custom stylesheet without needing to modify the core engine.

## Implementation

### 1. Create a Custom Stylesheet

Create a file named `custom.css` in your source directory (or any subdirectory) and override the `:root` variables.

```css
/* Import your brand font */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap');

:root {
  /* Brand Typography */
  --font-family-sans: "Outfit", system-ui, -apple-system, sans-serif;
  
  /* Brand Colors (Light Mode) */
  --link-color: #8a2be2;      /* Your primary brand color */
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

Add your custom CSS file to the `theme.customCss` array in your `docmd.config.js`.

```javascript
// docmd.config.js
export default {
  theme: {
    customCss: ['/custom.css']
  }
};
```

## Trade-offs

Importing external fonts (like those from Google Fonts) adds a small amount of latency to the initial page load. To optimize performance, consider hosting your font files locally within your project and using `font-display: swap` to prevent "Flash of Unstyled Text" (FOUT) while the custom font is loading.
