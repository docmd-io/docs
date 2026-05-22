---
title: "项目结构"
description: "学习 `@docmd/core` 如何将物理文件夹和 Markdown 文件映射为动态 URL 和导航。"
---

编译器使用本地文件系统作为唯一数据来源。文件夹成为导航部分。Markdown 文件成为内容页面。你的目录层级直接转换为网址。

## 1. 标准项目脚手架

运行 `npx @docmd/core init` 建立最小化工作区布局。此结构将源内容与资源和生产构建分离。

## 初始化项目

::: tabs
== tab "npm" icon:box
```bash
mkdir my-docs && cd my-docs
npx @docmd/core init
```
== tab "Bun" icon:zap
```bash
mkdir my-docs && cd my-docs
bunx @docmd/core init
```
:::

这将创建标准项目脚手架：

```text
my-docs/
├── docs/               ← 源目录，.md 文件放这里
│   └── index.md        ← 首页 (/)
├── assets/             ← 静态资源（图片、自定义 CSS/JS）
│   ├── css/
│   ├── js/
│   └── images/
├── docmd.config.js     ← 配置文件
├── package.json        ← 项目元数据与脚本
└── site/               ← 构建输出目录
```

## 文件到 URL 的映射

docmd 将 `docs/` 目录结构直接映射为 URL：

| 文件 | URL |
|:-----|:----|
| `docs/index.md` | `/` |
| `docs/api.md` | `/api` |
| `docs/guides/setup.md` | `/guides/setup` |

::: callout tip "自动标题"
如果页面未在 frontmatter 中定义标题，docmd 会自动提取第一个 `H1` 标题作为页面标题。
:::

## 启动开发服务器

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

访问 `http://localhost:3000` 即可查看带热重载的文档。对 `.md` 文件或 `docmd.config.js` 的更改会即时反映。

## 构建生产版本

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

输出静态网站到 `./site/`，出品为纯静态 HTML -  - 可部署到 GitHub Pages、Vercel、Netlify 或任意静态托管服务。

部署前可在本地预览：

::: tabs
== tab "npm" icon:box
```bash
npx serve site
```
== tab "Bun" icon:zap
```bash
bunx serve site
```
:::
