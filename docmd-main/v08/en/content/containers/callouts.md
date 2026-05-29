---
title: "Callouts"
description: "Highlight critical warnings, pro-tips, and background context using semantic visual blocks."
---

Callouts isolate information that requires the reader's immediate attention. docmd provides five semantic types, each with distinct styling and iconography.

::: callout info "Migration-Friendly Aliases"
If migrating from VitePress or Docusaurus, you can use their native syntax:
- `:::tip`, `:::warning`, `:::danger`, `:::info` (VitePress)
- `:::note`, `:::caution` (Docusaurus)

These aliases render identically to their docmd equivalents. Spaceless syntax like `:::callout` also works.
:::

## Syntax Reference

```markdown
::: callout type "Title text" [property:value...]
The content or warning goes here.
:::
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| **Type** | `info` \| `tip` \| `warning` \| `danger` \| `success` | The semantic intent which defines default colours and iconography. |
| **Title** | `"String"` | Optional. Overrides the default semantic label with a custom title. |
| **Icon** | `icon:NAME` | Optional. Overrides the default icon with a custom [Lucide](external:https://lucide.dev/icons) icon. |

### Supported Types

| Type | Visual Signal |
| :--- | :--- |
| `info` | Contextual background or helpful non-critical information. |
| `tip` | Performance shortcuts or best practices. |
| `warning` | Potential issues or deprecated features to monitor. |
| `danger` | Risk of data loss, breaking changes, or critical failures. |
| `success` | Confirmation of a successful configuration or build. |

## Examples

### Basic Callout

A minimal callout without a title uses the type as its default label.

```markdown
::: callout info
Legacy configuration schemas remain supported but are no longer recommended.
:::
```

::: callout info
Legacy configuration schemas remain supported but are no longer recommended.
:::

### Custom Title & Icon

Override the default label and icon with a custom title and any Lucide icon name.

```markdown
::: callout warning "Breaking Change" icon:alert-triangle
The internal WebSocket RPC system is officially deprecated.
:::
```

::: callout warning "Breaking Change" icon:alert-triangle
The internal WebSocket RPC system is officially deprecated.
:::

### Rich Content Composition

Callouts support full Markdown. Embed code blocks and buttons directly within the alert.

````markdown
::: callout tip "Optimised Local Testing" icon:command
Use the preserve flag to maintain build files during dev sessions:

```bash
npx @docmd/core dev --preserve
```

::: button "CLI Flag Reference" /cli-commands
:::
````

::: callout tip "Optimised Local Testing" icon:command
Use the preserve flag to maintain build files during dev sessions:

```bash
npx @docmd/core dev --preserve
```

::: button "CLI Flag Reference" ./#cli-commands
:::

::: callout tip "Prioritised Logic for AI"
For LLMs, callouts act as **High-Priority Anchors**. Use `::: callout danger` to document breaking changes - this provides a clear signal that the AI model must prioritise that information.
:::