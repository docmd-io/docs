---
title: "lite-mdx"
description: "适用于 markdown 引擎与浏览器的零依赖轻量级 MDX 与 JSX 编译器。"
---

`lite-mdx` 是一款专为 MDX 与 JSX 组件打造的零外部依赖极速编译器。它能将 JSX 标签、复合嵌套元素及动态 JavaScript 表达式直接编译为干净的 HTML 与 Markdown，无需引入 Babel、Unified 或沉重的 AST 工具链。

::: callout tip "体积小于 8KB" icon:feather
`lite-mdx` 压缩后体积不足 8KB，并在 Node.js、现代浏览器、Edge 边缘计算与 Cloudflare Workers 中保持高度一致的运行表现。
:::

## 安装

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

## 快速上手

```typescript
import { compile } from 'lite-mdx';

const mdx = `
# 欢迎使用 {project.name}

<Callout type="tip">
  当前版本专为 **v{project.version}** 优化。
</Callout>

<Button variant="primary">立即体验</Button>
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

## 功能特性

* **零依赖设计**：纯 TypeScript/ESM 原生实现。
* **丰富组件层次**：支持自闭合标签（`<Badge />`）、块级组件（`<Callout>...</Callout>`）与点号复合组件（`<Tabs.Tab>`）。
* **多类型属性**：全面支持字符串、数字、布尔简写、对象及 `{...props}` 解构展开。
* **安全动态插值**：在严密的沙箱环境中计算 `{frontmatter.title}` 等文本表达式。
* **代码块隔离保护**：代码围栏与反引号内容受保护，绝不意外触发编译执行。

## 许可证

[MIT](https://github.com/docmd-io/lite-mdx/blob/main/LICENSE) © [docmd.io](https://docmd.io)
