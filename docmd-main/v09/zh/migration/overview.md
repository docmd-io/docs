---
title: "迁移概览"
description: "了解如何轻松地将您现有的文档迁移到 docmd。"
---

`docmd` 提供了一套全自动的 **迁移引擎**，只需一条命令即可从旧版平台平滑过渡您的文档。引擎消除了手动文件复制与目录重构的麻烦。

## 工作方式

::: steps

1. **检测源配置**: 引擎会自动识别现有的框架配置文件（例如 `docusaurus.config.js`、`mkdocs.yml`、`.vitepress/config.js` 或 `astro.config.mjs`）。
2. **提取元数据与项目结构**: 站点的核心属性（如 `title`、输出路径及顶层导航块）会被自动提取。
3. **保护已有文件**: 您的原始项目目录（排除 `node_modules`、`.git`、`package.json` 及包管理器 lockfile）会被安全地备份到一个 `*-backup/` 目录中。
4. **还原文档内容**: Markdown 源内容会被提取并移动到标准 `docmd` 根目录 `docs/` 中。
5. **生成 `docmd.config.json`**: 会生成一份全新的 `docmd.config.json`，其中包含直接从原始配置提取的选项。

:::

::: callout tip "Dry Run 迁移预览" icon:help-circle
在任何迁移命令后附加 `--dry-run` 参数，可在不向磁盘写入更改的情况下预览计划的文件移动与生成的配置：
```bash
npx @docmd/core migrate --docusaurus --dry-run
```
:::

迁移完成后，您可以立刻运行 `npx @docmd/core dev` 查看站点渲染效果。

## 功能迁移支持矩阵

| 功能 | 自动化支持 | 细节 |
| :--- | :---: | :--- |
| **Markdown 文件** | ✅ 是 | 将所有 `.md` 与 `.mdx` 内容移动至 `docs/` |
| **目录结构** | ✅ 是 | 保留现有的文件夹嵌套层级 |
| **站点元数据** | ✅ 是 | 提取站点 `title` 及输出目录设置 |
| **容器语法** | ✅ 是 | 原生支持 VitePress 与 Docusaurus 的提示框 (admonition) 容器 |
| **导航 / 侧边栏** | ⚠️ 部分 | 自动转换 MkDocs 的 `nav:` 块；其他框架需要配置 `navigation.json` |
| **本地化 (i18n)** | ⚠️ 手动 | 需要在 `docmd.config.json` 中配置目录多语言映射 |
| **版本管理** | ⚠️ 手动 | 需要将多版本内容放置在 `vXX/` 子目录中 |
| **React / Vue 组件** | ❌ 手动 | 框架特定的组件必须替换为 `docmd` 原生容器 |

::: callout success "容器语法兼容性" icon:check-circle
来自 **VitePress**（`:::tip`、`:::warning`、`:::danger`、`:::info`、`:::details`）和 **Docusaurus**（`:::note`、`:::caution`）的容器语法开箱即用。已有提示框在无需手动编辑的情况下即可直接渲染。

**MkDocs** 使用 `!!!` 语法，需要转换为标准的 `:::` 格式。
:::

## 导航与本地化配置

由于各个框架在导航侧边栏、翻译和多版本机制上的构建方式存在差异，`docmd` 会安全地移动您的原始内容，以便您使用 `docmd` 的 JSON Schema 配置导航与 i18n：

- **导航：** 参阅 [导航配置指南](../configuration/navigation.md) 了解如何定义侧边栏链接。
- **本地化：** 在 [本地化指南](../configuration/localisation/index.md) 中配置多语言文档。
- **版本管理：** 在 [版本管理设置](../configuration/versioning.md) 中构建多版本文档结构。

## 支持的迁移目标

::: grids
    ::: grid
        ::: card "Docusaurus" icon:arrow-right-left
        从 Docusaurus v2/v3 React 文档站点进行迁移。
        [阅读指南](./docusaurus.md)
        :::
    :::
    ::: grid
        ::: card "MkDocs" icon:arrow-right-left
        从 MkDocs 及 Material for MkDocs Python 项目进行迁移。
        [阅读指南](./mkdocs.md)
        :::
    :::
    ::: grid
        ::: card "VitePress" icon:arrow-right-left
        从 Vue 驱动的 VitePress 文档架构进行迁移。
        [阅读指南](./vitepress.md)
        :::
    :::
    ::: grid
        ::: card "Astro Starlight" icon:arrow-right-left
        从 Astro Starlight 框架项目进行迁移。
        [阅读指南](./starlight.md)
        :::
    :::
:::