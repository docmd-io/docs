---
title: "No-Style Pages"
description: "Create landing pages and custom layouts by disabling the default docmd theme."
---

# No-Style Pages

Sometimes you need a page that doesn't look like documentation—for example, a Marketing Landing Page, a Login screen, or a completely custom showcase.

`docmd` allows you to disable the standard layout (Sidebar, Header, Footer) on a per-page basis using **Frontmatter**.

## Enabling No-Style

Add `noStyle: true` to your page's frontmatter.

```yaml
---
title: "Welcome"
noStyle: true
components:
  meta: true      # Keep SEO meta tags
  favicon: true   # Keep the site favicon
  scripts: false  # Disable docmd's main JS (optional)
---

<!-- Write raw HTML or Markdown below -->
<div class="hero-section">
  <h1>My Product</h1>
  <p>The future of something amazing.</p>
</div>
```

## Controlling Components

When `noStyle` is active, `docmd` gives you a blank canvas. You can selectively re-enable specific parts of the system using the `components` object:

| Component | Default (in noStyle) | Description |
| :--- | :--- | :--- |
| `meta` | `false` | Injects `<title>`, `<meta name="description">`, and SEO tags. |
| `favicon` | `false` | Injects the favicon link. |
| `css` | `false` | Injects `docmd-main.css` (useful if you want to use grid/typography but not layout). |
| `theme` | `false` | Injects the active theme CSS (e.g., Sky, Retro). |
| `scripts` | `false` | Injects `docmd-main.js` (needed for toggle buttons, copy code, etc). |

## Example: Marketing Landing Page

```yaml
---
title: "Home"
noStyle: true
components:
  meta: true
  favicon: true
  css: true
customHead: |
  <style>
    .hero { text-align: center; padding: 100px 20px; }
    .hero h1 { font-size: 3rem; margin-bottom: 20px; }
  </style>
---

<div class="hero">
  <h1>Build Faster.</h1>
  <p>The ultimate developer tool.</p>
  
  ::: button "Get Started" /docs/intro color:blue
</div>
```