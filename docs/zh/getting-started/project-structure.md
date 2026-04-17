---
title: "项目结构"
description: "docmd 如何将文件和文件夹映射为页面、URL 和导航。"
---

docmd 以文件系统作为唯一数据来源。文件夹对应文档章节，Markdown 文件对应页面，目录层级决定 URL 路由。

## 初始化项目

```bash
mkdir my-docs && cd my-docs
npx @docmd/core init
```

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

```bash
npx @docmd/core dev
```

## 构建生产版本

```bash
npx @docmd/core build
```

输出静态网站到 `./site/`，出品为纯静态 HTML——可部署到 GitHub Pages、Vercel、Netlify 或任意静态托管服务。

部署前可在本地预览：

```bash
npx serve site
```
