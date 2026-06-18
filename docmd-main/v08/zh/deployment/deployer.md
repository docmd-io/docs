---
title: "Deployer"
description: "通过一条命令，从您的 docmd 项目配置生成各平台专属的部署配置文件。"
---

`deploy` 命令会读取您的 `docmd.config.json`，并生成与您的项目精确匹配的部署配置文件 — 输出目录、站点 URL、SPA 路由以及 Node.js 版本都会自动反映出来。没有任何通用模板。

## 支持的平台

| 平台 | 标志 (Flag) | 生成的文件 |
| :------- | :--- | :-------------- |
| Docker + Nginx | `--docker` | `Dockerfile`、`.dockerignore` |
| Nginx | `--nginx` | `nginx.conf` |
| Caddy | `--caddy` | `Caddyfile` |
| GitHub Pages | `--github-pages` | `.github/workflows/deploy.yml` |
| Vercel | `--vercel` | `vercel.json` |
| Netlify | `--netlify` | `netlify.toml` |

## 用法

在您的项目根目录（即 `docmd.config.json` 所在位置）运行：

```bash
# 单个平台
npx @docmd/core deploy --github-pages

# 一次生成多个平台的配置
npx @docmd/core deploy --docker --nginx

# 覆盖已有文件
npx @docmd/core deploy --vercel --force
```

## 会进行个性化的地方

deploy 命令会读取您的配置（或零配置默认值），并注入以下内容：

| 配置字段 | 用途 |
|:--|:--|
| `title` | 每个生成文件中的注释头 |
| `out` | Dockerfile 中的 `COPY` 路径、Nginx/Caddy 中的 `root` 指令 |
| `url` | Nginx 中的 `server_name`，Caddy 中的站点地址 |
| `layout.spa` | 决定是否包含 SPA 路由的回退规则 |
| 配置路径 | 当配置路径非默认时，Dockerfile 的 build 步骤会带上 `--config` |

没有 `docmd.config.json`？没问题。该命令使用与 `npx @docmd/core dev` 和 `npx @docmd/core build` 相同的零配置默认值。

## 始终保持同步

每次运行都会根据您当前的配置重新生成部署文件。改了站点 URL 或输出目录？只需重新运行 deploy 命令。使用 `--force` 即可在无提示的情况下覆盖已有文件。

## 各平台详细说明

### GitHub Pages

```bash
npx @docmd/core deploy --github-pages
```

会生成 `.github/workflows/deploy.yml`，其中包含完整的 build-and-deploy 流水线。该工作流会检出您的仓库、安装 Node.js、运行 `npx @docmd/core build`，并将输出上传到 GitHub Pages。

::: callout tip "改用 GitHub Action？"
如果您希望在无需自行生成工作流文件的情况下部署到 GitHub Pages，可以直接使用 [GitHub Action](./github-action) — 它在一个可组合的步骤中完成所有事情。
:::

### Docker

```bash
npx @docmd/core deploy --docker
```

会生成一个采用多阶段构建的 `Dockerfile`：
1. **Build 阶段** — 安装您精确锁定的 `@docmd/core` 版本并执行构建。
2. **Serve 阶段** — 将产物复制到一个精简的 `nginx:alpine` 镜像中。

如果项目根目录中已存在 `nginx.conf`，Dockerfile 会自动将其复制进容器。

```bash
# 同时生成 Docker 与 Nginx 配置
npx @docmd/core deploy --docker --nginx
```

::: callout tip "官方 Docker 镜像"
想在不构建自定义镜像的情况下以容器方式运行 docmd？请参阅 [Docker 镜像 (Docker Image)](./docker) 页面获取官方预构建镜像。
:::

### Nginx

```bash
npx @docmd/core deploy --nginx
```

会生成 `nginx.conf`，包含 SPA 路由、gzip 压缩以及适配您输出目录的正确 `root` 路径。完整生成配置请参阅 [NGINX](./nginx) 页面。

### Caddy

```bash
npx @docmd/core deploy --caddy
```

会生成 `Caddyfile`，包含自动 HTTPS、SPA 路由以及从您输出目录提供文件的能力。完整生成配置请参阅 [Caddy](./caddy) 页面。

### Vercel

```bash
npx @docmd/core deploy --vercel
```

会生成 `vercel.json`，包含 SPA 路由规则以及您配置的输出目录。部署步骤请参阅 [Vercel](./vercel) 页面。

### Netlify

```bash
npx @docmd/core deploy --netlify
```

会生成 `netlify.toml`，包含您的构建命令、发布目录以及 SPA 重定向规则。部署步骤请参阅 [Netlify](./netlify) 页面。

## 取舍

生成的配置是有鲜明主张的起点。它们在大多数 docmd 部署场景下都是正确的，但在自定义域名、CDN 重写或多区域部署等高级场景下可能需要调整。在部署到生产环境之前，请务必审阅生成的文件。