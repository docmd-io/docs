---
title: "Caddy"
description: "使用生产级 Caddyfile 部署 docmd。"
---

[Caddy](https://caddyserver.com/) 是一个现代 Web 服务器，能自动处理 HTTPS 证书配置和续期。

## 生成 Caddyfile

```bash
docmd deploy --caddy
```

这会生成针对你项目定制的 `Caddyfile`：

- **站点地址**设置为从 `url` 配置中提取的主机名——Caddy 会自动为其签发 SSL 证书。如果未配置 URL 则回退到 `:80`。
- **根目录**使用你配置的 `out` 目录（不是硬编码的值）
- **SPA 回退**仅在配置中 `layout.spa` 为 `true` 时包含

使用真实域名作为站点地址时（如 `docs.example.com` 而不是 `:80`），Caddy 会通过 Let's Encrypt 自动签发免费 SSL 证书——无需任何 HTTPS 配置。

## 部署步骤

1. 构建站点：`docmd build`
2. 将输出文件夹和生成的 `Caddyfile` 传输到服务器。
3. 在包含 Caddyfile 的目录中运行 `caddy start` 或 `caddy run`。

### 重新生成

修改了站点 URL 或输出目录？重新运行 `docmd deploy --caddy`——Caddyfile 会根据当前 `docmd.config.js` 重新生成。