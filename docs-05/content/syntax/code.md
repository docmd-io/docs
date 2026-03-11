---
title: "Code Blocks"
description: "Document your code with automatic syntax highlighting, line numbers, and copy buttons."
---

`docmd` includes `highlight.js` for automatic syntax highlighting.

## Fenced Code Blocks

Wrap your code in triple backticks and specify the language for the best results.

````markdown
```javascript
function hello() {
  console.log("Hello World");
}
```
````

**Renders as:**

```javascript
function hello() {
  console.log("Hello World");
}
```

::: callout tip Copy Button
If `copyCode: true` is enabled in your config (default), a copy button will automatically appear in the top-right corner of every code block when the user hovers.
:::

## AI Context Strategy

When documenting code for LLMs:
1.  **Always specify the language**: This helps AI models parse the block correctly in the `llms-full.txt` payload.
2.  **Add comments**: Explaining complex logic within the code block helps the AI reason about your implementation during context retrieval.

## Supported Languages

`docmd` supports hundreds of languages including: `javascript`, `typescript`, `html`, `css`, `bash`, `json`, `python`, `rust`, `go`, `markdown`, and `yaml`.