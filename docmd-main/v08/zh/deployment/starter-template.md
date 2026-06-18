---
title: "起始模板"
description: "使用官方 docmd 起始模板，在一分钟内创建预配置的文档站点，并自动部署至 GitHub Pages。"
---

# docmd 起始模板

`docmd-template` 仓库是启动新文档站点的最快方式。它包含一个可用的 `docmd.config.json`、示例页面、用于本地开发的 `package.json`，以及预配置的 GitHub Actions 工作流，每次推送时自动部署至 GitHub Pages。

::: button "使用此模板" external:https://github.com/docmd-io/docmd-template/generate icon:github color:#2ea44f
::: button "查看仓库" external:https://github.com/docmd-io/docmd-template icon:external-link

## 快速开始

### 1. 创建您的仓库

在 GitHub 上点击 **[使用此模板](https://github.com/docmd-io/docmd-template/generate)**，为仓库命名后点击 **Create repository**。无需 Fork——模板会创建一个干净的独立副本。

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

1. 进入 **Settings → Pages**。
2. 在 **Source** 下选择 **GitHub Actions**。
3. 保存。

### 4. 推送并部署

向 `main` 推送任何更改。内置工作流会自动构建站点并部署至 GitHub Pages。文档将上线至：

```
https://<用户名>.github.io/<仓库名>/
```

## 包含内容

```
.github/
  workflows/
    docs.yml          # 推送至 main 时自动构建和部署
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

站点可在 `http://localhost:3000` 访问，支持热重载。Markdown 文件的更改会即时反映。

本地构建生产版本：

```bash
npm run build
```

编译后的站点默认写入 `site/` 目录。

## 添加您的第一个页面

在 `docs/` 中创建新的 Markdown 文件：

```bash
docs/
  index.md          # 首页
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

使用自定义域名（例如 `docs.example.com`）：

1. 更新 `docmd.config.json` 中的 `url` 字段：
   ```json
   { "url": "https://docs.example.com" }
   ```
2. 在 `docs/` 目录中添加包含您域名的 `CNAME` 文件。
3. 在 **Settings → Pages → Custom domain** 中配置域名。

## 起始模板 vs GitHub Action

模板从一开始就为您提供对工作流文件和配置的完全控制。[GitHub Action](./github-action) 更适合向现有仓库添加 docmd 部署而无需重构。

| | 起始模板 | GitHub Action |
|---|---|---|
| 起点 | 新仓库 | 现有仓库 |
| 工作流文件 | 已包含，可自由编辑 | 您编写它，action 处理构建 |
| 配置 | 预配置 | 自动检测或生成 |
| 适用场景 | 新项目 | 为现有仓库添加文档 |