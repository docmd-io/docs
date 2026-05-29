---
title: "工作区与 Monorepo 架构"
description: "如何使用 docmd 的工作区模式，从单个仓库管理多个独立的文档项目，零重复配置。"
---

## 问题

大型组织为多个独立产品维护文档——SDK、CLI 工具和主平台——每个产品都有自己的版本控制、导航和发布周期。为每个产品运行单独的文档站点会造成重复：独立的 CI 流水线、独立的主题配置、独立的部署任务。

## 为什么重要

碎片化的文档难以维护，对用户来说也令人困惑。如果 SDK 文档与平台文档看起来不同，用户就会失去信心。如果每个项目都需要自己的 CI 任务，你的工程开销会随产品数量的增加而增加。统一的工作区用一个配置文件解决了这两个问题。

## 方法

使用 docmd 的**工作区模式**。在单个根 `docmd.config.json` 中定义所有项目。全局默认值（主题、菜单栏、Logo）只需设置一次。每个项目继承它们，并可以覆盖需要的部分。一个构建命令生成一个可部署的目录。

## 实施

### 1. 仓库结构

```text
my-org-docs/
├── assets/                   ← 共享 Logo、favicon、全局 CSS
├── main-docs/                ← 前缀：/
│   ├── docmd.config.json
│   └── docs/
├── sdk-docs/                 ← 前缀：/sdk
│   ├── docmd.config.json
│   └── docs/
├── cli-docs/                 ← 前缀：/cli
│   ├── docmd.config.json
│   └── docs/
├── docmd.config.json         ← 工作区根配置
└── package.json
```

### 2. 根工作区配置

全局设置只需定义一次。所有项目自动继承这些设置。

```json
{
  "workspace": {
    "projects": [
      { "prefix": "/",    "src": "main-docs", "title": "平台文档" },
      { "prefix": "/sdk", "src": "sdk-docs",  "title": "SDK 参考" },
      { "prefix": "/cli", "src": "cli-docs",  "title": "CLI 参考" }
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
    "alt": "我的组织"
  },
  "menubar": [
    { "text": "平台", "url": "/" },
    { "text": "SDK",  "url": "/sdk" },
    { "text": "CLI",  "url": "/cli" }
  ]
}
```

### 3. 每个项目的配置

每个项目只指定与根配置不同的内容。此 SDK 项目示例添加了 OpenAPI 支持并设置了自己的 `title`：

```json
{
  "title": "SDK 参考",
  "src": "docs",
  "plugins": {
    "search": {},
    "openapi": {},
    "git": { "repo": "https://github.com/my-org/sdk" }
  },
  "versions": {
    "current": "v2",
    "all": [
      { "id": "v2", "dir": "docs",    "label": "v2.x（稳定版）" },
      { "id": "v1", "dir": "docs-v1", "label": "v1.x（旧版）" }
    ]
  }
}
```

根配置中的全局 `theme`、`logo` 和 `menubar` 仍然适用。SDK 项目只是在其基础上添加了自己的插件和版本。

### 4. 构建和 CI

使用单个命令构建整个工作区：

```bash
npx @docmd/core build
```

对于 CI/CD，一个最简的 GitHub Actions 工作流：

```yaml
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

### 5. 针对项目的开发重建

在开发期间，文件更改只会触发受影响项目的定向重建：

```bash
npx @docmd/core dev
```

## 权衡

工作区模式要求所有项目共享相同的 `@docmd/core` 版本。如果不同的产品团队需要在不同版本的 docmd 上运行，则需要单独的仓库。对于大多数组织来说，锁定到单一版本并统一升级是更简单、更可维护的策略。