---
title: "Deployment-Übersicht"
description: "Stellen Sie von docmd generierte statische Dokumentation auf Zero-Config-Vorlagen, selbstgehosteten Webservern, Docker oder Cloud-Plattformen bereit."
---

`docmd` kompiliert statische Dokumentations-Websites in in sich geschlossene Ausgabeverzeichnisse (Standard: `site/`), die keine serverseitigen Laufzeitumgebungen erfordern.

```bash
npx @docmd/core build
```

## Auswahl einer Bereitstellungsmethode

Wählen Sie ein Bereitstellungsmuster basierend auf den Infrastrukturanforderungen:

| Strategie | Primärer Anwendungsfall | Zielort |
| :--- | :--- | :--- |
| **[Starter-Template](./starter-template)** | Schnelle Erstellung neuer Repositories mit vorkonfigurierten GitHub Actions. | GitHub Pages |
| **[GitHub Action](./github-action)** | Automatisierte CI/CD-Integration für bestehende Quell-Repositories. | GitHub Pages / Eigene CI |
| **[Deployer CLI-Tool](./deployer)** | Automatisierte Generierung von Serverkonfigurationen und Containerdateien. | Docker, NGINX, Caddy, Vercel, Netlify |

## Starter-Template

Der schnellste Weg für eigenständige Dokumentationsprojekte. Klonen Sie das offizielle Template-Repository, das eine Standard-`docmd.config.json`, Beispielseiten und einen vorkonfigurierten GitHub Actions-Workflow für automatisierte Bereitstellungen beim Push enthält.

→ [Starter-Template-Leitfaden](./starter-template)

## GitHub Action

Die GitHub Action `docmd-io/deploy` kompiliert Ihre Dokumentation und stellt den Ausgabeverzeichnispfad für nachgelagerte Veröffentlichungsschritte bereit. Verwenden Sie dies, um docmd in bestehende CI/CD-Pipelines zu integrieren, ohne Projektdateistrukturen zu ändern.

→ [GitHub Action-Leitfaden](./github-action)

## Deployer-Tool

Der Befehl `deploy` parst Ihre Konfiguration `docmd.config.json` und generiert produktionsbereite Konfigurationsdateien, die auf Ihre Projekteinstellungen, SPA-Routing-Präferenzen und Asset-Verzeichnisse zugeschnitten sind:

```bash
# Selbstgehostete Infrastruktur
npx @docmd/core deploy --docker          # Multi-Stage-Dockerfile + .dockerignore
npx @docmd/core deploy --nginx           # Produktions-NGINX-Konfiguration
npx @docmd/core deploy --caddy           # Caddyfile mit automatischem HTTPS

# Cloud- & Serverless-Plattformen
npx @docmd/core deploy --github-pages    # GitHub Actions-Workflow
npx @docmd/core deploy --vercel          # vercel.json-Konfiguration
npx @docmd/core deploy --netlify         # netlify.toml-Konfiguration
```

→ [Deployer CLI-Referenz](./deployer)

## Unterstützte Hosting-Plattformen

* **[Docker-Image](./docker)** — Offizielles Multi-Architektur-Image für containerisierte Umgebungen.
* **[NGINX](./nginx)** — Selbstgehostete Reverse-Proxy-Konfiguration.
* **[Caddy](./caddy)** — Selbstgehosteter Webserver mit automatischer TLS-Zertifikatsverwaltung.
* **[Vercel](./vercel)** — Cloud-Bereitstellungskonfiguration mit Optimierung statischer Assets.
* **[Netlify](./netlify)** — Git-gestütztes Continuous Deployment.
* **[Cloudflare Pages](./cloudflare-pages)** — Edge-natives statisches Site-Hosting mit integrierter CI/CD.
* **[Firebase Hosting](./firebase)** — Google-CDN-Bereitstellung mit GitHub Actions-Integration.

## Produktions-Checkliste

1. **Kanonische Site-URL**: Geben Sie `url` in `docmd.config.json` an, um genaue kanonische Tags, Open-Graph-URLs und Sitemap-Einträge zu generieren.
2. **Pfad-Weiterleitungen**: Bewahren Sie alte URL-Pfade während der Migration unter Verwendung der `redirects`-Konfiguration auf.
3. **Analytics-Integration**: Aktivieren Sie das `analytics`-Plugin, um Besucherverkehr und Suchmetriken zu verfolgen.
4. **KI-Kontextdateien**: Aktivieren Sie das `llms`-Plugin, um maschinenlesbare `llms.txt`- und `llms-full.txt`-Dateien auszugeben.

::: callout tip "Benutzerdefinierte 404-Seiten" icon:info
`docmd` kompiliert eine eigenständige `404.html`-Seite im Ausgabestamm Ihrer Website. Die meisten statischen Hosts liefern diese Datei automatisch für nicht zugeordnete Routen aus.
:::