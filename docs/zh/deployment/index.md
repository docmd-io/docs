---
title: "部署"
description: "将 docmd 文档托管到 GitHub Pages、Vercel、Netlify 和 Cloudflare Pages 等平台。"
---

`docmd` 生成高性能静态网站，可托管在任何能提供 HTML 服务的环境中。只需运行构建命令生成 `site/` 目录：

```bash
docmd build
```

## 自动化部署配置

::: callout warning "版本要求"
`docmd deploy` 命令从 **v0.7.2** 开始引入。
:::

`docmd build` 会生成原始静态文件，但将其部署到自托管服务器或容器通常需要编写繁琐的配置文件。`docmd` 通过自动构建生产级环境来彻底解决这个问题。

在终端中运行以下命令即可引导生成配置文件：

```bash
docmd deploy [target]
```

### 支持的离线目标
我们目前支持为以下主流离线和自托管环境生成配置文件：

*   [`docmd deploy --docker`](./docker) - 生成优化的多阶段 `Dockerfile` 和 `.dockerignore`。
*   [`docmd deploy --nginx`](./nginx) - 生成包含安全头、GZIP 和缓存策略的 `nginx.conf`。
*   [`docmd deploy --caddy`](./caddy) - 生成自动路由的 `Caddyfile`。

如果需要覆盖已有的配置文件，可以使用 `--force` 参数：

```bash
docmd deploy --docker --force
```

请点击上方对应的目标查看详细的服务专用文档。

*(注意：`--vercel` 和 `--netlify` 等云 API 部署命令正在第二阶段开发中。)*

## 云托管与 CI/CD
如果你不想管理自己的服务器（Docker、Nginx），可以将 `site/` 文件夹直接部署到 GitHub Pages、Vercel、Netlify 或 Cloudflare 等云平台。

有关配置自动化 GitHub Actions 或导入云平台控制台的详细说明，请参阅 [CI/CD 部署指南](./ci-cd)。

## SPA 路由注意事项

`docmd` 实现了微型 SPA 路由器，可平滑处理内部导航。与基于 React 的 SPA 不同，`docmd` 中的每个页面都作为独立的 `index.html` 文件生成在文件系统上，因此：

- **无需重写规则**：大多数平台上无需为服务器配置 `index.html` 重写规则。
- **深层链接**：直接访问 `/guide/setup` 等 URL 开箱即用，因为服务器能找到 `/guide/setup/index.html`。

## 生产部署检查清单

1.  **站点 URL**：确保在 `docmd.config.js` 中设置了 `url` 属性。这对生成正确的规范标签、站点地图和社交预览图至关重要。
2.  **重定向**：如果从其他工具迁移，使用 `redirects` 配置维护 SEO 排名。
3.  **统计分析**：启用 `analytics` 插件追踪用户行为和搜索查询。
4.  **AI 接入**：启用 `llms` 插件生成 `llms.txt`，让 AI Agent 更高效地摄取你的文档内容。

::: callout tip "自定义 404 页面"
`docmd` 会在输出目录中自动生成 `404.html`。大多数托管服务（GitHub Pages、Netlify、Vercel）会在用户访问到缺失路由时自动使用该文件。
:::