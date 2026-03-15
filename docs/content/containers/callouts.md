---
title: "Callouts"
description: "Highlight critical warnings, pro-tips, and background context using semantic visual blocks."
---

Callouts are used to isolate information that requires the reader's immediate attention. `docmd` provides five semantic types, each featuring distinct visual styling and themed iconography.

## Syntax Reference

```markdown
::: callout type "Optional Title"
The technical content or warning goes here.
:::
```

### Supported Semantic Types

| Type | Intent | Visual Signal |
| :--- | :--- | :--- |
| `info` | **General Data** | Contextual background or helpful non-critical info. |
| `tip` | **Optimization** | Performance shortcuts or "Pro-tips". |
| `warning`| **Cautionary** | Potential issues or deprecated features to monitor. |
| `danger` | **Critical** | Risk of data loss, breaking changes, or system failure. |
| `success`| **Verification** | Confirmation of successful configuration or build. |

## Implementation Gallery

### 1. Minimalist Informational Note
```markdown
::: callout info
Legacy configuration schemas remain supported but are no longer recommended.
:::
```
::: callout info
Legacy configuration schemas remain supported but are no longer recommended.
:::

### 2. High-Priority Alert with Custom Title
```markdown
::: callout warning "Breaking Change Target"
As of `v0.7.0`, the internal WebSocket RPC system will be officially deprecated.
:::
```
::: callout warning "Breaking Change Target"
As of `v0.7.0`, the internal WebSocket RPC system will be officially deprecated.
:::

### 3. Rich Content Composition
Callouts support the full spectrum of Markdown, allowing you to embed buttons and code blocks within the alert.

````markdown
::: callout tip "Optimized Local Testing"
Use the preserve flag to maintain build files during dev sessions:

```bash
docmd dev --preserve
```

::: button "CLI Flag Reference" /cli-commands
:::
````

::: callout tip "Optimized Local Testing"
Use the preserve flag to maintain build files during dev sessions:

```bash
docmd dev --preserve
```

::: button "CLI Flag Reference" ./#cli-commands
:::

::: callout tip "Prioritized Logic for AI"
For LLMs, callouts act as **High-Priority Anchors**. By utilizing `::: callout danger` to document breaking changes or system constraints, you provide a clear signal that the AI model must prioritize this information above surrounding text during its reasoning and generation process.
:::