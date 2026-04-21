---
title: "Bereitstellung (Deployment)"
description: "Stellen Sie Ihre docmd-Dokumentation mit einem einzigen Befehl auf Docker, Nginx, Caddy oder einer Cloud-Plattform bereit."
---

`docmd` generiert eine hochperformante statische Website. Führen Sie den Build-Befehl aus, um das Ausgabeverzeichnis zu erstellen:

```bash
docmd build
```

Die Ausgabe ist ein eigenständiger `site/`-Ordner (oder was Sie als `out` in Ihrer Konfiguration festgelegt haben), der überall gehostet werden kann.

## Ein-Befehl-Bereitstellung

::: callout tip "Neu in v0.7.2"
`docmd deploy` liest Ihre `docmd.config.js` und generiert Bereitstellungsdateien, die auf Ihr Projekt zugeschnitten sind — keine generischen Vorlagen.
:::

Anstatt Dockerfiles und Server-Konfigurationen manuell zu schreiben, lassen Sie docmd diese für Sie generieren:

```bash
docmd deploy --docker   # Dockerfile + .dockerignore
docmd deploy --nginx    # Produktions-nginx.conf
docmd deploy --caddy    # Produktions-Caddyfile
```

### Was personalisiert wird

Der Deploy-Befehl liest Ihre Konfiguration (oder Zero-Config-Standardwerte) und injiziert:

| Konfigurationsfeld | Verwendet in |
|:--|:--|
| `title` | Kommentar-Header in jeder generierten Datei |
| `out` | `COPY`-Pfade im Dockerfile, `root`-Direktiven in Nginx/Caddy |
| `url` | `server_name` in Nginx, Site-Adresse in Caddy |
| `layout.spa` | Steuert, ob SPA-Routing-Fallback enthalten ist |
| Konfigurations-Dateipfad | Dockerfile-Build-Schritt verwendet `--config` bei nicht-standardmäßigem Pfad |

Keine `docmd.config.js`? Kein Problem — der Befehl nutzt die gleichen Zero-Config-Standardwerte wie `docmd dev` und `docmd build`.

### Immer synchron

Jede Ausführung generiert Ihre Bereitstellungsdateien neu, um sie mit Ihrer aktuellen Konfiguration abzugleichen. Site-URL oder Ausgabeverzeichnis geändert? Führen Sie den Deploy-Befehl einfach erneut aus.

### Unterstützte Ziele

*   [`docmd deploy --docker`](./docker) — Optimiertes Multi-Stage-Dockerfile mit Layer-Caching und Versionspinning.
*   [`docmd deploy --nginx`](./nginx) — Sicherheitsgehärtete nginx.conf mit GZIP und unveränderlichem Asset-Caching.
*   [`docmd deploy --caddy`](./caddy) — HTTPS-bereites Caddyfile mit automatischem Routing.

Klicken Sie auf jedes Ziel für detaillierte, service-spezifische Dokumentation.

*(Cloud-Bereitstellungsziele wie `--vercel` und `--netlify` sind für ein zukünftiges Release geplant.)*

## Cloud-Hosting & CI/CD

Wenn Sie verwaltetes Hosting gegenüber selbst gehosteten Servern bevorzugen, stellen Sie Ihren Ausgabe-Ordner direkt auf GitHub Pages, Vercel, Netlify oder Cloudflare Pages bereit.

Siehe den [CI/CD-Bereitstellungsleitfaden](./ci-cd) für automatisierte Workflows.

## SPA-Routing

`docmd` implementiert einen Mikro-SPA-Router für reibungslose interne Navigation. Jede Seite wird als eigene `index.html`-Datei generiert:

- **Keine Rewrite-Regeln nötig** — direkter URL-Zugriff funktioniert, weil `/guide/setup` als `/guide/setup/index.html` aufgelöst wird.
- **Deep Linking funktioniert** — sofort einsatzbereit auf jeder Hosting-Plattform.

Wenn `layout.spa` in Ihrer Konfiguration auf `false` gesetzt ist, lässt der Deploy-Befehl das SPA-Fallback-Routing in den generierten Server-Konfigurationen weg.

## Produktions-Checkliste

1.  **Site-URL**: Setzen Sie die `url`-Eigenschaft in `docmd.config.js` — dies steuert kanonische Tags, Sitemaps, Social-Previews und die Generierung von Bereitstellungsdateien.
2.  **Weiterleitungen**: Migration von einem anderen Tool? Verwenden Sie die `redirects`-Konfiguration zur Beibehaltung der SEO-Rankings.
3.  **Analytik**: Aktivieren Sie das `analytics`-Plugin zur Verfolgung von Engagement und Suchanfragen.
4.  **KI-Kontext**: Aktivieren Sie das `llms`-Plugin zur Generierung von `llms.txt` für die KI-Agent-Aufnahme.

::: callout tip "Benutzerdefinierte 404-Seiten"
`docmd` generiert eine `404.html` in Ihrem Ausgabeverzeichnis. Die meisten Hosting-Anbieter verwenden diese Datei automatisch für fehlende Routen.
:::