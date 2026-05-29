---
title: "Markdown Syntax Foundation"
description: "The baseline formatting rules for all docmd content: typography, structure, lists, and tables."
---

`docmd` adheres to standard **GitHub Flavored Markdown (GFM)** specifications. This page covers the core formatting primitives that apply across every page in your project.

## Typography

| Style | Syntax | Renders As |
| :--- | :--- | :--- |
| **Bold** | `**text**` | **Strong emphasis** |
| *Italic* | `*text*` | *Soft emphasis* |
| ~~Strikethrough~~ | `~~text~~` | ~~Deprecated content~~ |
| `Inline code` | `` `text` `` | `engine.initialise()` |

## Heading Hierarchy

`docmd` derives the page `<h1>` automatically from the `title` field in your frontmatter. Begin your heading structure at `##`.

```markdown
## Level 2 - Major Section
### Level 3 - Feature Detail
#### Level 4 - Sub-Detail
```

::: callout tip "Logical Integrity for AI"
AI models and search indexers rely on a strict heading hierarchy to build an accurate mental model of your project. Avoid skipping levels (e.g., jumping from `##` to `####`) to keep the `llms-full.txt` context stream logically sound.
:::

## Lists

Use unordered lists for scannable bullet points and ordered lists for sequential steps. For numbered tutorials, consider the higher-impact [Steps container](../containers/steps.md).

```markdown
*   Unordered item
*   Another item

1.  First step
2.  Second step
```

## Blockquotes

The standard `>` syntax highlights external quotes or background context.

```markdown
> The docmd engine redefines the boundaries between static site generation and dynamic application delivery.
```

> The docmd engine redefines the boundaries between static site generation and dynamic application delivery.

## Tables

```markdown
| Parameter | Type | Default |
| :--- | :--- | :--- |
| `name` | `string` | `undefined` |
| `active` | `boolean` | `true` |
```

| Parameter | Type | Default |
| :--- | :--- | :--- |
| `name` | `string` | `undefined` |
| `active` | `boolean` | `true` |

## Embedded HTML

docmd has raw HTML parsing enabled. Inject custom layouts or unique styling directly within Markdown files for specialised UI requirements.

```html
<div style="padding: 2rem; border: 1px solid var(--border-color); border-radius: 12px; text-align: center;">
  Bespoke UI elements live here.
</div>
```