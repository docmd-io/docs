---
title: "NGINX"
description: "使用 NGINX Web 服务器部署 docmd"
---

NGINX 是最可靠、性能最高的 Web 服务器之一。由于 `docmd` 文件完全是静态的，NGINX 可以几乎零延迟地提供服务。

## 自动化部署配置

::: callout warning "版本要求"
`docmd deploy` 命令从 **v0.7.2** 开始引入。请确保在使用此功能前已更新 `@docmd/core`。
:::

使用核心 CLI 可以自动为你的项目生成优化的 `nginx.conf` 文件：

```bash
docmd deploy --nginx
```

生成的配置文件专为 `docmd` 的静态输出精心调优，包含 GZIP 压缩和静态资源的积极缓存策略。

## 配置详解

如果你选择手动编写或修改生成的文件，NGINX 配置如下：

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    # 安全头 (Security Headers)
    server_tokens off;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;

    # GZIP 压缩
    gzip on;
    gzip_vary on;
    gzip_min_length 256;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

    # SPA 路由回退
    location / {
        try_files $uri $uri/ /index.html;
    }

    # 自定义 404 页面
    error_page 404 /404.html;

    # 静态资源缓存控制
    location ~* \.(?:ico|css|js|gif|jpe?g|png|webp|avif|woff2?|eot|ttf|otf|svg)$ {
        expires 6M;
        access_log off;
        add_header Cache-Control "public, immutable";
    }
}
```

## 部署步骤
1. 使用 `docmd build` 生成站点。
2. 将 `site/` 目录的内容上传到远程服务器的 Web 根目录（例如 `/var/www/html/`）。
3. 将 `nginx.conf` 规则放入服务器的 NGINX 配置块中。
4. 重启服务器：`sudo systemctl restart nginx`。