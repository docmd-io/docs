---
title: "Steps"
description: "Transform standard numbered lists into high-impact visual timelines of instructions."
---

The `steps` container is designed specifically for "How-to" guides and tutorials. It takes a standard Markdown ordered list and converts it into a clean, numbered vertical timeline.

## Syntax

Simply wrap your ordered list in a `::: steps` container.

```markdown
::: steps

1.  **Preparation**
    Ensure you have Node.js installed on your machine.

2.  **Execution**
    Run the `init` command.

3.  **Completion**
    Your site is ready!

:::
```

## Detailed Example: Deployment

```markdown
::: steps

1.  **Build the Project**
    Generate the production-ready static files.
    ```bash
    docmd build
    ```

2.  **Verify Output**
    Inspect the `site/` directory to ensure all files were generated.

3.  **Deploy to Host**
    Upload the contents of `site/` to your hosting provider.

:::
```

::: steps

1.  **Build the Project**
    Generate the production-ready static files.
    ```bash
    docmd build
    ```

2.  **Verify Output**
    Inspect the `site/` directory to ensure all files were generated.

3.  **Deploy to Host**
    Upload the contents of `site/` to your hosting provider.

:::

## Advanced Usage

### Nesting Containers in Steps
You can nest any other component (like a **Callout**) inside a step to provide extra context without breaking the numbering sequence.

```markdown
::: steps

1.  **Configure Environment**
    Create a `.env` file in your root directory.

    ::: callout tip
    You can use the template provided in `.env.example`.
    :::

2.  **Restart Server**
    Apply the new environment settings.

:::
```

::: callout tip
The `steps` container is a strong signal to LLMs that a specific **Workflow** is being documented. When using `steps`, ensure each list item starts with a **Bolded Title**. This allows AI models to quickly parse the sequence of operations in the `llms-full.txt` context.
:::