---
title: "Bereitstellungs-Übersicht"
description: "Wählen Sie, wie Sie Ihre docmd-Dokumentations-Site bereitstellen — von Zero-Config-Templates bis hin zu selbst gehosteten Servern und Cloud-Plattformen."
---

docmd baut eine vollständig statische Site. Die Ausgabe ist ein in sich geschlossener Ordner (Standard: `site/`), der überall gehostet werden kann — kein serverseitiges Runtime erforderlich.

```bash
npx @docmd/core build
```

## Auswahl einer Bereitstellungsmethode

Es gibt drei Hauptpfade, abhängig von Ihrer Situation:

| Methode | Am besten für |
|:--|:--|
| [Starter-Template](./starter-template) | Ein neues Projekt von Grund auf starten |
| [GitHub Action](./github-action) | Automatisierte Bereitstellung zu einem bestehenden Repository hinzufügen |
| [Deployer](./deployer) | Generierung von Server-Konfigurationen (Docker, Nginx, Caddy, Vercel, Netlify) |

## Starter-Template

Der schnellste Weg zum Einstieg. Klonen Sie das offizielle Template-Repository — es enthält eine `docmd.config.json`, eine Beispielseite und einen vorkonfigurierten GitHub-Actions-Workflow, der bei jedem Push zu GitHub Pages bereitstellt.

→ [Starter-Template](./starter-template)

## GitHub Action

Die `docmd-io/deploy`-Action baut Ihre Site und gibt den Pfad zu den kompilierten Assets aus, bereit zum Hochladen zu GitHub Pages oder einem anderen Ziel. Verwenden Sie dies, um die docmd-Bereitstellung zu einem bestehenden Repository hinzuzufügen, ohne Ihre Projektstruktur zu ändern.

→ [GitHub Action](./github-action)

## Deployer

Der `deploy`-Befehl liest Ihre `docmd.config.json` und generiert anbieterspezifische Konfigurationsdateien, die auf Ihr genaues Projekt zugeschnitten sind — Ausgabeverzeichnis, Site-URL, SPA-Routing und Node.js-Version werden alle automatisch berücksichtigt. Keine generischen Templates.

```bash
# Selbst gehostet
npx @docmd/core deploy --docker          # Dockerfile + .dockerignore
npx @docmd/core deploy --nginx           # Produktions nginx.conf
npx @docmd/core deploy --caddy           # Produktions Caddyfile

# Cloud / CI
npx @docmd/core deploy --github-pages    # GitHub-Actions-Workflow
npx @docmd/core deploy --vercel          # vercel.json
npx @docmd/core deploy --netlify         # netlify.toml
```

→ [Deployer-Referenz](./deployer)

## Cloud-Plattformen

Für verwaltetes Hosting ohne eigenen Server:

- [Docker-Image](./docker) — Offizielles Multi-Architektur-Image für containerisierte Bereitstellungen
- [NGINX](./nginx) — Selbst gehostet mit generierter Konfiguration
- [Caddy](./caddy) — Selbst gehostet mit automatischem HTTPS
- [Vercel](./vercel) — Zero-Config-Cloud-Bereitstellung
- [Netlify](./netlify) — Git-verbundene kontinuierliche Bereitstellung
- [Cloudflare Pages](./cloudflare-pages) — Edge-natives Hosting mit eingebauter CI/CD
- [Firebase Hosting](./firebase) — Google CDN mit GitHub-Actions-Integration

## Produktions-Checkliste

1. **Site-URL** — Setzen Sie `url` in `docmd.config.json`. Dies steuert kanonische Tags, Sitemaps, Social Previews und generierte Bereitstellungsdateien.
2. **Weiterleitungen** — Migrieren Sie von einem anderen Tool? Verwenden Sie die `redirects`-Konfiguration, um SEO-Rankings zu erhalten.
3. **Analyse** — Aktivieren Sie das `analytics`-Plugin, um Engagement und Suchanfragen zu verfolgen.
4. **KI-Kontext** — Aktivieren Sie das `llms`-Plugin, um `llms.txt` für die Aufnahme durch KI-Agenten zu erzeugen.

::: callout tip "Benutzerdefinierte 404-Seiten"
docmd schreibt eine `404.html` in Ihr Ausgabeverzeichnis. Die meisten Static Hosts liefern sie automatisch für fehlende Routen aus.
:::
