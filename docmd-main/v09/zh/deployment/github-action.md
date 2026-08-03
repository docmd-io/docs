---
title: "GitHub Action"
description: "使用官方 docmd GitHub Action，将您的文档构建并部署到 GitHub Pages — 零配置，一个可组合的步骤。"
---

`docmd-io/deploy` Action 会构建您的文档站点，并输出编译后资源的路径，可直接上传到 GitHub Pages 或任何其他托管目标。它在一个可组合的 Action 中处理 Node.js 安装、配置检测、依赖安装以及构建步骤。

::: button "在 GitHub Marketplace 查看" external:https://github.com/marketplace/actions/build-and-deploy-documentation-with-docmd icon:github
::: button "源代码" external:https://github.com/docmd-io/deploy icon:code

::: callout tip "开始一个新项目？"
请使用 [入门模板 (Starter Template)](./starter-template) — 它包含一份预配置的工作流文件和一个开箱即用的仓库结构。GitHub Action 最适合为**已有的**仓库添加 docmd 部署。
:::

## 快速开始

将 Action 添加到仓库中的任意工作流文件：

```yaml ".github/workflows/docs.yml"
# .github/workflows/docs.yml
name: Deploy Docs

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

## 可复用工作流

若想精简到极致，可使用托管的可复用工作流。它在一个调用中处理权限、checkout、build、upload 和 deploy：

```yaml ".github/workflows/docs.yml"
# .github/workflows/docs.yml
on:
  push:
    branches: [main]

jobs:
  docs:
    uses: docmd-io/deploy/.github/workflows/deploy.yml@v1
```

## 输入 (Inputs)

| 输入 | 默认值 | 说明 |
|-------|---------|-------------|
| `node` | `20` | 构建期间使用的 Node.js 版本 |

## 输出 (Outputs)

| 输出 | 说明 |
|--------|-------------|
| `site-dir` | 编译后站点目录的相对路径（例如 `site/`） |

## Action 的执行过程

该 Action 在内部会执行以下步骤：

1. **设置 Node.js** 使用指定的版本。
2. **检测您的配置** — 在仓库目录树（最多向下两层）中查找 `docmd.config.json`、`docmd.config.js` 或 `docmd.config.ts`。完全支持子目录中的配置。
3. **初始化 docmd** — 如果未找到任何配置，会运行 `npx @docmd/core init` 自动生成一份。
4. **安装依赖** — 如果存在 `package.json`，则运行 `npm ci`，否则直接安装 `@docmd/core`。
5. **构建站点** — 运行 `npx @docmd/core build`，并从您的配置中读取输出目录。
6. **输出路径** — 暴露 `site-dir`，以便上传步骤知道从哪里取编译后的资源。

## 首次设置

GitHub Pages 必须配置为从 **GitHub Actions** 部署（而非从某个分支）。每个仓库只需执行一次：

1. 在 GitHub 上打开您的仓库。
2. 进入 **Settings → Pages**。
3. 在 **Source** 下选择 **GitHub Actions**。
4. 保存。

完成此设置后，每次推送到 `main` 都会自动触发一次部署。

## 嵌套配置支持

如果您的 `docmd.config.json` 位于子目录中 —— 例如 Monorepo 中的 `packages/docs/docmd.config.json` —— Action 会自动检测到它，并将 `--cwd` 传递给 docmd。无需手动配置路径。

## 自定义域名

要使用自定义域名：

1. 在 `docs/` 目录（或您配置的 assets 目录）中添加一个 `CNAME` 文件，内容为您的域名，例如 `docs.example.com`。
2. 将 `docmd.config.json` 中的 `url` 字段设置为您的自定义域名，以确保站点地图和规范标签正确。
3. 在 **Settings → Pages → Custom domain** 中配置域名。

## 固定 Action 版本

对于生产环境的文档站点，请固定到具体的发布标签，而不是 `@v1`：

```yaml ".github/workflows/docs.yml"
- uses: docmd-io/deploy@v1.0.0
  id: build
```

这样可以避免未来次要更新带来的意外行为。

## 故障排查

**`Error: Dependencies lock file is not found`**

当 `actions/setup-node` 配置了 `cache: 'npm'` 但仓库中不存在 `package-lock.json` 时会出现此错误。`docmd-io/deploy` Action 内部已处理缓存 —— 使用此 Action 时，请勿再额外添加带有 `cache: 'npm'` 的 `actions/setup-node` 步骤。

**构建成功，但站点无法访问**

请确保 GitHub Pages 被设置为从 **GitHub Actions** 部署，而非从某个分支部署。参见上方的 [首次设置](#首次设置)。

**未检测到配置**

Action 最多向下搜索两层目录。如果您的配置位于更深的层级，请在自定义工作流步骤中手动传递 `--cwd`，或者使用 [Deployer](./deployer) 生成一份量身定制的工作流文件。