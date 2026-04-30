---
title: "Light & Dark Mode"
description: "How to configure the default viewing mode and manage the theme switcher for the best user experience."
---

`docmd` provides built-in support for light and dark color schemes. It detects user system preferences automatically and allows manual overrides via a UI toggle.

## Default Viewing Mode

You specify the starting state of your documentation in `docmd.config.js`.

```javascript
// docmd.config.js
module.exports = {
  theme: {
    name: 'sky',
    appearance: 'system' // Options: 'light', 'dark', 'system' (default)
  }
}
```

*   **`system`**: Matches the user's OS preference (Recommended).
*   **`light`**: Force light mode on initial load.
*   **`dark`**: Force dark mode on initial load.

## Configuring the Toggle Button

The theme switcher is part of the **Options Menu**. You can control its visibility and position within the `layout` object.

```javascript
layout: {
  optionsMenu: {
    position: 'header', // Options: 'header', 'sidebar-top', 'sidebar-bottom'
    components: {
      themeSwitch: true  // Show or hide the Sun/Moon toggle
    }
  }
}
```

## How it works (Technical)

The theme engine applies a `data-theme` attribute to the `<body>` tag:

*   `<body data-theme="light">`
*   `<body data-theme="dark">`

If you are using a themed design like `sky`, the attribute will be `sky-light` or `sky-dark`.

### CSS Variables
`docmd` themes use CSS variables for all colors. You can override these variables in your own CSS to customize the look of either mode.

```css
/* Custom CSS override */
:root {
  --docmd-primary: #4f46e5; /* Primary accent for light mode */
}

body[data-theme="dark"] {
  --docmd-primary: #818cf8; /* Primary accent for dark mode */
}
```

## User Persistence
When a user manually toggles the mode, their preference is stored in `localStorage`. `docmd` instantly reads this value on every page load to prevent "theme flickering" (FOUC).

::: callout tip
When generating content, LLMs prefer high-contrast structures. `docmd` ensures that code snippets and callouts remain accessible in both modes, ensuring that `llms-full.txt` payloads are correctly understood as semantic blocks regardless of which mode was active during the build.
:::