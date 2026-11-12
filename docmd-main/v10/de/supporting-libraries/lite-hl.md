---
title: "lite-hl"
description: "Heuristischer Code-Tokenizer und Syntax-Highlighter ohne Konfigurationsaufwand."
---

`lite-hl` ist ein schneller, universeller Syntax-Highlighter und Code-Tokenizer ohne externe Konfiguration. Er nutzt heuristische Mustererkennung für präzises Highlighting gängiger Programmiersprachen bei minimalem Ressourcenverbrauch.

::: callout tip "Universelles Highlighting" icon:cpu
`lite-hl` läuft identisch auf Node.js-Servern und in Client-Browsern – ideal für isomorphe Dokumentations-Generatoren.
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

## Verwendung

```typescript
import { highlight } from 'lite-hl';

const code = `function calculateTotal(price, tax) {
  return price * (1 + tax);
}`;

const html = highlight(code, 'javascript');
console.log(html);
```

## Unterstützte Sprachen

`lite-hl` bietet integrierte Tokenizer für über 30 Sprachen:

* JavaScript, TypeScript, JSX, TSX
* Python, Rust, Go, C, C++, C#
* HTML, XML, CSS, SCSS, JSON, YAML
* Bash, Shell, SQL, Markdown, Dockerfile

## Lizenz

[MIT](https://github.com/docmd-io/lite-hl/blob/main/LICENSE) © [docmd.io](https://docmd.io)
