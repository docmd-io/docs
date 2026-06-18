---
title: "Available Themes"
description: "Explore docmd's built-in themes including Sky, Ruby, and Retro. Learn how to switch themes with a single config line."
---

::: callout info "What's new in 0.8.7"
Themes are still the easiest way to recolour a site. If you need a different **layout structure** (not just colours), check out the new [Templates](templates.md) page — templates are layered on top of themes and ship their own EJS partials and CSS/JS bundles.
:::

`docmd` provides a set of professionally designed, light/dark responsive themes. You can switch your entire site's aesthetic by changing a single key in `docmd.config.json`.

<!-- SCREENSHOT: Gallery grid showing all available themes - each theme rendered as a small preview card with the theme name below. Show at least the default, minimal, and docs themes in both light and dark variants. -->


## How to Switch Themes

```json "docmd.config.json"
{
  "theme": {
    "name": "sky",
    "appearance": "system"
  }
}
```

## Built-in Theme Gallery

| Theme | Best For | Vibes |
| :--- | :--- | :--- |
| `default` | Low-profile docs | Clean, lightweight, neutral |
| `sky` | Product Docs | Modern, premium, standard-issue |
| `ruby` | Brand Identity | Sophisticated, serif headers, vibrant |
| `retro` | Dev Tools | 80s Terminals, monospace, neon accents |

::: grids
::: grid
::: button "Default" javascript:switchDocTheme('default')
:::
::: grid
::: button "Sky" javascript:switchDocTheme('sky')
:::
::: grid
::: button "Ruby" javascript:switchDocTheme('ruby')
:::
::: grid
::: button "Retro" javascript:switchDocTheme('retro')
:::
:::

### 1. `default`
The very theme used for this documentation site. Use this if you plan on adding extensive custom CSS and don't want any built-in design layers interfering.

### 2. `sky`
A modern documentation look with crisp typography, subtle transitions, and high-contrast light/dark modes.

### 3. `ruby`
A serif-driven theme with a deep, jewel-toned palette. Good for documentation that needs to feel authoritative.

### 4. `retro`
A vintage-computing inspired theme with phosphor-green text on black backgrounds (dark mode), scanline effects, and monospace fonts (Fira Code by default).

::: callout warning "Reserved names — do not use for template names"
The four values above (`default`, `sky`, `ruby`, `retro`) are the only reserved CSS theme names. Any other value in `theme.name` is auto-promoted to a template name (see [Templates](templates.md)). If you want a CSS theme-like name on a template, set `theme.template` explicitly instead.
:::

## Theming Architecture

1.  **CSS Layering**: Themes are additive. Choosing `sky` loads the base `default` styles and overlays the `sky` palette on top.
2.  **Dark mode**: Every theme includes a built-in dark mode implementation.
3.  **Live switching**: When users switch themes via the UI, the SPA engine updates the relevant CSS variables without a page reload.

::: callout tip
The CSS variable names differ slightly between themes (for example, `--sky-primary` only exists under `sky`). Mentioning your theme name when asking for help with custom CSS keeps suggestions accurate.
:::