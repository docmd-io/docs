---
title: "NGINX"
description: "Deploy docmd using NGINX web server"
---

NGINX is one of the most reliable and high-performance web servers available. Because `docmd` files are completely static, NGINX can serve them with almost zero latency.

## Automated Deployment Configuration

::: callout warning "Version Requirement"
The `docmd deploy` command was introduced in **v0.7.2**. Ensure you have updated `@docmd/core` before using this feature.
:::

You can automatically generate an optimized `nginx.conf` file for your project using the core CLI:

```bash
docmd deploy --nginx
```

This generates a configuration file perfectly tuned for `docmd`'s static output, including GZIP compression and aggressive caching policies for static assets.

## The Configuration Explained

If you choose to write it manually or modify the generated file, here is what the NGINX configuration looks like:

```nginx
server {
    listen 80;
    server_name localhost;
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
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

    # SPA Routing Fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Custom 404
    error_page 404 /404.html;

    # Cache Control for Static Assets
    location ~* \.(?:ico|css|js|gif|jpe?g|png|webp|avif|woff2?|eot|ttf|otf|svg)$ {
        expires 6M;
        access_log off;
        add_header Cache-Control "public, immutable";
    }
}
```

## Deployment Steps
1. Generate the site using `docmd build`.
2. Upload the contents of your `site/` directory to your remote server's web root (e.g., `/var/www/html/`).
3. Place the `nginx.conf` rules into your server's NGINX configuration block.
4. Restart your server: `sudo systemctl restart nginx`.
