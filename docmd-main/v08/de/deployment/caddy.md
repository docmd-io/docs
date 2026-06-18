---
title: "Caddy"
description: "Stellen Sie docmd mit einer produktionsreifen Caddyfile bereit."
---

[Caddy](https://caddyserver.com/) ist ein moderner Webserver, der die HTTPS-Bereitstellung und Zertifikatserneuerung automatisch übernimmt.

## Eine Caddyfile erzeugen

```bash
npx @docmd/core deploy --caddy
```

Dies erzeugt eine `Caddyfile`, die auf Ihr Projekt zugeschnitten ist:

- **Site-Adresse** wird auf den Hostnamen aus Ihrer `url`-Konfiguration gesetzt. Caddy stellt dafür automatisch ein SSL-Zertifikat bereit. Falls keine URL konfiguriert ist, wird auf `:80` zurückgefallen.
- **Wurzelverzeichnis** verwendet Ihr konfiguriertes `out`-Verzeichnis (nicht fest codiert).
- **SPA-Fallback** wird nur eingefügt, wenn `layout.spa` in Ihrer Konfiguration `true` ist.

### Was erzeugt wird

```caddy "Caddyfile"
docs.example.com {
    root * ./site
    file_server

    # SPA-Routing-Fallback (nur wenn layout.spa true ist)
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

Wenn Sie als Site-Adresse eine echte Domain verwenden (z. B. `docs.example.com` statt `:80`), stellt Caddy über Let's Encrypt automatisch ein kostenloses SSL-Zertifikat bereit. Eine HTTPS-Konfiguration ist nicht erforderlich.

## Bereitstellungsschritte

1. Bauen Sie Ihre Site: `npx @docmd/core build`
2. Übertragen Sie Ihren Ausgabeordner und die erzeugte `Caddyfile` auf Ihren Server.
3. Führen Sie `caddy start` oder `caddy run` in dem Verzeichnis aus, das Ihre Caddyfile enthält.

### Neu erzeugen

Haben Sie Ihre Site-URL oder Ihr Ausgabeverzeichnis geändert? Führen Sie erneut `npx @docmd/core deploy --caddy` aus. Die Engine erzeugt die Caddyfile passend zu Ihrer aktuellen `docmd.config.json` neu.
