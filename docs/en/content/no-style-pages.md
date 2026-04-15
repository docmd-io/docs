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

<!-- Raw HTML or specialised Markdown goes here -->
<div class="hero">
  <h1>Next-Gen Documentation</h1>
  <p>Zero-config. Isomorphic. AI-Ready.</p>
</div>

::: callout info "Infinite Nesting Support"
Even with `noStyle: true`, all standard `docmd` containers like `::: card`, `::: tabs`, and `::: hero` are fully supported and can be nested at any depth.
:::
```

## Component Opt-In

When `noStyle` is active, you start with a blank canvas. Selectively re-enable core system components as needed:

| Component | Description |
| :--- | :--- |
| `meta` | Injects `<title>`, SEO meta tags, and structured OpenGraph data. |
| `favicon` | Injects the project-wide favicon. |
| `css` | Injects `docmd-main.css`. Highly recommended for foundational grid and typography. |
| `menubar` | Injects the site's top menubar. |
| `theme` | Injects the active theme's CSS variables and appearance overrides. |
| `scripts` | Injects interactive component logic (requires `mainScripts: true`). |
| `spa` | Enables the single-page application router (requires `scripts: true`). |

## Composable Landing Pages

The primary power of `noStyle` is that it allows you to use the entire suite of `docmd` components as high-fidelity "widgets" on a blank canvas. You aren't limited to raw HTML; you can build complex, structural designs purely in Markdown.

### Building a Modern Entry Point

```yaml
---
title: "Welcome"
noStyle: true
components:
  meta: true
  css: true
  menubar: true    # Use the site's top navigation
  scripts: true    # Enable interactive components
  mainScripts: true
---

::: hero layout:split glow:true
# Build Documentation that Wows.
The zero-config engine for modern engineering teams.

::: button "Get Started" /introduction color:blue
::: button "GitHub" github:docmd-io/docmd color:gray

== side
::: embed [https://www.youtube.com/watch?v=dQw4w9WgXcQ]
:::
:::

::: grids
  ::: card "Zero Configuration"
  Just write markdown. No complex React logic or build scripts.
  :::
  ::: card "AI Optimised"
  Structure-aware parsing for the LLM era.
  :::
  ::: card "Fast Without the Framework Tax"
  Static generation with isomorphic SPA navigation.
  :::
:::
```

::: callout tip "AI-Generated Layouts"
Because `noStyle` pages support raw HTML alongside `docmd` containers, they are perfectly suited for **AI-driven UI design**. You can prompt an AI: *"Design a modern hero section using Tailwind-like utility classes and docmd buttons, wrapped in a noStyle: true container."* The AI can iterate on the design within your static site pipeline with zero additional configuration.
:::