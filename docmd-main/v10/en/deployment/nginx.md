---
title: "NGINX Deployment"
description: "Deploy compiled docmd static documentation to NGINX web servers."
---

NGINX provides high-performance static file delivery for docmd compilations.

## Manifest Generation

Generate a pre-configured `nginx.conf` matching your project settings:

```bash
npx @docmd/core deploy --nginx
```

The generated configuration includes:

* **`server_name`**: Extracted from the `url` property in `docmd.config.json` (defaults to `localhost`).
* **SPA Fallback**: Includes `try_files $uri $uri/ /index.html;` conditionally when `layout.spa: true`.
* **Security & Compression**: Configures GZIP compression and security headers (`X-Content-Type-Options`, `X-Frame-Options`).

## Configuration Structure

```nginx "nginx.conf"
server {
    listen 80;
    server_name docs.example.com;
    root /usr/share/nginx/html;
    index index.html;

    # Security Headers
    server_tokens off;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;

    # GZIP Compression
    gzip on;
    gzip_vary on;
    gzip_min_length 256;
    gzip_types text/plain text/css application/json application/javascript
               text/xml application/xml application/xml+rss text/javascript
               image/svg+xml;

    # SPA Routing Fallback (conditional on layout.spa)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Custom 404 Handler
    error_page 404 /404.html;

    # Static Asset Caching (6 months, immutable)
    location ~* \.(?:ico|css|js|gif|jpe?g|png|webp|avif|woff2?|eot|ttf|otf|svg)$ {
        expires 6M;
        access_log off;
        add_header Cache-Control "public, immutable";
    }
}
```

## Deployment Steps

1. Compile the site: `npx @docmd/core build`
2. Transfer compiled assets (`site/`) to your server web root (e.g. `/var/www/html/` or `/usr/share/nginx/html/`).
3. Copy `nginx.conf` into `/etc/nginx/conf.d/default.conf`.
4. Reload NGINX: `sudo systemctl reload nginx`

::: callout tip "Re-generation" icon:refresh-cw
When updating `url` or `layout.spa` in `docmd.config.json`, re-run `npx @docmd/core deploy --nginx --force` to sync configuration changes.
:::