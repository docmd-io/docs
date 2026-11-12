---
title: "lite-hl"
description: "Universal, zero-config heuristic code tokenizer and syntax highlighter."
---

`lite-hl` is a fast, universal syntax highlighter and code tokenizer requiring zero external configuration. It uses heuristic pattern tokenisation to provide accurate syntax highlighting across popular programming languages while remaining lightweight and self-contained.

::: callout tip "Universal Highlighting" icon:cpu
`lite-hl` runs identically in Node.js server environments and client-side browser runtimes, making it ideal for isomorphic documentation generators.
:::

## Installation

::: tabs
::: tab label:pnpm
```bash
pnpm add lite-hl
```
:::
::: tab label:npm
```bash
npm install lite-hl
```
:::
::: tab label:bun
```bash
bun add lite-hl
```
:::
:::

## Usage

### Server-Side Rendering

```typescript
import { highlight } from 'lite-hl';

const code = `function calculateTotal(price, tax) {
  return price * (1 + tax);
}`;

const html = highlight(code, 'javascript');
console.log(html);
```

### Linking Styles

Import the accompanying stylesheet to style token classes:

```html
<link rel="stylesheet" href="node_modules/lite-hl/dist/lite-hl.css">
```

Or in CSS:

```css
@import "lite-hl/theme.css";
```

## Supported Languages

`lite-hl` includes built-in tokenisers for over 30 languages, including:

* JavaScript, TypeScript, JSX, TSX
* Python, Rust, Go, C, C++, C#
* HTML, XML, CSS, SCSS, JSON, YAML
* Bash, Shell, SQL, Markdown, Dockerfile

## API Reference

### `highlight(code, language, options?)`

Tokenises the source code and returns an HTML string wrapped in syntax token spans.

### `tokenize(code, language)`

Returns an array of token objects containing token types and textual values for custom renderer pipelines.

## License

[MIT](https://github.com/docmd-io/lite-hl/blob/main/LICENSE) © [docmd.io](https://docmd.io)
