---
title: "NGINX"
description: "Stellen Sie docmd mit einer produktionsreifen NGINX-Konfiguration bereit."
---

NGINX ist einer der zuverlässigsten verfügbaren Webserver. Da die Ausgabe von docmd vollständig statisch ist, kann NGINX sie mit nahezu null Latenz ausliefern.

## nginx.conf erzeugen

```bash
npx @docmd/core deploy --nginx
```

Dies erzeugt eine `nginx.conf`, die auf Ihr Projekt zugeschnitten ist:

- **`server_name`** wird auf den Hostnamen gesetzt, der aus Ihrer `url`-Konfiguration extrahiert wurde. Falls nicht gesetzt, wird auf `localhost` zurückgefallen.
- **SPA-Fallback** (`try_files ... /index.html`) wird nur eingefügt, wenn `layout.spa` in Ihrer Konfiguration `true` ist.
- **Sicherheits-Header**, GZIP-Komprimierung und unveränderliches Asset-Caching sind standardmäßig enthalten.

### Was erzeugt wird

```nginx "nginx.conf"
server {
    listen 80;
    server_name docs.example.com;
    root /usr/share/nginx/html;
    index index.html;

    # Sicherheit
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

    # SPA-Routing-Fallback (nur wenn layout.spa true ist)
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Eigene 404-Seite
    error_page 404 /404.html;

    # Statische Assets cachen (6 Monate, immutable)
    location ~* \.(?:ico|css|js|gif|jpe?g|png|webp|avif|woff2?|eot|ttf|otf|svg)$ {
        expires 6M;
        access_log off;
        add_header Cache-Control "public, immutable";
    }
}
```

## Bereitstellungsschritte

1. Bauen Sie Ihre Site: `npx @docmd/core build`
2. Laden Sie den Inhalt Ihres Ausgabeverzeichnisses in das Web-Root Ihres Servers hoch (z. B. `/var/www/html/` oder `/usr/share/nginx/html/`).
3. Legen Sie die erzeugte `nginx.conf` in die Konfiguration Ihres Servers (z. B. `/etc/nginx/conf.d/default.conf`).
4. Starten Sie NGINX neu: `sudo systemctl restart nginx`

### Neu erzeugen

Haben Sie Ihre Site-URL geändert oder den SPA-Modus deaktiviert? Führen Sie einfach erneut `npx @docmd/core deploy --nginx` aus. Die Konfigurationsdatei wird automatisch passend zu Ihrer aktuellen `docmd.config.json` neu erzeugt.
