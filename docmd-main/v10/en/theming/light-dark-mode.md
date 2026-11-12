---
title: "Light & Dark Appearance"
description: "Configure light and dark mode appearance modes, custom CSS variable overrides, and theme toggle controls in docmd."
---

`docmd` ships natively with responsive light and dark colour schemes. The engine automatically adapts to user operating system preferences and provides a UI toggle for manual overrides.

## Default Viewing Mode

Define the initial visual mode in `docmd.config.json`:

```json "docmd.config.json"
{
  "theme": {
    "name": "sky",
    "appearance": "system"
  }
}
```

| Appearance Setting | Behaviour |
| :--- | :--- |
| **`system`** *(Default)* | Automatically matches user OS light/dark mode preference (Recommended). |
| **`light`** | Forces light mode on initial page load. |
| **`dark`** | Forces dark mode on initial page load. |

## Configuring the Theme Toggle

The theme toggle button lives within the **Options Menu**. Control its visibility and position in `docmd.config.json`:

```json "docmd.config.json"
{
  "layout": {
    "optionsMenu": {
      "position": "header",
      "components": {
        "themeSwitch": true
      }
    }
  }
}
```

## Attribute Mechanics & CSS Variables

The engine applies a `data-theme` attribute to the `<body>` element at render time:

* Standard default theme: `<body data-theme="light">` or `<body data-theme="dark">`
* Custom themed palette (e.g. `sky`): `<body data-theme="sky-light">` or `<body data-theme="sky-dark">`

### CSS Variable Overrides

Themes use CSS variables for all UI colours. Override these variables in your custom stylesheet to customise specific modes:

```css
:root {
  --docmd-primary: #4f46e5; /* Primary accent for light mode */
}

html[data-theme="dark"] {
  --docmd-primary: #818cf8; /* Primary accent for dark mode */
}
```

## State Persistence

When users manually toggle theme modes in the UI, their selection persists in `localStorage`. `docmd` evaluates this preference immediately on every page load, preventing visual flashing (FOUC) during SPA navigation.

::: callout tip "High-Contrast AI Parsing" icon:lightbulb
Structure-aware AI parsers benefit from clear semantic boundaries. `docmd` maintains high-contrast background and text variables across both light and dark modes, ensuring code snippets and callout blocks compile cleanly into `llms.txt` context streams.
:::