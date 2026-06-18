---
title: "Deployment-Übersicht"
description: "Wählen Sie, wie Sie Ihre docmd-Dokumentation bereitstellen möchten — von Zero-Config-Vorlagen bis hin zu selbstgehosteten Servern und Cloud-Plattformen."
---

docmd erzeugt eine vollständig statische Website. Die Ausgabe ist ein in sich geschlossener Ordner (Standard: `site/`), der überall gehostet werden kann — ohne serverseitige Laufzeitumgebung.

```bash
npx @docmd/core build
```

## Eine Bereitstellungsmethode wählen

Es gibt drei Hauptwege, je nach Ausgangslage:

| Methode | Am besten geeignet für |
|:--|:--|
| [Starter-Template](./starter-template) | Ein neues Projekt von Grund auf starten |
| [GitHub Action](./github-action) | Automatisierte Bereitstellung zu einem bestehenden Repository hinzufügen |
| [Deployer](./deployer) | Server-Konfigurationen erzeugen (Docker, Nginx, Caddy, Vercel, Netlify) |

## Starter-Template

Der schnellste Weg zum Einstieg. Klonen Sie das offizielle Template-Repository — es enthält eine `docmd.config.json`, eine Beispielseite und einen vorkonfigurierten GitHub-Actions-Workflow, der bei jedem Push zu GitHub Pages bereitstellt.

→ [Starter-Template](./starter-template)

## GitHub Action

Die Action `docmd-io/deploy` baut Ihre Website und gibt den kompilierten Pfad aus, bereit zum Hochladen auf GitHub Pages oder ein beliebiges anderes Ziel. Verwenden Sie dies, um die docmd-Bereitstellung zu einem bestehenden Repository hinzuzufügen, ohne Ihre Projektstruktur zu ändern.

→ [GitHub Action](./github-action)

## Deployer

Der Befehl `deploy` liest Ihre `docmd.config.json` und erzeugt anbieterspezifische Konfigurationsdateien, die auf Ihr Projekt zugeschnitten sind. Keine generischen Vorlagen — jede Datei spiegelt Ihr tatsächliches Ausgabeverzeichnis, Ihre Site-URL und Ihre SPA-Einstellungen wider.

```bash
# Selbstgehostet
npx @docmd/core deploy --docker          # Dockerfile + .dockerignore
npx @docmd/core deploy --nginx           # Produktionsfähige nginx.conf
npx @docmd/core deploy --caddy           # Produktionsfähige Caddyfile

# Cloud / CI
npx @docmd/core deploy --github-pages    # GitHub-Actions-Workflow
npx @docmd/core deploy --vercel          # vercel.json
npx @docmd/core deploy --netlify         # netlify.toml
```

→ [Deployer-Referenz](./deployer)

## Cloud-Plattformen

Für verwaltetes Hosting ohne eigenen Server:

- [Docker-Image](./docker) — Offizielles Multi-Arch-Image für containerisierte Bereitstellungen
- [NGINX](./nginx) — Selbstgehostet mit generierter Konfiguration
- [Caddy](./caddy) — Selbstgehostet mit automatisch aktiviertem HTTPS
- [Vercel](./vercel) — Zero-Config-Bereitstellung in der Cloud
- [Netlify](./netlify) — Git-verbundene Continuous Deployment
- [Cloudflare Pages](./cloudflare-pages) — Edge-natives Hosting mit eingebauter CI/CD
- [Firebase Hosting](./firebase) — Google-CDN mit GitHub-Actions-Integration

## Checkliste für die Produktion

1. **Site-URL** — Setzen Sie `url` in der `docmd.config.json`. Diese steuert kanonische Tags, Sitemaps, Social-Previews und generierte Bereitstellungsdateien.
2. **Weiterleitungen** — Migrieren Sie von einem anderen Tool? Verwenden Sie die `redirects`-Konfiguration, um SEO-Rankings zu erhalten.
3. **Analyse** — Aktivieren Sie das `analytics`-Plugin, um Engagement und Suchanfragen zu verfolgen.
4. **KI-Kontext** — Aktivieren Sie das `llms`-Plugin, um eine `llms.txt` für die Aufnahme durch KI-Agenten zu erzeugen.

::: callout tip "Eigene 404-Seiten"
docmd schreibt eine `404.html` in Ihr Ausgabeverzeichnis. Die meisten statischen Hosts liefern diese automatisch für fehlende Routen aus.
:::