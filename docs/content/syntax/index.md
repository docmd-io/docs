---
title: "Markdown Syntax"
description: "Master the basic formatting of docmd: Headings, lists, bold, italic, and more."
---

`docmd` uses standard Markdown syntax. This guide covers the essentials for formatting text.

## Text Formatting

| Style | Syntax | Example |
| :--- | :--- | :--- |
| **Bold** | `**text**` | **Bold Text** |
| *Italic* | `*text*` | *Italic Text* |
| ~~Strikethrough~~ | `~~text~~` | ~~Deleted Text~~ |
| `Code` | `` `text` `` | `Inline Code` |

## Technical Elements

### Headings

```markdown
# Heading 1
## Heading 2
### Heading 3
```

::: callout tip
AI models (and search engines) rely heavily on a proper heading hierarchy. Always avoid skipping levels (e.g., jumping from `#` to `###`) to ensure the `llms.txt` and search index can accurately map your documentation's context.
:::

### Links

```markdown
[Link Text](https://www.example.com)
[Relative Link](../section/other-page/)
```

### Lists

*   **Unordered:** Use `*` or `-`.
*   **Ordered:** Use `1.`, `2.`, etc.

### Blocks

> This is a blockquote.

## Tables

| Header 1 | Header 2 |
| :--- | :--- |
| Left Align | Center Align |

## Advanced HTML

Because `docmd` is built with `html: true`, you can embed raw HTML directly in your Markdown files for custom styling needs.

```html
<div style="color: blue;">
  This is a blue div.
</div>
```