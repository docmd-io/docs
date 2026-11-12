---
title: "lite-template"
description: "亚毫秒级异步微型模板引擎，原生兼容基础 EJS 标签语法。"
---

`lite-template` 是一款专为微服务、静态站点生成器以及运行时渲染管道打造的极简异步模板引擎。它在保留标准 EJS 标签语法的极简体验的同时，彻底去除了沉重引擎的体积负担。

::: callout tip "原生异步求值" icon:sparkles
`lite-template` 将模板预编译为原生异步 JavaScript 函数，允许你在模板标签内直接使用 `await` 执行异步数据库查询或工具调用。
:::

## 安装

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

## 快速上手

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
  title: "欢迎使用 docmd",
  description: "文档编译引擎 <strong>v0.10.0</strong>",
  items: ["极速", "零配置", "强扩展"]
});

console.log(output);
```

## 标签语法说明

| 标签 | 功能说明 | 示例 |
| :--- | :--- | :--- |
| `<%= 值 %>` | HTML 转义安全输出 | `<%= user.name %>` |
| `<%- 值 %>` | 原始未转义输出（HTML 注入） | `<%- rawHtml %>` |
| `<% 代码 %>` | 脚本逻辑执行与循环 | `<% if (active) { %>` |
| `<%# 注释 %>` | 模板内部注释 | `<%# 内部备注 %>` |

## 许可证

[MIT](https://github.com/docmd-io/lite-template/blob/main/LICENSE) © [docmd.io](https://docmd.io)
