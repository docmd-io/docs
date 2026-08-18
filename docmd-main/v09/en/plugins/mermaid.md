---
title: "Mermaid Diagrams Plugin"
description: "Zero-config integration for Mermaid.js diagrams with automatic theme synchronisation and lazy asset injection."
---

The `@docmd/plugin-mermaid` plugin integrates [Mermaid.js](external:https://mermaid.js.org/) into `docmd`. It registers both standard Markdown code block parsing (` ```mermaid `) and the explicit `::: mermaid` container renderer, providing interactive SVG diagrams with automatic theme matching, panning, and zooming capabilities.

::: callout info "v0.9.1+ Container Syntax Standardisation" icon:sparkles
Starting in **v0.9.1**, `docmd` introduces explicit opening and closing container tags (e.g., `::: mermaid` ... `::: /mermaid`), explicit key-value properties (`title:"..."`, `align:center`), and trailing `# comments`. Per-diagram customisation is handled via the container syntax, while global defaults are specified in `docmd.config.json`.
:::

::: callout success "v0.9.3+ Offline & Air-Gapped Bundling" icon:zap
Starting in **v0.9.3**, `@docmd/plugin-mermaid` bundles the full Mermaid runtime locally as a self-contained classic IIFE script. Diagrams render 100% offline with zero CDN dependencies (`jsdelivr.net`), supporting air-gapped deployments and direct local `file://` browsing.
:::

## Plugin Configuration

Configure global options in `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "mermaid": {
      "enabled": true,
      "theme": "default",
      "darkTheme": "dark",
      "zoom": true
    }
  }
}
```

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | Enable or disable Mermaid diagram rendering globally. |
| `theme` | `string` | `"default"` | Default light theme for diagrams (`default`, `forest`, `neutral`). |
| `darkTheme` | `string` | `"dark"` | Default dark theme for dark mode synchronisation. |
| `zoom` | `boolean` | `true` | Enables interactive zoom and pan controls by default. |

::: callout tip "Disabling Plugin" icon:slash
If `@docmd/plugin-mermaid` is disabled or omitted from `docmd.config.json`, both `::: mermaid` container rendering and ` ```mermaid ` diagram parsing are cleanly deactivated, and no client-side JS assets are injected.
:::

## Usage & Diagram Authoring

`docmd` supports a hybrid authoring model for diagrams:

* **[Mermaid Container Guide](../content/containers/mermaid.md)**: Explore the recommended `::: mermaid` container syntax for per-diagram titles, alignment, custom themes, and explicit closing tags.
* **Standard Code Blocks**: Use standard ` ```mermaid ` fenced code blocks for 100% GitHub Flavored Markdown (GFM) compatibility.

### Quick Example

```markdown
::: mermaid title:"Authentication Flow" align:center zoom:true # Diagram container
sequenceDiagram
    autonumber
    Client->>Server: POST /login
    Server-->>Client: 200 OK (Token)
::: /mermaid
```

For full syntax references and advanced per-diagram configuration, refer to the **[Mermaid Container Reference](../content/containers/mermaid.md)**.