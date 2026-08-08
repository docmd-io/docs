---
title: "Caddy Server-Bereitstellung"
description: "Stellen Sie docmd-Dokumentation mit dem Caddy-Webserver und automatischer TLS-Zertifikatsbereitstellung bereit."
---

[Caddy](https://caddyserver.com/) bietet statisches Dateihosting mit automatisierter HTTPS-Bereitstellung über Let's Encrypt.

## Caddyfile-Generierung

Generieren Sie eine `Caddyfile`, die mit Projektparametern vorkonfiguriert ist:

```bash
npx @docmd/core deploy --caddy
```

Der Deployer konfiguriert:
* **Host-Adresse**: Injiziert den Domain-Hostnamen aus `config.url`.
* **Stammverzeichnis**: Zeigt auf `config.out` (`./site`).
* **SPA-Regeln**: Fügt `try_files`-Direktiven bedingt an, wenn `layout.spa: true` ist.

## Konfigurations-Blaupause

```caddy "Caddyfile"
docs.example.com {
    root * ./site
    file_server

    # SPA-Fallback (bedingt bei layout.spa)
    try_files {path} {path}/ /index.html

    # Sicherheits-Header
    header {
        X-Content-Type-Options "nosniff"
        X-Frame-Options "SAMEORIGIN"
        -Server
    }

    # Eigene 404-Weiterleitung
    handle_errors {
        rewrite * /404.html
        file_server
    }

    # Statische Assets cachen
    @static {
        file
        path *.ico *.css *.js *.gif *.jpg *.jpeg *.png *.webp *.avif *.svg *.woff *.woff2 *.eot *.ttf *.otf
    }
    header @static Cache-Control "public, max-age=15552000, immutable"
}
```

## Bereitstellungsausführung

1. Statische Ausgabe erstellen: `npx @docmd/core build`
2. Kompilierte Assets und `Caddyfile` auf den Ziel-Host übertragen.
3. Caddy starten: `caddy run --config Caddyfile`

::: callout tip "Automatische TLS-Zertifikate" icon:shield-check
Bei Angabe einer öffentlichen Domain in `url` stellt Caddy automatisch TLS-Zertifikate bereit und erneuert diese ohne externe Skripte.
:::