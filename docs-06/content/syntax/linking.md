---
title: "Linking & Referencing"
description: "Master internal cross-linking, external resources, and reliable asset referencing."
---

`docmd` provides a robust, filesystem-aware linking system. By using relative paths to your source `.md` files, you ensure that links remain functional within your IDE (e.g., VS Code) and are automatically rewritten for production deployment.

::: callout info "Extension Neutrality"
During the build process, the engine automatically resolves `.md` extensions to their relative HTML counterparts. This guarantees that internal documentation links never break, regardless of whether you are browsing local source or the compiled production site.
:::

## Internal Link Resolution

| Targeting Strategy | Markdown Syntax |
| :--- | :--- |
| **Sibling Page** | `[System Overview](overview.md)` |
| **Subdirectory** | `[API Reference](api/node-api.md)` |
| **Parent Directory**| `[Back to Home](../index.md)` |

## Section Anchors (Deep Linking)

Navigate directly to specific headings using standard URL slugs.

*   **Intra-page Anchor**: `[Jump to Roadmap](#project-roadmap)`
*   **Cross-page Anchor**: `[Review CLI Flags](../cli-commands.md#available-flags)`

## Protocols & External Resources

The engine respects standard browser protocols for global resources.

*   **Global HTTPS**: `[docmd Homepage](https://docmd.io)`
*   **Mail Protocol**: `[Support Channel](mailto:help@docmd.io)`
*   **Asset Protocol**: `[Download CLI Binary](/assets/bin/docmd-mac.zip)`

## Static Asset Referencing

To provide downloads or reference raw source files, place them within the `assets/` directory of your project. The `docmd` builder ensures these files are moved to the production root without path modifications.

```markdown
[Download Documentation PDF](/assets/pdf/handbook.pdf)
[View Raw Global Config](/assets/config/docmd.config.js)
```

::: callout tip "Semantic Linkage for AI"
When cross-linking technical modules, prioritize **Descriptive Anchors** (e.g., `[Optimize PWA caching](../plugins/pwa.md)`) over generic text (e.g., `[Read more](../plugins/pwa.md)`). Detailed link labels provide AI agents with a high-fidelity map of the semantic relationships between different documentation nodes in the `llms-full.txt` context.
:::