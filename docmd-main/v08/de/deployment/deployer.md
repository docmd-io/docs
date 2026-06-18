---
title: "Deployer"
description: "Generieren Sie anbieterspezifische Bereitstellungskonfigurationsdateien aus Ihrer docmd-Projektkonfiguration mit einem einzigen Befehl."
---

Der `deploy`-Befehl liest Ihre `docmd.config.json` und generiert Bereitstellungskonfigurationsdateien, die auf Ihr genaues Projekt zugeschnitten sind — Ausgabeverzeichnis, Site-URL, SPA-Routing und Node.js-Version werden alle automatisch berücksichtigt. Keine generischen Templates.

## Unterstützte Anbieter

| Anbieter | Flag | Generierte Dateien |
| :------- | :--- | :-------------- |
| Docker + Nginx | `--docker` | `Dockerfile`, `.dockerignore` |
| Nginx | `--nginx` | `nginx.conf` |
| Caddy | `--caddy` | `Caddyfile` |
| GitHub Pages | `--github-pages` | `.github/workflows/deploy.yml` |
| Vercel | `--vercel` | `vercel.json` |
| Netlify | `--netlify` | `netlify.toml` |

## Verwendung

Führen Sie den Befehl aus Ihrem Projektstamm aus (wo `docmd.config.json` lebt):

```bash
# Einzelner Anbieter
npx @docmd/core deploy --github-pages

# Mehrere Anbieter gleichzeitig
npx @docmd/core deploy --docker --nginx

# Vorhandene Dateien überschreiben
npx @docmd/core deploy --vercel --force
```

## Was personalisiert wird

Der deploy-Befehl liest Ihre Konfiguration (oder Zero-Config-Standards) und injiziert:

| Konfigurationsfeld | Verwendet in |
|:--|:--|
| `title` | Kommentarheader in jeder generierten Datei |
| `out` | `COPY`-Pfade in Dockerfile, `root`-Direktiven in Nginx/Caddy |
| `url` | `server_name` in Nginx, Site-Adresse in Caddy |
| `layout.spa` | Steuert, ob SPA-Routing-Fallback enthalten ist |
| Config path | Dockerfile-Build-Schritt verwendet `--config` wenn nicht Standard |

Keine `docmd.config.json`? Kein Problem. Der Befehl verwendet dieselben Zero-Config-Standards wie `npx @docmd/core dev` und `npx @docmd/core build`.

## Immer synchron

Jeder Lauf regeneriert Ihre Bereitstellungsdateien, damit sie zu Ihrer aktuellen Konfiguration passen. Site-URL oder Ausgabeverzeichnis geändert? Führen Sie einfach den deploy-Befehl erneut aus. Verwenden Sie `--force`, um vorhandene Dateien ohne Rückfragen zu überschreiben.

## Anbieterdetails

### GitHub Pages

```bash
npx @docmd/core deploy --github-pages
```

Generiert `.github/workflows/deploy.yml` mit einer kompletten Build-and-Deploy-Pipeline. Der Workflow checkt Ihr Repository aus, installiert Node.js, führt `npx @docmd/core build` aus und lädt die Ausgabe zu GitHub Pages hoch.

::: callout tip "Lieber die GitHub Action verwenden?"
Wenn Sie ohne selbst eine Workflow-Datei zu generieren zu GitHub Pages deployen möchten, verwenden Sie die [GitHub Action](./github-action) direkt — sie handhabt alles in einem komponierbaren Schritt.
:::

### Docker

```bash
npx @docmd/core deploy --docker
```

Generiert eine `Dockerfile` mit einem Multi-Stage-Build:
1. **Build-Stage** — installiert Ihre exakte gepinnte `@docmd/core`-Version und führt den Build aus.
2. **Serve-Stage** — kopiert die Ausgabe in ein minimales `nginx:alpine`-Image.

Wenn bereits eine `nginx.conf` im Projektstamm existiert, kopiert die Dockerfile sie automatisch in den Container.

```bash
# Docker- und Nginx-Konfigurationen zusammen generieren
npx @docmd/core deploy --docker --nginx
```

::: callout tip "Offizielles Docker-Image"
Möchten Sie docmd in einem Container ausführen, ohne ein benutzerdefiniertes Image zu bauen? Siehe die [Docker-Image](./docker)-Seite für das offizielle vorgefertigte Image.
:::

### Nginx

```bash
npx @docmd/core deploy --nginx
```

Generiert `nginx.conf` mit SPA-Routing, gzip-Komprimierung und korrektem `root`-Pfad für Ihr Ausgabeverzeichnis. Siehe die [NGINX](./nginx)-Seite für die vollständige generierte Konfiguration.

### Caddy

```bash
npx @docmd/core deploy --caddy
```

Generiert eine `Caddyfile` mit automatischem HTTPS, SPA-Routing und Datei-Auslieferung aus Ihrem Ausgabeverzeichnis. Siehe die [Caddy](./caddy)-Seite für die vollständige generierte Konfiguration.

### Vercel

```bash
npx @docmd/core deploy --vercel
```

Generiert `vercel.json` mit SPA-Routing-Regeln und Ihrem konfigurierten Ausgabeverzeichnis. Siehe die [Vercel](./vercel)-Seite für Bereitstellungsschritte.

### Netlify

```bash
npx @docmd/core deploy --netlify
```

Generiert `netlify.toml` mit Ihrem Build-Befehl, Publish-Verzeichnis und SPA-Redirect-Regeln. Siehe die [Netlify](./netlify)-Seite für Bereitstellungsschritte.

## Trade-offs

Generierte Konfigurationen sind meinungsbasierte Ausgangspunkte. Sie sind für die Mehrheit der docmd-Bereitstellungen korrekt, erfordern jedoch möglicherweise Anpassungen für fortgeschrittene Szenarien wie benutzerdefinierte Domains, CDN-Rewrites oder Multi-Region-Bereitstellungen. Überprüfen Sie generierte Dateien immer, bevor Sie sie in der Produktion bereitstellen.
