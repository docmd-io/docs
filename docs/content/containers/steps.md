---
title: "Steps"
description: "Create beautiful numbered instruction lists for tutorials."
---

# Steps Container

The `steps` container transforms a standard ordered list into a visual timeline of instructions. It is designed for "How-to" guides.

## Syntax

Wrap a standard numbered list in `::: steps`.

```markdown
::: steps

1.  **Step Title**
    Step description.

2.  **Next Step**
    Description.

:::
```

## Example

```markdown
::: steps

1.  **Initialize Project**
    Run the init command to scaffold your folder.
    ```bash
    docmd init
    ```

2.  **Start Server**
    Launch the local dev environment.
    ```bash
    docmd dev
    ```

3.  **Deploy**
    Upload the `site/` folder.

:::
```

**Rendered Output:**

::: steps

1.  **Initialize Project**
    Run the init command to scaffold your folder.
    ```bash
    docmd init
    ```

2.  **Start Server**
    Launch the local dev environment.
    ```bash
    docmd dev
    ```

3.  **Deploy**
    Upload the `site/` folder.

:::

## With Nested Elements
You can use other containers inside a step to provide extra context.

```markdown
::: steps

1.  **Configure Database**
    Edit your `.env` file.

    ::: callout danger
    Do not commit this file to Git!
    :::

2.  **Run Migrations**
    Update the schema.

:::
```

::: steps

1.  **Configure Database**
    Edit your `.env` file.

    ::: callout danger
    Do not commit this file to Git!
    :::

2.  **Run Migrations**
    Update the schema.

:::

## Customization

Steps containers automatically apply consistent styling and numbering. The container handles:

- **Automatic numbering** - Steps are numbered sequentially
- **Consistent spacing** - Proper spacing between steps
- **Responsive design** - Works on all screen sizes
- **Theme integration** - Matches your site's theme
- **Smart list handling** - Only step items get special styling, nested lists remain normal