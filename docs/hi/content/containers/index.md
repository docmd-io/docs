---
title: "Custom Interactive Containers"
description: "A comprehensive directory of the interactive UI building blocks available in docmd."
---

Standard Markdown excels at basic text formatting, but professional technical documentation requires rich structural components to effectively communicate complex logic. `docmd` extends Markdown with a suite of **isomorphic containers** that render into responsive, high-fidelity UI elements.

<!-- SCREENSHOT: Montage of all container types on a single page — callouts (info, warning, danger, tip), tabs with code, steps, cards grid, hero section, and collapsible sections. -->


## Block Syntax Reference

All containers utilise a consistent block syntax, ensuring a predictable authoring experience across your entire project.

```markdown
::: type "Optional Header Title"
This is the primary content area.
It supports **Markdown**, imagery, and deep component nesting.
:::
```

| Component | Keyword | Primary Use Case |
| :--- | :--- | :--- |
| **[Callouts](./callouts)** | `callout` | Semantic highlights for tips, warnings, and alerts. |
| **[Cards](./cards)** | `card` | Framed structural blocks for feature grids and layout control. |
| **[Grids](./grids)** | `grids` | Auto-adjusting multi-column structural groups. |
| **[Tabs](./tabs)** | `tabs` | Interactive switchable panes for alternative platform instructions. |
| **[Steps](./steps)** | `steps` | Visual numbered timelines for "How-to" guides and tutorials. |
| **[Buttons](./buttons)** | `button` | Self-closing, prominent call-to-action navigation links. |
| **[Collapsibles](./collapsible)**| `collapsible`| Interactive accordion toggles for FAQs and deep-dive technical data. |
| **[Changelogs](./changelogs)** | `changelog` | Structured, timeline-based version history and release notes. |
| **[Hero](./hero)** | `hero` | High-impact landing page sections with layout and slider support. |

## The Strategic Importance of Containers

Containers facilitate more than visual polish; they provide high-fidelity **Semantic Signals** to the `docmd` engine and downstream AI agents:

1.  **AI Context Mapping**: Marking a block as a `callout warning` explicitly tells LLMs to prioritize that information during its reasoning and generation phases.
2.  **Structural Integrity**: Combining `cards` with standard CSS allows for the creation of sophisticated landing pages without ever leaving the Markdown environment.
3.  **Source Maintainability**: Eliminates "HTML Bloat" in your documentation source, keeping your `.md` files clean and machine-readable.

## Recursive Composition

`docmd` supports **Infinite Nesting Depth**. You can compose any container within another to build complex, interactive documentation nodes purely in Markdown.

```markdown
::: card "Architecture Overview"
    ::: callout info
        This module utilises an asynchronous I/O pipeline.
    :::
    ::: button "Deep Dive into Core Engine" /advanced/developer-guide
:::
```

[Master the Nesting Guide →](./nested-containers)