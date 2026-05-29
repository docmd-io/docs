---
title: "Hero Sections"
description: "Build high-impact landing page headers and marketing highlights purely in Markdown."
---

The `hero` container creates visually striking landing page headers. It handles complex layouts including splits, glow effects, and sliders without requiring custom HTML.

## Syntax Reference

```markdown
::: hero [property:value...]
    # Page Title
    A short supporting tagline.

    ::: button "Call to Action" /target-url
:::
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| **Layout** | `layout:split` \| `layout:slider` | `split` divides the hero into a text area and a side media area. `slider` creates a horizontal scroll-snap carousel. |
| **Glow** | `glow:true` | Injects a subtle radial gradient glow in the background. |
| **Side Separator** | `== side` | Used with `layout:split`. Everything after this delimiter renders in the secondary (right-hand) area. |
| **Slide Separator** | `== slide` | Used with `layout:slider`. Each `== slide` defines a new carousel panel. |

## Examples

### Split Layout

Use the `== side` separator to divide content into a primary text area and a secondary media area.

```markdown
::: hero layout:split glow:true
    # docmd
    Isomorphic execution. AI-optimised.

    ::: button "Quickstart" ../../getting-started/quick-start.md colour:blue

    == side
        ::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"
:::
```

::: hero layout:split glow:true
# docmd
Isomorphic execution. AI-optimised.

::: button "Quickstart" ../../getting-started/quick-start.md colour:blue

== side
::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"
:::

### Slider Layout

Use `== slide` separators to build an auto-advancing carousel of content panels.

```markdown
::: hero layout:slider
    == slide
        # Isomorphic Core
        The engine renders everywhere.
    == slide
        # AI Optimisation
        Built for the LLM era.
:::
```

::: hero layout:slider
    == slide
        # Isomorphic Core
        The engine renders everywhere.
    == slide
        # AI Optimisation
        Built for the LLM era.
:::

::: callout tip "Best Practices"
Use `glow:true` sparingly on dark mode sites for a premium feel. Place `::: button` elements in the primary text section, before `== side`, to ensure they remain visible on mobile screens.
:::