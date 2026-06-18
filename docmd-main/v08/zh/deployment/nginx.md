---
title: "NGINX"
description: "使用生产就绪的 NGINX 配置部署 docmd。"
---

NGINX 是可用的最可靠的 Web 服务器之一。由于 docmd 输出完全静态，NGINX 可以以接近零延迟地提供它。

## 生成 nginx.conf

```bash
npx @docmd/core deploy --nginx
```

这会生成一个针对您的项目个性化的 `nginx.conf`：

- **`server_name`** 设置为从您的 `url` 配置中提取的主机名。如果未设置，则回退到 `localhost`。
- **SPA 回退**（`try_files ... /index.html`）仅在配置中 `layout.spa` 为 `true` 时包含。
- 默认包含**安全头**、GZIP 压缩和不可变资源缓存。

### 生成的内容

```nginx "nginx.conf"
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

## 部署步骤

1. 构建您的站点：`npx @docmd/core build`
2. 将输出目录的内容上传到服务器 Web 根目录（例如 `/var/www/html/` 或 `/usr/share/nginx/html/`）。
3. 将生成的 `nginx.conf` 放入服务器的配置目录（例如 `/etc/nginx/conf.d/default.conf`）。
4. 重启 NGINX：`sudo systemctl restart nginx`

### 重新生成

更改了站点 URL 或关闭了 SPA 模式？只需再次运行 `npx @docmd/core deploy --nginx`。配置文件会自动重新生成以匹配您当前的 `docmd.config.json`。
