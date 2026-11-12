---
title: "快速开始"
description: "在不到一分钟的时间内，从空目录建立运行中的文档站点。"
---

在包含 Markdown 文件的任何目录中运行 `docmd`。无需配置文件、无需初始化开销、也不需要框架经验。

::: steps

### 1. 启动开发服务器

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core dev
```
== tab "pnpm" icon:boxes
```bash
pnpm dlx @docmd/core dev
```
== tab "yarn" icon:scroll
```bash
yarn dlx @docmd/core dev
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core dev
```
:::

这会打开 `http://localhost:3000`。你的文档现已实时运行。

<img width="500" class="with-border" src="/assets/previews/terminal-npx-dev.webp">

::: callout tip "自动端口切换" icon:info
如果端口 `3000` 当前已被占用，`docmd` 会自动检测并绑定到下一个可用端口（例如 `3001`）。
:::

### 2. 自动功能解析

引擎会自动配置所有核心功能：

1. **目录检测**: 扫描项目根目录下的 `docs/`、`src/docs/`、`documentation/`、`content/` 或任何 `.md` 文件。
2. **导航结构构建**: 直接从你的目录层级构建嵌套的侧边栏导航树。
3. **标题解析**: 自动提取第一个 `H1` 标题标签作为页面标题。
4. **搜索索引**: 即时生成客户端全文搜索索引。
5. **智能缓存**: 保存文件时自动触发低于 200ms 的增量构建。

无需 `docmd.config.json`。后续可以随时添加配置文件来自定义布局、插件或版本控制设置。

### 3. 构建生产产物

将你的 Markdown 文件编译为优化的静态生产网站。

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core build
```
== tab "pnpm" icon:boxes
```bash
pnpm dlx @docmd/core build
```
== tab "yarn" icon:scroll
```bash
yarn dlx @docmd/core build
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core build
```
:::

编译器会将静态站点输出到 `./site/`。可将此静态产物托管在任何地方，如 GitHub Pages、Vercel、Netlify 或任何静态 HTTP 主机上。

:::

::: callout info "下一步" icon:compass
准备好配置你的项目了吗？在 [项目结构指南](./project-structure.md) 中了解如何组织你的仓库，或在 [安装指南](./installation.md) 中探索本地安装选项。
:::
