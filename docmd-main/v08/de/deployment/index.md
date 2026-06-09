---
title: "Deployment-Übersicht"
description: "Wählen Sie, wie Sie Ihre docmd-Dokumentationsseite bereitstellen — von Zero-Config-Vorlagen über selbst gehostete Server bis hin zu Cloud-Plattformen."
---

docmd erstellt eine vollständig statische Website. Die Ausgabe ist ein eigenständiger Ordner (Standard: `site/`), der überall gehostet werden kann — keine serverseitige Laufzeitumgebung erforderlich.

```bash
npx @docmd/core build
```

## Deployment-Methode wählen

Es gibt drei Hauptwege, abhängig von Ihrer Situation:

| Methode | Am besten für |
|:--|:--|
| [Starter-Vorlage](./starter-template) | Ein neues Projekt von Grund auf starten |
| [GitHub Action](./github-action) | Automatisches Deployment zu einem bestehenden Repository hinzufügen |
| [Deployer](./deployer) | Server-Konfigurationen generieren (Docker, Nginx, Caddy, Vercel, Netlify) |

## Starter-Vorlage

Der schnellste Einstieg. Klonen Sie das offizielle Vorlagen-Repository — es enthält eine `docmd.config.json`, eine Beispielseite und einen vorkonfigurierten GitHub Actions-Workflow, der bei jedem Push auf GitHub Pages bereitstellt.

→ [Starter-Vorlage](./starter-template)

## GitHub Action

Die `docmd-io/deploy` Action erstellt Ihre Website und gibt den kompilierten Pfad aus, bereit zum Hochladen auf GitHub Pages oder ein anderes Ziel. Verwenden Sie dies, um docmd-Deployment zu einem bestehenden Repository hinzuzufügen, ohne Ihre Projektstruktur zu ändern.

→ [GitHub Action](./github-action)

## Deployer

Der `deploy`-Befehl liest Ihre `docmd.config.json` und generiert providerspezifische Konfigurationsdateien, die auf Ihr Projekt zugeschnitten sind. Keine generischen Vorlagen — jede Datei spiegelt Ihr tatsächliches Ausgabeverzeichnis, Ihre Site-URL und SPA-Einstellungen wider.

```bash
# Selbst gehostet
npx @docmd/core deploy --docker          # Dockerfile + .dockerignore
npx @docmd/core deploy --nginx           # Produktions-nginx.conf
npx @docmd/core deploy --caddy           # Produktions-Caddyfile

# Cloud / CI
npx @docmd/core deploy --github-pages    # GitHub Actions-Workflow
npx @docmd/core deploy --vercel          # vercel.json
npx @docmd/core deploy --netlify         # netlify.toml
```

→ [Deployer-Referenz](./deployer)

## Cloud-Plattformen

Für verwaltetes Hosting ohne eigenen Server:

- [Docker-Image](./docker) — Offizielles Multi-Arch-Image für containerisierte Deployments
- [NGINX](./nginx) — Selbst gehostet mit generierter Konfiguration
- [Caddy](./caddy) — Selbst gehostet mit automatischem HTTPS
- [Vercel](./vercel) — Zero-Config Cloud-Deployment
- [Netlify](./netlify) — Git-verbundenes Continuous Deployment
- [Cloudflare Pages](./cloudflare-pages) — Edge-natives Hosting mit integriertem CI/CD
- [Firebase Hosting](./firebase) — Google CDN mit GitHub Actions-Integration

## Produktions-Checkliste

1. **Site-URL** — Setzen Sie `url` in `docmd.config.json`. Dies steuert kanonische Tags, Sitemaps, Social-Previews und generierte Deployment-Dateien.
2. **Weiterleitungen** — Migration von einem anderen Tool? Verwenden Sie die `redirects`-Konfiguration zur Beibehaltung der SEO-Rankings.
3. **Analytik** — Aktivieren Sie das `analytics`-Plugin zur Verfolgung von Engagement und Suchanfragen.
4. **KI-Kontext** — Aktivieren Sie das `llms`-Plugin zur Generierung von `llms.txt` für die KI-Agent-Aufnahme.

::: callout tip "Benutzerdefinierte 404-Seiten"
docmd generiert eine `404.html` in Ihrem Ausgabeverzeichnis. Die meisten Hosting-Anbieter verwenden diese automatisch für fehlende Routen.
:::