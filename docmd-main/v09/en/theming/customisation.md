---
title: "Customisation & Variables"
description: "A complete reference of docmd's CSS variables and component classes for advanced styling."
---

`docmd` is built using a CSS variable-first architecture. This means you can restyle your entire site by simply overriding a few keys in a `:root` block without writing complex CSS selectors.

## Global Variable Reference

| Variable | Default (Light) | Default (Dark) | Description |
| :--- | :--- | :--- | :--- |
| `--bg-color` | `#ffffff` | `#0d0d0f` | Main page background. |
| `--text-color` | `#27272a` | `#d4d4d8` | Standard body text. |
| `--text-heading` | `#09090b` | `#fafafa` | Title and Header colours. |
| `--link-color` | `#068ad5` | `#38bdf8` | Primary accent / links. |
| `--border-color` | `#e4e4e7` | `#27272a` | Dividers and borders. |
| `--sidebar-bg` | `#fafafa` | `#09090b` | Navigation background. |
| `--ui-border-radius` | `6px` | `6px` | Rounding for all UI items. |
| `--sidebar-width` | `260px` | `260px` | Sidebar column width. |

## Example Override

To change your site's primary accent colour, add this to your `customCss`:

```css
:root {
  --link-color: #f43f5e; /* Rose 500 */
}

body[data-theme="dark"] {
  --link-color: #fb7185; /* Rose 400 */
}
```

## Component Targeting

If you need to style specific components, use these top-level classes:

*   `.main-content`: The wrapper for all Markdown content.
*   `.sidebar-nav`: The internal navigation list.
*   `.page-header`: The top navigation bar.
*   `.docmd-search-modal`: The search overlay.
*   `.docmd-tabs`: Tab container components.
*   `.callout`: The alert/note boxes.

## Troubleshooting specificity
Most `docmd` styles use low specificity. If your overrides aren't applying, ensure your `customCss` is registered correctly and check if adding a `body` prefix (e.g., `body .main-content`) helps.

::: callout tip
Because `docmd` uses standard CSS variables, you can ask an AI: *"Give me a professional colour palette using --link-color and --bg-color for docmd"*. The model will be able to provide ready-to-paste CSS that integrates perfectly with the built-in themes.
:::
## Need a different layout entirely?

If CSS overrides aren't enough, write a **template plugin** — a package that ships its own `layout.ejs` (and any partials you want to override) plus a CSS/JS bundle. Templates are first-class plugins with `capabilities: ['template']` and are layered on top of the existing theme + customCss system.

See [Templates](templates.md) for the full guide and an example template package structure.
