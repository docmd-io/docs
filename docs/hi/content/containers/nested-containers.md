---
title: "नेस्टेड कंटेनर"
description: "Leverage docmd's recursive parser to combine cards, tabs, and callouts into high-fidelity page layouts."
---

One of `docmd`’s most powerful technical capabilities is its **Recursive Parsing Engine**. You can nest components within each other infinitely to synthesize complex, interactive documentation blocks that would otherwise require deep HTML knowledge or custom templates.

## The Architectural Rule

While nesting is mathematically infinite, always adhere to the **Self-Closing Component Rule**:

::: callout warning "Self-Closing Buttons"
Because the `::: button` component is self-closing (single line), never add a terminal `:::` line after it. Doing so will inadvertently close the **parent container** housing the button, resulting in a fractured layout.
:::

## Technical Composition Examples

### 1. Interactive Resource Block
Combine a **Card** for structural framing, **Tabs** for environment-specific instructions, and **Callouts** for highlighting critical information.

````markdown
::: card "Monorepo Quickstart"
Choose your preferred initialization path:

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
      ::: button "Go to Developer Guide" /advanced/developer-guide
   :::
:::
````

### 2. Multi-Platform Tutorials
Nesting **Tabs** inside **Steps** is a professional pattern for providing platform-specific instructions within a standard tutorial sequence.

```markdown
::: steps

1. **Environment Setup**
   Configure your local operating system.

   ::: tabs
   == tab "macOS"
      Ensure Homebrew is installed and up-to-date.
   == tab "Linux"
      Verify the Presence of `curl` and `bash`.
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
    Verify the Presence of `curl` and `bash`.
    :::

2.  **Core Verification**
    Execute the version check to confirm connectivity.

:::

## Design Constraints

To maintain both performance and mobile responsiveness, observe the following constraints:

*   **Recursive Tabs**: Nesting tabs within other tabs is technically supported but strongly discouraged. It creates navigation "loops" that are visually confusing on smaller viewports.
*   **Sequential Conflict**: If you require numbered steps within a tab, utilise a standard ordered list (`1. Step Content`) rather than the `::: steps` container to avoid layout conflicts.
*   **Legibility**: While `docmd` does not strictly require indentation for nested blocks, using a 2 or 4-space indentation significantly improves the human-readability of the Markdown source.

::: callout tip "Knowledge Segmentation for AI"
Nesting provides clear **Semantic Boundaries**. When an AI agent parses the `llms-full.txt` stream, a `callout` nested within a `card` explicitly tells the model that the tip is scoped to that card's specific topic, preventing context leakage and improving technical accuracy in generated responses.
:::