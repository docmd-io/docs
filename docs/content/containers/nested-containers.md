---
title: "Nested Containers"
description: "Master docmd's recursive parser. Learn how to combine cards, tabs, and callouts to build complex, interactive page layouts."
---

One of `docmd`’s most powerful features is its recursive parsing engine. You can nest components inside each other infinitely to create professional, interactive layouts that would otherwise require complex HTML templates.

## The One Golden Rule

While nesting is infinite, remember the **Self-Closing Button Rule**:

::: callout warning
Because `::: button` is self-closing, do **not** add a closing `:::` line after it. Doing so will accidentally close the parent container that contains the button.
:::

## Example: Interactive Landing Page Block

You can combine a **Card** for the frame, **Tabs** for technical choices, and **Callouts** for highlighting.

````markdown
::: card "Developer Quickstart"
   Choose your preferred environment to begin:
   ::: tabs
   == tab "NPM"
      ```bash
      npm install -g @docmd/core
      ```
      ::: callout success
         Installation usually takes less than 10 seconds.
      :::
   == tab "Manual"
      Download the binary from GitHub and add it to your PATH.
      ::: button "GitHub Downloads" external:https://github.com/docmd-io/docmd
   :::
:::
````

## Example: Documenting a Sequential Hack

Nesting **Tabs** inside **Steps** is a great way to show multi-platform instructions.

```markdown
::: steps

1. **Select Platform**
   Choose your operating system below.

   ::: tabs
   == tab "macOS"
      Run the Homebrew command.
   == tab "Linux"
      Use the generic install script.
   :::

2. **Verify Setup**
   Check the installation version.

:::
```

::: steps

1.  **Select Platform**
    Choose your operating system below.

    ::: tabs
    == tab "macOS"
    Run the Homebrew command.
    == tab "Linux"
    Use the generic install script.
    :::

2.  **Verify Setup**
    Check the installation version.

:::

## Nesting Constraints

While the engine is robust, follow these best practices for the best experience:

*   **Tabs in Tabs**: Not recommended. It creates "Context Loops" that are difficult for users to navigate on mobile.
*   **Steps in Tabs**: High syntax conflict. Use standard ordered lists (`1.`) inside tabs instead of the `::: steps` container.
*   **Indentation**: `docmd` does **not** require indentation for nested blocks, but adding 2 or 4 spaces makes your Markdown much easier for both humans and LLMs to read.
*   **Performance**: Deep nesting (over 6 levels) is supported but may impact initial build times on extremely large documentation sites.

::: callout tip
Nesting helps segment knowledge. When an LLM reads the `llms-full.txt` stream, a nested `callout` inside a `card` tells the model that the tip is specifically scoped to that card's topic, improving the precision of its generation.
:::