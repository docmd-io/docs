---
title: "Deployer"
description: "Generieren Sie Produktions-Deployment-Konfigurationen für Docker, NGINX, Caddy, Vercel und Netlify direkt aus docmd.config.json."
---

Der Befehl `npx @docmd/core deploy` parst Ihre Projektkonfiguration `docmd.config.json` und gibt anbieterspezifische Deployment-Manifeste aus. Ausgabepfade, Hostnamen und SPA-Fallback-Regeln werden automatisch injiziert.

## Unterstützte Deploy-Ziel-Flags

| Zielplattform | Befehls-Flag | Generierte Ausgabedateien |
| :--- | :--- | :--- |
| **Docker-Container** | `--docker` | `Dockerfile`, `.dockerignore` |
| **NGINX Webserver** | `--nginx` | `nginx.conf` |
| **Caddy Webserver** | `--caddy` | `Caddyfile` |
| **GitHub Pages CI** | `--github-pages` | `.github/workflows/deploy.yml` |
| **Vercel** | `--vercel` | `vercel.json` |
| **Netlify** | `--netlify` | `netlify.toml` |

## Anwendungsbeispiele

Führen Sie den Deployer-Befehl aus Ihrem Projektstamm aus:

```bash
# Einzelner Anbieter-Generierung
npx @docmd/core deploy --github-pages

# Docker- und NGINX-Konfigurationen gemeinsam generieren
npx @docmd/core deploy --docker --nginx

# Bereits vorhandene Konfigurationsdateien überschreiben
npx @docmd/core deploy --vercel --force
```

## Konfigurations-Injizierungen

Der Deployer liest Ihre Konfigurationsparameter und personalisiert Ausgabevorlagen:

| Konfigurationseigenschaft | Ziel-Ausgabe-Verwendung |
| :--- | :--- |
| `title` | Header-Kommentare in generierten Manifesten. |
| `out` | `COPY`-Direktiven im Dockerfile; `root`-Pfade in NGINX und Caddy. |
| `url` | `server_name` in NGINX; Site-Blöcke in Caddy. |
| `layout.spa` | Steuert bedingte SPA-Fallback-Rewrite-Regeln. |

Wenn keine `docmd.config.json` vorhanden ist, wertet der Deployer Standard-Zero-Config-Standards aus.

## Überschreibschutz

Standardmäßig werden vorhandene Bereitstellungsdateien beibehalten und mit einem Hinweis übersprungen. Übergeben Sie das Flag `--force`, um vorhandene Konfigurationsdateien zu überschreiben.

## Details zu Zielplattformen

### GitHub Pages CI-Workflow

```bash
npx @docmd/core deploy --github-pages
```

Generiert `.github/workflows/deploy.yml` mit einem GitHub Actions-Workflow, der das Repository auscheckt, Node.js installiert, `npx @docmd/core build` ausführt und die statische Ausgabe auf GitHub Pages hochlädt.

::: callout tip "GitHub Action-Alternative" icon:github
Wenn Sie eine vorgefertigte Action bevorzugen, ohne lokale Workflow-Dateien zu verwalten, verwenden Sie die offizielle Action [`docmd-io/deploy`](./github-action).
:::

### Docker-Containerisierung

```bash
npx @docmd/core deploy --docker
```

Generiert ein Multi-Stage-`Dockerfile`:
1. **Build-Stufe**: Installiert die festgelegte `@docmd/core`-Version und kompiliert statische Assets.
2. **Serve-Stufe**: Kopiert Ausgabe-Assets in ein minimales `nginx:alpine`-Image.

Wenn eine `nginx.conf` im Projektstamm vorhanden ist, fügt das Dockerfile automatisch eine `COPY nginx.conf /etc/nginx/conf.d/default.conf`-Direktive ein.

::: callout tip "Offizielles Container-Image" icon:container
Informationen zum direkten Ausführen von docmd in containerisierten Pipelines ohne Erstellung benutzerdefinierter Images finden Sie im [Docker-Image-Leitfaden](./docker).
:::

### NGINX-Konfiguration

```bash
npx @docmd/core deploy --nginx
```

Generiert `nginx.conf`, konfiguriert mit Sicherheits-Headern, GZIP-Komprimierung, unveränderlichem Asset-Caching und SPA-Fallback-Regeln.

### Caddy Server

```bash
npx @docmd/core deploy --caddy
```

Generiert eine `Caddyfile` mit automatischer HTTPS-Zertifikatsverwaltung und statischer Dateiauslieferung.

### Vercel-Bereitstellung

```bash
npx @docmd/core deploy --vercel
```

Generiert `vercel.json` mit statischen Build-Befehlen, Ausgabe-Routing und Asset-Caching-Headern.

### Netlify-Bereitstellung

```bash
npx @docmd/core deploy --netlify
```

Generiert `netlify.toml` mit Build-Befehlen, Veröffentlichungsverzeichnissen und SPA-Umleitungsregeln.
