---
title: "Nested Containers"
description: "Use the recursive parser to combine cards, tabs, and callouts into high-fidelity page layouts."
---

docmd uses a recursive parsing engine. You can nest components within each other to build complex, interactive documentation blocks without writing custom HTML.

::: callout warning "Self-Closing Buttons"
The `::: button` component is self-closing (single line). Never add a terminal `:::` immediately after it - doing so closes the **parent container**, resulting in a broken layout.
:::

## Examples

### Interactive Resource Block

Combine a **Card** for structural framing, **Tabs** for environment-specific instructions, and a **Callout** for critical information.

````markdown
::: card "Monorepo Quickstart"
Choose your preferred initialisation path:

   ::: tabs
   == tab "Automated"
      ```bash
      pnpm onboard
      ```
      ::: callout success
      This script handles all package installation and build tasks automatically.
      :::

   == tab "Manual"
      Manually fetch and link the core engine.
      ::: button "Go to Developer Guide" ../../advanced/developer-guide.md
   :::
:::
````

### Platform-Specific Tutorial Steps

Nesting **Tabs** inside **Steps** is a standard pattern for providing platform-specific instructions within a sequential tutorial.

```markdown
::: steps

1. **Environment Setup**
   Configure your local operating system.

   ::: tabs
   == tab "macOS"
      Ensure Homebrew is installed and up-to-date.
   == tab "Linux"
      Verify the presence of `curl` and `bash`.
   :::

2. **Core Verification**
   Execute the version check to confirm connectivity.

:::
```

::: steps

1.  **Environment Setup**
    Configure your local operating system.

    ::: tabs
    == tab "macOS"
    Ensure Homebrew is installed and up-to-date.
    == tab "Linux"
    Verify the presence of `curl` and `bash`.
    :::

2.  **Core Verification**
    Execute the version check to confirm connectivity.

:::

## Design Constraints

| Constraint | Note |
| :--- | :--- |
| **Recursive Tabs** | Nesting tabs within other tabs is technically supported but strongly discouraged - it creates confusing navigation on smaller viewports. |
| **Sequential Conflict** | If you need numbered steps within a tab, use a standard ordered list rather than `::: steps` to avoid layout conflicts. |
| **Indentation** | Indentation is not required by the parser, but 2 or 4-space indentation significantly improves source readability. |

::: callout tip "Knowledge Segmentation for AI"
Nesting provides clear **Semantic Boundaries**. A `callout` nested within a `card` explicitly scopes that tip to the card's topic in the `llms.txt` stream, preventing context leakage across unrelated sections.
:::