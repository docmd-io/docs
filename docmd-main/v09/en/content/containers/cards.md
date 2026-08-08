---
title: "Cards"
description: "Organise information into framed, visually distinct containers for feature grids and landing pages in docmd."
---

Cards encapsulate related content into a distinct, bordered frame with an optional header, providing clear visual hierarchy across your documentation pages.

## Syntax Reference

```markdown
::: card "Title text" [property:value...]
This is the primary content area of the card.
:::
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| **Title** | `"String"` | Optional header title rendered at the top of the card frame. |
| **Icon** | `icon:NAME` | Optional. Adds a [Lucide](external:https://lucide.dev/icons) icon next to the header title. |

## Usage Examples

### Feature Highlight Card

Use a card to frame a single technical capability with an explicit title and icon:

```markdown
::: card "Asynchronous Generation" icon:zap
The core engine uses a non-blocking I/O pipeline, compiling thousands of pages in milliseconds.
:::
```

::: card "Asynchronous Generation" icon:zap
The core engine uses a non-blocking I/O pipeline, compiling thousands of pages in milliseconds.
:::

### Rich Content Composition

Cards accept any Markdown content, including code snippets and button containers:

```markdown
::: card "Instant Localisation"
Prepare your documentation for a global audience using built-in i18n support.

```bash
npx @docmd/core build
```

::: button "Localisation Strategy Guide" ../localisation/translated-content.md
:::
````

::: card "Instant Localisation"
Prepare your documentation for a global audience using built-in i18n support.

```bash
npx @docmd/core build
```

::: button "Localisation Strategy Guide" ../localisation/translated-content.md
:::

### Multi-Column Layout

Wrap multiple cards inside a `grids` container for a responsive multi-column layout:

```markdown
::: grids
    ::: grid
        ::: card "Primary Node"
        Configuration options for master instances.
        :::
    :::
    ::: grid
        ::: card "Secondary Node"
        Configuration options for replica instances.
        :::
    :::
:::
```

::: grids
    ::: grid
        ::: card "Primary Node"
        Configuration options for master instances.
        :::
    :::
    ::: grid
        ::: card "Secondary Node"
        Configuration options for replica instances.
        :::
    :::
:::

::: callout tip "Semantic Clustering for AI" icon:lightbulb
In the `llms.txt` context stream, content wrapped in a `card` is parsed as a **Cohesive Topic Cluster**. Using cards to segment concepts prevents context leakage across unrelated sections.
:::