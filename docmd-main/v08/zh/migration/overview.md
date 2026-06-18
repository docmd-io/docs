---
title: "迁移概览"
description: "了解如何轻松地将您现有的文档迁移到 docmd。"
---

# 迁移到 docmd

docmd 提供一套全自动的 **迁移引擎**。只需一条命令，即可告别老旧的文档平台；引擎会替您完成搬移 Markdown 文件、重整目录结构这些繁琐工作。

## 工作方式

`migrate` 命令会：

1.  **检测** 您现有的配置文件（例如 `docusaurus.config.js`、`mkdocs.yml`）。
2.  **抽取** 核心元数据，例如站点的 `title`。
3.  **备份** 您现有的文件和目录，安全地放入一个 `*-backup/` 目录。
4.  **复制** 您的 Markdown 内容到 docmd 标准的 `docs/` 目录。
5.  **生成** 一份新的、与您内容匹配的 `docmd.config.json`。

随后您可以立刻运行 `npx @docmd/core dev`，查看内容的渲染效果。

## 哪些内容会被迁移

| 特性 | 是否自动迁移 |
| :--- | :--- |
| **Markdown 文件** | ✅ 是，所有 `.md` 与 `.mdx` 文件都会被移动到 `docs/` |
| **目录结构** | ✅ 是，文件夹嵌套会被保留 |
| **站点标题** | ✅ 是，从您的配置中抽取 |
| **容器语法** | ✅ 是，VitePress / Docusaurus 容器可保持原样 |
| **导航 / 侧边栏** | ⚠️ **否**，需要手动映射 |
| **本地化 (i18n)** | ⚠️ **否**，需要手动映射 |
| **版本管理** | ⚠️ **否**，需要手动映射 |
| **自定义 React/Vue 组件** | ❌ 否，需替换为 docmd 容器 |

::: callout success "容器语法兼容性"
来自 **VitePress**（`:::tip`、`:::warning`、`:::danger`、`:::info`、`:::details`）和 **Docusaurus**（`:::note`、`:::caution`）的容器语法可保持原样。您既有的 admonition 与可折叠区在 docmd 中都能正确渲染。

**MkDocs** 使用 `!!!` 语法，需要手动转换为 `:::` 格式。
:::

## 为什么导航与 i18n 不会被自动迁移

每个平台的导航侧边栏、翻译与多版本机制都各有不同。例如 Docusaurus 使用复杂的 JavaScript 对象，而 MkDocs 则依赖严格缩进的 YAML 结构。

与其靠"猜"复杂配置去冒险完成一次可能损坏的迁移，docmd 选择安全地搬移内容。您必须使用 docmd 基于 JSON 的 API 原生配置导航、本地化与版本管理。

- **导航**：参阅 [导航配置](../configuration/navigation.md) 了解如何创建 `navigation.json`。
- **本地化**：请见 [本地化指南](../configuration/localisation/index.md) 以搭建多语言文档。
- **版本管理**：请参阅 [版本管理设置](../configuration/versioning.md)。

## 支持的平台

请根据您当前的平台选择对应的迁移说明：

- [从 Docusaurus 迁移](./docusaurus.md)
- [从 MkDocs 迁移](./mkdocs.md)
- [从 VitePress 迁移](./vitepress.md)
- [从 Astro Starlight 迁移](./starlight.md)
