---
title: "Callouts"
description: "Highlight critical information using semantic blocks. Supports Tip, Warning, Danger, and Info types."
---

Callouts are used to highlight information that requires the user's immediate attention. `docmd` provides five semantic types, each with its own visual styling and icon.

## Syntax

```markdown
::: callout type "Optional Title"
Your content here.
:::
```

| Type | Default Title | Best Used For |
| :--- | :--- | :--- |
| `info` | Info | General help or background context. |
| `tip` | Tip | Best practices, shortcuts, or "Pro-tips". |
| `warning` | Warning | Actions that might cause minor issues if ignored. |
| `danger` | Danger | Critical warnings, data loss, or significant errors. |
| `success` | Success | Confirmation of a completed action. |

---

## Examples

### 1. Simple Note
```markdown
::: callout info
This is a standard informational note.
:::
```
::: callout info
This is a standard informational note.
:::

### 2. Custom Title
```markdown
::: callout warning "Action Required"
Please back up your configuration before proceeding with the upgrade.
:::
```
::: callout warning "Action Required"
Please back up your configuration before proceeding with the upgrade.
:::

### 3. Rich Content (Nesting)
Callouts can contain any Markdown content, including code blocks and buttons.

````markdown
::: callout tip "Try this Shortcut"
Use the CLI to instantly verify your build:

```bash
docmd dev --preserve
```

::: button "Learn More" /cli-commands
:::
````
::: callout tip "Try this Shortcut"
Use the CLI to instantly verify your build:

```bash
docmd dev --preserve
```

::: button "Learn More" /cli-commands
:::

::: callout tip
For LLMs, callouts act as high-priority anchors. Use a `::: callout danger` block to explicitly document breaking changes or "Gotchas" - AI models are specially tuned to prioritize these blocks in their reasoning.
:::