---
title: "Caddy Server Deployment"
description: "Deploy docmd documentation using Caddy web server with automatic TLS certificate provisioning."
---

[Caddy](https://caddyserver.com/) provides static file hosting with automated HTTPS provisioning via Let's Encrypt.

## Caddyfile Generation

Generate a `Caddyfile` pre-configured with project parameters:

```bash
npx @docmd/core deploy --caddy
```

The deployer configures:
* **Host Address**: Injects the domain hostname from `config.url`.
* **Root Directory**: Points to `config.out` (`./site`).
* **SPA Rules**: Appends `try_files` directives conditionally when `layout.spa: true`.

## Configuration Blueprint

```caddy "Caddyfile"
docs.example.com {
    root * ./site
    file_server

    # SPA Fallback (conditional on layout.spa)
    try_files {path} {path}/ /index.html

    # Security Headers
    header {
        X-Content-Type-Options "nosniff"
        X-Frame-Options "SAMEORIGIN"
        -Server
    }

    # Custom 404 Routing
    handle_errors {
        rewrite * /404.html
        file_server
    }

    # Cache Static Assets
    @static {
        file
        path *.ico *.css *.js *.gif *.jpg *.jpeg *.png *.webp *.avif *.svg *.woff *.woff2 *.eot *.ttf *.otf
    }
    header @static Cache-Control "public, max-age=15552000, immutable"
}
```

## Deployment Execution

1. Build static output: `npx @docmd/core build`
2. Transfer compiled assets and `Caddyfile` to the target host.
3. Start Caddy: `caddy run --config Caddyfile`

::: callout tip "Automatic TLS Certificates" icon:shield-check
When specifying a public domain in `url`, Caddy provisions and renews TLS certificates automatically without external scripts.
:::