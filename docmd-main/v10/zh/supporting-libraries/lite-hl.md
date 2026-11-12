---
title: "lite-hl"
description: "基于启发式规则的代码分词器与通用语法高亮工具，完全零外部配置。"
---

`lite-hl` 是一款完全无需外部配置的高速通用代码语法高亮工具与分词器。它利用启发式模式匹配机制，对主流编程语言提供准确的代码高亮渲染，同时保持轻盈极小的体积开销。

::: callout tip "同构高亮支持" icon:cpu
`lite-hl` 在 Node.js 服务端环境与客户端浏览器中表现完全一致，是同构文档生成器的理想搭档。
:::

## 安装

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

## 快速上手

```typescript
import { highlight } from 'lite-hl';

const code = `function calculateTotal(price, tax) {
  return price * (1 + tax);
}`;

const html = highlight(code, 'javascript');
console.log(html);
```

## 支持语言

`lite-hl` 内置支持超过 30 种主流语言的分词器：

* JavaScript, TypeScript, JSX, TSX
* Python, Rust, Go, C, C++, C#
* HTML, XML, CSS, SCSS, JSON, YAML
* Bash, Shell, SQL, Markdown, Dockerfile

## 许可证

[MIT](https://github.com/docmd-io/lite-hl/blob/main/LICENSE) © [docmd.io](https://docmd.io)
