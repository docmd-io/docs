---
title: Tooltip Container
description: Learn how to use inline and block tooltip containers in docmd to render hover popovers and clickable term explanations.
---

The `::: tip` container (also accessible as `::: tooltip`) renders interactive hover tooltips and term explanations inline within text sentences or around block elements.

## Container Syntax

```markdown
# Inline Tooltip
::: tip "Tooltip Hover Explanation" [term:"Displayed Term Text"] [url:"target_url"] ::: /tip

# Block-Level Tooltip
::: tip "Tooltip Hover Explanation" [url:"target_url"]
Content enclosed within the tooltip container block...
::: /tip
```

## Features & Supported Attributes

| Parameter / Attribute | Type | Description |
| :--- | :--- | :--- |
| **Tooltip Explanation** | `"String"` | Main text displayed inside the floating hover tooltip popover (positional 1st parameter or `text:"..."`). |
| **Displayed Term** | `term:"String"` | Text string rendered in the body copy. If omitted, defaults to the tooltip explanation string. |
| **Target Link URL** | `url:URL` | Converts the tooltip item into an interactive hyperlink. Supports `external:https://...` for new tabs. |
| **Aliases** | `::: tip`, `::: tooltip` | Both container names behave identically in inline and block modes. |

## Usage Examples

### Inline Term Tooltip

Render inline hover explanations for technical jargon or feature highlights:

```markdown
Docmd features a ::: tip "No build configuration required" term:"Zero-Config" ::: /tip design.
```

Docmd features a ::: tip "No build configuration required" term:"Zero-Config" ::: /tip design.

### Tooltip with Target Link

Add `url:` to make the displayed term clickable while showing a hover preview:

```markdown
Learn more about ::: tip "Zero-configuration static build engine" term:"Docmd Architecture" url:"external:https://github.com/docmd-io/docmd" ::: /tip in our repository.
```

Learn more about ::: tip "Zero-configuration static build engine" term:"Docmd Architecture" url:"external:https://github.com/docmd-io/docmd" ::: /tip in our repository.

### Block-Level Tooltip Wrapper

Wrap multi-line text or headings inside block tooltips:

```markdown
::: tip "Interactive Diagram Shell"
Hover over this block to view the diagram shell context explanation.
::: /tip
```

::: tip "Interactive Diagram Shell"
Hover over this block to view the diagram shell context explanation.
::: /tip