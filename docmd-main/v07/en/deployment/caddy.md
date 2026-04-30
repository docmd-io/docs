---
title: "Caddy"
description: "Deploy docmd with a production-ready Caddyfile."
---

[Caddy](https://caddyserver.com/) is a modern web server that handles HTTPS provisioning and certificate renewals automatically.

## Generate a Caddyfile

```bash
docmd deploy --caddy
```

This generates a `Caddyfile` personalised to your project:

- **Site address** is set to the hostname from your `url` config — Caddy will automatically provision an SSL certificate for it. Falls back to `:80` if no URL is configured.
- **Root directory** uses your configured `out` directory (not hardcoded)
- **SPA fallback** is only included when `layout.spa` is `true` in your config

### What Gets Generated

```caddy
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

When you use a real domain as the site address (e.g., `docs.example.com` instead of `:80`), Caddy automatically provisions a free SSL certificate via Let's Encrypt — zero HTTPS configuration needed.

## Deployment Steps

1. Build your site: `docmd build`
2. Transfer your output folder and the generated `Caddyfile` to your server.
3. Run `caddy start` or `caddy run` in the directory containing your Caddyfile.

### Re-Generating

Changed your site URL or output directory? Run `docmd deploy --caddy` again — the Caddyfile is regenerated to match your current `docmd.config.js`.