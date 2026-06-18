---
title: "GitHub Action"
description: "使用官方 docmd GitHub Action 构建并将您的文档部署到 GitHub Pages —— 零配置，一个可组合步骤。"
---

`docmd-io/deploy` action 构建您的文档站点并输出已编译资源的路径，可直接上传到 GitHub Pages 或任何其他托管目标。它在一个可组合 action 中处理 Node.js 设置、配置检测、依赖项安装和构建步骤。

::: button "在 GitHub Marketplace 上查看" external:https://github.com/marketplace/actions/build-and-deploy-documentation-with-docmd icon:github
::: button "源代码" external:https://github.com/docmd-io/deploy icon:code

::: callout tip "开始新项目？"
使用 [入门模板](./starter-template) —— 它包含一个预配置的工作流文件和一个即用型仓库结构。GitHub Action 最适合在不重构的情况下向**现有**仓库添加 docmd 部署。
:::

## 快速开始

将 action 添加到您仓库中的任何工作流文件：

```yaml ".github/workflows/docs.yml"
# .github/workflows/docs.yml
name: 部署文档

on:
  push:
    branches: [main]

permissions:
  contents: write
  pages: write
  id-token: write

jobs:
  docs:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deploy.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4

      - uses: docmd-io/deploy@v1
        id: build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: ${{ steps.build.outputs.site-dir }}

      - uses: actions/deploy-pages@v4
        id: deploy
```

## 可重用工作流

对于绝对最少的样板代码，请使用托管的可重用工作流。它在一个调用中处理权限、checkout、构建、上传和部署：

```yaml ".github/workflows/docs.yml"
# .github/workflows/docs.yml
on:
  push:
    branches: [main]

jobs:
  docs:
    uses: docmd-io/deploy/.github/workflows/deploy.yml@v1
```

## 输入

| 输入 | 默认 | 说明 |
|-------|---------|-------------|
| `node` | `20` | 构建期间使用的 Node.js 版本 |

## 输出

| 输出 | 说明 |
|--------|-------------|
| `site-dir` | 已编译站点目录的相对路径（例如 `site/`） |

## Action 的工作内容

action 在内部执行以下步骤：

1. **设置 Node.js** 使用指定的版本。
2. **检测您的配置** —— 在仓库树中搜索（最多两层深）`docmd.config.json`、`docmd.config.js` 或 `docmd.config.ts`。完全支持子目录配置。
3. **初始化 docmd** —— 如果未找到配置，则运行 `npx @docmd/core init` 自动脚手架一个。
4. **安装依赖项** —— 如果存在 `package.json`，则运行 `npm ci`，否则直接安装 `@docmd/core`。
5. **构建站点** —— 运行 `npx @docmd/core build` 并从您的配置中读取输出目录。
6. **输出路径** —— 暴露 `site-dir`，以便上传步骤知道在哪里可以找到已编译的资源。

## 首次设置

GitHub Pages 必须配置为从 **GitHub Actions** 部署（而不是从分支）。这是每个仓库的一次性设置：

1. 在 GitHub 上转到您的仓库。
2. 导航至 **Settings → Pages**。
3. 在 **Source** 下，选择 **GitHub Actions**。
4. 保存。

之后，每次推送到 `main` 都会自动触发部署。

## 嵌套配置支持

如果您的 `docmd.config.json` 位于子目录中 —— 例如在 monorepo 中的 `packages/docs/docmd.config.json` —— action 会检测它并自动向 docmd 传递 `--cwd`。无需手动路径配置。

## 自定义域名

要使用自定义域名：

1. 在您的 `docs/` 目录（或您配置的资源文件夹）中添加一个 `CNAME` 文件，其中包含您的域名，例如 `docs.example.com`。
2. 将 `docmd.config.json` 中的 `url` 字段设置为您的自定义域名，以便 sitemap 和规范标签正确。
3. 在 **Settings → Pages → Custom domain** 中配置域名。

## 固定 Action 版本

对于生产文档站点，请固定到特定的发布标签而不是 `@v1`：

```yaml ".github/workflows/docs.yml"
- uses: docmd-io/deploy@v1.0.0
  id: build
```

这可以防止未来次要更新带来意外行为。

## 故障排查

**`错误：未找到依赖项 lock 文件`**

当 `actions/setup-node` 配置了 `cache: 'npm'` 但不存在 `package-lock.json` 时会发生这种情况。`docmd-io/deploy` action 在内部处理缓存 —— 使用此 action 时，请勿添加带有 `cache: 'npm'` 的单独 `actions/setup-node` 步骤。

**构建成功但站点未上线**

确保 GitHub Pages 设置为从 **GitHub Actions** 部署，而不是从分支。请参阅上面的 [首次设置](#首次设置)。

**配置未检测到**

action 最多搜索两个目录级别。如果您的配置更深，请在使用此 action 的自定义工作流步骤中手动传递 `--cwd`，或使用 [Deployer](./deployer) 生成量身定制的工作流文件。
