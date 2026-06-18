---
title: "工作区与 Monorepo 架构"
description: "如何使用 docmd 的 Workspace 模式从单个仓库管理多个独立文档项目，零重复。"
---

## 问题

大型组织维护多个独立产品的文档 —— 一个 SDK、一个 CLI 工具和一个主平台 —— 每个都有自己的版本控制、导航和发布周期。为每个产品运行单独的文档站点会产生重复：单独的 CI 流水线、单独的主题配置、单独的部署任务。

## 为什么重要

碎片化的文档难以维护且让用户感到困惑。如果 SDK 文档与平台文档看起来不同，用户会失去信心。如果每个项目都需要自己的 CI 任务，那么您的工程开销会随着产品数量而增加。统一的工作区通过单个配置文件解决了这两个问题。

## 方法

使用 docmd 的 **Workspace 模式**。在单个根 `docmd.config.json` 中定义所有项目。一次性设置全局默认值（主题、菜单栏、logo）。每个项目都会继承它们，并可以覆盖自己需要的内容。一个构建命令生成一个可部署的目录。

## 实现

### 1. 仓库结构

```text
my-org-docs/
├── assets/                   ← 共享 logo、favicon、全局 CSS
├── main-docs/                ← prefix: /
│   ├── docmd.config.json
│   └── docs/
├── sdk-docs/                 ← prefix: /sdk
│   ├── docmd.config.json
│   └── docs/
├── cli-docs/                 ← prefix: /cli
│   ├── docmd.config.json
│   └── docs/
├── docmd.config.json         ← 工作区根
└── package.json
```

### 2. 根工作区配置

一次性定义全局设置。所有项目都会自动继承这些设置。

```json "docmd.config.json"
{
  "workspace": {
    "projects": [
      { "prefix": "/",    "src": "main-docs", "title": "Platform Docs" },
      { "prefix": "/sdk", "src": "sdk-docs",  "title": "SDK Reference" },
      { "prefix": "/cli", "src": "cli-docs",  "title": "CLI Reference" }
    ],
    "switcher": {
      "enabled": true,
      "position": "sidebar-top"
    }
  },
  "theme": { "name": "default", "appearance": "system" },
  "logo": {
    "light": "assets/logo-dark.svg",
    "dark": "assets/logo-light.svg",
    "alt": "My Org"
  },
  "menubar": [
    { "text": "Platform", "url": "/" },
    { "text": "SDK",      "url": "/sdk" },
    { "text": "CLI",      "url": "/cli" }
  ]
}
```

### 3. 按项目配置

每个项目仅指定与根不同的内容。SDK 项目的此示例添加了 OpenAPI 支持并设置了自己的 `title`：

```json "docmd.config.json"
{
  "title": "SDK Reference",
  "src": "docs",
  "plugins": {
    "search": {},
    "openapi": {},
    "git": { "repo": "https://github.com/my-org/sdk" }
  },
  "versions": {
    "current": "v2",
    "all": [
      { "id": "v2", "dir": "docs",    "label": "v2.x (Stable)" },
      { "id": "v1", "dir": "docs-v1", "label": "v1.x (Legacy)" }
    ]
  }
}
```

来自根配置的全局 `theme`、`logo` 和 `menubar` 仍然应用。SDK 项目只是在它们之上添加了自己的插件和版本。

### 4. 构建与 CI

通过单个命令构建整个工作区：

```bash
npx @docmd/core build
```

对于 CI/CD，一个最小的 GitHub Actions 工作流：

```yaml ".github/workflows/docs.yml"
name: Deploy Docs
on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'
      - run: npm install
      - run: npx @docmd/core build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: site/
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
    steps:
      - uses: actions/deploy-pages@v4
```

或自动生成工作流：

```bash
npx @docmd/core deploy --github-pages
```

### 5. 按项目定向开发重建

在开发过程中，文件更改会触发仅受影响项目的定向重建：

```bash
npx @docmd/core dev
```

- 更改 `sdk-docs/docs/` 中的文件只会重建 SDK 项目。
- 更改根 `docmd.config.json` 会触发完整的工作区重建。
- 更改共享的 `assets/` 文件会重建所有项目。

### 6. 项目切换器

内置的项目切换器允许用户在不离开文档站点的情况下在项目之间导航。它会自动从根配置的 `projects` 数组填充。每个条目的 `title` 字段用作显示标签。

```json "docmd.config.json"
"switcher": {
  "enabled": true,
  "position": "sidebar-top"
}
```

可用位置：`sidebar-top`（默认）、`sidebar-bottom`、`options-menu`。

## 权衡

### 构建时间
构建 3 个项目所需的时间大约是单个项目的 3 倍。对于非常大的工作区（10+ 项目），请考虑拆分为单独的 CI 作业，这些作业发布到共享的 CDN 路径。

### 前缀冲突
如果您的根项目有一个名为 `sdk/` 的文件夹，并且您还定义了带有 `prefix: "/sdk"` 的项目，则带前缀的项目胜出。引擎会发出警告。在添加新前缀之前，请检查您的目录结构。

### 共享导航
根配置中的全局 `navigation` 数组作为后备很有用。但是，每个项目理想情况下应维护自己的 `navigation.json` 以进行精确控制。请参阅 [导航配置](../../configuration/navigation.md)。