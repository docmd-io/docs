---
title: "Collapsible"
description: "Create toggleable accordion sections for FAQs and advanced details."
---

# Collapsible

The `collapsible` container creates an accordion-style toggle. It is perfect for FAQs, spoilers, or hiding complex configuration options that aren't relevant to every reader.

## Syntax

```markdown
::: collapsible [open] Title Text
Content goes here.
:::
```

*   **`open`**: (Optional) If present, the section defaults to expanded.
*   **`Title Text`**: The text shown on the clickable bar. Defaults to "Click to expand".

## Examples

### Default (Closed)
Useful for FAQs or spoilers.

```markdown
::: collapsible How do I reset my password?
Go to **Settings > Account** and click "Reset Password".
:::
```
::: collapsible How do I reset my password?
Go to **Settings > Account** and click "Reset Password".
:::

### Default (Open)
Useful for sections that should be visible but optional to hide.

```markdown
::: collapsible open Prerequisites
1.  Node.js v18+
2.  A text editor
:::
```
::: collapsible open Prerequisites
1.  Node.js v18+
2.  A text editor
:::

### Nested Content
You can put anything inside a collapsible, including code blocks.

````markdown
::: collapsible View JSON Response
```json
{
  "status": "success",
  "data": { "id": 123 }
}
```
:::
````
::: collapsible View JSON Response
```json
{
  "status": "success",
  "data": { "id": 123 }
}
```
:::