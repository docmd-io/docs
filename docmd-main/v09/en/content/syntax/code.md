---
title: "Code Blocks & Highlighting"
description: "Document technical implementations with high-performance syntax highlighting, code block titles, and copy controls in docmd."
---

`docmd` uses the fast `lite-hl` engine for native syntax highlighting. Specify the language identifier on every fenced block to apply appropriate lexical rules.

## Syntax Highlighting

Declare the language identifier after the opening fence delimiter:

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

## Code Block Titles

Supply a double-quoted filename string after the language tag to render a styled title bar above the code container:

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

## Supported Languages

`docmd` supports popular programming languages and data formats out of the box:

- **Programming:** `javascript`, `typescript`, `python`, `rust`, `go`, `ruby`, `csharp`, `c`, `cpp`
- **Web Languages:** `html`, `css`, `markdown`
- **Data & Shell:** `json`, `yaml`, `bash`, `powershell`, `dockerfile`, `toml`
- **Diagrams & Logs:** `mermaid`, `changelog`

## AI Context Strategy

When writing code snippets for human readers and AI agents:

1. **Explicit Language Tags**: Use explicit language identifiers (`typescript`, `bash`, `json`) rather than relying on auto-detection to ensure accurate tokenization for `llms.txt`.
2. **Explanatory Inline Comments**: Use inline comments to explain architectural decisions and non-obvious logic.

::: callout tip "One-Click Copy Utilities" icon:copy
Enable `theme.copyCode: true` in `docmd.config.json` to display interactive copy-to-clipboard buttons on code block headers.
:::