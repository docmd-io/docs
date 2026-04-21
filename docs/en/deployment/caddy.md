---
title: "Caddy"
description: "Deploy docmd using Caddy web server"
---

[Caddy](https://caddyserver.com/) is an incredibly popular web server because it automatically handles HTTPS provisioning and certificate renewals by default.

## Automated Deployment Configuration

::: callout warning "Version Requirement"
The `docmd deploy` command was introduced in **v0.7.2**. Ensure you have updated `@docmd/core` before using this feature.
:::

You can automatically generate a production-ready `Caddyfile` for your `docmd` project using the core CLI:

```bash
docmd deploy --caddy
```

## The Caddyfile Explained

The generated file explicitly configures file serving, fallback routing, and asset caching, which is crucial for SPA performance.

```caddy
:80 {
    root * ./site
    file_server

    # SPA Routing Fallback
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
*(If you are deploying this to production, you can change `:80` to your actual domain name like `docs.example.com`, and Caddy will automatically fetch an SSL certificate for you!)*

## Deployment Steps
1. Generate the site using `docmd build`.
2. Transfer your `site/` folder and your newly generated `Caddyfile` to your remote server.
3. Run `caddy start` or `caddy run` in the directory containing your Caddyfile.
