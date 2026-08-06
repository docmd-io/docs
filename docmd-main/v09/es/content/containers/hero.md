---
title: "Hero Sections"
description: "Build high-impact landing page headers and marketing highlights in Markdown in docmd."
---

The `hero` container creates visually striking landing page headers. It handles split media layouts, background glow effects, and interactive carousels without requiring raw HTML markup.

## Syntax Reference

```markdown
::: hero [property:value...]
    # Page Title
    A short supporting tagline.

    ::: button "Call to Action" ./#target-url
:::
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| **Layout** | `layout:split` \| `layout:slider` | `split` divides the hero into primary text and secondary media areas. `slider` creates a horizontal scroll-snap carousel. |
| **Glow** | `glow:true` | Injects a subtle radial gradient glow behind the hero header. |
| **Side Separator** | `== side` | Delimiter for `layout:split`. Content after this renders in the right-hand media area. |
| **Slide Separator** | `== slide` | Delimiter for `layout:slider`. Each `== slide` defines a new carousel panel. |

## Usage Examples

### Split Layout

Use the `== side` separator to divide content into a primary hero text area and a secondary media area:

```markdown
::: hero layout:split glow:true
    # docmd
    Isomorphic execution engine. AI-optimised documentation.

    ::: button "Quickstart Guide" ../../getting-started/quick-start.md color:blue

    == side
        ::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"
:::
```

::: hero layout:split glow:true
# docmd
Isomorphic execution engine. AI-optimised documentation.

::: button "Quickstart Guide" ../../getting-started/quick-start.md color:blue

== side
::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"
:::

### Slider Layout

Use `== slide` separators to build an interactive carousel of hero content panels:

```markdown
::: hero layout:slider
    == slide
        # Isomorphic Core Engine
        Renders statically and executes client-side seamlessly.
    == slide
        # AI Context Optimisation
        Structure-aware parsing for LLM agents.
:::
```

::: hero layout:slider
    == slide
        # Isomorphic Core Engine
        Renders statically and executes client-side seamlessly.
    == slide
        # AI Context Optimisation
        Structure-aware parsing for LLM agents.
:::

::: callout tip "Hero Design Best Practices" icon:lightbulb
Use `glow:true` on dark-themed sites for a premium visual effect. Place `::: button` elements in the primary text section before `== side` to guarantee proper mobile stacking order.
:::