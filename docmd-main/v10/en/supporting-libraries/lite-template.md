---
title: "lite-template"
description: "Ultra lightweight, zero-dependency async template engine compatible with basic EJS syntax."
---

`lite-template` is a minimalist asynchronous templating engine designed for micro-services, static site generators, and runtime document renderers. It provides compatibility with standard EJS interpolation tags without the footprint of heavy engines.

::: callout tip "Async Evaluation" icon:sparkles
`lite-template` compiles templates into asynchronous JavaScript functions, allowing you to `await` database queries or asynchronous helper calls directly inside template tags.
:::

## Installation

::: tabs
::: tab label:pnpm
```bash
pnpm add lite-template
```
:::
::: tab label:npm
```bash
npm install lite-template
```
:::
::: tab label:bun
```bash
bun add lite-template
```
:::
:::

## Usage

```typescript
import { render } from 'lite-template';

const template = `
<header>
  <h1><%= title %></h1>
  <p><%- description %></p>
  <ul>
    <% for (const item of items) { %>
      <li><%= item %></li>
    <% } %>
  </ul>
</header>
`;

const output = await render(template, {
  title: "Welcome to docmd",
  description: "Documentation engine <strong>v0.10.0</strong>",
  items: ["Fast", "Zero-config", "Extensible"]
});

console.log(output);
```

## Tag Syntax

| Tag | Purpose | Example |
| :--- | :--- | :--- |
| `<%= value %>` | HTML-escaped output | `<%= user.name %>` |
| `<%- value %>` | Raw unescaped output | `<%- rawHtml %>` |
| `<% code %>` | Script execution / loops | `<% if (active) { %>` |
| `<%# comment %>` | Template comment | `<%# internal note %>` |

## API Reference

### `render(templateString, data?, options?)`

Asynchronously compiles and evaluates a template string with the provided data context.

### `compile(templateString, options?)`

Compiles a template string into a reusable rendering function: `(data) => Promise<string>`.