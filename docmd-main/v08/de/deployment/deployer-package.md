---
title: "Bereitstellung mit dem Deployer-Paket"
description: "Wie das modulare @docmd/deployer-Paket von docmd automatisch anbieterspezifische Deployment-Konfigurationen aus Ihrer Projektkonfiguration generiert."
---

## Übersicht

docmd wird mit einem dedizierten `@docmd/deployer`-Paket ausgeliefert. Es liest Ihre `docmd.config.json` und generiert automatisch anbieterspezifische Bereitstellungsdateien. Jede generierte Datei ist auf Ihre genaue Konfiguration zugeschnitten – Ihr Ausgabeverzeichnis, Ihre Website-URL, SPA-Routing-Regeln und Ihre Node.js-Version werden alle ohne manuelle Bearbeitung berücksichtigt.

## Unterstützte Anbieter

| Anbieter | Befehls-Flag | Generierte Dateien |
| :------- | :----------- | :----------------- |
| Docker + Nginx | `--docker` | `Dockerfile`, `.dockerignore` |
| Nginx | `--nginx` | `nginx.conf` |
| Caddy | `--caddy` | `Caddyfile` |
| GitHub Pages | `--github-pages` | `.github/workflows/deploy.yml` |
| Vercel | `--vercel` | `vercel.json` |
| Netlify | `--netlify` | `netlify.toml` |

## Verwendung

Führen Sie den Befehl im Projekt-Root aus (dort, wo sich Ihre `docmd.config.json` befindet):

```bash
# Einzelner Anbieter
npx @docmd/core deploy --github-pages

# Mehrere Anbieter gleichzeitig
npx @docmd/core deploy --docker --nginx

# Vorhandene Dateien überschreiben
npx @docmd/core deploy --vercel --force
```

## Details zu den Anbietern

### GitHub Pages

```bash
npx @docmd/core deploy --github-pages
```

Generiert `.github/workflows/deploy.yml` mit einer vollständigen Build-and-Deploy-Pipeline. Der Workflow:
- Checkt Ihr Repository aus
- Installiert Node.js (passend zu der von Ihrem Projekt benötigten Version)
- Führt `npx @docmd/core build` aus
- Lädt das Ausgabeverzeichnis auf GitHub Pages hoch

### Vercel

```bash
npx @docmd/core deploy --vercel
```

Generiert `vercel.json` mit SPA-Routing-Regeln (leitet alle Pfade auf `index.html` um) und Ihrem konfigurierten Ausgabeverzeichnis.

### Netlify

```bash
npx @docmd/core deploy --netlify
```

Generiert `netlify.toml` mit Ihrem Build-Befehl, dem Veröffentlichungsverzeichnis und SPA-Redirect-Regeln.

### Docker

```bash
npx @docmd/core deploy --docker
```

Generiert ein `Dockerfile` unter Verwendung eines mehrstufigen Builds (Multi-stage Build):
1. **Build-Stufe**: Installiert Ihre exakte, festgeschriebene `@docmd/core`-Version und führt den Build aus.
2. **Serve-Stufe**: Kopiert die Ausgabe in ein minimales `nginx:alpine`-Image.

Wenn in Ihrem Projekt-Root bereits eine `nginx.conf` existiert, kopiert das Dockerfile diese automatisch in den Container.

```bash
# Docker- und Nginx-Konfigurationen zusammen generieren
npx @docmd/core deploy --docker --nginx
```

### Nginx

```bash
npx @docmd/core deploy --nginx
```

Generiert eine `nginx.conf` mit SPA-Routing, gzip-Komprimierung und dem korrekten `root`-Pfad für Ihr Ausgabeverzeichnis.

### Caddy

```bash
npx @docmd/core deploy --caddy
```

Generiert ein `Caddyfile` mit automatischem HTTPS, SPA-Routing und Dateibereitstellung aus Ihrem Ausgabeverzeichnis.

## Erneutes Generieren

Haben Sie Ihre Konfiguration geändert? Führen Sie denselben Deploy-Befehl erneut aus. Verwenden Sie `--force`, um vorhandene Dateien zu überschreiben:

```bash
npx @docmd/core deploy --docker --force
```

## Abwägungen

Generierte Konfigurationen sind bewährte Startpunkte. Sie sind für die Mehrheit der docmd-Bereitstellungen korrekt, erfordern jedoch möglicherweise Anpassungen für fortgeschrittene Szenarien wie benutzerdefinierte Domains, CDN-Rewrites oder mandantenfähige Bereitstellungen. Überprüfen Sie generierte Dateien immer, bevor Sie sie in der Produktion bereitstellen.
