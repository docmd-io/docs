---
title: "Collapsible"
description: "Create toggleable accordion sections for FAQs and advanced details."
---

The `collapsible` container creates an accordion-style toggle. It is perfect for FAQs, spoilers, or hiding complex configuration options that aren't relevant to every reader.

## Syntax

```markdown
::: collapsible [open] Title Text
Content goes here.
:::
```

*   **`open`**: (Optional) If present, the section defaults to expanded.
*   **`Title Text`**: The text shown on the clickable bar. Defaults to "Click to expand".

::: callout tip
Even when collapsed in the UI, the content inside a `collapsible` is fully indexed by the `docmd` search engine and included in the `llms-full.txt` payload. This means AI can answer questions using hidden details while the interface remains clean for humans.
:::

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