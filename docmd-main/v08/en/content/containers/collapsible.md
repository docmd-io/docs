---
title: "Collapsible Sections"
description: "Embed interactive accordion-style toggles for FAQs, deep-dive content, and spoilers."
---

The `collapsible` container creates an interactive, toggleable accordion. It is ideal for FAQs and detailed technical configuration, keeping secondary information accessible without cluttering the primary view.

::: callout info "VitePress Alias"
If migrating from VitePress, use `:::details` as an alias for `:::collapsible`. Spaceless syntax like `:::collapsible` also works.
:::

## Syntax Reference

```markdown
::: collapsible [open] "Title text" [property:value...]
Main content goes here.
:::
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| **Open State** | `open` | Optional. If provided, the section initialises in an expanded state. |
| **Title** | `"String"` | The text rendered on the toggle bar. Defaults to "Click to expand". |
| **Icon** | `icon:NAME` | Optional. Adds a [Lucide](external:https://lucide.dev/icons) icon before the title text. |

## Examples

### Default State

A collapsible section is closed by default. Ideal for FAQs and reducing visual density.

```markdown
::: collapsible "How do I upgrade docmd?"
Run `npm update -g @docmd/core` to fetch the latest stable engine.
:::
```

::: collapsible "How do I upgrade docmd?"
Run `npm update -g @docmd/core` to fetch the latest stable engine.
:::

### Initially Open

Use the `open` flag for sections that should be visible by default but allow users to minimise them.

```markdown
::: collapsible open "Environment Prerequisites"
1. Node.js v18+ (LTS recommended)
2. PNPM package manager
:::
```

::: collapsible open "Environment Prerequisites"
1. Node.js v18+ (LTS recommended)
2. PNPM package manager
:::

### Rich Content

Collapsibles can contain any Markdown, including syntax-highlighted code blocks.

````markdown
::: collapsible "Sample JSON Response"
```json
{
  "status": "success",
  "data": { "version": "0.8.2" }
}
```
:::
````

::: collapsible "Sample JSON Response"
```json
{
  "status": "success",
  "data": { "version": "0.8.2" }
}
```
:::

::: callout tip
Content inside a `collapsible` is fully indexed by search and included in the `llms.txt` stream. AI agents can answer questions based on hidden technical details while keeping the human-facing interface clean.
:::