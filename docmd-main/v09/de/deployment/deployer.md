---
title: "Deployer"
description: "Erzeugen Sie mit einem einzigen Befehl anbieterspezifische Deployment-Konfigurationsdateien aus Ihrer docmd-Projektkonfiguration."
---

Der Befehl `deploy` liest Ihre `docmd.config.json` und erzeugt Deployment-Konfigurationsdateien, die exakt auf Ihr Projekt zugeschnitten sind — Ausgabeverzeichnis, Site-URL, SPA-Routing und Node.js-Version werden automatisch berücksichtigt. Keine generischen Vorlagen.

## Unterstützte Anbieter

| Anbieter | Flag | Erzeugte Dateien |
| :------- | :--- | :-------------- |
| Docker + Nginx | `--docker` | `Dockerfile`, `.dockerignore` |
| Nginx | `--nginx` | `nginx.conf` |
| Caddy | `--caddy` | `Caddyfile` |
| GitHub Pages | `--github-pages` | `.github/workflows/deploy.yml` |
| Vercel | `--vercel` | `vercel.json` |
| Netlify | `--netlify` | `netlify.toml` |

## Verwendung

Führen Sie den Befehl aus Ihrem Projektstamm aus (dort, wo `docmd.config.json` liegt):

```bash
# Einzelner Anbieter
npx @docmd/core deploy --github-pages

# Mehrere Anbieter gleichzeitig
npx @docmd/core deploy --docker --nginx

# Vorhandene Dateien überschreiben
npx @docmd/core deploy --vercel --force
```

## Was personalisiert wird

Der Deploy-Befehl liest Ihre Konfiguration (oder die Zero-Config-Standards) und fügt Folgendes ein:

| Konfigurationsfeld | Verwendung |
|:--|:--|
| `title` | Kommentar-Header in jeder erzeugten Datei |
| `out` | `COPY`-Pfade im Dockerfile, `root`-Direktiven in Nginx/Caddy |
| `url` | `server_name` in Nginx, Site-Adresse in Caddy |
| `layout.spa` | Steuert, ob die SPA-Routing-Fallback-Regel eingefügt wird |
| Konfigurationspfad | Der Build-Schritt im Dockerfile verwendet `--config`, wenn vom Standard abgewichen wird |

Keine `docmd.config.json`? Kein Problem. Der Befehl verwendet dieselben Zero-Config-Standards wie `npx @docmd/core dev` und `npx @docmd/core build`.

## Immer synchron

Jeder Lauf erzeugt Ihre Deployment-Dateien neu, damit sie zu Ihrer aktuellen Konfiguration passen. Haben Sie Ihre Site-URL oder Ihr Ausgabeverzeichnis geändert? Führen Sie einfach den Deploy-Befehl erneut aus. Verwenden Sie `--force`, um vorhandene Dateien ohne Rückfrage zu überschreiben.

## Anbieterdetails

### GitHub Pages

```bash
npx @docmd/core deploy --github-pages
```

Erzeugt `.github/workflows/deploy.yml` mit einer vollständigen Build-and-Deploy-Pipeline. Der Workflow checkt Ihr Repository aus, installiert Node.js, führt `npx @docmd/core build` aus und lädt die Ausgabe in GitHub Pages hoch.

::: callout tip "Lieber die GitHub Action verwenden?"
Wenn Sie ohne eigene Workflow-Datei auf GitHub Pages bereitstellen möchten, nutzen Sie direkt die [GitHub Action](./github-action) — sie übernimmt alles in einem komponierbaren Schritt.
:::

### Docker

```bash
npx @docmd/core deploy --docker
```

Erzeugt ein `Dockerfile` mit Multi-Stage-Build:
1. **Build-Stage** — installiert Ihre exakt festgelegte `@docmd/core`-Version und führt den Build aus.
2. **Serve-Stage** — kopiert die Ausgabe in ein minimales `nginx:alpine`-Image.

Wenn bereits eine `nginx.conf` im Projektstamm existiert, kopiert das Dockerfile sie automatisch in den Container.

```bash
# Docker- und Nginx-Konfigurationen gemeinsam erzeugen
npx @docmd/core deploy --docker --nginx
```

::: callout tip "Offizielles Docker-Image"
Möchten Sie docmd in einem Container ausführen, ohne ein eigenes Image zu bauen? Auf der Seite [Docker-Image](./docker) finden Sie das offizielle, vorgefertigte Image.
:::

### Nginx

```bash
npx @docmd/core deploy --nginx
```

Erzeugt eine `nginx.conf` mit SPA-Routing, Gzip-Komprimierung und dem korrekten `root`-Pfad für Ihr Ausgabeverzeichnis. Die vollständige erzeugte Konfiguration finden Sie auf der Seite [NGINX](./nginx).

### Caddy

```bash
npx @docmd/core deploy --caddy
```

Erzeugt eine `Caddyfile` mit automatisch aktiviertem HTTPS, SPA-Routing und Datei-Auslieferung aus Ihrem Ausgabeverzeichnis. Die vollständige erzeugte Konfiguration finden Sie auf der Seite [Caddy](./caddy).

### Vercel

```bash
npx @docmd/core deploy --vercel
```

Erzeugt `vercel.json` mit SPA-Routing-Regeln und Ihrem konfigurierten Ausgabeverzeichnis. Deployment-Schritte finden Sie auf der Seite [Vercel](./vercel).

### Netlify

```bash
npx @docmd/core deploy --netlify
```

Erzeugt `netlify.toml` mit Ihrem Build-Befehl, dem Veröffentlichungsverzeichnis und den SPA-Redirect-Regeln. Deployment-Schritte finden Sie auf der Seite [Netlify](./netlify).

## Abwägungen

Die erzeugten Konfigurationen sind meinungsstarke Ausgangspunkte. Sie sind für die meisten docmd-Deployments korrekt, können jedoch für fortgeschrittene Szenarien wie eigene Domains, CDN-Rewrites oder Multi-Region-Deployments Anpassungen erfordern. Überprüfen Sie erzeugte Dateien stets, bevor Sie sie in der Produktion einsetzen.
