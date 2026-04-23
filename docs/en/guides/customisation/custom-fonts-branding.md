---
title: "Adding Custom Fonts and Branding to Your Documentation"
description: "A comprehensive guide on fonts & branding."
---

## Problem

White-labeling a documentation platform to seamlessly match your corporate identity is critical. The generic system font stack (`sans-serif`, `system-ui`) is highly performant but lacks distinct brand personality.

## Why it matters

Documentation isn't just an instruction manual; it's a brand touchpoint. If your SaaS landing page utilizes a crisp "Inter" font with distinct purple primary colors, your documentation should reflect that exact same aesthetic.

## Approach

`docmd` utilizes highly targeted CSS custom properties (variables) representing root layout tokens. Override these tokens in a custom stylesheet.

## Implementation

### 1. Define Variables 
Create an `assets/css/theme.css` file and override the `:root` variables.

```css
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap');

:root {
  /* Brand Typography */
  --font-family-sans: "Outfit", system-ui, sans-serif;
  
  /* Brand Colors (Light Mode) */
  --color-primary: #8a2be2;      /* Purple Accent */
  --color-bg-body: #f8f9fa;      /* Off-white background */
}

/* Dark Mode Overrides */
[data-theme="dark"] {
  --color-bg-body: #0d1117;
}
```

### 2. Inject Globally
Register this script in your `docmd.config.js`.

```javascript
export default defineConfig({
  theme: {
    customCss: ['/assets/css/theme.css']
  }
});
```

## Trade-offs

Importing heavy @font-face rules from Google Fonts imposes an inevitable latency penalty that delays First Contentful Paint (FCP). To mitigate this, consider hosting your `.woff2` font files locally within the `assets/fonts/` directory and utilizing `font-display: swap` to ensure text remains visible while fonts lazily load.
