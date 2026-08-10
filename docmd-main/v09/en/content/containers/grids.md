---
title: "Grids"
description: "Organise responsive multi-column layouts using native Markdown flexbox containers in docmd."
---

Grids provide a native, Markdown-driven layout system. Use the `grids` container to structure elements side-by-side. Columns automatically balance available space and stack vertically on mobile viewports.

## Container Syntax

```markdown
::: grids # Outer flexbox grid wrapper opener
    ::: grid # Inner column container opener
        Content for column 1 (cards, text, buttons, code blocks)...
    ::: /grid # Explicit column closer

    ::: grid # Inner column 2 opener
        Content for column 2...
    ::: /grid
::: /grids # Explicit wrapper closer
```

## Features & Supported Attributes

| Container / Element | Type | Description |
| :--- | :--- | :--- |
| **`::: grids`** | Outer Container | Wrapper that initiates the responsive flexbox layout. |
| **`::: grid`** | Sub-Container | Column container. Declare multiple `grid` blocks inside `grids`. |
| **Flex Distribution** | Responsive | Columns balance horizontally on desktop and stack vertically on mobile. |
| **Closing Tags** | `::: /grids`, `::: /grid`, `:::` | Supports explicit named closing tags or generic `:::` closers. |

::: callout info "v0.9.1+ Container Syntax Standardisation" icon:sparkles
Starting in **v0.9.1**, `docmd` introduces explicit opening and closing container tags (e.g., `::: card` ... `::: /card`, `::: tab` ... `::: /tab`), explicit key-value properties (`title:"..."`, `url:"..."`), and trailing `# comments`. This modernised syntax is recommended for all new documentation. Full backward compatibility for legacy sub-block markers (`== tab`, `1.`) and positional argument fallbacks is strictly preserved.
:::


## Usage Examples

### Side-by-Side Cards

Combine `grids` with `cards` to present multiple feature blocks in a responsive row:

```markdown
::: grids
    ::: grid
        ::: card title:"Speed" icon:zap
        Built on an asynchronous non-blocking I/O engine for maximum performance.
        ::: /card
    ::: /grid
    ::: grid
        ::: card title:"Scalability" icon:layers
        Designed for large monorepos and multi-project workspaces.
        ::: /card
    ::: /grid
::: /grids
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
        ::: card title:"Search Engine" icon:search
        Built-in full-text search indexer.
        ::: /card
    ::: /grid
    ::: grid
        ::: card title:"Localisation" icon:globe
        Multi-language directory routing and localized search indexes.
        ::: /card
    ::: /grid
    ::: grid
        ::: card title:"Theming Engine" icon:palette
        Built-in dark mode and full CSS variable customisation.
        ::: /card
    ::: /grid
::: /grids
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