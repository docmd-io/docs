---
title: "Cards"
description: "Group content into visually distinct, framed boxes."
---

# Cards

Cards are versatile containers used to group related content. They are excellent for creating grid layouts, feature lists, or summarizing sections.

## Syntax

```markdown
::: card Optional Title
Card content goes here.
:::
```

## Examples

### Basic Card
With a title and simple text.

```markdown
::: card Features
*   Fast Build
*   Offline Search
*   No Config
:::
```
::: card Features
*   Fast Build
*   Offline Search
*   No Config
:::

### Nested Content
Cards are structural elements. You can put almost anything inside them, including buttons and code blocks.

````markdown
::: card Download
Get the latest version.

```bash
npm i -g @docmd/core
```

::: button "Download Now" /install color:#2563eb
:::
````

::: card Download
Get the latest version.

```bash
npm i -g @docmd/core
```

::: button "Download Now" /install color:#2563eb
:::