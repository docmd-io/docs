---
title: "Caddy"
description: "Bereitstellen von docmd mittels Caddy-Webserver"
---

[Caddy](https://caddyserver.com/) ist ein sehr beliebter Webserver, da er standardmäßig automatisch die HTTPS-Bereitstellung und Zertifikatsverlängerung übernimmt.

## Automatisierte Bereitstellungskonfiguration

::: callout warning "Versionsvorgabe"
Der Befehl `docmd deploy` wurde mit **v0.7.2** eingeführt. Stellen Sie sicher, dass Sie `@docmd/core` aktualisiert haben, bevor Sie diese Funktion nutzen.
:::

Sie können automatisch ein produktionsreifes `Caddyfile` für Ihr `docmd`-Projekt über die Core-CLI generieren:

```bash
docmd deploy --caddy
```

## Das Caddyfile im Detail

Die generierte Datei konfiguriert explizit die Dateiauslieferung, das Fallback-Routing und das Asset-Caching, was für die SPA-Leistung entscheidend ist.

```caddy
:80 {
    root * ./site
    file_server

    # SPA-Routing-Fallback
    try_files {path} {path}/ /index.html
    
    # Sicherheits-Header
    header {
        X-Content-Type-Options "nosniff"
        X-Frame-Options "SAMEORIGIN"
        -Server
    }

    # Eigene 404-Seite
    handle_errors {
        rewrite * /404.html
        file_server
    }

    # Statische Assets cachen (6 Monate)
    @static {
        file
        path *.ico *.css *.js *.gif *.jpg *.jpeg *.png *.webp *.avif *.svg *.woff *.woff2 *.eot *.ttf *.otf
    }
    header @static Cache-Control "public, max-age=15552000, immutable"
}
```
*(Wenn Sie dies in einer Produktionsumgebung bereitstellen, können Sie `:80` durch Ihren tatsächlichen Domainnamen wie `docs.beispiel.de` ersetzen, und Caddy wird automatisch ein SSL-Zertifikat für Sie abrufen!)*

## Schritte zur Bereitstellung
1. Erstellen Sie die Website mittels `docmd build`.
2. Übertragen Sie Ihren `site/`-Ordner und Ihr neu generiertes `Caddyfile` auf Ihren Remote-Server.
3. Führen Sie `caddy start` oder `caddy run` in dem Verzeichnis aus, das Ihr Caddyfile enthält.