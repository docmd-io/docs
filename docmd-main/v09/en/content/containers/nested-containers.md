---
title: "Nested Containers"
description: "Combine cards, tabs, callouts, and steps recursively into high-fidelity page layouts in docmd."
---

`docmd` uses a depth-tracking recursive container parser. You can nest components within each other to build complex, interactive UI structures purely in Markdown without custom HTML.

::: callout warning "Self-Closing Button Syntax" icon:alert-triangle
The `::: button` component is self-closing (single-line). Never add a terminal `:::` immediately after a button—doing so terminates the **parent container**, resulting in broken page layouts.
:::

## Composition Examples

### Interactive Resource Block

Combine a **Card** for structural framing, **Tabs** for environment-specific commands, and a **Callout** for alerts:

````markdown
::: card "Monorepo Quickstart"
Choose your preferred initialisation path:

   ::: tabs
   == tab "Automated"
      ```bash
      pnpm onboard
      ```
      ::: callout success
      This script handles package installation and workspace linking automatically.
      :::

   == tab "Manual"
      Manually fetch and link the core engine packages.
      ::: button "Go to Developer Guide" ./#developer-guide
   :::
:::
````

### Platform-Specific Tutorial Steps

Nesting **Tabs** inside **Steps** is a standard pattern for providing OS-specific commands within a sequential tutorial:

```markdown
::: steps

1.  **Environment Setup**
    Configure your local operating system.

    ::: tabs
    == tab "macOS"
    Ensure Homebrew is installed and up to date.
    == tab "Linux"
    Verify the presence of `curl` and `bash`.
    :::

2.  **Core Verification**
    Execute the version check to confirm connectivity.

:::
```

::: steps

1.  **Environment Setup**
    Configure your local operating system.

    ::: tabs
    == tab "macOS"
    Ensure Homebrew is installed and up to date.
    == tab "Linux"
    Verify the presence of `curl` and `bash`.
    :::

2.  **Core Verification**
    Execute the version check to confirm connectivity.

:::

## Design Rules & Limits

| Rule | Technical Note |
| :--- | :--- |
| **Recursive Tabs** | Nesting tabs within other tabs is discouraged as it creates complex UX on mobile viewports. |
| **Sequential Conflicts** | If you need numbered steps within a tab pane, use a standard ordered list rather than `::: steps`. |
| **Source Indentation** | Indentation is optional, but 2 or 4-space indentation improves Markdown readability. |

::: callout tip "Knowledge Segmentation for AI" icon:sparkles
Container nesting provides clear **Semantic Boundaries**. A `callout` nested within a `card` explicitly scopes that tip to the card's topic in the `llms.txt` stream, preventing context leakage across unrelated sections.
:::