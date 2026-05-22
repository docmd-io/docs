---
title: "Grids"
description: "Organise layout into auto-adjusting responsive columns without writing HTML."
---

Grids provide a native, Markdown-driven layout system. Use the `grids` container to structure elements side-by-side. Columns automatically fill available space and stack vertically on smaller screens.

## Syntax Reference

```markdown
::: grids
    ::: grid
        Content for the first column.
    :::
    ::: grid
        Content for the second column.
    :::
:::
```

| Container | Description |
| :--- | :--- |
| **`::: grids`** | The parent container that initiates the responsive flexbox layout. |
| **`::: grid`** | Each child `grid` block acts as an individual column. Add as many as needed. |

## Examples

### Side-by-Side Cards

Combine `grids` with `cards` to display multiple features in a clean, responsive layout.

```markdown
::: grids
    ::: grid
        ::: card "Speed" icon:zap
        Built on a non-blocking I/O pipeline for maximum performance.
        :::
    :::
    ::: grid
        ::: card "Scalability" icon:layers
        Designed for massive monorepos and extensive project structures.
        :::
    :::
:::
```

::: grids
    ::: grid
        ::: card "Speed" icon:zap
        Built on a non-blocking I/O pipeline for maximum performance.
        :::
    :::
    ::: grid
        ::: card "Scalability" icon:layers
        Designed for massive monorepos and extensive project structures.
        :::
    :::
:::

### Three-Column Layout

Add a third `grid` block to create a three-column row. Columns automatically balance their widths.

```markdown
::: grids
    ::: grid
        ::: card "Search" icon:search
        Client-side full-text search powered by MiniSearch.
        :::
    :::
    ::: grid
        ::: card "i18n" icon:globe
        First-class locale routing and translated search indexes.
        :::
    :::
    ::: grid
        ::: card "Themes" icon:palette
        Built-in dark mode and full CSS variable customisation.
        :::
    :::
:::
```

::: grids
    ::: grid
        ::: card "Search" icon:search
        Client-side full-text search powered by MiniSearch.
        :::
    :::
    ::: grid
        ::: card "i18n" icon:globe
        First-class locale routing and translated search indexes.
        :::
    :::
    ::: grid
        ::: card "Themes" icon:palette
        Built-in dark mode and full CSS variable customisation.
        :::
    :::
:::

::: callout tip "Semantic Layouts"
The `grids` container keeps your structure purely in Markdown. This results in cleaner source files and ensures LLMs interpret structural relationships accurately.
:::