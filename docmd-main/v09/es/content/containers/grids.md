---
title: "Grids"
description: "Organise responsive multi-column layouts using native Markdown flexbox containers in docmd."
---

Grids provide a native, Markdown-driven layout system. Use the `grids` container to structure elements side-by-side. Columns automatically balance available space and stack vertically on mobile viewports.

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
| **`::: grids`** | Outer wrapper container that initiates the responsive flexbox layout. |
| **`::: grid`** | Inner column container. Declare as many `grid` blocks as required. |

## Usage Examples

### Side-by-Side Cards

Combine `grids` with `cards` to present multiple feature blocks in a responsive row:

```markdown
::: grids
    ::: grid
        ::: card "Speed" icon:zap
        Built on an asynchronous non-blocking I/O engine for maximum performance.
        :::
    :::
    ::: grid
        ::: card "Scalability" icon:layers
        Designed for large monorepos and multi-project workspaces.
        :::
    :::
:::
```

::: grids
    ::: grid
        ::: card "Speed" icon:zap
        Built on an asynchronous non-blocking I/O engine for maximum performance.
        :::
    :::
    ::: grid
        ::: card "Scalability" icon:layers
        Designed for large monorepos and multi-project workspaces.
        :::
    :::
:::

### Three-Column Layout

Add a third `grid` block to create a three-column row:

```markdown
::: grids
    ::: grid
        ::: card "Search Engine" icon:search
        Built-in full-text search indexer.
        :::
    :::
    ::: grid
        ::: card "Localisation" icon:globe
        Multi-language directory routing and localized search indexes.
        :::
    :::
    ::: grid
        ::: card "Theming Engine" icon:palette
        Built-in dark mode and full CSS variable customisation.
        :::
    :::
:::
```

::: grids
    ::: grid
        ::: card "Search Engine" icon:search
        Built-in full-text search indexer.
        :::
    :::
    ::: grid
        ::: card "Localisation" icon:globe
        Multi-language directory routing and localized search indexes.
        :::
    :::
    ::: grid
        ::: card "Theming Engine" icon:palette
        Built-in dark mode and full CSS variable customisation.
        :::
    :::
:::

::: callout tip "Clean Structural Signals" icon:lightbulb
The `grids` container maintains layout structure purely in Markdown. This eliminates raw HTML bloat and ensures AI context indexers interpret side-by-side relationship signals cleanly.
:::