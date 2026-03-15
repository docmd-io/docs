---
title: "No-Style Pages"
description: "Create custom landing pages and unique layouts by disabling the default docmd theme."
---

`docmd` allows you to bypass the standard documentation layout (Sidebar, Header, and Footer) on a per-page basis. This is ideal for creating product landing pages, custom dashboards, or marketing splash screens while maintaining access to the documentation engine's components.

## Enabling No-Style Mode

To disable the global UI, add `noStyle: true` to the page's frontmatter.

```yaml
---
title: "Product Showcase"
noStyle: true
components:
  meta: true      # Retain SEO and OpenGraph tags
  favicon: true   # Retain site favicon
  css: true       # Inject docmd-main.css for typography
---

<!-- Raw HTML or specialized Markdown goes here -->
<div class="hero">
  <h1>Next-Gen Documentation</h1>
  <p>Minimalist. Isomorphic. AI-Ready.</p>
</div>
```

## Component Opt-In

When `noStyle` is active, you start with a blank canvas. Selectively re-enable core system components as needed:

| Component | Description |
| :--- | :--- |
| `meta` | Injects `<title>`, SEO meta tags, and structured OpenGraph data. |
| `favicon` | Injects the project-wide favicon. |
| `css` | Injects `docmd-main.css`. Highly recommended for foundational grid and typography. |
| `theme` | Injects the active theme's CSS variables and appearance overrides. |
| `scripts` | Injects the SPA router and interactive component logic. |

## Practical Example: Landing Page

```yaml
---
title: "Welcome"
noStyle: true
components:
  meta: true
  css: true
customHead: |
  <style>
    .hero { text-align: center; padding: 120px 20px; background: var(--bg-primary); }
    .hero h1 { font-size: 3.5rem; margin-bottom: 20px; }
  </style>
---

<div class="hero">
  <h1>Documentation Done Right.</h1>
  ::: button "Get Started" /introduction color:blue
</div>
```

::: callout tip "AI-Generated Layouts"
Because `noStyle` pages support raw HTML alongside `docmd` containers, they are perfectly suited for **AI-driven UI design**. You can prompt an AI: *"Design a modern hero section using Tailwind-like utility classes and docmd buttons, wrapped in a noStyle: true container."* The AI can iterate on the design within your static site pipeline with zero additional configuration.
:::