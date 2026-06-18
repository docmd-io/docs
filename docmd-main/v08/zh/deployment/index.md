---
title: "部署概览"
description: "选择如何部署您的 docmd 文档站点 — 从零配置模板到自托管服务器和云平台。"
---

docmd 会构建一个完全静态的站点。输出是一个自包含的文件夹（默认：`site/`），可以托管在任何地方 — 无需服务器端运行时。

```bash
npx @docmd/core build
```

## 选择部署方式

根据您的实际情况，主要有三条路径：

| 方式 | 适用场景 |
|:--|:--|
| [入门模板 (Starter Template)](./starter-template) | 从零开始一个新项目 |
| [GitHub Action](./github-action) | 为已有仓库添加自动化部署 |
| [Deployer](./deployer) | 生成服务器配置（Docker、Nginx、Caddy、Vercel、Netlify） |

## 入门模板 (Starter Template)

最快的入门方式。克隆官方模板仓库 — 它包含一份 `docmd.config.json`、一个示例页面，以及一个预配置的 GitHub Actions 工作流，每次推送时都会部署到 GitHub Pages。

→ [入门模板 (Starter Template)](./starter-template)

## GitHub Action

`docmd-io/deploy` Action 会构建您的站点并输出编译后的路径，可直接上传到 GitHub Pages 或任何其他目标。借助它，您可以在不改变项目结构的前提下，为已有仓库添加 docmd 部署。

→ [GitHub Action](./github-action)

## Deployer

`deploy` 命令会读取您的 `docmd.config.json`，并生成针对您项目定制的、各平台专属的配置文件。没有任何通用模板 — 每个文件都反映了您真实的输出目录、站点 URL 和 SPA 设置。

```bash
# 自托管
npx @docmd/core deploy --docker          # Dockerfile + .dockerignore
npx @docmd/core deploy --nginx           # 生产级 nginx.conf
npx @docmd/core deploy --caddy           # 生产级 Caddyfile

# 云平台 / CI
npx @docmd/core deploy --github-pages    # GitHub Actions 工作流
npx @docmd/core deploy --vercel          # vercel.json
npx @docmd/core deploy --netlify         # netlify.toml
```

→ [Deployer 参考](./deployer)

## 云平台

无需运行自有服务器的托管式托管：

- [Docker 镜像 (Docker Image)](./docker) — 用于容器化部署的官方多架构镜像
- [NGINX](./nginx) — 使用生成配置的自托管
- [Caddy](./caddy) — 自动启用 HTTPS 的自托管
- [Vercel](./vercel) — 零配置云部署
- [Netlify](./netlify) — 基于 Git 的持续部署
- [Cloudflare Pages](./cloudflare-pages) — 内置 CI/CD 的边缘原生托管
- [Firebase Hosting](./firebase) — 集成 GitHub Actions 的 Google CDN

## 上线前检查清单

1. **站点 URL** — 在 `docmd.config.json` 中设置 `url`。它将驱动规范标签、站点地图、社交预览以及生成的部署文件。
2. **重定向** — 正在从其他工具迁移？使用 `redirects` 配置来保留 SEO 排名。
3. **分析** — 启用 `analytics` 插件以追踪用户参与度和搜索查询。
4. **AI 上下文** — 启用 `llms` 插件以生成供 AI Agent 摄取的 `llms.txt`。

::: callout tip "自定义 404 页面"
docmd 会在输出目录中写入 `404.html`。大多数静态托管服务会自动将其用于缺失路由。
:::
