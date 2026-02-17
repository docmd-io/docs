---
title: "Linking & Referencing"
description: "A guide to internal cross-linking, external links, and asset referencing."
---

# Linking & Referencing

Learn how to connect your pages and link to external resources.

## Internal Page Links

To link to another page in your documentation, use the **relative path** to the markdown file.

::: callout info Smart Rewriting
`docmd` automatically converts `.md` extensions to valid HTML links during the build. This ensures links work in your code editor (VS Code) AND on the website.
:::

**Examples:**

| Goal | Syntax |
| :--- | :--- |
| Link to a file in the same folder | `[Read Guide](guide.md)` |
| Link to a file in a subfolder | `[Read Config](configuration/index.md)` |
| Link back to parent | `[Go Back](../index.md)` |

## Anchors (Section Linking)

You can link to specific headers on a page using the `#slug`.

*   **Same Page:** `[Jump to Top](#linking--referencing)`
*   **Other Page:** `[See Installation](../getting-started/installation.md#global-installation)`

## External Links

Standard URL syntax works for external sites.

```markdown
[Visit Google](https://google.com)
```

**Protocol Links:**
*   `[Email Support](mailto:help@docmd.io)`
*   `[Call Us](tel:+123456789)`

## Linking to Assets

To allow users to download files (like PDFs) or view raw assets, place them in your `assets/` folder.

**Important:** When linking to files in `assets/`, `docmd` will **NOT** strip the extension.

```markdown
[Download PDF](../../assets/manual.pdf)
[View Raw Config](../../assets/examples/config.js)
```