---
title: "Caddy"
description: "使用生产就绪的 Caddyfile 部署 docmd。"
---

[Caddy](https://caddyserver.com/) 是一款现代 Web 服务器，能够自动处理 HTTPS 配置和证书续期。

## 生成 Caddyfile

```bash
npx @docmd/core deploy --caddy
```

这会生成一份针对您的项目个性化定制的 `Caddyfile`：

- **站点地址** 会被设置为您的 `url` 配置中的主机名。Caddy 会自动为其签发 SSL 证书。若未配置 URL，则回退为 `:80`。
- **根目录** 使用您配置的 `out` 目录（非硬编码）。
- **SPA 回退** 仅在您的配置中 `layout.spa` 为 `true` 时才会包含。

### 生成内容示例

```caddy "Caddyfile"
docs.example.com {
    root * ./site
    file_server

    # SPA 路由回退（仅在 layout.spa 为 true 时）
    try_files {path} {path}/ /index.html

    # 安全响应头
    header {
        X-Content-Type-Options "nosniff"
        X-Frame-Options "SAMEORIGIN"
        -Server
    }

    # 自定义 404
    handle_errors {
        rewrite * /404.html
        file_server
    }

    # 缓存静态资源（6 个月）
    @static {
        file
        path *.ico *.css *.js *.gif *.jpg *.jpeg *.png *.webp *.avif *.svg *.woff *.woff2 *.eot *.ttf *.otf
    }
    header @static Cache-Control "public, max-age=15552000, immutable"
}
```

当您使用真实域名作为站点地址（例如使用 `docs.example.com` 而非 `:80`）时，Caddy 会通过 Let's Encrypt 自动签发免费的 SSL 证书。无需任何 HTTPS 配置。

## 部署步骤

1. 构建您的站点：`npx @docmd/core build`
2. 将您的输出文件夹以及生成的 `Caddyfile` 上传到服务器。
3. 在包含 Caddyfile 的目录中运行 `caddy start` 或 `caddy run`。

### 重新生成

修改了站点 URL 或输出目录？重新运行 `npx @docmd/core deploy --caddy`。引擎会根据您当前的 `docmd.config.json` 重新生成 Caddyfile。
