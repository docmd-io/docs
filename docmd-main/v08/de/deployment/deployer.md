---
title: "Deployer"
description: "Generiert providerspezifische Deployment-Konfigurationsdateien aus Ihrer docmd-Projektkonfiguration – mit einem einzigen Befehl."
---

Der `deploy`-Befehl liest Ihre `docmd.config.json` und generiert Deployment-Konfigurationsdateien, die exakt auf Ihr Projekt zugeschnitten sind — Ausgabeverzeichnis, Site-URL, SPA-Routing und Node.js-Version werden automatisch übernommen. Keine generischen Vorlagen.

## Unterstützte Provider

| Provider | Flag | Generierte Dateien |
| :------- | :--- | :----------------- |
| Docker + Nginx | `--docker` | `Dockerfile`, `.dockerignore` |
| Nginx | `--nginx` | `nginx.conf` |
| Caddy | `--caddy` | `Caddyfile` |
| GitHub Pages | `--github-pages` | `.github/workflows/deploy.yml` |
| Vercel | `--vercel` | `vercel.json` |
| Netlify | `--netlify` | `netlify.toml` |

## Verwendung

Ausführen im Projektstamm (dort, wo `docmd.config.json` liegt):

```bash
# Einzelner Provider
npx @docmd/core deploy --github-pages

# Mehrere Provider gleichzeitig
npx @docmd/core deploy --docker --nginx

# Vorhandene Dateien überschreiben
npx @docmd/core deploy --vercel --force
```

## Was personalisiert wird

Der Deploy-Befehl liest Ihre Konfiguration (oder Zero-Config-Standardwerte) und injiziert:

| Konfigurationsfeld | Verwendet in |
|:--|:--|
| `title` | Kommentar-Header in jeder generierten Datei |
| `out` | `COPY`-Pfade im Dockerfile, `root`-Direktiven in Nginx/Caddy |
| `url` | `server_name` in Nginx, Site-Adresse in Caddy |
| `layout.spa` | Steuert, ob SPA-Routing-Fallback enthalten ist |
| Konfigurations-Dateipfad | Dockerfile-Build-Schritt verwendet `--config` bei nicht-standardmäßigem Pfad |

Keine `docmd.config.json`? Kein Problem. Der Befehl nutzt die gleichen Zero-Config-Standardwerte wie `npx @docmd/core dev` und `npx @docmd/core build`.

## Immer synchron

Jede Ausführung generiert Ihre Deployment-Dateien neu, um sie mit Ihrer aktuellen Konfiguration abzugleichen. Site-URL oder Ausgabeverzeichnis geändert? Deploy-Befehl einfach erneut ausführen. Mit `--force` werden vorhandene Dateien ohne Rückfrage überschrieben.

## Provider-Details

### GitHub Pages

```bash
npx @docmd/core deploy --github-pages
```

Generiert `.github/workflows/deploy.yml` mit einer vollständigen Build-und-Deploy-Pipeline. Der Workflow checkt Ihr Repository aus, installiert Node.js, führt `npx @docmd/core build` aus und lädt die Ausgabe auf GitHub Pages hoch.

::: callout tip "Lieber die GitHub Action nutzen?"
Wenn Sie auf GitHub Pages deployen möchten, ohne selbst eine Workflow-Datei zu generieren, verwenden Sie direkt die [GitHub Action](./github-action) — sie erledigt alles in einem einzigen kombinierbaren Schritt.
:::

### Docker

```bash
npx @docmd/core deploy --docker
```

Generiert ein `Dockerfile` mit einem Multi-Stage-Build:
1. **Build-Stage** — installiert Ihre exakt gepinnte `@docmd/core`-Version und führt den Build aus.
2. **Serve-Stage** — kopiert die Ausgabe in ein minimales `nginx:alpine`-Image.

Wenn bereits eine `nginx.conf` im Projektstamm vorhanden ist, kopiert das Dockerfile diese automatisch in den Container.

```bash
# Docker und Nginx-Konfiguration gemeinsam generieren
npx @docmd/core deploy --docker --nginx
```

::: callout tip "Offizielles Docker-Image"
Möchten Sie docmd in einem Container betreiben, ohne ein eigenes Image zu bauen? Siehe die [Docker-Image](./docker)-Seite für das offizielle vorgefertigte Image.
:::

### Nginx

```bash
npx @docmd/core deploy --nginx
```

Generiert `nginx.conf` mit SPA-Routing, Gzip-Komprimierung und dem korrekten `root`-Pfad für Ihr Ausgabeverzeichnis. Siehe die [NGINX](./nginx)-Seite für die vollständige generierte Konfiguration.

### Caddy

```bash
npx @docmd/core deploy --caddy
```

Generiert ein `Caddyfile` mit automatischem HTTPS, SPA-Routing und Datei-Serving aus Ihrem Ausgabeverzeichnis. Siehe die [Caddy](./caddy)-Seite für die vollständige generierte Konfiguration.

### Vercel

```bash
npx @docmd/core deploy --vercel
```

Generiert `vercel.json` mit SPA-Routing-Regeln und Ihrem konfigurierten Ausgabeverzeichnis. Deployment-Schritte finden Sie auf der [Vercel](./vercel)-Seite.

### Netlify

```bash
npx @docmd/core deploy --netlify
```

Generiert `netlify.toml` mit Ihrem Build-Befehl, Publish-Verzeichnis und SPA-Redirect-Regeln. Deployment-Schritte finden Sie auf der [Netlify](./netlify)-Seite.

## Hinweise

Generierte Konfigurationen sind meinungsstarke Ausgangspunkte. Sie sind für die meisten docmd-Deployments korrekt, können aber für fortgeschrittene Szenarien wie benutzerdefinierte Domains, CDN-Rewrites oder Multi-Region-Deployments Anpassungen erfordern. Überprüfen Sie generierte Dateien immer vor dem Deployment in der Produktion.