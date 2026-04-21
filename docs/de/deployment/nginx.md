---
title: "NGINX"
description: "Bereitstellen von docmd mittels NGINX-Webserver"
---

NGINX ist einer der zuverlässigsten und leistungsstärksten Webserver auf dem Markt. Da `docmd`-Dateien vollständig statisch sind, kann NGINX diese mit nahezu null Latenz ausliefern.

## Automatisierte Bereitstellungskonfiguration

::: callout warning "Versionsvorgabe"
Der Befehl `docmd deploy` wurde mit **v0.7.2** eingeführt. Stellen Sie sicher, dass Sie `@docmd/core` aktualisiert haben, bevor Sie diese Funktion nutzen.
:::

Sie können automatisch eine optimierte `nginx.conf`-Datei für Ihr Projekt über die Core-CLI generieren:

```bash
docmd deploy --nginx
```

Dies erstellt eine Konfigurationsdatei, die perfekt auf die statische Ausgabe von `docmd` abgestimmt ist, einschließlich GZIP-Komprimierung und aggressiver Caching-Richtlinien für statische Assets.

## Die Konfiguration im Detail

Falls Sie die Datei manuell schreiben oder die generierte Datei anpassen möchten, sieht die NGINX-Konfiguration wie folgt aus:

```nginx
server {
    listen 80;
    server_name localhost;
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
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/svg+xml;

    # SPA-Routing-Fallback
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Eigene 404-Seite
    error_page 404 /404.html;

    # Cache-Steuerung für statische Assets
    location ~* \.(?:ico|css|js|gif|jpe?g|png|webp|avif|woff2?|eot|ttf|otf|svg)$ {
        expires 6M;
        access_log off;
        add_header Cache-Control "public, immutable";
    }
}
```

## Schritte zur Bereitstellung
1. Erstellen Sie die Website mittels `docmd build`.
2. Laden Sie den Inhalt Ihres `site/`-Verzeichnisses in das Web-Root Ihres Remote-Servers hoch (z. B. `/var/www/html/`).
3. Fügen Sie die `nginx.conf`-Regeln in den NGINX-Konfigurationsblock Ihres Servers ein.
4. Starten Sie Ihren Server neu: `sudo systemctl restart nginx`.