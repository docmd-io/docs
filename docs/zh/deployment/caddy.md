---
title: "Caddy"
description: "使用 Caddy Web 服务器部署 docmd"
---

[Caddy](https://caddyserver.com/) 是一款非常流行的 Web 服务器，因为它默认自动处理 HTTPS 证书的签发和续期。

## 自动化部署配置

::: callout warning "版本要求"
`docmd deploy` 命令从 **v0.7.2** 开始引入。请确保在使用此功能前已更新 `@docmd/core`。
:::

使用核心 CLI 可以自动为你的 `docmd` 项目生成生产级 `Caddyfile`：

```bash
docmd deploy --caddy
```

## Caddyfile 详解

生成的文件明确配置了文件服务、回退路由和资源缓存，这对 SPA 性能至关重要。

```caddy
:80 {
    root * ./site
    file_server

    # SPA 路由回退
    try_files {path} {path}/ /index.html
    
    # 安全头 (Security Headers)
    header {
        X-Content-Type-Options "nosniff"
        X-Frame-Options "SAMEORIGIN"
        -Server
    }

    # 自定义 404 页面
    handle_errors {
        rewrite * /404.html
        file_server
    }

    # 静态资源缓存控制 (6 个月)
    @static {
        file
        path *.ico *.css *.js *.gif *.jpg *.jpeg *.png *.webp *.avif *.svg *.woff *.woff2 *.eot *.ttf *.otf
    }
    header @static Cache-Control "public, max-age=15552000, immutable"
}
```
*(如果你要部署到生产环境，可以将 `:80` 改为你的实际域名，如 `docs.example.com`，Caddy 会自动为你获取 SSL 证书！)*

## 部署步骤
1. 使用 `docmd build` 生成站点。
2. 将 `site/` 文件夹和新生成的 `Caddyfile` 传输到远程服务器。
3. 在包含 Caddyfile 的目录中运行 `caddy start` 或 `caddy run`。
