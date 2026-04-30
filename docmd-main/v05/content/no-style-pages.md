---
title: "No-Style Pages"
description: "Create landing pages and custom layouts by disabling the default docmd theme."
---

Sometimes you need a page that looks completely different, like a Marketing Landing Page, a Login screen, or a custom showcase.

`docmd` allows you to disable the standard layout (Sidebar, Header, Footer) on a per-page basis using **Frontmatter**.

## Enabling No-Style

Add `noStyle: true` to your page's frontmatter.

```yaml
---
title: "Welcome"
noStyle: true
components:
  meta: true      # Keep SEO meta tags
  favicon: true   # Keep site favicon
  css: true       # Injects basic docmd-main.css
---

<!-- Write raw HTML or Markdown below -->
<div class="hero-section">
  <h1>My Product</h1>
  <p>The future of documentation.</p>
</div>
```

## Controlling Components

When `noStyle` is active, you have a blank canvas. Selectively re-enable specific parts of the system:

| Component | Description |
| :--- | :--- |
| `meta` | Injects `<title>`, SEO tags, and OpenGraph data. |
| `favicon` | Injects the site favicon. |
| `css` | Injects `docmd-main.css` (useful for grid/typography). |
| `theme` | Injects the active theme colors/overrides. |
| `scripts` | Injects `docmd-main.js` (needed for buttons/SPA). |

## Example: Marketing Landing Page

```yaml
---
title: "Home"
noStyle: true
components:
  meta: true
  css: true
customHead: |
  <style>
    .hero { text-align: center; padding: 100px 20px; }
  </style>
---

<div class="hero">
  <h1>Build Faster.</h1>
  ::: button "Get Started" /docs/intro color:blue
</div>
```

::: callout tip "AI-Managed Landing Pages 🤖"
Because `noStyle` pages can accept raw HTML while still being parsed by `docmd`, they are perfect for **AI-generated layouts**. You can prompt an AI: *"Create a landing page for my project using noStyle: true and provide the raw HTML section."* The AI can perfectly integrate with the rest of your build pipeline.
:::