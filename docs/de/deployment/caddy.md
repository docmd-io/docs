---
title: "Caddy"
description: "docmd mit einem produktionsreifen Caddyfile bereitstellen."
---

[Caddy](https://caddyserver.com/) ist ein moderner Webserver, der HTTPS-Bereitstellung und Zertifikatserneuerungen automatisch verwaltet.

## Caddyfile generieren

```bash
docmd deploy --caddy
```

Dies generiert ein `Caddyfile`, das auf Ihr Projekt zugeschnitten ist:

- **Site-Adresse** wird auf den Hostnamen aus Ihrer `url`-Konfiguration gesetzt — Caddy stellt automatisch ein SSL-Zertifikat bereit. Fallback auf `:80`, wenn keine URL konfiguriert ist.
- **Root-Verzeichnis** nutzt Ihr konfiguriertes `out`-Verzeichnis (nicht hartcodiert)
- **SPA-Fallback** wird nur einbezogen, wenn `layout.spa` in Ihrer Konfiguration `true` ist

Wenn Sie eine echte Domain als Site-Adresse verwenden (z.B. `docs.example.com` anstatt `:80`), stellt Caddy automatisch ein kostenloses SSL-Zertifikat über Let's Encrypt bereit — keinerlei HTTPS-Konfiguration nötig.

## Bereitstellungsschritte

1. Bauen Sie Ihre Website: `docmd build`
2. Übertragen Sie Ihren Ausgabe-Ordner und das generierte `Caddyfile` auf Ihren Server.
3. Führen Sie `caddy start` oder `caddy run` im Verzeichnis mit Ihrem Caddyfile aus.

### Neu generieren

Site-URL oder Ausgabeverzeichnis geändert? Führen Sie `docmd deploy --caddy` erneut aus — das Caddyfile wird neu generiert, um Ihre aktuelle `docmd.config.js` widerzuspiegeln.