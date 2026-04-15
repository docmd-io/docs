---
title: "步骤"
description: "Convert standard ordered lists into high-impact visual timelines and tutorials."
---

The `steps` container is designed specifically for "How-to" guides and technical tutorials. It transforms a standard Markdown ordered list into a polished, numbered vertical timeline with automatic spacing and visual emphasis.

## Syntax

Wrap any standard ordered list in a `::: steps` block.

```markdown
::: steps

1.  **Initialize Project**
    Run the `docmd init` command to scaffold your directory.

2.  **Author Content**
    Write your documentation using standard Markdown files.

3.  **Build & Deploy**
    Generate static assets using `docmd build`.

:::
```

## Detailed Implementation

The `steps` component supports rich Markdown content within each item, including code blocks, images, and nested containers.

```markdown
::: steps

1.  **Generate Production Build**
    Execute the build command to generate a highly optimised static site.
    ```bash
    docmd build
    ```

2.  **Verify Asset Integrity**
    Inspect the `site/` directory to ensure all assets were correctly compiled.

3.  **Deploy to Infrastructure**
    Synchronize the `site/` directory with your primary hosting provider (e.g., S3, Cloudflare Pages, or Vercel).

:::
```

::: steps

1.  **Generate Production Build**
    Execute the build command to generate a highly optimised static site.
    ```bash
    docmd build
    ```

2.  **Verify Asset Integrity**
    Inspect the `site/` directory to ensure all assets were correctly compiled.

3.  **Deploy to Infrastructure**
    Synchronize the `site/` directory with your primary hosting provider (e.g., S3, Cloudflare Pages, or Vercel).

:::

## Advanced Nesting

You can nest other documentation components (such as **Callouts** or **Buttons**) inside a step without interrupting the chronological flow of the sequence.

```markdown
::: steps

1.  **Configure Environment**
    Define your project-specific variables in `docmd.config.js`.

    ::: callout tip
    Use `defineConfig` to enable IDE autocompletion for configuration keys.
    :::

2.  **Validate Schema**
    Run `docmd verify` to ensure your configuration is structurally sound.

:::
```

::: callout tip "Workflow Optimization"
Modern AI models interpret the `steps` container as a high-fidelity signal for **Sequential Workflows**. To maximize AI accuracy in the `llms-full.txt` context, always start your list items with a **Bolded Title**. This allows agents to reliably parse the objective of each step before processing the implementation details.
:::