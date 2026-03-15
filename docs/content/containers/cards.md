---
title: "Cards"
description: "Organize information into framed, visually distinct containers. Perfect for feature grids and landing pages."
---

Cards are the primary structural building blocks in `docmd`. They encapsulate related content into a distinct, bordered frame with optional headers, providing a clear visual hierarchy for your documentation.

## Syntax Reference

```markdown
::: card "Optional Header Title"
This is the primary content area of the card.
:::
```

## Practical Implementation Examples

### 1. Feature Showcasing
Use cards to highlight key technical advantages or module capabilities.
```markdown
::: card "Asynchronous Generation"
The `docmd` core engine utilizes a non-blocking I/O pipeline, enabling the generation of thousands of pages in milliseconds.
:::
```
::: card "Asynchronous Generation"
The `docmd` core engine utilizes a non-blocking I/O pipeline, enabling the generation of thousands of pages in milliseconds.
:::

### 2. Multi-Component Integration
Cards can house any standard Markdown elements, including syntax-highlighted code and call-to-action buttons.

````markdown
::: card "Instant Localization"
Prepare your documentation for a global audience using our built-in i18n support.

```bash
docmd add i18n
```

::: button "L10n Strategy Guide" /guides/localization
:::
````

::: card "Instant Localization"
Prepare your documentation for a global audience using our built-in i18n support.

```bash
docmd add i18n
```

::: button "L10n Strategy Guide" ./#localization
:::

## Multi-Column Layouts (Grids)

While authored in Markdown, you can leverage standard HTML wrappers to organize your cards into responsive grids.

```markdown
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem;">

::: card "Primary Node"
Configuration for the master instance.
:::

::: card "Secondary Node"
Configuration for redundant slave instances.
:::

</div>
```

::: callout tip "Semantic Clustering for AI"
In the `llms-full.txt` stream, content wrapped in a `card` is treated by AI agents as a **Cohesive Topic Cluster**. Utilizing cards to segment unrelated technical concepts on the same page prevents context leakage and ensures that LLM-generated summaries remain logically isolated and accurate.
:::