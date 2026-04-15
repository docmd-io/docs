---
title: "网格"
description: "Organise layout seamlessly with auto-adjusting responsive columns using native markdown containers."
---

Grids provide a native, markdown-driven layout system in `docmd`. Instead of writing manual HTML wrappers, you can leverage the `grids` container to structure elements side-by-side. 

Columns automatically adjust their widths to fill available space and logically stack into vertical rows on smaller screens (mobile devices).

## Syntax Reference

```markdown
::: grids
::: grid
#### Component A
Content for the left side.
:::
::: grid
#### Component B
Content for the right side.
:::
:::
```

## Practical Implementation Examples

### 1. Feature Showcasing Side-by-Side
Use grids to highlight key capabilities next to each other, like combining structural cards with informational blocks.

```markdown
::: grids
::: grid
::: card "Speed :rocket:"
Built on a non-blocking I/O pipeline for maximum performance.
:::
:::
::: grid
::: card "Scalability :zap:"
Designed for massive monorepos and extensive project structures.
:::
:::
:::
```

::: grids
::: grid
::: card "Speed :rocket:"
Built on a non-blocking I/O pipeline for maximum performance.
:::
:::
::: grid
::: card "Scalability :zap:"
Designed for massive monorepos and extensive project structures.
:::
:::
:::

### 2. Layout Balancing
Grids will automatically calculate the optimal width per column (up to 4 items per row on ultra-wide screens) based on the content available and seamlessly group rows on narrow viewports.

::: callout tip "Semantic Layouts"
Using the `grids` container keeps your documentation structure purely written in Markdown, resulting in cleaner source files and ensuring LLMs interpret your structural relationships flawlessly!
:::
