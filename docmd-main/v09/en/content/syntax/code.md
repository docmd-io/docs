---
title: "Code Blocks"
description: "Document technical implementations with syntax highlighting, file titles, and one-click copying."
---

docmd uses the ultra-fast `lite-hl` engine for automatic, context-aware syntax highlighting. Specify the language identifier on every fenced block to ensure the correct lexical rules apply.

## Syntax Highlighting

Always name the language after the opening fence. The highlighter applies grammar rules specific to that ecosystem.

````markdown
```typescript
async function build(config: string): Promise<void> {
  await initialise(config);
}
```
````

```typescript
async function build(config: string): Promise<void> {
  await initialise(config);
}
```

## Block Titles

Follow the language identifier with a quoted filename to render a labelled header above the block. This is useful for referencing configuration files and source paths directly.

````markdown
```json "docmd.config.json"
{
  "title": "My Documentation",
  "src": "docs/"
}
```
````

```json "docmd.config.json"
{
  "title": "My Documentation",
  "src": "docs/"
}
```

## Language Support

docmd supports common technical ecosystems out of the box:

*   **Logic:** `javascript`, `typescript`, `python`, `rust`, `go`, `ruby`, `csharp`
*   **Web:** `html`, `css`, `markdown`
*   **Data & Shell:** `json`, `yaml`, `bash`, `powershell`, `dockerfile`
*   **Documentation:** `mermaid`, `changelog`

## AI Context Strategy

When documenting code for AI agents, follow these practices:

1.  **Label every block explicitly** - use `typescript`, `bash`, `json` rather than relying on auto-detection. This ensures the parser applies the correct grammar for the `llms.txt` stream.
2.  **Embed intent in comments** - inline comments explain complex logic and provide critical reasoning context directly inside the code.

::: callout tip "One-Click Portability"
Set `copyCode: true` in your configuration to enable a subtle copy button. It appears on the top-right of every block on hover, allowing readers to copy snippets instantly.
:::