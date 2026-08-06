---
title: "项目结构"
description: "了解 `@docmd/core` 如何将物理文件夹和 Markdown 文件映射为动态 URL 和清晰的导航。"
---

编译器使用你的本地文件系统作为唯一事实标准。目录转换为导航章节，Markdown 文件转换为内容页面，文件系统层级直接翻译为 Web URL。

## 1. 标准项目结构

运行 `npx @docmd/core init` 来建立最小化工作区布局。该结构可将源内容与资源文件及生产构建产物隔离开来。

```text
my-docs/
├── docs/                 ← 包含 Markdown (.md) 页面的源目录
│   └── index.md          ← 落地页（解析为 /）
├── assets/               ← 由引擎直接加载的静态 Web 资源
│   ├── css/              ← 用于自定义页面布局的自定义样式表
│   ├── js/               ← 用于扩展浏览器端逻辑的自定义脚本
│   └── images/           ← 品牌 Logo、图标与内联插图
├── docmd.config.json     ← 核心配置文件
├── package.json          ← Node 依赖清单与脚本
└── site/                 ← 优化的生产构建输出目录
```

::: callout info "配置文件解析" icon:settings
`docmd.config.json`（或 `docmd.config.ts`）是推荐的主配置文件格式。旧版的 `docmd.config.js` 格式仅在缺少 `.json` 或 `.ts` 配置文件时作为备用回退。
:::

## 2. 目录与 URL 映射

编译器将源文件夹内的文件直接映射为公共 URL。没有多余的 `.html` 扩展名或复杂的路由规则。

| 源文件 | 解析后的 URL 路径 | 用途 |
| :--- | :--- | :--- |
| `docs/index.md` | `/` | 首页落地页 |
| `docs/api.md` | `/api` | 主 API 参考 |
| `docs/guides/setup.md` | `/guides/setup` | 子章节技术指南 |
| `docs/getting-started/quick-start.md` | `/getting-started/quick-start` | 多层级深层页面 |

::: callout tip "自动标题解析" icon:info
如果文件在其 YAML frontmatter 中缺少显式的 `title`，引擎会自动提取第一个 `H1` 标题标签 (`# 标题`)。该标题在面包屑和搜索索引中代表该页面。
:::

## 3. 工作区 Monorepo 结构

对于复杂的布局或包含多个不同产品（如平台核心、SDK 和 CLI 工具）的大型项目，`docmd` 原生支持 **工作区 Monorepo** 目录结构。这允许你在保持统一品牌的同时，从单个根仓库管理多个独立的文档站点。

```text
my-docs-monorepo/
├── docmd.config.json         ← 根配置（定义全局设置）
├── assets/                   ← 全局共享资源（被所有项目继承）
│   ├── css/                  ← 全局共享样式表
│   └── images/               ← 全局共享 Logo 与图标
├── package.json              ← 根依赖清单
├── main-site/                ← 主项目目录
│   ├── docmd.config.json     ← 项目特定配置覆盖
│   └── docs/                 ← main-site 内容（解析为 /）
│       └── index.md
└── sdk-reference/            ← 次要项目目录
    ├── docmd.config.json     ← 项目特定配置覆盖
    └── docs/                 ← sdk-reference 内容（解析为 /sdk）
        └── index.md
```

### 核心工作区目录模式

::: grids
    ::: grid
        ::: card "全局配置层叠" icon:layers
        在根 `docmd.config.json` 中定义的任何配置（如 `theme` 或 `menubar`）均作为备用默认值。单个项目在其本地配置文件中选择性地覆盖这些默认值。
        :::
    :::
    ::: grid
        ::: card "资源共享与优先级" icon:folder-tree
        共享的 Logo、全局自定义样式和通用脚本存放在根 `assets/` 目录中。发生文件名冲突时，项目特定资源优先于根资源。
        :::
    :::
    ::: grid
        ::: card "产物整合" icon:package-check
        在构建过程中（`npx @docmd/core build`），引擎将所有工作区项目合并为单个整合的输出目录（例如 `./site/` 和 `./site/sdk/`），消除了对复杂反向代理设置的需求。
        :::
    :::
:::

有关完整的设置步骤和高级级联规则，请参阅 [工作区配置指南](../configuration/workspaces.md)。
