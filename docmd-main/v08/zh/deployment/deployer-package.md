---
title: "使用 Deployer 包进行部署"
description: "docmd 的模块化 @docmd/deployer 包如何从项目配置自动生成特定提供商的部署配置。"
---

## 概览

docmd 附带了专用的 `@docmd/deployer` 包。它读取你的 `docmd.config.json` 并自动生成特定提供商的部署文件。每个生成的文件都根据你的确切配置进行个性化 —— 你的输出目录、站点 URL、SPA 路由规则和 Node.js 版本都会被反映出来，无需手动编辑。

## 支持的提供商

| 提供商 | 命令标志 | 生成的文件 |
| :------- | :----------- | :-------------- |
| Docker + Nginx | `--docker` | `Dockerfile`、`.dockerignore` |
| Nginx | `--nginx` | `nginx.conf` |
| Caddy | `--caddy` | `Caddyfile` |
| GitHub Pages | `--github-pages` | `.github/workflows/deploy.yml` |
| Vercel | `--vercel` | `vercel.json` |
| Netlify | `--netlify` | `netlify.toml` |

## 使用方法

从项目根目录（`docmd.config.json` 所在位置）运行：

```bash
# 单个提供商
npx @docmd/core deploy --github-pages

# 一次生成多个提供商
npx @docmd/core deploy --docker --nginx

# 覆盖现有文件
npx @docmd/core deploy --vercel --force
```

## 提供商详情

### GitHub Pages

```bash
npx @docmd/core deploy --github-pages
```

生成包含完整构建和部署流水线的 `.github/workflows/deploy.yml`。该工作流：
- 检出你的仓库
- 安装 Node.js（匹配项目所需版本）
- 运行 `npx @docmd/core build`
- 将输出目录上传到 GitHub Pages

### Vercel

```bash
npx @docmd/core deploy --vercel
```

生成包含 SPA 路由规则（将所有路径重写到 `index.html`）和已配置输出目录的 `vercel.json`。

### Netlify

```bash
npx @docmd/core deploy --netlify
```

生成包含构建命令、发布目录和 SPA 重定向规则的 `netlify.toml`。

### Docker

```bash
npx @docmd/core deploy --docker
```

生成使用多阶段构建的 `Dockerfile`：
1. **构建阶段**：安装你精确固定的 `@docmd/core` 版本并运行构建。
2. **服务阶段**：将输出复制到最小的 `nginx:alpine` 镜像中。

如果项目根目录中已存在 `nginx.conf`，Dockerfile 会自动将其复制到容器中。

```bash
# 同时生成 Docker 和 Nginx 配置
npx @docmd/core deploy --docker --nginx
```

### Nginx

```bash
npx @docmd/core deploy --nginx
```

生成包含 SPA 路由、gzip 压缩和输出目录正确 `root` 路径的 `nginx.conf`。

### Caddy

```bash
npx @docmd/core deploy --caddy
```

生成包含自动 HTTPS、SPA 路由和从输出目录提供文件服务的 `Caddyfile`。

## 重新生成

如果更改了 `out` 目录或 `url` 等配置字段，重新运行命令以重新生成文件。这可使配置保持同步。