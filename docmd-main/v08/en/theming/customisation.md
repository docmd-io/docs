---
title: "Customisation & Variables"
description: "A complete reference of docmd's CSS variables and component classes for advanced styling."
---

`docmd` is built using a CSS variable-first architecture. This means you can restyle your entire site by simply overriding a few keys in a `:root` block without writing complex CSS selectors.

## Global Variable Reference

| Variable | Default (Light) | Default (Dark) | Description |
| :--- | :--- | :--- | :--- |
| `--bg-colour` | `#ffffff` | `#09090b` | Main page background. |
| `--text-colour` | `#3f3f46` | `#a1a1aa` | Standard body text. |
| `--text-heading` | `#09090b` | `#fafafa` | Title and Header colours. |
| `--link-colour` | `#068ad5` | `#068ad5` | Primary accent / links. |
| `--border-colour` | `#e4e4e7` | `#27272a` | Dividers and borders. |
| `--sidebar-bg` | `#fafafa` | `#09090b` | Navigation background. |
| `--ui-border-radius` | `6px` | `6px` | Rounding for all UI items. |
| `--sidebar-width` | `260px` | `260px` | Sidebar column width. |

## Example Override

To change your site's primary accent colour, add this to your `customCss`:

```css
:root {
  --link-colour: #f43f5e; /* Rose 500 */
}

body[data-theme="dark"] {
  --link-colour: #fb7185; /* Rose 400 */
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
Because `docmd` uses standard CSS variables, you can ask an AI: *"Give me a professional colour palette using --link-colour and --bg-colour for docmd"*. The model will be able to provide ready-to-paste CSS that integrates perfectly with the built-in themes.
:::