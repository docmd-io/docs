---
title: "Available Themes"
description: "Explore docmd's built-in themes including Sky, Ruby, and Retro. Learn how to switch themes with a single config line."
---

`docmd` provides a set of professionally designed, light/dark responsive themes. You can switch your entire site's aesthetic by changing a single key in `docmd.config.js`.

## How to Switch Themes

```javascript
// docmd.config.js
export default {
  theme: {
    name: 'sky',
    appearance: 'system', // Options: 'light', 'dark', 'system'
  }
}
```

## Built-in Theme Gallery

| Theme | Best For | Vibes |
| :--- | :--- | :--- |
| `default` | Low-profile docs | Minimal, lightweight, clean |
| `sky` | Product Docs | Modern, premium, standard-issue |
| `ruby` | Brand Identity | Sophisticated, serif headers, vibrant |
| `retro` | Dev Tools | 80s Terminals, monospace, neon accents |

<div class="theme-picker" style="display: flex; gap: 10px; margin: 20px 0;">
    <button onclick="switchDocTheme('default')" class="docmd-button" style="color:#fff;background: #2e2e2e;">Default</button>
    <button onclick="switchDocTheme('sky')" class="docmd-button" style="color:#fff;background: #0097ff;">Sky</button>
    <button onclick="switchDocTheme('ruby')" class="docmd-button" style="color:#fff;background: #960b0b;">Ruby</button>
    <button onclick="switchDocTheme('retro')" class="docmd-button" style="color:#fff;background: #a95308; border: 1px solid #0ec80e;">Retro</button>
</div>

### 1. `sky` (Default)
The gold standard for modern documentation. It features crisp typography, subtle transitions, and high-contrast light/dark modes that match modern SaaS platforms.

### 2. `ruby`
A high-elegance theme using serif typography for headers and a deep, jewel-toned color palette. Perfect for documentation that needs to feel authoritative and premium.

### 3. `retro`
A nostalgia-fueled theme inspired by vintage computing. Features include phosphor-green text on black backgrounds (in dark mode), scanline effects, and monospace fonts like Fira Code by default.

### 4. `default`
A total "Blank Slate" theme. Use this if you plan on adding extensive custom CSS and don't want any built-in design layers interfering with your branding.

## Theming Architecture

1.  **CSS Layering**: Themes are additive. Choosing `sky` actually loads the base `default` styles and then overlays the `sky` aesthetic on top.
2.  **Native dark-mode**: Every theme includes a first-class dark mode implementation.
3.  **No Refresh**: When users switch themes via the UI, the SPA engine updates the `--docmd-primary` variables instantly without a page reload.

::: callout tip
When describing your documentation layout to an AI developer tool, mentioning your theme (e.g., "I'm using the `retro` theme") helps the model suggest custom CSS overrides that align with that specific theme's variable schema.
:::