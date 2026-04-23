---
title: "Designing Custom Documentation Landing Pages with docmd"
description: "A comprehensive guide on landing pages."
---

## Problem

The default rendering for `index.md` in most generators looks like a standard wall-of-text documentation page. Generating a beautiful, high-converting product landing page usually requires spinning up a separate Next.js or React repository.

## Why it matters

Your documentation `index.md` is often the first interaction a developer has with your brand. First impressions matter. If it looks like a generic markdown parsed output, it fails to inspire confidence in your product's polish. 

## Approach

`docmd` provides `noStyle` page configurations, Hero containers, and extensive Grid architectures to convert any standard Markdown file into a premium Marketing-grade landing surface without requiring a separate web framework.

## Implementation

### 1. The Native Approach (Using Containers)
You can build a rich dashboard landing page entirely in markdown using grids and hero blocks.

```markdown
---
title: "Welcome"
titleAppend: false
---

::: hero
# Building the Future
Discover tools to launch your ideas faster.
:::

::: grids {cols=3}
::: grid
::: card "Quick Start" /start icon:rocket
Get up and running in 5 minutes.
:::
:::
<!-- More grids -->
:::
```

### 2. The Full Override (noStyle)
If you need complete pixel-perfect control (custom videos, external layout libraries), instruct `docmd` to step away entirely while still handling routing and output generation.

```yaml
---
title: "Product Homepage"
noStyle: true
---
```
`<div class="my-custom-html-dashboard">...</div>`

## Trade-offs

Utilizing `noStyle: true` means you forfeit the native docmd menubar, sidebar, and theme toggler for that specific HTML page. You take on the responsibility of coding a mobile-responsive navigation header from scratch and ensuring dark-mode CSS logic functions correctly via your own scripts.
