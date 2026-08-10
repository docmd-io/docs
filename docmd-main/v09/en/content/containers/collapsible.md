---
title: "Collapsible Sections"
description: "Embed interactive accordion toggles for FAQs, deep-dive technical data, and optional content in docmd."
---

The `collapsible` container creates an interactive, toggleable HTML `<details>` accordion. It is ideal for FAQs and extensive configuration options, keeping secondary details accessible without cluttering the primary documentation view.

## Container Syntax

```markdown
::: collapsible [open] [title:"Summary Toggle Text"] [icon:icon_name] # Collapsible opener
Interactive inner content (Markdown text, code blocks, lists, callouts)...
::: /collapsible # Explicit closing tag
```

## Features & Supported Attributes

| Parameter / Property | Type | Description |
| :--- | :--- | :--- |
| **Expansion Flag** | `open` | Optional. Renders the accordion in an expanded state on initial page load. |
| **Summary Title** | `"String"` \| `title:"..."` | Heading text rendered on the summary toggle bar (1st positional arg or `title:"..."`). |
| **Iconography** | `icon:NAME` | Optional. Adds a [Lucide](external:https://lucide.dev/icons) icon before the summary text. |
| **Aliases** | `::: details` | `::: details` and spaceless `:::collapsible` are supported as native aliases. |
| **Closing Tags** | `::: /collapsible`, `::: /details`, `:::` | Supports explicit named closing tags or generic `:::` closers. |

::: callout info "v0.9.1+ Container Syntax Standardisation" icon:sparkles
Starting in **v0.9.1**, `docmd` introduces explicit opening and closing container tags (e.g., `::: card` ... `::: /card`, `::: tab` ... `::: /tab`), explicit key-value properties (`title:"..."`, `url:"..."`), and trailing `# comments`. This modernised syntax is recommended for all new documentation. Full backward compatibility for legacy sub-block markers (`== tab`, `1.`) and positional argument fallbacks is strictly preserved.
:::


## Usage Examples

### Default Closed State

A collapsible section is closed by default, reducing initial visual density:

```markdown
::: collapsible title:"How do I update @docmd/core?"
Run `npm update -g @docmd/core` to install the latest stable engine release.
::: /collapsible
```

::: collapsible "How do I update @docmd/core?"
Run `npm update -g @docmd/core` to install the latest stable engine release.
:::

### Initially Open Accordion

Use the `open` keyword for sections that should render expanded by default while allowing users to collapse them:

```markdown
::: collapsible open title:"Environment Prerequisites"
1. Node.js v18+ (LTS recommended)
2. pnpm, npm, or yarn package manager
::: /collapsible
```

::: collapsible open "Environment Prerequisites"
1. Node.js v18+ (LTS recommended)
2. pnpm, npm, or yarn package manager
:::

### Rich Markdown Content

Collapsible containers accept any Markdown content, including code snippets and nested callouts:

````markdown
::: collapsible title:"Sample API Response Payload"
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