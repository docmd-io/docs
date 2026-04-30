---
title: "迁移概览"
description: "了解如何轻松将现有文档迁移到 docmd。"
---

# 迁移到 docmd

`docmd` 提供了一个完全自动化的 **迁移引擎**，帮助您通过一条命令从旧的或竞争性的文档平台过渡。迁移引擎的目的是消除移动 Markdown 文件和重组项目目录的繁琐工作。

## 工作原理

迁移命令将执行以下操作：

1. **检测**您现有的配置文件（例如 `docusaurus.config.js`，`mkdocs.yml`）。
2. **提取**站点的核心元数据，例如 `title`。
3. **备份**您现有的文件和目录，安全地放入 `*-backup/` 目录（例如 `docusaurus-backup/`）。
4. **复制**您的 Markdown 内容到标准的 `docmd` `docs/` 目录中。
5. **生成**一个为您内容量身定制的全新 `docmd.config.js`。

随后，您可以立即运行 `npx @docmd/core dev`，以查看在 `docmd` 引擎中渲染的内容。

## 会迁移什么

| 功能 | 是否自动迁移？ |
| :--- | :--- |
| **Markdown 文件** | ✅ 是的，所有 `.md` 和 `.mdx` 文件都会移到 `docs/` |
| **目录结构** | ✅ 是的，您的文件夹嵌套会被保留 |
| **站点标题** | ✅ 是的，从您的配置中提取 |
| **导航 / 侧边栏** | ⚠️ **否**，需要手动映射 |
| **国际化 (i18n)** | ⚠️ **否**，需要手动映射 |
| **版本管理** | ⚠️ **否**，需要手动映射 |
| **自定义 React/Vue 组件** | ❌ 否，这些必须替换为 `docmd` 容器 |

## 为什么不自动迁移导航和 i18n

每个文档平台处理导航侧边栏、翻译和多版本的方式各不相同。例如，Docusaurus 使用复杂的 JavaScript 对象或自动生成的侧边栏，而 MkDocs 依赖严格缩进的 YAML 结构。

为了避免猜测复杂配置带来的错误和损坏迁移，`docmd` 会安全地移动您的内容，并要求您使用 `docmd` 简单的基于 JSON 的 API，原生配置导航、国际化和版本管理。

- **导航：** 请参阅 [导航设置](../configuration/navigation.md) 了解如何创建 `navigation.json`。
- **国际化：** 了解如何设置多语言文档，请参阅 [国际化指南](../configuration/localisation/index.md)。
- **版本管理：** 请参考 [版本管理设置](../configuration/versioning.md)。

## 支持的平台

选择您当前的平台以获取具体的迁移说明：

- [由 Docusaurus 迁移](./docusaurus.md)
- [由 MkDocs 迁移](./mkdocs.md)
- [由 VitePress 迁移](./vitepress.md)
- [由 Astro Starlight 迁移](./starlight.md)
