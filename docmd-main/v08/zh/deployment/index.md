---
title: "部署概览"
description: "选择如何部署您的 docmd 文档站点——从零配置模板到自托管服务器和云平台。"
---

docmd 构建完全静态的站点。输出是一个自包含的文件夹（默认：`site/`），可以托管在任何地方——无需服务器端运行时。

```bash
npx @docmd/core build
```

## 选择部署方式

根据您的情况，有三种主要路径：

| 方式 | 最适合 |
|:--|:--|
| [起始模板](./starter-template) | 从零开始启动新项目 |
| [GitHub Action](./github-action) | 向现有仓库添加自动化部署 |
| [Deployer](./deployer) | 生成服务器配置（Docker、Nginx、Caddy、Vercel、Netlify） |

## 起始模板

最快的入门方式。克隆官方模板仓库——它包含 `docmd.config.json`、示例页面和预配置的 GitHub Actions 工作流，每次推送时自动部署到 GitHub Pages。

→ [起始模板](./starter-template)

## GitHub Action

`docmd-io/deploy` action 构建您的站点并输出编译路径，准备上传到 GitHub Pages 或其他目标。使用它可以向现有仓库添加 docmd 部署，而无需更改项目结构。

→ [GitHub Action](./github-action)

## Deployer

`deploy` 命令读取您的 `docmd.config.json` 并生成针对您项目定制的特定提供商配置文件。无通用模板——每个文件都反映您的实际输出目录、站点 URL 和 SPA 设置。

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

无需运行自己的服务器的托管服务：

- [Docker 镜像](./docker) — 用于容器化部署的官方多架构镜像
- [NGINX](./nginx) — 使用生成的配置自托管
- [Caddy](./caddy) — 带自动 HTTPS 的自托管
- [Vercel](./vercel) — 零配置云部署
- [Netlify](./netlify) — Git 连接的持续部署
- [Cloudflare Pages](./cloudflare-pages) — 带内置 CI/CD 的边缘原生托管
- [Firebase Hosting](./firebase) — 带 GitHub Actions 集成的 Google CDN

## 生产检查清单

1. **站点 URL** — 在 `docmd.config.json` 中设置 `url`。这驱动规范标签、站点地图、社交预览和生成的部署文件。
2. **重定向** — 从其他工具迁移？使用 `redirects` 配置保留 SEO 排名。
3. **分析** — 启用 `analytics` 插件跟踪参与度和搜索查询。
4. **AI 上下文** — 启用 `llms` 插件生成 `llms.txt` 供 AI 代理摄取。

::: callout tip "自定义 404 页面"
docmd 在您的输出目录中生成 `404.html`。大多数托管提供商会自动为缺失的路由提供服务。
:::