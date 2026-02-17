---
title: "Markdown Syntax"
description: "Basic formatting guide for docmd: Headings, lists, bold, italic, and more."
---

# Markdown Syntax

`docmd` uses standard Markdown syntax. This guide covers the essentials for formatting text.

## Text Formatting

| Style | Syntax | Example |
| :--- | :--- | :--- |
| **Bold** | `**text**` or `__text__` | **Bold Text** |
| *Italic* | `*text*` or `_text_` | *Italic Text* |
| ~~Strikethrough~~ | `~~text~~` | ~~Deleted Text~~ |
| `Code` | `` `text` `` | `Inline Code` |

## Common Elements

You can use all standard Markdown elements:

### Headings

```markdown
# Heading 1
## Heading 2
### Heading 3
...
###### Heading 6
```

### Paragraphs

Just type text. Separate paragraphs with a blank line.

### Lists

*   **Unordered:**
    ```markdown
    * Item 1
    * Item 2
        * Nested Item 2a
        * Nested Item 2b
    + Item 3 (using +)
    - Item 4 (using -)
    ```
*   **Ordered:**
    ```markdown
    1. First item
    2. Second item
    3. Third item
        1. Nested ordered item
    ```

### Links

```markdown
[Link Text](https://www.example.com)
[Link with Title](https://www.example.com "Link Title")
[Relative Link to another page](../section/other-page/)
```

::: callout info
For internal links to other documentation pages, use relative paths to the `.md` files. `docmd` will convert these to the correct HTML paths during the build.
:::

### Images

::: callout info
See [Images & Media](images.md) for more advanced setup.
:::

```markdown
![Alt text for image](/path/to/your/image.jpg "Optional Image Title")
```

::: callout tip
Place images in your `docs/` directory (e.g., `docs/images/`) or a similar assets folder that gets copied to your `site/` output.
:::

### Blockquotes

```markdown
> This is a blockquote.
> It can span multiple lines.
```

### Horizontal Rules

```markdown
---
***
___
```

### Inline Code

::: callout info
See [Code Blocks](code.md) for codeblocks and more advanced setup.
:::

```markdown
Use `backticks` for inline code like `variableName`.
```

### Tables (GFM Style)

You can create tables using GitHub Flavored Markdown syntax:

```bash
| Header 1 | Header 2 | Header 3 |
| :------- | :------: | -------: |
| Align L  | Center   | Align R  |
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |
```
| Header 1 | Header 2 | Header 3 |
| :------- | :------: | -------: |
| Align L  | Center   | Align R  |
| Cell 1   | Cell 2   | Cell 3   |
| Cell 4   | Cell 5   | Cell 6   |

## HTML

Because `markdown-it` is configured with `html: true`, you can embed raw HTML directly in your Markdown files. However, use this sparingly, as it can make your content less portable and harder to maintain.

```html
<div style="color: blue;">
  This is a blue div rendered directly from HTML.
</div>
```
::: callout tip
For most formatting needs, standard Markdown and `docmd`'s [Custom Containers](../containers/) should suffice.
:::