---
title: "NGINX"
description: "docmd mit einer produktionsreifen NGINX-Konfiguration bereitstellen."
---

NGINX ist einer der zuverlässigsten Webserver. Da `docmd`-Ausgabe vollständig statisch ist, kann NGINX sie mit nahezu null Latenz bereitstellen.

## nginx.conf generieren

```bash
docmd deploy --nginx
```

Dies generiert eine `nginx.conf`, die auf Ihr Projekt zugeschnitten ist:

- **`server_name`** wird auf den Hostnamen aus Ihrer `url`-Konfiguration gesetzt (Fallback auf `localhost`)
- **SPA-Fallback** (`try_files ... /index.html`) wird nur einbezogen, wenn `layout.spa` in Ihrer Konfiguration `true` ist
- **Sicherheitsheader**, GZIP-Kompression und unveränderliches Asset-Caching sind standardmäßig enthalten

## Bereitstellungsschritte

1. Bauen Sie Ihre Website: `docmd build`
2. Laden Sie den Inhalt Ihres Ausgabeverzeichnisses auf den Web-Root Ihres Servers hoch (z.B. `/usr/share/nginx/html/`).
3. Platzieren Sie die generierte `nginx.conf` in die Konfiguration Ihres Servers (z.B. `/etc/nginx/conf.d/default.conf`).
4. Starten Sie NGINX neu: `sudo systemctl restart nginx`

### Neu generieren

Site-URL geändert oder SPA-Modus umgeschaltet? Führen Sie `docmd deploy --nginx` erneut aus — die Konfiguration wird neu generiert, um Ihre aktuelle `docmd.config.js` widerzuspiegeln.