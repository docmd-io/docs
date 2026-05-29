---
title: "项目结构"
description: "学习 `@docmd/core` 如何将物理文件夹和 Markdown 文件映射为动态 URL 和清晰的导航结构。"
---

编译器使用本地文件系统作为数据来源。文件夹成为导航部分。Markdown 文件成为内容页面。你的目录层级直接转换为网页 URL。

## 1. 标准项目脚手架

运行 `npx @docmd/core init` 建立最小化工作区布局。此结构将源内容与资源和生产构建分离。

```text
my-docs/
├── docs/                 ← 源目录，包含你的 Markdown (.md) 页面
│   └── index.md          ← 首页（解析为 /）
├── assets/               ← 由引擎直接加载的静态网页资源
│   ├── css/              ← 自定义样式表，用于自定义页面布局
│   ├── js/                ← 自定义脚本，用于扩展浏览器端逻辑
│   └── images/           ← 品牌标志、图标和内联插图
├── docmd.config.json     ← 中央配置方案
├── package.json          ← Node 依赖清单和脚本
└── site/                 ← 优化后的生产构建输出文件夹
```

::: callout info "配置文件解析" icon:settings
`docmd.config.json`（或 `docmd.config.ts`）是推荐的、主要配置格式。旧的 `docmd.config.js` 格式仍然受支持，但仅作为缺少 `.json` 或 `.ts` 配置文件时的后备方案。
:::

## 2. 目录和 URL 映射

编译器将源文件夹内的文件直接映射为公开 URL。没有尾随的 `.html` 扩展名或复杂的路由规则。

| 源文件 | 解析后的 URL 路径 | 用途 |
| :--- | :--- | :--- |
| `docs/index.md` | `/` | 首页 |
| `docs/api.md` | `/api` | 主要 API 参考 |
| `docs/guides/setup.md` | `/guides/setup` | 子章节技术指南 |
| `docs/getting-started/quick-start.md` | `/getting-started/quick-start` | 多层级深层页面 |

::: callout tip "自动解析标题" icon:info
如果文件在其 YAML frontmatter 中缺少 `title`，引擎会提取第一个 `H1` 标签（`# Heading`）。此标题会显示在面包屑和搜索中。
:::

## 3. 工作区 Monorepo 结构

对于复杂布局或具有多个独立产品的大型项目（如核心平台、SDK 和 CLI 工具），`docmd` 原生支持 **工作区 Monorepo** 目录结构。这允许你从单个根仓库管理多个独立的文档站点，同时保持统一的品牌标识。

```text
my-docs-monorepo/
├── docmd.config.json         ← 根配置（定义全局设置）
├── assets/                   ← 共享全局资源（由所有项目继承）
│   ├── css/                  ← 共享全局样式表
│   └── images/               ← 共享标志和图标
├── package.json              ← 根依赖清单
├── main-site/                ← 根项目目录
│   ├── docmd.config.json     ← 项目特定配置覆盖
│   └── docs/                 ← main-site 的内容（解析为 /）
│       └── index.md
└── sdk-reference/            ← 次要项目目录
    ├── docmd.config.json     ← 项目特定配置覆盖
    └── docs/                 ← sdk-reference 的内容（解析为 /sdk）
        └── index.md
```

### 关键工作区目录模式

*   **全局配置层叠：** 根 `docmd.config.json` 中定义的任何配置（如 `theme` 或 `menubar`）都作为后备默认值。各个项目可以在自己的本地配置文件中选择性地覆盖这些默认值。
*   **资源分享和优先级：** 共享标志、全局自定义样式和通用脚本放在根 `assets/` 目录中。项目也可以定义自己的本地 `assets/` 目录；发生文件名冲突时，项目特定资源始终优先。
*   **输出合并：** 在构建过程中（`npx @docmd/core build`），引擎自动将所有项目合并到单个整合的生产输出目录（例如 `./site/` 和 `./site/sdk/`），无需复杂的反向代理设置或独立的构建管道配置。

有关完整设置步骤和高级层叠规则，请参阅 [多项目配置指南](../configuration/workspaces.md)。
