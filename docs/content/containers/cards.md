---
title: "Cards"
description: "Organize information into framed, visually distinct blocks. Ideal for landing pages and feature grids."
---

Cards are the primary structural component in `docmd`. They group related content into a bordered box with optional titles, providing clear visual hierarchy.

## Syntax

```markdown
::: card "Optional Title"
This is the card body.
:::
```

## Examples

### 1. Feature Highlight
```markdown
::: card "Fast Build Times"
`docmd` uses an asynchronous processing engine that can build hundreds of pages in under a second.
:::
```
::: card "Fast Build Times"
`docmd` uses an asynchronous processing engine that can build hundreds of pages in under a second.
:::

### 2. Complex Content
Cards can contain any other Markdown elements, including code blocks and buttons.

````markdown
::: card "Quick Install"
Get the library via your favorite package manager:

```bash
npm install @docmd/core
```

::: button "Installation Guide" /getting-started/installation
:::
````
::: card "Quick Install"
Get the library via your favorite package manager:

```bash
npm install @docmd/core
```

::: button "Installation Guide" /getting-started/installation
:::

## Creating Grids

While `docmd` is purely Markdown-driven, you can easily create responsive multi-column layouts using standard HTML wrappers around your cards.

```markdown
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">

::: card "Left Column"
Content for the left side.
:::

::: card "Right Column"
Content for the right side.
:::

</div>
```

::: callout tip
Cards act as **Topic Clusters**. When an LLM parses the `llms-full.txt` context, items wrapped in a `card` are treated as a single cohesive unit of information. Use cards to isolate unrelated technical concepts on the same page.
:::