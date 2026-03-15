---
title: "Code Blocks"
description: "Document technical implementations with high-fidelity syntax highlighting and interactive copy buttons."
---

`docmd` utilizes `highlight.js` to provide automatic, context-aware syntax highlighting across hundreds of programming languages and configuration formats.

## Syntax Highlighting

Author your technical examples using standard Markdown fenced code blocks. Always specify the language identifier to ensure the highlight engine applies the correct lexical rules.

````markdown
```javascript
function initialize() {
  console.log("docmd engine active.");
}
```
````

**Rendered Result:**

```javascript
function initialize() {
  console.log("docmd engine active.");
}
```

::: callout tip "One-Click Portability"
When `copyCode: true` is enabled in your configuration (default), a subtle copy button automatically appears in the top-right corner of every code block on hover, allowing users to instantly transfer snippets to their IDE.
:::

## Strategy for AI Context

When documenting code for consumption by LLMs and AI Agents, adhere to these technical best practices:

1.  **Strict Language Labeling**: Explicitly labeling blocks as `typescript`, `bash`, or `json` ensures the AI parser accurately interprets the block's grammar within the `llms-full.txt` stream.
2.  **Embedded Intent**: Use inline comments within your code blocks to explain the *why* behind complex logic. This provides the AI with critical reasoning context that simple text outside the block might lack.

## Language Support Reference

`docmd` provides out-of-the-box support for the most common technical ecosystems, including:

*   **Logic**: `javascript`, `typescript`, `python`, `rust`, `go`, `ruby`, `csharp`.
*   **Web**: `html`, `css`, `markdown`.
*   **Data & Shell**: `json`, `yaml`, `bash`, `powershell`, `dockerfile`.
*   **Documentation**: `mermaid`, `changelog`.