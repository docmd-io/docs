---
title: "Linking & Referencing"
description: "Master internal cross-linking, external links, and asset referencing."
---

To link to another page, use the **relative path** to the `.md` file.

::: callout info "Extension Rewriting"
`docmd` automatically converts `.md` extensions to valid HTML links during the build. This ensures links work in your IDE (VS Code) and on the deployed website.
:::

| Goal | Syntax |
| :--- | :--- |
| Same Folder | `[Read Guide](guide.md)` |
| Subfolder | `[Read Config](configuration/index.md)` |
| Parent Folder | `[Go Back](../index.md)` |

## Anchors (Section Linking)

Link to specific headers using the `#slug`.

*   **Same Page:** `[Jump to Top](#linking--referencing)`
*   **Cross Page:** `[See Installation](../getting-started/installation.md#global-installation)`

## External & Protocol Links

Standard URL syntax works for external sites and protocols.

*   **HTTPS:** `[Visit Google](https://google.com)`
*   **Email:** `[Email Support](mailto:help@docmd.io)`
*   **Phone:** `[Call Us](tel:+123456789)`

## Linking to Assets

To allow users to download files, place them in your `assets/` folder. `docmd` will **not** strip the extension for files inside this directory.

```markdown
[Download PDF](/assets/manual.pdf)
[View Raw Config](/assets/examples/config.js)
```

::: callout tip "AI Navigation Tip"
When cross-linking pages, using descriptive link text (like `[Read about PWA configuration](../plugins/pwa.md)`) instead of `[Click here](../plugins/pwa.md)` helps AI models understand the relationship between different technical topics during contextual analysis.
:::