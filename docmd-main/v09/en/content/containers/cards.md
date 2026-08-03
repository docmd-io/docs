---
title: "Cards"
description: "Organise information into framed, visually distinct containers. Perfect for feature grids and landing pages."
---

Cards encapsulate related content into a distinct, bordered frame with an optional header, providing clear visual hierarchy for your documentation.

## Syntax Reference

```markdown
::: card "Title text" [property:value...]
This is the primary content area of the card.
:::
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| **Title** | `"String"` | Optional header title rendered at the top of the card. |
| **Icon** | `icon:NAME` | Optional. Adds a [Lucide](external:https://lucide.dev/icons) icon next to the header title. |

## Examples

### Feature Highlight

Use a card to frame a single technical capability with a clear title and icon.

```markdown
::: card "Asynchronous Generation" icon:zap
The core engine uses a non-blocking I/O pipeline, generating thousands of pages in milliseconds.
:::
```

::: card "Asynchronous Generation" icon:zap
The core engine uses a non-blocking I/O pipeline, generating thousands of pages in milliseconds.
:::

### Rich Content

Cards accept any standard Markdown, including code blocks and buttons.

````markdown
::: card "Instant Localisation"
Prepare your documentation for a global audience using the built-in i18n support.

```bash
docmd add i18n
```

::: button "L10n Strategy Guide" /guides/localization
:::
````

::: card "Instant Localisation"
Prepare your documentation for a global audience using the built-in i18n support.

```bash
docmd add i18n
```

::: button "L10n Strategy Guide" ./#localization
:::

### Multi-Column Layout

Wrap multiple cards inside a `grids` container for a responsive multi-column layout.

```markdown
::: grids
    ::: grid
        ::: card "Primary Node"
        Configuration for the master instance.
        :::
    :::
    ::: grid
        ::: card "Secondary Node"
        Configuration for redundant slave instances.
        :::
    :::
:::
```

::: grids
    ::: grid
        ::: card "Primary Node"
        Configuration for the master instance.
        :::
    :::
    ::: grid
        ::: card "Secondary Node"
        Configuration for redundant slave instances.
        :::
    :::
:::

::: callout tip "Semantic Clustering for AI" icon:lightbulb
In the `llms-full.txt` stream, content wrapped in a `card` is treated by AI agents as a **Cohesive Topic Cluster**. Utilising cards to segment unrelated concepts prevents context leakage and ensures LLM-generated summaries remain logically isolated.
:::