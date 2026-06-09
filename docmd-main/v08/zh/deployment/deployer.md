---
title: "Deployer"
description: "从您的 docmd 项目配置生成特定提供商的部署配置文件，只需一条命令。"
---

`deploy` 命令读取您的 `docmd.config.json` 并生成针对您项目定制的部署配置文件——输出目录、站点 URL、SPA 路由和 Node.js 版本都会自动反映。无通用模板。

## 支持的提供商

| 提供商 | 标志 | 生成的文件 |
| :------- | :--- | :-------------- |
| Docker + Nginx | `--docker` | `Dockerfile`, `.dockerignore` |
| Nginx | `--nginx` | `nginx.conf` |
| Caddy | `--caddy` | `Caddyfile` |
| GitHub Pages | `--github-pages` | `.github/workflows/deploy.yml` |
| Vercel | `--vercel` | `vercel.json` |
| Netlify | `--netlify` | `netlify.toml` |

## 使用方法

从项目根目录运行（`docmd.config.json` 所在位置）：

```bash
# 单个提供商
npx @docmd/core deploy --github-pages

# 同时使用多个提供商
npx @docmd/core deploy --docker --nginx

# 覆盖现有文件
npx @docmd/core deploy --vercel --force
```

## 自动定制的内容

deploy 命令读取您的配置（或零配置默认值）并注入：

| 配置字段 | 用于 |
|:--|:--|
| `title` | 每个生成文件中的注释头 |
| `out` | Dockerfile 中的 `COPY` 路径、Nginx/Caddy 中的 `root` 指令 |
| `url` | Nginx 中的 `server_name`、Caddy 中的站点地址 |
| `layout.spa` | 控制是否包含 SPA 路由回退 |
| 配置路径 | 非默认时，Dockerfile 构建步骤使用 `--config` |

没有 `docmd.config.json`？没问题。命令使用与 `npx @docmd/core dev` 和 `npx @docmd/core build` 相同的零配置默认值。

## 始终同步

每次运行都会重新生成部署文件以匹配您当前的配置。修改了站点 URL 或输出目录？直接重新运行 deploy 命令即可。使用 `--force` 无提示覆盖现有文件。

## 提供商详情

### GitHub Pages

```bash
npx @docmd/core deploy --github-pages
```

生成带有完整构建和部署管道的 `.github/workflows/deploy.yml`。工作流检出您的仓库，安装 Node.js，运行 `npx @docmd/core build`，并将输出上传到 GitHub Pages。

::: callout tip "更喜欢直接使用 GitHub Action？"
如果您想部署到 GitHub Pages 而不自己生成工作流文件，直接使用 [GitHub Action](./github-action)——它在一个可组合步骤中处理所有事情。
:::

### Docker

```bash
npx @docmd/core deploy --docker
```

生成使用多阶段构建的 `Dockerfile`：
1. **构建阶段** — 安装您精确固定的 `@docmd/core` 版本并运行构建。
2. **服务阶段** — 将输出复制到最小的 `nginx:alpine` 镜像中。

如果项目根目录中已存在 `nginx.conf`，Dockerfile 会自动将其复制到容器中。

```bash
# 一起生成 Docker 和 Nginx 配置
npx @docmd/core deploy --docker --nginx
```

::: callout tip "官方 Docker 镜像"
想在容器中运行 docmd 而不构建自定义镜像？请参阅 [Docker 镜像](./docker) 页面了解官方预构建镜像。
:::

### Nginx

```bash
npx @docmd/core deploy --nginx
```

生成带有 SPA 路由、gzip 压缩和输出目录正确 `root` 路径的 `nginx.conf`。完整生成的配置请参阅 [NGINX](./nginx) 页面。

### Caddy

```bash
npx @docmd/core deploy --caddy
```

生成带有自动 HTTPS、SPA 路由和从输出目录提供文件服务的 `Caddyfile`。完整生成的配置请参阅 [Caddy](./caddy) 页面。

### Vercel

```bash
npx @docmd/core deploy --vercel
```

生成带有 SPA 路由规则和配置的输出目录的 `vercel.json`。部署步骤请参阅 [Vercel](./vercel) 页面。

### Netlify

```bash
npx @docmd/core deploy --netlify
```

生成带有构建命令、发布目录和 SPA 重定向规则的 `netlify.toml`。部署步骤请参阅 [Netlify](./netlify) 页面。

## 权衡

生成的配置是有主见的起点。它们对大多数 docmd 部署都是正确的，但对于自定义域、CDN 重写或多区域部署等高级场景可能需要调整。在部署到生产环境之前，请始终查看生成的文件。
