---
title: "Collapsible Sections"
description: "Embed interactive accordion-style toggles for FAQs, deep-dive content, and spoilers."
---

The `collapsible` container creates an interactive, toggleable section (accordion). This pattern is ideal for FAQs, detailed technical configuration, or any secondary information that should be accessible without cluttering the primary documentation flow.

## Syntax

```markdown
::: collapsible [open] "Title Text"
Main content goes here.
:::
```

### Options Reference
- **`open`**: (Optional) If specified, the section initializes in an expanded state.
- **`"Title"`**: The text rendered on the interactive toggle bar. Defaults to "Click to expand" if omitted.

## Detailed Implementation Examples

### Standard Usage (Initial State: Closed)
Primarily used for FAQs or reducing the visual density of technical pages.

```markdown
::: collapsible "How do I upgrade docmd?"
Run `npm update -g @docmd/core` to fetch the latest stable engine.
:::
```
::: collapsible "How do I upgrade docmd?"
Run `npm update -g @docmd/core` to fetch the latest stable engine.
:::

### Opt-In Visibility (Initial State: Open)
Ideal for sections that should be visible by default but allow the user to minimize them for a cleaner view.

```markdown
::: collapsible open "Environment Prerequisites"
1.  Node.js v18+ (LTS recommended)
2.  PNPM package manager
:::
```
::: collapsible open "Environment Prerequisites"
1.  Node.js v18+ (LTS recommended)
2.  PNPM package manager
:::

### Nested Technical Data
Collapsibles can contain complex Markdown elements, including syntax-highlighted code blocks.

````markdown
::: collapsible "Analyze Sample JSON Response"
```json
{
  "status": "success",
  "data": { "version": "0.6.2" }
}
```
:::
````
::: collapsible "Analyze Sample JSON Response"
```json
{
  "status": "success",
  "data": { "version": "0.6.2" }
}
```
:::

::: callout tip
While content inside a `collapsible` may be hidden from the human user, it remains fully visible to the `docmd` search index and is included in the unified `llms-full.txt` stream. This ensures AI agents can provide comprehensive answers based on hidden technical details while the human-facing interface remains clean and prioritized.
:::