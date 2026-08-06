---
title: "Callouts"
description: "Highlight critical warnings, pro-tips, and background context using semantic visual blocks in docmd."
---

Callouts isolate information that requires the reader's immediate attention. `docmd` provides five semantic callout types, each with distinct styling, background accenting, and iconography.

::: callout info "Migration-Friendly Aliases" icon:info
When migrating from VitePress or Docusaurus, native container aliases work out of the box:
- `:::tip`, `:::warning`, `:::danger`, `:::info` (VitePress)
- `:::note`, `:::caution` (Docusaurus)

These aliases render identically to native `docmd` callouts. Spaceless syntax like `:::callout` is also supported.
:::

## Syntax Reference

```markdown
::: callout type "Title text" [property:value...]
The content or warning copy goes here.
:::
```

| Parameter | Type | Description |
| :--- | :--- | :--- |
| **Type** | `info` \| `tip` \| `warning` \| `danger` \| `success` | Semantic intent defining default background accents and iconography. |
| **Title** | `"String"` | Optional. Overrides the default semantic header label with a custom title. |
| **Icon** | `icon:NAME` | Optional. Overrides the default icon with a custom [Lucide](external:https://lucide.dev/icons) icon. |

### Supported Callout Types

| Type | Visual Intent |
| :--- | :--- |
| `info` | Contextual background or helpful non-critical information. |
| `tip` | Performance shortcuts or best practices. |
| `warning` | Potential issues or deprecated features to monitor. |
| `danger` | Risk of data loss, breaking changes, or critical failures. |
| `success` | Confirmation of a successful configuration or build step. |

## Usage Examples

### Basic Callout

A minimal callout without an explicit title uses the type key as its header label:

```markdown
::: callout info
Legacy configuration schemas remain supported but are no longer recommended.
:::
```

::: callout info
Legacy configuration schemas remain supported but are no longer recommended.
:::

### Custom Title & Icon

Override the default label and icon with a custom title and any Lucide icon name:

```markdown
::: callout warning "Breaking Change Notice" icon:alert-triangle
The internal WebSocket RPC system is officially deprecated.
:::
```

::: callout warning "Breaking Change Notice" icon:alert-triangle
The internal WebSocket RPC system is officially deprecated.
:::

### Rich Content Composition

Callouts support full Markdown parsing. Embed code blocks and buttons directly within callout containers:

````markdown
::: callout tip "Optimised Local Testing" icon:command
Use the preserve flag to maintain build files during local development sessions:

```bash
npx @docmd/core dev --preserve
```

::: button "CLI Flag Reference" ./#cli-commands
:::
````

::: callout tip "Optimised Local Testing" icon:command
Use the preserve flag to maintain build files during local development sessions:

```bash
npx @docmd/core dev --preserve
```

::: button "CLI Flag Reference" ./#cli-commands
:::

::: callout tip "Prioritised Context for AI" icon:sparkles
Callout containers serve as **High-Priority Anchors** in the compiled `llms.txt` context stream. Use `::: callout danger` for breaking changes—this signals to AI models that the enclosed instruction overrides default assumptions.
:::