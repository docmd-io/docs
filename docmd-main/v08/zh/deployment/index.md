---
title: "部署概览"
description: "选择部署 docmd 文档站点的方式 —— 从零配置模板到自托管服务器和云平台。"
---

docmd 构建完全静态的站点。输出是一个自包含的文件夹（默认：`site/`），可以托管在任何地方 —— 无需服务端运行时。

```bash
npx @docmd/core build
```

## 选择部署方法

根据您的情况有三种主要路径：

| 方法 | 最适合 |
|:--|:--|
| [入门模板](./starter-template) | 从头开始一个新项目 |
| [GitHub Action](./github-action) | 向现有仓库添加自动化部署 |
| [Deployer](./deployer) | 生成服务器配置（Docker、Nginx、Caddy、Vercel、Netlify） |

## 入门模板

最快的入门方式。克隆官方模板仓库 —— 它包含一个 `docmd.config.json`、一个示例页面，以及一个预配置的 GitHub Actions 工作流，每次推送时自动部署到 GitHub Pages。

→ [入门模板](./starter-template)

## GitHub Action

`docmd-io/deploy` action 构建您的站点并输出编译路径，可直接上传到 GitHub Pages 或任何其他目标。在不改变项目结构的情况下，将 docmd 部署添加到现有仓库。

→ [GitHub Action](./github-action)

## Deployer

`deploy` 命令读取您的 `docmd.config.json` 并生成针对您的项目量身定制的、特定于提供商的配置文件。无通用模板 —— 每个文件都反映您实际的输出目录、站点 URL 和 SPA 设置。

```bash
# 自托管
npx @docmd/core deploy --docker          # Dockerfile + .dockerignore
npx @docmd/core deploy --nginx           # 生产级 nginx.conf
npx @docmd/core deploy --caddy           # 生产级 Caddyfile

# 云 / CI
npx @docmd/core deploy --github-pages    # GitHub Actions 工作流
npx @docmd/core deploy --vercel          # vercel.json
npx @docmd/core deploy --netlify         # netlify.toml
```

→ [Deployer 参考](./deployer)

## 云平台

无需运行自己的服务器即可进行托管：

- [Docker 镜像](./docker) — 用于容器化部署的官方多架构镜像
- [NGINX](./nginx) — 使用生成的配置进行自托管
- [Caddy](./caddy) — 自托管，自动 HTTPS
- [Vercel](./vercel) — 零配置云部署
- [Netlify](./netlify) — Git 连接的持续部署
- [Cloudflare Pages](./cloudflare-pages) — 带内置 CI/CD 的边缘原生托管
- [Firebase Hosting](./firebase) — Google CDN 与 GitHub Actions 集成

## 生产检查清单

1. **站点 URL** —— 在 `docmd.config.json` 中设置 `url`。这将驱动规范标签、sitemap、社交预览以及生成的部署文件。
2. **重定向** —— 从其他工具迁移？使用 `redirects` 配置来保留 SEO 排名。
3. **分析** —— 启用 `analytics` 插件来跟踪互动和搜索查询。
4. **AI 上下文** —— 启用 `llms` 插件以生成供 AI 智能体摄取的 `llms.txt`。

::: callout tip "自定义 404 页面"
docmd 会将 `404.html` 写入您的输出目录。大多数静态托管会自动为缺失的路由提供此文件。
:::
