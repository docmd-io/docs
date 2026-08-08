---
title: "Steps"
description: "Convert standard ordered lists into high-impact visual timelines and tutorials in docmd."
---

The `steps` container transforms standard Markdown ordered lists into numbered vertical timelines with hover permalinks. It is designed for technical tutorials and sequential how-to guides.

::: callout info "Spaceless Syntax Support" icon:info
Both `::: steps` and `:::steps` (spaceless) syntax render identically. Choose whichever style suits your authoring workflow.
:::

## Syntax Reference

```markdown
::: steps

1.  **Step Title**
    Step description copy goes here.

2.  **Next Step Title**
    Continue the sequence.

:::
```

| Component | Description |
| :--- | :--- |
| **`::: steps`** | Parent container that transforms child ordered list items into a numbered timeline. |
| **`1. `** | Standard Markdown ordered list item. Bold the first line of each item to create a step title. |

## Usage Examples

### Basic Workflow Sequence

A straightforward sequence for common developer onboarding tasks:

```markdown
::: steps

1.  **Initialise Project**
    Run `npx @docmd/core init` to scaffold your directory structure.

2.  **Author Content**
    Write documentation using standard Markdown files.

3.  **Build & Deploy**
    Run `npx @docmd/core build` to compile production static output.

:::
```

::: steps

1.  **Initialise Project**
    Run `npx @docmd/core init` to scaffold your directory structure.

2.  **Author Content**
    Write documentation using standard Markdown files.

3.  **Build & Deploy**
    Run `npx @docmd/core build` to compile production static output.

:::

### Steps with Rich Embedded Content

Steps support embedded code blocks, callout alerts, and other nested containers:

```markdown
::: steps

1.  **Configure Environment**
    Define project options in `docmd.config.json`.

    ::: callout tip
    Use `defineConfig` to enable IDE autocompletion for configuration schema keys.
    :::

2.  **Generate Production Build**
    Execute the build command to generate an optimised static site.

    ```bash
    npx @docmd/core build
    ```

3.  **Deploy to Infrastructure**
    Publish the compiled `site/` directory to S3, Cloudflare Pages, or Vercel.

:::
```

::: steps

1.  **Configure Environment**
    Define project options in `docmd.config.json`.

    ::: callout tip
    Use `defineConfig` to enable IDE autocompletion for configuration schema keys.
    :::

2.  **Generate Production Build**
    Execute the build command to generate an optimised static site.

    ```bash
    npx @docmd/core build
    ```

3.  **Deploy to Infrastructure**
    Publish the compiled `site/` directory to S3, Cloudflare Pages, or Vercel.

:::

::: callout tip "Workflow Optimization for AI Agents" icon:lightbulb
AI models interpret the `steps` container as a signal for **Sequential Workflows**. Always start each list item with a **bolded title**—this allows AI agents to parse each step's objective reliably from the `llms.txt` context.
:::