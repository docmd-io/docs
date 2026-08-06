---
title: "Custom Interactive Containers"
description: "A comprehensive directory of structural UI containers and interactive components in docmd."
---

Standard Markdown excels at basic text formatting, but technical documentation requires structural components to communicate complex logic. `docmd` extends Markdown with a suite of **isomorphic containers** that render into responsive, high-fidelity UI elements.

::: callout tip "Migrating from Other Documentation Engines?" icon:sparkles
`docmd` supports syntax aliases from **VitePress** and **Docusaurus** out of the box. Containers like `:::tip`, `:::warning`, `:::note`, `:::details`, and `:::caution` work without modification. Spaceless syntax (e.g. `:::tabs` instead of `::: tabs`) is also supported across all containers.
:::

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
| **[Callouts](callouts.md)** | `callout` | Semantic alerts for tips, warnings, and critical notices. |
| **[Cards](cards.md)** | `card` | Framed structural containers for feature grids and landing layouts. |
| **[Grids](grids.md)** | `grids` | Auto-adjusting multi-column flexbox groups. |
| **[Tabs](tabs.md)** | `tabs` | Interactive switchable panes for alternative platform instructions. |
| **[Steps](steps.md)** | `steps` | Visual numbered timelines for step-by-step how-to guides. |
| **[Collapsibles](collapsible.md)** | `collapsible` | Interactive accordion toggles for FAQs and deep-dive technical data. |
| **[Buttons](buttons.md)** | `button` | Self-closing, prominent call-to-action navigation links. |
| **[Tags](tags.md)** | `tag` | Self-closing, coloured badges for version tags or status labels. |
| **[Hero Sections](hero.md)** | `hero` | High-impact landing page headers with split and slider support. |
| **[URL Embeds](embed.md)** | `embed` | Zero-latency embeds for video, social, and interactive media via `embed-lite`. |
| **[Changelogs](changelogs.md)** | `changelog` | Timeline-based version histories and release notes. |
| **[Nested Containers](nested-containers.md)** | - | Recursive composition patterns for multi-component layouts. |

## Strategic Benefits of Containers

Containers facilitate more than visual polish; they provide high-fidelity **Semantic Signals** to the `docmd` compiler and downstream AI agents:

1. **AI Context Mapping**: Marking a block as a `callout warning` explicitly instructs LLMs to prioritize that warning during reasoning and response generation.
2. **Structural Integrity**: Combining `cards` and `grids` enables the authoring of complex landing pages directly in Markdown without inline HTML bloat.
3. **Source Maintainability**: Eliminates raw HTML markup, keeping your `.md` files clean, readable, and machine-parsable.

## Recursive Composition

`docmd` supports **Infinite Nesting Depth**. Compose any container within another to build multi-layered documentation components:

```markdown
::: card "Architecture Overview"
    ::: callout info
    This module utilises an asynchronous non-blocking I/O pipeline.
    :::
    ::: button "Explore Core Engine Architecture" ./#architecture
:::
```

[Master the Nesting Guide](nested-containers.md)