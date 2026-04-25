---
title: "Markdown Syntax Foundation"
description: "Master the fundamental formatting rules of docmd: Headings, typographic styles, and technical blocks."
---

`docmd` adheres to standard **GitHub Flavored Markdown (GFM)** specifications. This guide establishes the baseline standards for authoring core content across your documentation site.

## Typographic Styling

| Attribute | Markdown Syntax | Visual Outcome |
| :--- | :--- | :--- |
| **Emphasis** | `**Text**` | **Bold technical terms** |
| **Italic** | `*Text*` | *Stylized variables* |
| **Strikethrough** | `~~Text~~` | ~~Deprecated logic~~ |
| **Inline Logic** | `` `code` `` | `engine.initialise()` |

## Structural Elements

### Semantic Header Hierarchy

```markdown
# Level 1 (Automatic via Frontmatter)
## Level 2 (Major Section)
### Level 3 (Feature Detail)
```

::: callout tip "Logical Integrity for AI"
Advanced AI models and search internalizers rely on a strict heading hierarchy to build an accurate mental model of your project. By avoiding "Heading Skipping" (e.g., jumping from H2 directly to H4), you ensure the `llms-full.txt` context stream remains chronologically and logically sound.
:::

### Navigation & Reference

Utilise standard link syntax for both internal documentation nodes and global resources.

```markdown
[Global Resource](https://docmd.io)
[Internal Module](../api/node-api.md)
```

### Enumeration & Listing

*   **Unordered Segments**: Utilise `*` or `-` for scannable bullet points.
*   **Sequential Logic**: Utilise `1.`, `2.`, etc., for ordered instructions. (For tutorials, consider the high-impact **[Steps Container](../containers/steps)**).

## Technical Block Elements

### Blockquotes
The standard `>` syntax is ideal for highlighting outside quotes or background context.

> The docmd engine redefines the boundaries between static site generation and dynamic application delivery.

### Data Schemas (Tables)

| Attribute | Data Type | Default |
| :--- | :--- | :--- |
| `name` | `string` | `undefined` |
| `active` | `boolean` | `true` |

## Embedded HTML Support

As `docmd` is built with raw HTML parsing enabled, you can inject complex layouts or unique styling directly within your Markdown files for specialised UI requirements.

```html
<div style="padding: 2rem; border: 1px solid var(--border-color); border-radius: 12px; text-align: center;">
  Bespoke UI elements live here.
</div>
```