---
title: "Caddy"
description: "Stellen Sie docmd mit einer produktionsreifen Caddyfile bereit."
---

[Caddy](https://caddyserver.com/) ist ein moderner Webserver, der die HTTPS-Bereitstellung und Zertifikatserneuerung automatisch handhabt.

## Eine Caddyfile generieren

```bash
npx @docmd/core deploy --caddy
```

Dies generiert eine auf Ihr Projekt zugeschnittene `Caddyfile`:

- **Site-Adresse** wird auf den Hostnamen aus Ihrer `url`-Konfiguration gesetzt. Caddy stellt automatisch ein SSL-Zertifikat dafür bereit. Es fällt auf `:80` zurück, wenn keine URL konfiguriert ist.
- **Stammverzeichnis** verwendet Ihr konfiguriertes `out`-Verzeichnis (nicht fest codiert).
- **SPA-Fallback** ist nur enthalten, wenn `layout.spa` in Ihrer Konfiguration `true` ist.

### Was wird generiert

```caddyfile "Caddyfile"
docs.example.com {
    root * ./site
    file_server

    # SPA Routing Fallback (only when layout.spa is true)
    try_files {path} {path}/ /index.html

    # Security Headers
    header {
        X-Content-Type-Options "nosniff"
        X-Frame-Options "SAMEORIGIN"
        -Server
    }

    # Custom 404
    handle_errors {
        rewrite * /404.html
        file_server
    }

    # Cache Static Assets (6 months)
    @static {
        file
        path *.ico *.css *.js *.gif *.jpg *.jpeg *.png *.webp *.avif *.svg *.woff *.woff2 *.eot *.ttf *.otf
    }
    header @static Cache-Control "public, max-age=15552000, immutable"
}
```

Wenn Sie eine echte Domain als Site-Adresse verwenden (z. B. `docs.example.com` statt `:80`), stellt Caddy automatisch über Let's Encrypt ein kostenloses SSL-Zertifikat bereit. Es ist keine HTTPS-Konfiguration erforderlich.

## Bereitstellungsschritte

1. Bauen Sie Ihre Site: `npx @docmd/core build`
2. Übertragen Sie Ihren Ausgabeordner und die generierte `Caddyfile` auf Ihren Server.
3. Führen Sie `caddy start` oder `caddy run` in dem Verzeichnis aus, das Ihre `Caddyfile` enthält.

### Neu generieren

Site-URL oder Ausgabeverzeichnis geändert? Führen Sie `npx @docmd/core deploy --caddy` erneut aus. Die Engine regeneriert die Caddyfile, um Ihrer aktuellen `docmd.config.json` zu entsprechen.