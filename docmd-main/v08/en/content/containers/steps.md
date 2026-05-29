---
title: "Steps"
description: "Convert standard ordered lists into high-impact visual timelines and tutorials."
---

The `steps` container transforms a standard Markdown ordered list into a numbered vertical timeline. It is designed for technical tutorials and sequential how-to guides.

::: callout info "Spaceless Syntax"
Both `::: steps` and `:::steps` (spaceless) work natively. Use whichever style you prefer.
:::

## Syntax Reference

```markdown
::: steps

1. **Step Title**
   Step description goes here.

2. **Next Step**
   Continue the sequence.

:::
```

| Container | Description |
| :--- | :--- |
| **`::: steps`** | The parent container that transforms child ordered list items into a numbered timeline. |
| **`1. `** | Any standard Markdown ordered list item acts as a chronological step. Bold the first line of each item to create a clear title. |

## Examples

### Basic Workflow

A straightforward sequence for a common task.

```markdown
::: steps

1.  **Initialise Project**
    Run `npx @docmd/core init` to scaffold your directory.

2.  **Author Content**
    Write your documentation using standard Markdown files.

3.  **Build & Deploy**
    Run `npx @docmd/core build` to generate your static site.

:::
```

::: steps

1.  **Initialise Project**
    Run `npx @docmd/core init` to scaffold your directory.

2.  **Author Content**
    Write your documentation using standard Markdown files.

3.  **Build & Deploy**
    Run `npx @docmd/core build` to generate your static site.

:::

### Steps with Rich Content

Each step can contain code blocks, callouts, and other nested containers.

```markdown
::: steps

1.  **Configure Environment**
    Define your project variables in `docmd.config.json`.

    ::: callout tip
    Use `defineConfig` to enable IDE autocompletion for all configuration keys.
    :::

2.  **Generate Production Build**
    Execute the build command to generate a highly optimised static site.

    ```bash
    npx @docmd/core build
    ```

3.  **Deploy to Infrastructure**
    Synchronise the `site/` directory with S3, Cloudflare Pages, or Vercel.

:::
```

::: steps

1.  **Configure Environment**
    Define your project variables in `docmd.config.json`.

    ::: callout tip
    Use `defineConfig` to enable IDE autocompletion for all configuration keys.
    :::

2.  **Generate Production Build**
    Execute the build command to generate a highly optimised static site.

    ```bash
    npx @docmd/core build
    ```

3.  **Deploy to Infrastructure**
    Synchronise the `site/` directory with S3, Cloudflare Pages, or Vercel.

:::

::: callout tip "Workflow Optimisation" icon:lightbulb
AI models interpret the `steps` container as a signal for **Sequential Workflows**. Always start each list item with a **bolded title** - this allows agents to reliably parse the objective of each step from the `llms.txt` context.
:::