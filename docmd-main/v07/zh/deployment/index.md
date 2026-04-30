---
title: "部署"
description: "通过一条命令将 docmd 文档部署到 Docker、Nginx、Caddy 或任何云平台。"
---

`docmd` 生成高性能静态网站。运行构建命令生成输出目录：

```bash
docmd build
```

输出是一个独立的 `site/` 文件夹（或你在配置中设定的 `out` 目录），可以托管在任何地方。

## 一键部署

::: callout tip "v0.7.2 新功能"
`docmd deploy` 会读取你的 `docmd.config.js`，生成针对你项目定制的部署文件——不是通用模板。
:::

无需手动编写 Dockerfile 和服务器配置，让 docmd 为你自动生成：

```bash
docmd deploy --docker   # Dockerfile + .dockerignore
docmd deploy --nginx    # 生产级 nginx.conf
docmd deploy --caddy    # 生产级 Caddyfile
```

### 自动定制的内容

deploy 命令会读取你的配置（或零配置默认值）并注入：

| 配置字段 | 用于 |
|:--|:--|
| `title` | 每个生成文件的注释头 |
| `out` | Dockerfile 中的 `COPY` 路径、Nginx/Caddy 的 `root` 指令 |
| `url` | Nginx 的 `server_name`、Caddy 的站点地址 |
| `layout.spa` | 控制是否包含 SPA 路由回退 |
| 配置文件路径 | 非默认配置名时，Dockerfile 构建步骤使用 `--config` |

没有 `docmd.config.js`？没问题——命令会使用与 `docmd dev` 和 `docmd build` 相同的零配置默认值。

### 始终同步

每次运行都会重新生成部署文件以匹配你当前的配置。修改了站点 URL 或输出目录？直接重新运行 deploy 命令即可。

### 支持的目标

*   [`docmd deploy --docker`](./docker) — 优化的多阶段 Dockerfile，具有层缓存和版本锁定。
*   [`docmd deploy --nginx`](./nginx) — 安全加固的 nginx.conf，包含 GZIP 和不可变资产缓存。
*   [`docmd deploy --caddy`](./caddy) — 支持 HTTPS 的 Caddyfile，带自动路由。

点击各目标查看详细的服务专用文档。

*(云部署目标如 `--vercel` 和 `--netlify` 计划在未来版本中推出。)*

## 云托管与 CI/CD

如果你更倾向于托管服务而非自托管，可以将输出文件夹直接部署到 GitHub Pages、Vercel、Netlify 或 Cloudflare Pages。

参见 [CI/CD 部署指南](./ci-cd) 了解自动化工作流。

## SPA 路由

`docmd` 实现了微型 SPA 路由器以实现平滑的内部导航。每个页面都生成为独立的 `index.html` 文件：

- **无需重写规则** — 直接访问 URL 即可，因为 `/guide/setup` 会解析为 `/guide/setup/index.html`。
- **深层链接开箱即用** — 在所有托管平台上均可正常工作。

当配置中 `layout.spa` 设为 `false` 时，deploy 命令会在生成的服务器配置中省略 SPA 回退路由。

## 生产部署检查清单

1.  **站点 URL**：在 `docmd.config.js` 中设置 `url` 属性——这将驱动规范标签、站点地图、社交预览和部署文件生成。
2.  **重定向**：从其他工具迁移？使用 `redirects` 配置保持 SEO 排名。
3.  **统计分析**：启用 `analytics` 插件追踪用户行为和搜索查询。
4.  **AI 上下文**：启用 `llms` 插件生成 `llms.txt`，供 AI Agent 高效摄取文档内容。

::: callout tip "自定义 404 页面"
`docmd` 会在输出目录中自动生成 `404.html`。大多数托管服务会在用户访问缺失路由时自动使用该文件。
:::