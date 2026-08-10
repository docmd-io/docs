---
title: "Callouts"
description: "Highlight critical warnings, pro-tips, and background context using semantic visual blocks in docmd."
---

Callouts isolate information that requires the reader's immediate attention. `docmd` provides five semantic callout types, each with distinct styling, background accenting, and iconography.

## Container Syntax

```markdown
# Standard Callout Container
::: callout type ["Header Title"] [icon:icon_name] # Container opener
Body content supporting full Markdown parsing, code blocks, and buttons...
::: /callout # Explicit closing tag

# Migration Alias (VitePress / Docusaurus)
::: type ["Header Title"] [icon:icon_name]
Body content...
::: /type
```

## Features & Supported Attributes

| Parameter / Property | Type | Description |
| :--- | :--- | :--- |
| **Type Variant** | `info` \| `tip` \| `warning` \| `danger` \| `success` | Semantic intent defining default background accents, border styling, and iconography. |
| **Header Title** | `"String"` \| `title:"..."` | Optional header label (positional 2nd parameter or `title:"..."`). Overrides default semantic title. |
| **Iconography** | `icon:NAME` | Optional. Overrides default variant icon with a custom [Lucide](external:https://lucide.dev/icons) icon. |
| **Migration Aliases** | `::: tip`, `::: warning`, `::: danger`, `::: info`, `::: note`, `::: caution` | Supported directly out of the box for VitePress and Docusaurus compatibility. |
| **Closing Tags** | `::: /callout`, `::: /tip`, `:::` | Supports explicit named closing tags or generic `:::` closers. |

::: callout info "v0.9.1+ Container Syntax Standardisation" icon:sparkles
Starting in **v0.9.1**, `docmd` introduces explicit opening and closing container tags (e.g., `::: card` ... `::: /card`, `::: tab` ... `::: /tab`), explicit key-value properties (`title:"..."`, `url:"..."`), and trailing `# comments`. This modernised syntax is recommended for all new documentation. Full backward compatibility for legacy sub-block markers (`== tab`, `1.`) and positional argument fallbacks is strictly preserved.
:::

::: callout info "Migration-Friendly Aliases" icon:info
When migrating from VitePress or Docusaurus, native container aliases work out of the box:
- `:::tip`, `:::warning`, `:::danger`, `:::info` (VitePress)
- `:::note`, `:::caution` (Docusaurus)

These aliases render identically to native `docmd` callouts. Spaceless syntax like `:::callout` is also supported.
:::


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
::: /callout
```

::: callout info
Legacy configuration schemas remain supported but are no longer recommended.
:::

### Custom Title & Icon

Override the default label and icon with a custom title and any Lucide icon name:

```markdown
::: callout warning title:"Breaking Change Notice" icon:alert-triangle
The internal WebSocket RPC system is officially deprecated.
::: /callout
```

::: callout warning "Breaking Change Notice" icon:alert-triangle
The internal WebSocket RPC system is officially deprecated.
:::

### Rich Content Composition

Callouts support full Markdown parsing. Embed code blocks and buttons directly within callout containers:

````markdown
::: callout tip title:"Optimised Local Testing" icon:command
Use the preserve flag to maintain build files during local development sessions:

```bash
npx @docmd/core dev --preserve
```

::: button title:"CLI Flag Reference" url:"./#cli-commands"
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