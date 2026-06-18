---
title: "Caddy"
description: "使用生产就绪的 Caddyfile 部署 docmd。"
---

[Caddy](https://caddyserver.com/) 是一个现代 Web 服务器，可自动处理 HTTPS 配置和证书续订。

## 生成 Caddyfile

```bash
npx @docmd/core deploy --caddy
```

这会生成一个针对您的项目个性化的 `Caddyfile`：

- **站点地址** 设置为您 `url` 配置中的主机名。Caddy 会自动为其配置 SSL 证书。如果未配置 URL，则回退到 `:80`。
- **根目录** 使用您配置的 `out` 目录（而不是硬编码）。
- **SPA 回退** 仅在配置中 `layout.spa` 为 `true` 时包含。

### 生成的内容

```caddyfile "Caddyfile"
docs.example.com {
    root * ./site
    file_server

    # SPA Routing Fallback (only when layout.spa is true)
    try_files {path} {path}/ /index.html

    # Security Headers
    header {
        X-Content-Type-Options "nosniff"
        X-Frame-Options "SAMEORIGIN"
        -Server
    }

    # Custom 404
    handle_errors {
        rewrite * /404.html
        file_server
    }

    # Cache Static Assets (6 months)
    @static {
        file
        path *.ico *.css *.js *.gif *.jpg *.jpeg *.png *.webp *.avif *.svg *.woff *.woff2 *.eot *.ttf *.otf
    }
    header @static Cache-Control "public, max-age=15552000, immutable"
}
```

当您使用真实域名作为站点地址（例如 `docs.example.com` 而不是 `:80`）时，Caddy 会通过 Let's Encrypt 自动配置免费的 SSL 证书。无需任何 HTTPS 配置。

## 部署步骤

1. 构建您的站点：`npx @docmd/core build`
2. 将您的输出文件夹和生成的 `Caddyfile` 传输到您的服务器。
3. 在包含 `Caddyfile` 的目录中运行 `caddy start` 或 `caddy run`。

### 重新生成

更改了站点 URL 或输出目录？再次运行 `npx @docmd/core deploy --caddy`。引擎会重新生成 Caddyfile 以匹配您当前的 `docmd.config.json`。
