---
title: "Customisation & CSS Variables"
description: "Reference guide for docmd CSS variables, visual tokens, and component classes for advanced styling."
---

`docmd` uses a CSS variable-first design token architecture. Restyle core site themes and components by overriding `:root` custom properties in a custom stylesheet.

## CSS Variable Reference

| CSS Variable | Default (Light Mode) | Default (Dark Mode) | Visual Token Target |
| :--- | :--- | :--- | :--- |
| `--bg-color` | `#ffffff` | `#0d0d0f` | Primary page background |
| `--text-color` | `#27272a` | `#d4d4d8` | Standard body typography |
| `--text-heading` | `#09090b` | `#fafafa` | Title and heading elements (`h1`–`h6`) |
| `--link-color` | `#068ad5` | `#38bdf8` | Primary accent and hyperlink color |
| `--border-color` | `#e4e4e7` | `#27272a` | Rule dividers and card borders |
| `--sidebar-bg` | `#fafafa` | `#09090b` | Navigation sidebar background |
| `--ui-border-radius` | `6px` | `6px` | UI corner rounding for buttons, cards, and tags |
| `--sidebar-width` | `260px` | `260px` | Navigation sidebar column width |

## CSS Override Examples

To change your site's primary accent color in light and dark modes, define custom rules in `assets/css/branding.css`:

```css
:root {
  --link-color: #f43f5e; /* Rose accent (Light Mode) */
}

body[data-theme="dark"] {
  --link-color: #fb7185; /* Rose accent (Dark Mode) */
}
```

## Core Component Classes

Target specific UI components using core layout classes:

* `.main-content`: Container for parsed Markdown body content.
* `.sidebar-nav`: Navigation tree list inside the sidebar.
* `.page-header`: Top navigation menubar.
* `.docmd-search-modal`: Full-text search modal overlay.
* `.docmd-tabs`: Interactive tabbed container blocks.
* `.callout`: Callout alert and tip containers.

## Layout Structural Overrides

If CSS variable overrides are insufficient and you need to alter the HTML layout structure itself (e.g. custom sidebars or footers), author a **template plugin**. Templates ship custom `.ejs` partials and are layered directly on top of CSS themes.

See [Templates](templates.md) for complete template development guidelines.
