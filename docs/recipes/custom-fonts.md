---
title: "Recipe: Custom Fonts"
description: "Personalize your documentation by importing Google Fonts."
---

# Adding Custom Fonts

`docmd` uses CSS variables to manage typography. Changing your site's font is as easy as creating a custom stylesheet.

## 1. Create a CSS File

Create a file in your project (e.g., `assets/css/fonts.css`).

Go to [Google Fonts](https://fonts.google.com), find the font you want (like *Inter* or *Fira Code*), and use the `@import` method. Then, assign that font to the docmd root variables.

```css
/* assets/css/fonts.css */

/* Import the fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fira+Code&display=swap');

:root {
  /* Override the default sans-serif font */
  --font-family-sans: "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
  
  /* Override the monospace (code block) font */
  --font-family-mono: "Fira Code", monospace;
}
```

## 2. Register the Stylesheet

Open your `docmd.config.js` and add the path to your new CSS file in the `theme.customCss` array.

```javascript
module.exports = {
  // ...
  theme: {
    name: 'sky',
    defaultMode: 'light',
    customCss:[
      '/assets/css/fonts.css' // Path is relative to the generated site/ root
    ]
  }
}
```

Restart your `docmd dev` server. Your entire site will now use your custom typography!