---
title: "lite-mdx"
description: "Ultra lightweight, zero-dependency MDX and JSX compiler for markdown engines and browsers."
---

`lite-mdx` is a zero-dependency, ultra-fast compiler for MDX and JSX components. It transforms JSX tags, compound elements, and dynamic JavaScript expressions into clean HTML and Markdown without requiring Babel, Unified, or heavy AST toolchains.

::: callout tip "Sub-8KB Bundle" icon:feather
`lite-mdx` is under 8KB minified and runs identically in Node.js, modern browsers, Edge functions, and Cloudflare Workers.
:::

## Installation

::: tabs
::: tab label:pnpm
```bash
pnpm add lite-mdx
```
:::
::: tab label:npm
```bash
npm install lite-mdx
```
:::
::: tab label:bun
```bash
bun add lite-mdx
```
:::
:::

## Quick Start

```typescript
import { compile } from 'lite-mdx';

const mdx = `
# Welcome to {project.name}

<Callout type="tip">
  This is a tip for **v{project.version}**.
</Callout>

<Button variant="primary">Get Started</Button>
`;

const result = compile(mdx, {
  scope: {
    project: { name: 'docmd', version: '0.10.0' }
  },
  components: {
    Callout: (props, children) => `<div class="callout ${props.type}">${children}</div>`,
    Button: (props, children) => `<button class="${props.variant}">${children}</button>`
  }
});

console.log(result.content);
```

## Features

* **Zero Dependencies**: Pure TypeScript/ESM implementation.
* **Component Hierarchies**: Self-closing tags (`<Badge />`), block elements (`<Callout>...</Callout>`), and dotted compound components (`<Tabs.Tab>`).
* **Attributes**: Full support for string, number, boolean shorthand, objects, and `{...props}` spreads.
* **Dynamic Interpolation**: Evaluates text expressions like `{frontmatter.title}` within a secure sandbox.
* **Code Block Isolation**: Code fences and backtick expressions are protected from execution.

## API Reference

### `compile(mdxString, options)`

Compiles an MDX document into standard Markdown and HTML:

* `options.components`: Map of custom component renderers `(props, children) => string` or template strings.
* `options.scope`: Variable dictionary for expression `{ ... }` evaluation and dynamic props.
* `options.allowUnknownTags`: When `true` (default), preserves unmapped components as HTML/Web Components.
* `options.evaluateExpressions`: When `true` (default), evaluates inline text expressions.

Returns:
* `content`: Transformed string ready for your markdown parser.
* `exports`: Record of extracted `export const` declarations.
* `imports`: Array of extracted `import` statements.

### `evaluate(mdxString, scope)`

Evaluates inline expressions within a template string directly.