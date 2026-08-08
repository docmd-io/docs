---
title: "Markdown Syntax Foundation"
description: "Master baseline Markdown typography, heading hierarchy, lists, tables, and raw HTML extensions in docmd."
---

`docmd` adheres to standard **GitHub Flavored Markdown (GFM)** specifications. This page covers baseline typography and structural primitives used across your documentation.

## Typography Primitives

| Style | Syntax | Rendering Output |
| :--- | :--- | :--- |
| **Bold** | `**text**` | **Strong emphasis** |
| *Italic* | `*text*` | *Soft emphasis* |
| ~~Strikethrough~~ | `~~text~~` | ~~Deprecated content~~ |
| `Inline code` | `` `text` `` | `engine.initialise()` |

## Heading Hierarchy Rules

`docmd` derives the main document `<h1>` header automatically from the frontmatter `title` property. Structure section headings starting at `##` (`h2`):

```markdown
## Level 2 - Major Section
### Level 3 - Feature Subtopic
#### Level 4 - Detailed Subsection
```

::: callout tip "Heading Structure for Search & AI" icon:sparkles
Maintain a sequential heading hierarchy without skipping levels (e.g. jumping directly from `##` to `####`). Consistent structure allows AI agents and search indexers to map your content accurately.
:::

## Lists

Use bullet lists for scannable summaries and ordered lists for sequential workflows. For multi-step tutorials, use the dedicated [Steps Container](../containers/steps.md):

```markdown
*   Unordered feature list
*   Secondary bullet point

1.  Initialise workspace environment
2.  Execute build command
```

## Blockquotes

Standard `>` blockquotes highlight external quotes or contextual notices:

```markdown
> The docmd engine redefines the boundaries between static site generation and dynamic web delivery.
```

> The docmd engine redefines the boundaries between static site generation and dynamic web delivery.

## Tables

Format tabular data using GFM pipe syntax:

```markdown
| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `String` | `undefined` | Key identifier. |
| `active` | `Boolean` | `true` | Enable status toggle. |
```

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `name` | `String` | `undefined` | Key identifier. |
| `active` | `Boolean` | `true` | Enable status toggle. |

## Raw HTML Integration

`docmd` parses inline HTML directly. Use raw HTML elements when designing bespoke landing components or embedded widgets:

```html
<div style="padding: 2rem; border: 1px solid var(--border-color); border-radius: 12px; text-align: center;">
  Bespoke HTML elements render inline seamlessly.
</div>
```