---
title: "NGINX"
description: "Stellen Sie docmd mit einer produktionsreifen NGINX-Konfiguration bereit."
---

NGINX ist einer der zuverlässigsten verfügbaren Webserver. Da die docmd-Ausgabe vollständig statisch ist, kann NGINX sie mit nahezu null Latenz ausliefern.

## nginx.conf generieren

```bash
npx @docmd/core deploy --nginx
```

Dies generiert eine auf Ihr Projekt zugeschnittene `nginx.conf`:

- **`server_name`** wird auf den aus Ihrer `url`-Konfiguration extrahierten Hostnamen gesetzt. Es fällt auf `localhost` zurück, wenn nicht gesetzt.
- **SPA-Fallback** (`try_files ... /index.html`) ist nur enthalten, wenn `layout.spa` in Ihrer Konfiguration `true` ist.
- **Sicherheits-Header**, GZIP-Komprimierung und unveränderliches Asset-Caching sind standardmäßig enthalten.

### Was wird generiert

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

## Bereitstellungsschritte

1. Bauen Sie Ihre Site: `npx @docmd/core build`
2. Laden Sie den Inhalt Ihres Ausgabeverzeichnisses in das Web-Stammverzeichnis Ihres Servers hoch (z. B. `/var/www/html/` oder `/usr/share/nginx/html/`).
3. Legen Sie die generierte `nginx.conf` in das Konfigurationsverzeichnis Ihres Servers (z. B. `/etc/nginx/conf.d/default.conf`).
4. Starten Sie NGINX neu: `sudo systemctl restart nginx`

### Neu generieren

Site-URL geändert oder SPA-Modus ausgeschaltet? Führen Sie einfach `npx @docmd/core deploy --nginx` erneut aus. Die Konfigurationsdatei wird automatisch regeneriert, um Ihrer aktuellen `docmd.config.json` zu entsprechen.