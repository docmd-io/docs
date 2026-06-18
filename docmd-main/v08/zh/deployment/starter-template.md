---
title: "入门模板"
description: "使用官方 docmd 入门模板在不到一分钟的时间内创建一个预配置了 GitHub Pages 部署的文档站点。"
---

# docmd 入门模板

`docmd-template` 仓库是开始新文档站点的最快方式。它包含一个可工作的 `docmd.config.json`、一个示例页面、一个用于本地开发的 `package.json`，以及一个预配置的 GitHub Actions 工作流，每次推送时自动部署到 GitHub Pages。

::: button "使用此模板" external:https://github.com/docmd-io/docmd-template/generate icon:github color:#2ea44f
::: button "查看仓库" external:https://github.com/docmd-io/docmd-template icon:external-link

## 入门

### 1. 创建您的仓库

在 GitHub 上点击 **[使用此模板](https://github.com/docmd-io/docmd-template/generate)**。给您的仓库命名并点击 **Create repository**。您无需 fork 它 —— 该模板会创建一个干净的独立副本。

### 2. 配置您的站点

在新仓库中打开 `docmd.config.json`，更新 `title` 和 `url` 字段：

```json "docmd.config.json"
{
  "title": "我的文档",
  "url": "https://用户名.github.io/仓库名"
}
```

将 `用户名` 和 `仓库名` 替换为您的 GitHub 用户名和仓库名称。

### 3. 启用 GitHub Pages

每个仓库仅需设置一次：

1. 转到 **Settings → Pages**。
2. 在 **Source** 下，选择 **GitHub Actions**。
3. 保存。

### 4. 推送并部署

向 `main` 推送任何更改。包含的工作流会构建您的站点并自动部署到 GitHub Pages。您的文档将在以下位置可用：

```
https://<用户名>.github.io/<仓库名>/
```

## 包含的内容

```
.github/
  workflows/
    docs.yml          # 自动构建并在推送到 main 时部署
docmd.config.json     # 站点标题、URL 和输出目录
docs/
  index.md            # 您的第一个文档页面
package.json          # 本地开发脚本
```

## 本地开发

克隆您的仓库并运行开发服务器：

```bash
npm install
npm run dev
```

该站点在 `http://localhost:3000` 上可用，并支持实时重载。对 Markdown 文件的更改会立即反映。

要在本地构建生产副本：

```bash
npm run build
```

编译后的站点默认写入 `site/`。

## 包含的工作流

该模板附带 `.github/workflows/docs.yml`：

```yaml ".github/workflows/docs.yml"
name: Docs

on:
  push:
    branches: [main, master]
  workflow_dispatch:

permissions:
  contents: write
  pages: write
  id-token: write

concurrency:
  group: docs
  cancel-in-progress: false

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deploy.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: 20

      - name: Install
        run: npm install @docmd/core

      - name: Build
        run: npx @docmd/core build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./site

      - name: Deploy
        id: deploy
        uses: actions/deploy-pages@v4
```

工作流直接安装 `@docmd/core` 而不使用 lock 文件，这是有意的 —— 该模板没有提交的 `package-lock.json`，因此不使用 `actions/setup-node` 缓存。这使模板保持无依赖同时仍能可靠部署。

## 添加您的第一个页面

在 `docs/` 中创建一个新的 Markdown 文件：

```bash
docs/
  index.md        # 首页
  getting-started.md
  api-reference.md
```

添加 `navigation.json` 控制侧边栏：

```json "navigation.json"
[
  { "title": "首页", "path": "/" },
  { "title": "快速开始", "path": "/getting-started" },
  { "title": "API 参考", "path": "/api-reference" }
]
```

完整的导航配置说明请参阅[导航配置](../configuration/navigation.md)。

## 自定义域名

要使用自定义域名（例如 `docs.example.com`）：

1. 更新 `docmd.config.json` 中的 `url` 字段：
   ```json "docmd.config.json"
   { "url": "https://docs.example.com" }
   ```
2. 在您的 `docs/` 目录中添加一个包含您域名的 `CNAME` 文件。
3. 在 **Settings → Pages → Custom domain** 中配置域名。

## 入门模板 vs GitHub Action

模板让您从一开始就完全拥有工作流文件和配置的所有权。[GitHub Action](./github-action) 更适合在不重组现有仓库的情况下添加 docmd 部署。

| | 入门模板 | GitHub Action |
|---|---|---|
| 起点 | 新仓库 | 现有仓库 |
| 工作流文件 | 已包含，可编辑 | 您编写，action 处理构建 |
| 配置 | 预配置 | 自动检测或脚手架 |
| 最适合 | 新项目 | 向现有仓库添加文档 |
