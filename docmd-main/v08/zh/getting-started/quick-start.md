---
title: "快速开始"
description: "在一分钟之内，从一个空文件夹到一个可运行的文档站点。"
---

在任何包含 Markdown 文件的文件夹中运行 docmd。无需配置文件、初始化步骤或框架知识。

## 1. 启动开发服务器

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core dev
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core dev
```
:::

这会打开 `http://localhost:3000`。您的文档已经上线。

<img width="500" class="with-border" src="/assets/previews/terminal-npx-dev.webp">

::: callout tip "端口自动故障转移" icon:info
如果 `3000` 端口已被占用，docmd 会自动寻找下一个可用端口（例如 `3001`）。
:::

## 2. 自动功能

引擎会自动完成所有设置：

1.  **目录检测**：扫描 `docs/`、`src/docs/`、`documentation/`、`content/`，或项目根目录下的任何 `.md` 文件。
2.  **导航构建**：根据您的目录树构建嵌套侧边栏。
3.  **标题解析**：从首个 `H1` 标签自动提取页面标题。
4.  **搜索索引**：立即启用内置的全文搜索。
5.  **智能缓存**：文件保存后立即触发亚 200 毫秒的重构建。

无需 `docmd.config.json`。稍后添加它即可自定义布局、插件或版本。

## 3. 生产构建

将 Markdown 文件编译为可用于生产的静态站点。

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core build
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core build
```
:::

编译器会将静态站点输出到 `./site/`。

可以将这份静态输出托管在任何地方。部署到 GitHub Pages、Vercel、Netlify 或任何静态托管平台。