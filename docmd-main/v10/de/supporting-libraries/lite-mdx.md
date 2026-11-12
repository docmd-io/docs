---
title: "lite-mdx"
description: "Abhängigkeitsfreier MDX- und JSX-Compiler für Markdown-Engines und Browser."
---

`lite-mdx` ist ein abhängigkeitsfreier, extrem schneller Compiler für MDX- und JSX-Komponenten. Er transformiert JSX-Tags, zusammengesetzte Elemente und dynamische JavaScript-Ausdrücke in sauberes HTML und Markdown – ohne Babel, Unified oder schwerfällige AST-Toolchains.

::: callout tip "Unter 8 KB Bundle" icon:feather
`lite-mdx` ist minifiziert unter 8 KB groß und läuft identisch in Node.js, modernen Browsern, Edge-Funktionen und Cloudflare Workers.
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

## Schnellstart

```typescript
import { compile } from 'lite-mdx';

const mdx = `
# Willkommen bei {project.name}

<Callout type="tip">
  Dies ist ein Hinweis für **v{project.version}**.
</Callout>

<Button variant="primary">Jetzt starten</Button>
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

## Funktionen

* **Null externe Abhängigkeiten**: Reine TypeScript/ESM-Implementierung.
* **Komponentenhierarchien**: Selbstschließende Tags (`<Badge />`), Block-Elemente (`<Callout>...</Callout>`) und punktierte Komponenten (`<Tabs.Tab>`).
* **Attribute**: Volle Unterstützung für Zeichenfolgen, Zahlen, boolesche Kurzformen, Objekte und `{...props}`-Spreads.
* **Dynamische Interpolation**: Wertet Textausdrücke wie `{frontmatter.title}` in einer sicheren Sandbox aus.
* **Codeblock-Schutz**: Code-Fences und Backtick-Ausdrücke sind vor der Ausführung geschützt.

## Lizenz

[MIT](https://github.com/docmd-io/lite-mdx/blob/main/LICENSE) © [docmd.io](https://docmd.io)
