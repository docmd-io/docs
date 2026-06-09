---
title: "GitHub Action"
description: "使用官方 docmd GitHub Action 将文档部署到 GitHub Pages——零配置，一个可组合步骤。"
---

`docmd-io/deploy` action 构建您的文档站点并输出已编译资产的路径，供上传至 GitHub Pages 或其他托管目标使用。它在单个可组合的 action 中处理 Node.js 安装、配置检测、依赖安装和构建步骤。

::: button "在 GitHub Marketplace 查看" external:https://github.com/marketplace/actions/build-and-deploy-documentation-with-docmd icon:github
::: button "源代码" external:https://github.com/docmd-io/deploy icon:code

::: callout tip "启动新项目？"
使用[起始模板](./starter-template)——它包含预配置的工作流文件和即用型仓库结构。GitHub Action 最适合向**现有**仓库添加 docmd 部署。
:::

## 快速开始

在您的仓库中添加以下工作流文件：

```yaml
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

## 可复用工作流

若希望最大程度减少样板代码，可使用托管的可复用工作流。它在一次调用中处理权限、检出、构建、上传和部署：

```yaml
# .github/workflows/docs.yml
on:
  push:
    branches: [main]

jobs:
  docs:
    uses: docmd-io/deploy/.github/workflows/deploy.yml@v1
```

## 输入参数

| 参数 | 默认值 | 说明 |
|------|--------|------|
| `node` | `20` | 构建时使用的 Node.js 版本 |

## 输出参数

| 输出 | 说明 |
|------|------|
| `site-dir` | 已编译站点目录的相对路径（例如 `site/`） |

## Action 执行步骤

1. **安装 Node.js** — 使用指定版本。
2. **检测配置文件** — 在仓库树中（最多两层深度）搜索 `docmd.config.json`、`docmd.config.js` 或 `docmd.config.ts`，完全支持子目录配置。
3. **初始化 docmd** — 若未找到配置，运行 `npx @docmd/core init` 自动生成。
4. **安装依赖** — 若存在 `package.json` 则运行 `npm ci`，否则直接安装 `@docmd/core`。
5. **构建站点** — 运行 `npx @docmd/core build` 并从配置中读取输出目录。
6. **输出路径** — 通过 `site-dir` 告知上传步骤编译资产的位置。

## 首次配置

GitHub Pages 必须配置为从 **GitHub Actions** 部署（而非从分支）。每个仓库仅需设置一次：

1. 在 GitHub 上进入您的仓库。
2. 导航至 **Settings → Pages**。
3. 在 **Source** 下选择 **GitHub Actions**。
4. 保存。

此后，每次推送到 `main` 都会自动触发部署。

## 嵌套配置支持

若 `docmd.config.json` 位于子目录中（例如 Monorepo 中的 `packages/docs/docmd.config.json`），action 会自动检测并传递 `--cwd` 参数，无需手动配置路径。

## 自定义域名

使用自定义域名：

1. 在 `docs/` 目录（或配置的资产文件夹）中添加包含您域名的 `CNAME` 文件，例如 `docs.example.com`。
2. 在 `docmd.config.json` 中将 `url` 字段设置为您的自定义域名，以确保站点地图和规范标签正确。
3. 在 **Settings → Pages → Custom domain** 中配置域名。

## 固定 Action 版本

对于生产文档站点，固定到特定发布标签而不是 `@v1`：

```yaml
- uses: docmd-io/deploy@v1.0.0
  id: build
```

这可防止未来次要更新带来的意外行为。

## 故障排查

**`Error: Dependencies lock file is not found`**

当 `actions/setup-node` 配置了 `cache: 'npm'` 但不存在 `package-lock.json` 时会出现此错误。`docmd-io/deploy` action 内部处理缓存——使用本 action 时，请勿单独添加带有 `cache: 'npm'` 的 `actions/setup-node` 步骤。

**构建成功但站点未上线**

请确认 GitHub Pages 已设置为从 **GitHub Actions** 部署，而非从分支部署。参见上面的[首次配置](#首次配置)。

**配置未检测到**

action 搜索最多两个目录层级。如果您的配置更深，请在自定义工作流步骤中手动传递 `--cwd`，或使用 [Deployer](./deployer) 生成定制的工作流文件。