---
title: "Collapsible Sections"
description: "Embed interactive accordion toggles for FAQs, deep-dive technical data, and optional content in docmd."
---

The `collapsible` container creates an interactive, toggleable HTML `<details>` accordion. It is ideal for FAQs and extensive configuration options, keeping secondary details accessible without cluttering the primary documentation view.

::: callout info "VitePress Alias Support" icon:info
When migrating from VitePress, `:::details` works as a native alias for `:::collapsible`. Spaceless syntax like `:::collapsible` is also supported.
:::

## Syntax Reference

```markdown
::: collapsible [open] "Title text" [property:value...]
Main content goes here.
:::
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| **Open State** | `open` | Optional. Initialises the accordion element in an expanded state. |
| **Title** | `"String"` | Header text rendered on the summary toggle bar. Defaults to "Click to expand". |
| **Icon** | `icon:NAME` | Optional. Adds a [Lucide](external:https://lucide.dev/icons) icon before the title string. |

## Usage Examples

### Default Closed State

A collapsible section is closed by default, reducing initial visual density:

```markdown
::: collapsible "How do I update @docmd/core?"
Run `npm update -g @docmd/core` to install the latest stable engine release.
:::
```

::: collapsible "How do I update @docmd/core?"
Run `npm update -g @docmd/core` to install the latest stable engine release.
:::

### Initially Open Accordion

Use the `open` keyword for sections that should render expanded by default while allowing users to collapse them:

```markdown
::: collapsible open "Environment Prerequisites"
1. Node.js v18+ (LTS recommended)
2. pnpm, npm, or yarn package manager
:::
```

::: collapsible open "Environment Prerequisites"
1. Node.js v18+ (LTS recommended)
2. pnpm, npm, or yarn package manager
:::

### Rich Markdown Content

Collapsible containers accept any Markdown content, including code snippets and nested callouts:

````markdown
::: collapsible "Sample API Response Payload"
```json
{
  "status": "success",
  "data": { "version": "0.9.0" }
}
```
:::
````

::: collapsible "Sample API Response Payload"
```json
{
  "status": "success",
  "data": { "version": "0.9.0" }
}
```
:::

::: callout tip "Search & AI Indexing" icon:sparkles
Content inside collapsible containers is fully indexed by the client-side search engine and included in the `llms.txt` context stream. AI agents can access secondary technical details while keeping the primary human interface clean.
:::