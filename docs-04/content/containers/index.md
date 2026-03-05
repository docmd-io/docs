---
title: "Custom Containers"
description: "A gallery of the rich UI components available in docmd."
---

Standard Markdown is great for text, but sometimes you need more. `docmd` extends Markdown with a set of "Containers" to help you structure complex documentation.

Use the syntax `::: container_name` to start a block.

<div class="image-gallery" style="display:grid;grid-template-columns:47% 47%;gap:1em 6%;padding:2em 0">

::: card 📣 Callouts
Semantic highlights for warnings, tips, and important notes.
::: button "See Types" /content/containers/callouts
:::

::: card 🗃️ Cards
Group related content into distinct, framed boxes. Perfect for grids.
::: button "Card Syntax" /content/containers/cards
:::

::: card 📑 Tabs
Organize content into switchable panes to save vertical space.
::: button "Tab Examples" /content/containers/tabs
:::

::: card 🔢 Steps
Transform ordered lists into beautiful visual timelines.
::: button "Create Steps" /content/containers/steps
:::

::: card 🖱️ Buttons
Call-to-action links with custom colors and styles.
::: button "Button API" /content/containers/buttons
:::

::: card ↕️ Collapsible
Hide advanced details or FAQs inside toggleable accordions.
::: button "Accordions" /content/containers/collapsible
:::

</div>

## Nesting

Thanks to our advanced parser, you can nest these containers inside each other infinitely. See [Nested Containers](./nested-containers) for examples.