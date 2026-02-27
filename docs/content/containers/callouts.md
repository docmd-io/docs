---
title: "Callouts"
description: "Highlight important information using semantic callout blocks."
---

# Callouts

Callouts allow you to highlight specific information that exists outside the normal flow of text. `docmd` supports five semantic types.

## Syntax

```markdown
::: callout type Title
Content goes here.
:::
```

If you omit the title, it defaults to the type name (e.g., "Info").

## Available Types

### Info
General information or "Did you know?" boxes.

```markdown
::: callout info Note
This is a standard informational callout.
:::
```
::: callout info Note
This is a standard informational callout.
:::

### Tip
Best practices and shortcuts.

```markdown
::: callout tip Pro Tip
You can nest other containers inside callouts!
:::
```
::: callout tip Pro Tip
You can nest other containers inside callouts!
:::

### Warning
Things the user should be careful about.

```markdown
::: callout warning Caution
Proceed with care.
:::
```
::: callout warning Caution
Proceed with care.
:::

### Danger
Critical warnings, data loss risks, or errors.

```markdown
::: callout danger
**Critical Error:** Do not delete the database file.
:::
```
::: callout danger
**Critical Error:** Do not delete the database file.
:::

### Success
Confirmation of actions or positive outcomes.

```markdown
::: callout success
Build completed successfully!
:::
```
::: callout success
Build completed successfully!
:::