---
title: "Cards"
description: "Organise information into framed, visually distinct containers for feature grids and landing pages in docmd."
---

Cards encapsulate related content into a distinct, bordered frame with an optional header, providing clear visual hierarchy across your documentation pages.

## Container Syntax

```markdown
::: card [title:"Header Title"] [icon:icon_name] # Card container opener
Content block supporting Markdown, code snippets, buttons, and callouts...
::: /card # Explicit closing tag
```

## Features & Supported Attributes

| Parameter / Property | Type | Description |
| :--- | :--- | :--- |
| **Title** | `"String"` \| `title:"..."` | Optional header title displayed at the top of the card frame (positional 1st parameter or `title:"..."`). |
| **Iconography** | `icon:NAME` | Optional. Injects a [Lucide](external:https://lucide.dev/icons) icon next to the header title text. |
| **Markdown Content** | Free Text | Supports arbitrary Markdown elements, code blocks, lists, buttons, and nested containers. |
| **Closing Tags** | `::: /card`, `:::` | Supports explicit named closing tag `::: /card` or generic `:::`. |

::: callout info "v0.9.1+ Container Syntax Standardisation" icon:sparkles
Starting in **v0.9.1**, `docmd` introduces explicit opening and closing container tags (e.g., `::: card` ... `::: /card`, `::: tab` ... `::: /tab`), explicit key-value properties (`title:"..."`, `url:"..."`), and trailing `# comments`. This modernised syntax is recommended for all new documentation. Full backward compatibility for legacy sub-block markers (`== tab`, `1.`) and positional argument fallbacks is strictly preserved.
:::


## Usage Examples

### Feature Highlight Card

Use a card to frame a single technical capability with an explicit title and icon:

```markdown
::: card title:"Asynchronous Generation" icon:zap
The core engine uses a non-blocking I/O pipeline, compiling thousands of pages in milliseconds.
::: /card
```

::: card "Asynchronous Generation" icon:zap
The core engine uses a non-blocking I/O pipeline, compiling thousands of pages in milliseconds.
:::

### Rich Content Composition

Cards accept any Markdown content, including code snippets and button containers:

```markdown
::: card title:"Instant Localisation"
Prepare your documentation for a global audience using built-in i18n support.

```bash
npx @docmd/core build
```

::: button title:"Localisation Strategy Guide" url:"../localisation/translated-content.md"
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
        ::: card title:"Primary Node"
        Configuration options for master instances.
        ::: /card
    ::: /grid
    ::: grid
        ::: card title:"Secondary Node"
        Configuration options for replica instances.
        ::: /card
    ::: /grid
::: /grids
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