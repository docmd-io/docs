---
title: "NGINX"
description: "Deploy docmd with a production-ready NGINX configuration."
---

NGINX is one of the most reliable web servers available. Because `docmd` output is entirely static, NGINX can serve it with near-zero latency.

## Generate nginx.conf

```bash
docmd deploy --nginx
```

This generates an `nginx.conf` personalised to your project:

- **`server_name`** is set to the hostname extracted from your `url` config (falls back to `localhost` if not set)
- **SPA fallback** (`try_files ... /index.html`) is only included when `layout.spa` is `true` in your config
- **Security headers**, GZIP compression, and immutable asset caching are included by default

### What Gets Generated

```nginx
server {
    listen 80;
    server_name docs.example.com;
    root /usr/share/nginx/html;
    index index.html;

    # Security
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

    # SPA Routing Fallback (only when layout.spa is true)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Custom 404
    error_page 404 /404.html;

    # Cache Static Assets (6 months, immutable)
    location ~* \.(?:ico|css|js|gif|jpe?g|png|webp|avif|woff2?|eot|ttf|otf|svg)$ {
        expires 6M;
        access_log off;
        add_header Cache-Control "public, immutable";
    }
}
```

## Deployment Steps

1. Build your site: `docmd build`
2. Upload the contents of your output directory to your server's web root (e.g., `/var/www/html/` or `/usr/share/nginx/html/`).
3. Place the generated `nginx.conf` into your server's configuration (e.g., `/etc/nginx/conf.d/default.conf`).
4. Restart NGINX: `sudo systemctl restart nginx`

### Re-Generating

Changed your site URL or switched off SPA mode? Just run `docmd deploy --nginx` again — the config file is regenerated to match your current `docmd.config.js`.