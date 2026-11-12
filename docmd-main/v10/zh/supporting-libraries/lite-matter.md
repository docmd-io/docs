---
title: "lite-matter"
description: "适用于 markdown 与文本引擎的超轻量零膨胀 frontmatter 提取器。"
---

`lite-matter` 是一款超轻量级、零膨胀的 Frontmatter 元数据提取器。它从 Markdown 文档中解析 YAML 元数据块，返回结构化的数据对象，并保持文档正文完全不被篡改。

::: callout tip "为什么选择 lite-matter？" icon:zap
传统的 Frontmatter 解析包通常会引入庞大的旧式依赖树。`lite-matter` 专为高性能静态站点生成器和编译管道打造，提供极佳的替代体验。
:::

## 安装

::: tabs
::: tab label:pnpm
```bash
pnpm add lite-matter
```
:::
::: tab label:npm
```bash
npm install lite-matter
```
:::
::: tab label:bun
```bash
bun add lite-matter
```
:::
:::

## 快速上手

使用 `matter()` 函数提取 Frontmatter 元数据及正文内容：

```typescript
import { matter } from 'lite-matter';

const markdown = `---
title: "v0.10.0 版本发布"
date: 2026-11-12
tags: ["release", "announcement"]
---

# 发布公告

欢迎阅读最新版本更新说明。
`;

const { data, content } = matter(markdown);

console.log(data.title);   // "v0.10.0 版本发布"
console.log(data.tags);    // ["release", "announcement"]
console.log(content);      // "# 发布公告\n\n欢迎阅读最新版本更新说明。\n"
```

## 功能特性

* **完整 CRLF 支持**：完美兼容 Windows（`\r\n`）与 POSIX（`\n`）换行符。
* **嵌套数据结构**：全面支持 YAML 嵌套对象、数组及多行字符串。
* **安全容错**：在 Frontmatter 缺失或格式损坏时优雅返回空数据，绝不抛出异常崩溃。
* **正文无损保留**：逐字节保留文档正文内容，绝不误删任何自定义分隔符。

## 许可证

[MIT](https://github.com/docmd-io/lite-matter/blob/main/LICENSE) © [docmd.io](https://docmd.io)
