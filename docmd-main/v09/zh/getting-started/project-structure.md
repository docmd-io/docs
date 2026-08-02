---
title: "项目结构"
description: "了解 `@docmd/core` 如何将物理文件夹与 Markdown 文件映射为动态 URL 与清晰的导航。"
---

编译器以本地文件系统为唯一事实来源。文件夹成为导航分区，Markdown 文件成为内容页面，您的目录层级会直接转换为 Web URL。

## 1. 标准项目脚手架

运行 `npx @docmd/core init` 建立一个最小化的工作区布局。该结构将源内容与资源和生产构建产物分离。

```text
my-docs/
├── docs/                 ← 源目录，包含您的 Markdown (.md) 页面
│   └── index.md          ← 落地页（解析为 /）
├── assets/               ← 由引擎直接加载的静态 Web 资源
│   ├── css/              ← 用于自定义页面布局的样式表
│   ├── js/               ← 扩展浏览器端逻辑的自定义脚本
│   └── images/           ← 品牌 Logo、图标与内联插图
├── docmd.config.json     ← 核心配置 schema
├── package.json          ← Node 依赖清单与脚本
└── site/                 ← 优化后的生产构建输出目录
```

::: callout info "配置文件解析" icon:settings
推荐使用 `docmd.config.json`（或 `docmd.config.ts`）作为主要配置格式。旧版 `docmd.config.js` 格式仍然支持，但仅在缺少 `.json` 或 `.ts` 配置文件时作为后备。
:::

## 2. 目录与 URL 映射

编译器会将源文件夹中的文件直接映射到公开 URL。没有尾随的 `.html` 扩展名，也没有复杂的路由规则。

| 源文件 | 解析后的 URL 路径 | 用途 |
| :--- | :--- | :--- |
| `docs/index.md` | `/` | 首页落地页 |
| `docs/api.md` | `/api` | API 参考主页 |
| `docs/guides/setup.md` | `/guides/setup` | 子分区技术指南 |
| `docs/getting-started/quick-start.md` | `/getting-started/quick-start` | 多层级深层页面 |

::: callout tip "自动解析标题" icon:info
如果文件的 YAML frontmatter 中缺少 `title`，引擎会从首个 `H1` 标签（`# Heading`）中提取。该标题将作为面包屑与搜索中的页面名称。
:::

## 3. 工作区 Monorepo 结构

对于复杂布局或具有多个不同产品（例如核心平台、SDK、CLI 工具）的大型项目，`docmd` 原生支持 **Workspace Monorepo** 目录结构。它允许您从单一根仓库管理多个相互独立的文档站点，同时保持统一的品牌。

```text
my-docs-monorepo/
├── docmd.config.json         ← 根配置（定义全局设置）
├── assets/                   ← 共享全局资源（被所有项目继承）
│   ├── css/                  ← 共享全局样式表
│   └── images/               ← 共享 Logo 与图标
├── package.json              ← 根依赖清单
├── main-site/                ← 根项目目录
│   ├── docmd.config.json     ← 项目级配置覆盖
│   └── docs/                 ← main-site 的内容（解析为 /）
│       └── index.md
└── sdk-reference/            ← 次级项目目录
    ├── docmd.config.json     ← 项目级配置覆盖
    └── docs/                 ← sdk-reference 的内容（解析为 /sdk）
        └── index.md
```

### 关键工作区目录模式

*   **全局配置级联：** 根 `docmd.config.json` 中定义的任何配置（如 `theme` 或 `menubar`）都会作为后备默认值。各项目可在本地配置文件中选择性地覆盖这些默认值。
*   **资源共享与优先级：** 共享 Logo、全局自定义样式与通用脚本放在根 `assets/` 目录中。项目也可以定义自己的本地 `assets/` 目录；发生文件名冲突时，项目级资源始终优先。
*   **输出整合：** 在构建过程中（`npx @docmd/core build`），引擎会自动将所有项目合并到单个统一的生产输出目录（例如 `./site/` 与 `./site/sdk/`），无需复杂的反向代理设置或独立的构建流水线。

完整设置步骤与高级级联规则请参阅 [工作区配置指南](../configuration/workspaces.md)。