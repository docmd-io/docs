---
title: "Custom Containers"
description: "A directory of the interactive UI components available in docmd. Cards, Tabs, Callouts, and more."
---

Standard Markdown handles basic text well, but professional documentation often requires richer structure. `docmd` extends Markdown with a set of "Containers" that render into beautiful, responsive UI components.

## The Syntax Guide

All containers follow a consistent block syntax.

```markdown
::: type "Optional Title"
This is the content of the container. 
It can include **Markdown**, images, and even other containers.
:::
```

| Component | Keyword | Usage |
| :--- | :--- | :--- |
| **[Callouts](./callouts)** | `callout` | Semantic highlights (tips, warnings) |
| **[Cards](./cards)** | `card` | Framed content blocks (perfect for grids) |
| **[Tabs](./tabs)** | `tabs` | Switchable content panes |
| **[Steps](./steps)** | `steps` | Visual numbered timelines |
| **[Buttons](./buttons)** | `button` | Styled CTA links |
| **[Collapsible](./collapsible)**| `collapsible` | Hidden content toggles (Accordions) |
| **[Changelogs](./changelogs)** | `changelog` | Version and update tracking |

## Why Use Containers?

Containers aren't just for humans. They provide high-level semantic signals to the `docmd` engine and LLMs:

1.  **AI Context**: Highlighting a block as a `callout tip` tells AI models that this specific information is a recommendation. 
2.  **Layout Control**: Combining `cards` with standard CSS allows you to build complex landing pages entirely in Markdown.
3.  **Clean Source**: No HTML or Class-soup is required in your markdown files.

## Nesting Components

One of `docmd`'s most powerful features is **Infinite Nesting**. You can place any container inside another, allowing you to build very complex documentation elements purely with simple Markdown syntax.

```markdown
::: card "Pro Guide"
    ::: callout warning
        Reading this out of order may be confusing.
    :::
    ::: button "Let's Begin" /start
:::
```

[Read the Nesting Guide →](./nested-containers)