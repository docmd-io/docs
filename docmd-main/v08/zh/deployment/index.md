---
title: "部署"
description: "通过一条命令将 docmd 文档部署到 Docker、Nginx、Caddy 或任何云平台。"
---

docmd 生成高性能静态网站。运行构建命令生成输出目录：

```bash
npx @docmd/core build
```

输出是一个自包含的 `site/` 文件夹（或你在配置中设定的 `out` 目录），可以托管在任何地方。

## 一键部署

::: callout tip "部署生成器" icon:rocket
`deploy` 命令读取你的 `docmd.config.json` 并生成针对你项目定制的部署文件。它消除了通用模板。
:::

无需手动编写 Dockerfile 和服务器配置，让引擎为你生成：

```bash
npx @docmd/core deploy --docker          # Dockerfile + .dockerignore
npx @docmd/core deploy --nginx           # 生产级 nginx.conf
npx @docmd/core deploy --caddy           # 生产级 Caddyfile
npx @docmd/core deploy --github-pages    # GitHub Actions 工作流
npx @docmd/core deploy --vercel          # vercel.json
npx @docmd/core deploy --netlify         # netlify.toml
```

### 自动定制的内容

deploy 命令读取你的配置（或零配置默认值）并注入：

| 配置字段 | 用于 |
|:--|:--|
| `title` | 每个生成文件中的注释头 |
| `out` | Dockerfile 中的 `COPY` 路径、Nginx/Caddy 中的 `root` 指令 |
| `url` | Nginx 中的 `server_name`、Caddy 中的站点地址 |
| `layout.spa` | 控制是否包含 SPA 路由回退 |
| 配置路径 | 非默认时，Dockerfile 构建步骤使用 `--config` |

没有 `docmd.config.json`？没问题。命令使用与 `npx @docmd/core dev` 和 `npx @docmd/core build` 相同的零配置默认值。

### 始终同步

每次运行都会重新生成部署文件以匹配你当前的配置。修改了站点 URL 或输出目录？直接重新运行 deploy 命令即可。你不需要手动跟踪什么改变了。

如果你故意想抑制未来的确认提示，只使用 `--force`。默认情况下，文件会静默重新生成。

### 支持的目标

**自托管**

*   [`npx @docmd/core deploy --docker`](docker.md) - 优化的多阶段 Dockerfile，具有层缓存。
*   [`npx @docmd/core deploy --nginx`](nginx.md) - 安全加固的 nginx.conf，包含 GZIP 和不可变缓存。
*   [`npx @docmd/core deploy --caddy`](caddy.md) - HTTPS 就绪的 Caddyfile，带自动路由。

**云与 CI**

*   [`npx @docmd/core deploy --github-pages`](github-pages.md) - 用于 Pages 部署的 GitHub Actions CI/CD 工作流。
*   [`npx @docmd/core deploy --vercel`](vercel.md) - 带有构建命令、输出目录和缓存头的 vercel.json。
*   [`npx @docmd/core deploy --netlify`](netlify.md) - 带有构建设置、Node 版本和 SPA 重定向的 netlify.toml。

**更多平台**

*   [Cloudflare Pages](cloudflare-pages.md) - 具有内置 CI/CD 的边缘原生托管。
*   [Firebase Hosting](firebase.md) - 带有 GitHub Actions CI/CD 集成的 Google 全球 CDN。

点击上方每个目标获取详细的、特定服务的文档。