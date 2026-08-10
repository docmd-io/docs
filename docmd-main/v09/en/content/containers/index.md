---
title: "Custom Interactive Containers"
description: "A comprehensive directory of structural UI containers and interactive components in docmd."
---

Standard Markdown excels at basic text formatting, but technical documentation requires structural components to communicate complex logic. `docmd` extends Markdown with a suite of **isomorphic containers** that render into responsive, high-fidelity UI elements.

::: callout info "v0.9.1+ Container Syntax Standardisation" icon:sparkles
Starting in **v0.9.1**, `docmd` introduces explicit opening and closing container tags (e.g., `::: card` ... `::: /card`, `::: tab` ... `::: /tab`), explicit key-value properties (`title:"..."`, `url:"..."`), and trailing `# comments`. This modernised syntax is recommended for all new documentation. Full backward compatibility for legacy sub-block markers (`== tab`, `1.`) and positional argument fallbacks is strictly preserved.
:::

::: callout tip "Migrating from Other Documentation Engines?" icon:sparkles
`docmd` supports syntax aliases from **VitePress** and **Docusaurus** out of the box. Containers like `:::tip`, `:::warning`, `:::note`, `:::details`, and `:::caution` work without modification. Spaceless syntax (e.g. `:::tabs` instead of `::: tabs`) is also supported across all containers.
:::

## Unified Block Syntax Reference

All containers utilize a consistent, depth-aware block syntax with explicit opening and closing tags, inline comments, and universal key-value attributes:

```markdown
::: containerType title:"Header Title" icon:rocket # Container header with comment
::: subContainer title:"Item Title" icon:code-2 # Explicit sub-container item
This is the primary content area.
It supports **Markdown**, imagery, and deep component nesting.
::: /subContainer # Explicit sub-container closer
::: /containerType # Explicit parent container closer
```

| Component | Keyword | Primary Use Case |
| :--- | :--- | :--- |
| **[Callouts](callouts.md)** | `callout` | Semantic alerts for tips, warnings, and critical notices. |
| **[Cards](cards.md)** | `card` | Framed structural containers for feature grids and landing layouts. |
| **[Grids](grids.md)** | `grids` | Auto-adjusting multi-column flexbox groups. |
| **[Tabs](tabs.md)** | `tabs` | Interactive switchable panes with explicit `::: tab` items. |
| **[Steps](steps.md)** | `steps` | Visual numbered timelines with explicit `::: step` items. |
| **[Collapsibles](collapsible.md)** | `collapsible` | Interactive accordion toggles for FAQs and deep-dive technical data. |
| **[Buttons](buttons.md)** | `button` | Self-closing, prominent call-to-action navigation links. |
| **[Tags](tags.md)** | `tag` | Self-closing, coloured badges for version tags or status labels. |
| **[Hero Sections](hero.md)** | `hero` | High-impact landing page headers with split and `::: slide` support. |
| **[URL Embeds](embed.md)** | `embed` | Zero-latency embeds for video, social, and interactive media via `embed-lite`. |
| **[Changelogs](changelogs.md)** | `changelog` | Timeline-based version histories with explicit `::: log` items. |
| **[Mermaid Diagrams](mermaid.md)** | `mermaid` | Flowcharts, sequence diagrams, and architecture maps with per-diagram controls. |
| **[Nested Containers](nested-containers.md)** | - | Recursive composition patterns for multi-component layouts. |

## Universal Attribute & Key-Value Parsing

All container opening headers support positional parameters, named key-value attributes, and trailing inline comments (`# comment`):

```markdown
::: button title:"Documentation" url:"/docs/getting-started" icon:book color:#3b82f6 # Named attributes
::: card title:"Architecture Overview" icon:cpu # Positional title + icon attribute
::: callout warning title:"Security Policy" # Positional title + comment
```

- **Positional Fallback**: Quoted strings (`"My Title"`) automatically map to `title` or `url` depending on container type.
- **Named Overrides**: `title:"..."`, `url:"..."`, `icon:...`, `color:#...` allow attributes to be specified in any order.
- **Inline Comments**: `# comment` at the end of a container header line is stripped before parsing.

## Strategic Benefits of Containers

Containers facilitate more than visual polish; they provide high-fidelity **Semantic Signals** to the `docmd` compiler and downstream AI agents:

1. **AI Context Mapping**: Marking a block as a `callout warning` explicitly instructs LLMs to prioritize that warning during reasoning and response generation.
2. **Structural Integrity**: Combining `cards` and `grids` enables the authoring of complex landing pages directly in Markdown without inline HTML bloat.
3. **Source Maintainability**: Eliminates raw HTML markup, keeping your `.md` files clean, readable, and machine-parsable.

## Recursive Composition & Explicit Closers

`docmd` supports **Infinite Nesting Depth** and deterministic closing tag resolution using named closing tags (`::: /card`, `::: /tabs`):

```markdown
::: card title:"Architecture Overview" # Parent card
    ::: callout info title:"Asynchronous I/O" # Inner callout
    This module utilizes an asynchronous non-blocking I/O pipeline.
    ::: /callout # Closes inner callout
    ::: button title:"Explore Core Engine Architecture" url:"url:"/#architecture""
::: /card # Closes parent card
```

[Master the Nesting Guide](nested-containers.md)