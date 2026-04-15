---
title: "Hero Sections"
description: "Build high-impact landing page headers and marketing highlights purely in Markdown."
---

The `hero` container creates professional, visually striking landing page headers. It handles complex CSS requirements like **Split Layouts**, **Glow Effects**, and **Sliders** while keeping the authoring experience clean.

## Basic Syntax

By default, the `hero` centers its content, making it perfect for banners and simple headlines.

```markdown
::: hero
# Build Faster.
Markdown to production docs in one command.

::: button "Get Started" /intro color:blue
:::
```

## Advanced Layouts

The `hero` container supports specialised flags to control its structural behaviour.

| Flag | Effect |
| :--- | :--- |
| `layout:split` | Divides the hero into a Text area (left) and a Media area (right). Stacks vertically on mobile. |
| `layout:slider` | Transforms the hero into a horizontal slider with scroll-snap behaviour. |
| `glow:true` | Injects a subtle, radial gradient glow in the background. |

### The Split Layout (`== side`)

Use the `== side` separator to define what content goes in the primary text area and what goes in the secondary "side" area (typically an image or a video embed).

```markdown
::: hero layout:split glow:true
# docmd 2.0
Isomorphic execution. AI-optimised.

::: button "Quickstart" /getting-started/basic-usage color:blue

== side
::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"
:::
```

::: hero layout:split glow:true
# docmd 2.0
Isomorphic execution. AI-optimised.

::: button "Quickstart" /getting-started/basic-usage color:blue

== side
::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"
:::

### The Slider Layout (`== slide`)

Create an interactive hero slider by using the `== slide` separator between different content nodes.

```markdown
::: hero layout:slider
== slide
# Isomorphic Core
The engine renders everywhere.
== slide
# AI Optimization
Built for the LLM era.
:::
```

::: hero layout:slider
== slide
# Isomorphic Core
The engine renders everywhere.
== slide
# AI Optimization
Built for the LLM era.
:::

## Responsive Behavior

The `hero` container is fully responsive by default:
- On **Desktop**, `layout:split` displays side-by-side.
- On **Mobile**, it automatically transitions to a centered, vertical stack to ensure optimal readability.

## Best Practices

1.  **Glow Effects**: Use `glow:true` sparingly on dark mode sites for a premium "neon" feel.
2.  **Media Types**: The "side" content of a split layout is perfect for the `::: embed` component, high-quality PNGs, or raw `<video>` tags.
3.  **CTA Placement**: Always place `::: button` elements within the primary "Hero Copy" section (before the `== side` separator) to ensure they are the first thing users see on mobile.