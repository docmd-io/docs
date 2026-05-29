---
title: "NGINX"
description: "使用生产级 NGINX 配置部署 docmd。"
---

NGINX 是最可靠的 Web 服务器之一。由于 docmd 输出完全是静态的，NGINX 可以以接近零延迟的速度提供服务。

## 生成 nginx.conf

```bash
npx @docmd/core deploy --nginx
```

这会生成针对你项目定制的 `nginx.conf`：

- **`server_name`** 设置为从 `url` 配置中提取的主机名。如果未设置，则回退到 `localhost`。
- **SPA 回退**（`try_files ... /index.html`）仅在配置中 `layout.spa` 为 `true` 时包含。
- **安全头**、GZIP 压缩和不可变资产缓存默认包含。

### 生成内容

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

## 部署步骤

1. 构建站点：`npx @docmd/core build`
2. 将输出目录的内容上传到服务器的 Web 根目录（如 `/usr/share/nginx/html/`）。
3. 将生成的 `nginx.conf` 放入服务器配置中（如 `/etc/nginx/conf.d/default.conf`）。
4. 重启 NGINX：`sudo systemctl restart nginx`

### 重新生成

修改了站点 URL 或关闭了 SPA 模式？重新运行 `npx @docmd/core deploy --nginx` - 配置文件会根据当前 `docmd.config.json` 重新生成。