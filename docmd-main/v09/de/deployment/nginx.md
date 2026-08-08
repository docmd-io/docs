---
title: "NGINX-Bereitstellung"
description: "Stellen Sie kompilierte statische docmd-Dokumentation auf NGINX-Webservern bereit."
---

NGINX bietet eine hochperformante Auslieferung statischer Dateien für docmd-Kompilierungen.

## Manifest-Generierung

Generieren Sie eine vorkonfigurierte `nginx.conf`, die Ihren Projekteinstellungen entspricht:

```bash
npx @docmd/core deploy --nginx
```

Die generierte Konfiguration umfasst:

* **`server_name`**: Aus der Eigenschaft `url` in `docmd.config.json` extrahiert (Standard ist `localhost`).
* **SPA-Fallback**: Enthält bedingt `try_files $uri $uri/ /index.html;`, wenn `layout.spa: true` ist.
* **Sicherheit & Komprimierung**: Konfiguriert GZIP-Komprimierung und Sicherheits-Header (`X-Content-Type-Options`, `X-Frame-Options`).

## Konfigurationsstruktur

```nginx "nginx.conf"
server {
    listen 80;
    server_name docs.example.com;
    root /usr/share/nginx/html;
    index index.html;

    # Sicherheits-Header
    server_tokens off;
    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;

    # GZIP-Komprimierung
    gzip on;
    gzip_vary on;
    gzip_min_length 256;
    gzip_types text/plain text/css application/json application/javascript
               text/xml application/xml application/xml+rss text/javascript
               image/svg+xml;

    # SPA-Routing-Fallback (bedingt bei layout.spa)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Eigene 404-Weiterleitung
    error_page 404 /404.html;

    # Statisches Asset-Caching (6 Monate, unveränderlich)
    location ~* \.(?:ico|css|js|gif|jpe?g|png|webp|avif|woff2?|eot|ttf|otf|svg)$ {
        expires 6M;
        access_log off;
        add_header Cache-Control "public, immutable";
    }
}
```

## Bereitstellungsschritte

1. Website kompilieren: `npx @docmd/core build`
2. Kompilierte Assets (`site/`) in den Web-Stamm Ihres Servers übertragen (z. B. `/var/www/html/` oder `/usr/share/nginx/html/`).
3. `nginx.conf` in `/etc/nginx/conf.d/default.conf` kopieren.
4. NGINX neu laden: `sudo systemctl reload nginx`

::: callout tip "Neu-Generierung" icon:refresh-cw
Führen Sie beim Aktualisieren von `url` oder `layout.spa` in `docmd.config.json` erneut `npx @docmd/core deploy --nginx --force` aus, um Konfigurationsänderungen zu synchronisieren.
:::