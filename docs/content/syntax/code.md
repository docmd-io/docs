---
title: "Code Blocks"
description: "How to display code with syntax highlighting, line numbers, and copy buttons."
---

# Writing Code

`docmd` includes `highlight.js` for automatic syntax highlighting.

## Fenced Code Blocks

Wrap your code in triple backticks (` ``` `) and specify the language.

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

## Copy Button
If `copyCode: true` is enabled in your config (default), a copy button will automatically appear on hover in the top-right corner of every code block.

## Supported Languages
Common languages include: `javascript`, `typescript`, `html`, `css`, `bash`, `json`, `python`, `java`, `cpp`, `sql`, `yaml`, `markdown`.

If you do not specify a language, it will be rendered as a plain text.