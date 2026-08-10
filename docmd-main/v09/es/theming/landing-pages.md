---
title: "Designing Custom Landing Pages"
description: "Build custom landing pages using hero headers, grid containers, and noStyle mode in docmd."
---

Documentation homepages serve as the primary entry point for developers exploring your project. `docmd` provides built-in visual containers and layout modes for building landing pages without requiring external web frameworks.

## Design Approaches

`docmd` offers two primary methods for constructing landing pages:

1. **Standard Layout with Hero & Grids**: Retains site navigation, sidebars, and top menubar while adding dynamic hero headers and feature cards.
2. **Blank Canvas (`noStyle: true`)**: Bypasses default documentation chrome for total creative control over custom HTML and CSS layouts.

## Implementation Examples

### 1. Hero Header Container

The [Hero](../content/containers/hero.md) container supports split media layouts (`layout:split`) and background radial glow effects (`glow:true`):

```markdown
::: hero layout:split glow:true
# Build Faster with docmd
The zero-config documentation engine for modern software teams.

::: button title:"Quickstart Guide" url:"../getting-started/quick-start.md" color:blue
::: button title:"GitHub Repository" url:"external:https://github.com/docmd-io/docmd" color:gray

== side
::: embed url:"https://www.youtube.com/watch?v=dQw4w9WgXcQ"
::: /hero
```

### 2. Feature Navigation with Grids

Combine [Grids and Cards](../content/containers/grids.md) to showcase core product capabilities side-by-side:

```markdown
::: grids
  ::: grid
    ::: card title:"Quickstart" icon:rocket
    Get up and running in under five minutes.
    ::: button title:"Learn More" url:"../getting-started/quick-start.md"
    ::: /card
  ::: /grid
  ::: grid
    ::: card title:"API Reference" icon:code
    Comprehensive documentation for all core functions.
    ::: button title:"Explore API" url:"../api/index.md"
    ::: /card
  ::: /grid
::: /grids
```

### 3. Blank Canvas with `noStyle`

For complete layout freedom that bypasses sidebars and headers, specify `noStyle: true` in [Page Frontmatter](../content/frontmatter.md):

```yaml
---
title: "Product Showcase"
noStyle: true
components:
  meta: true
  css: true
  menubar: true
---
```

When `noStyle: true` is active, `docmd` renders only the content provided on the page, allowing you to combine raw HTML utility classes with `docmd` containers freely.

::: callout tip "Selecting the Right Landing Mode" icon:lightbulb
For most documentation sites, combining `::: hero` and `::: grids` within standard layout pages delivers optimal brand impact while retaining instant search navigation and theme toggles.
:::