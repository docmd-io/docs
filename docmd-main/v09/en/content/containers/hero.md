---
title: "Hero Sections"
description: "Build high-impact landing page headers and marketing highlights in Markdown in docmd."
---

The `hero` container creates visually striking landing page headers. It handles split media layouts, background glow effects, and interactive carousels without requiring raw HTML markup.

## Container Syntax

```markdown
::: hero [layout:split|slider] [glow:true|false] # Hero container opener
::: slide # Individual carousel slide opener
# Isomorphic Core Engine
Renders statically and executes client-side seamlessly.
::: /slide # Explicit slide closer

::: slide # Second slide opener
# AI Context Optimisation
Structure-aware parsing for LLM agents.
::: /slide
::: /hero # Explicit hero closer
```

## Features & Supported Attributes

| Parameter / Property | Type | Description |
| :--- | :--- | :--- |
| **Layout Variant** | `layout:split` \| `layout:slider` | `split` divides into hero text and media areas; `slider` creates a scroll-snap carousel. |
| **Glow Effect** | `glow:true` \| `glow:false` | Injects a subtle radial gradient glow behind the hero section. |
| **Sub-Containers** | `::: slide` ... `::: /slide` | Defines individual slides inside a slider layout. Legacy `== slide` is also supported. |
| **Closing Tags** | `::: /hero`, `::: /slide`, `:::` | Supports explicit named closing tags or generic `:::` closers. |

::: callout info "v0.9.1+ Container Syntax Standardisation" icon:sparkles
Starting in **v0.9.1**, `docmd` introduces explicit opening and closing container tags (e.g., `::: card` ... `::: /card`, `::: tab` ... `::: /tab`), explicit key-value properties (`title:"..."`, `url:"..."`), and trailing `# comments`. This modernised syntax is recommended for all new documentation. Full backward compatibility for legacy sub-block markers (`== tab`, `1.`) and positional argument fallbacks is strictly preserved.
:::


## Usage Examples

### Split Layout

Use the `== side` separator to divide content into a primary hero text area and a secondary media area:

```markdown
::: hero layout:split glow:true # Split header layout
# docmd
Isomorphic execution engine. AI-optimised documentation.

::: button title:"Quickstart Guide" url:"../../getting-started/quick-start.md" color:blue

== side
::: embed url:"https://www.youtube.com/watch?v=0CSyIBHQy9g"
::: /hero
```

::: hero layout:split glow:true
# docmd
Isomorphic execution engine. AI-optimised documentation.

::: button "Quickstart Guide" ../../getting-started/quick-start.md color:blue

== side
::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"
::: /hero

### Slider Layout

Use explicit `::: slide` sub-containers to build an interactive carousel of hero content panels:

```markdown
::: hero layout:slider # Interactive slider container
::: slide # Panel 1
# Isomorphic Core Engine
Renders statically and executes client-side seamlessly.
::: /slide

::: slide # Panel 2
# AI Context Optimisation
Structure-aware parsing for LLM agents.
::: /slide
::: /hero
```

::: hero layout:slider
::: slide
# Isomorphic Core Engine
Renders statically and executes client-side seamlessly.
::: /slide

::: slide
# AI Context Optimisation
Structure-aware parsing for LLM agents.
::: /slide
::: /hero

::: callout tip "Hero Design Best Practices" icon:lightbulb
Use `glow:true` on dark-themed sites for a premium visual effect. Place `::: button` elements in the primary text section before `== side` to guarantee proper mobile stacking order.
:::