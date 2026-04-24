---
title: "GitHub Actions CI/CD"
description: "So automatisieren Sie Ihre Dokumentations-Builds und -Deployments mit GitHub Actions und docmd für einen hocheffizienten Dokumentations-Workflow."
---

## Problem

Das manuelle Bauen und Bereitstellen von Dokumentationen von einem lokalen Rechner aus ist anfällig für Fehler, Umgebungsinkonsistenzen (z. B. unterschiedliche Node.js-Versionen) und Sicherheitsrisiken. Zudem entsteht ein Flaschenhals, da Deployments von der Verfügbarkeit und dem lokalen Setup einer einzelnen Person abhängen.

## Warum es wichtig ist

Continuous Deployment (CD) stellt sicher, dass Ihre Dokumentation immer synchron mit Ihrer Software ist. Wenn ein technisches Update gemergt wird, sollte es Ihre Benutzer innerhalb von Minuten erreichen, nicht erst nach Tagen. Automatisierung garantiert, dass jeder Build in einer sauberen, reproduzierbaren Umgebung stattfindet, was hohe Qualitäts- und Zuverlässigkeitsstandards wahrt.

## Ansatz

Nutzen Sie GitHub Actions, um die `docmd`-Build-Pipeline bei jedem Push oder Pull Request auszuführen. Die resultierenden statischen Assets können dann automatisch auf Hosting-Providern wie GitHub Pages, Cloudflare Pages oder in containerisierten Umgebungen mit Docker bereitgestellt werden.

## Implementierung

### 1. Standard-Workflow für GitHub Pages

Erstellen Sie `.github/workflows/docs.yml`, um den Build- und Deployment-Prozess zu automatisieren.

```yaml
name: Docs bereitstellen
on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'

      - run: npm install
      
      # Baut die Seite in das Verzeichnis 'site/'
      - run: npx docmd build

      - name: Artefakt hochladen
        uses: actions/upload-pages-artifact@v3
        with:
          path: site/

      - name: Auf GitHub Pages bereitstellen
        uses: actions/deploy-pages@v4
```

### 2. Containerisiertes Deployment (Docker)

Wenn Sie Ihre Dokumentation selbst hosten, verwenden Sie den [Deploy-Befehl](../../deployment), um ein produktionsreifes `Dockerfile` und Serverkonfigurationen zu generieren.

```bash
# Docker- und Nginx-Configs lokal generieren
npx docmd deploy --docker --nginx
```

Sie können dann Ihre GitHub Action aktualisieren, um dieses Docker-Image zu bauen und bei jedem Release in eine Registry (wie Docker Hub oder GitHub Container Registry) zu pushen.

### 3. Pull Request Previews

Verbessern Sie Ihren Workflow, indem Sie für jeden Pull Request kurzlebige Preview-Umgebungen generieren. Dies ermöglicht es Reviewern, die gerenderte Dokumentation zu sehen, bevor sie in den Hauptzweig gemergt wird. Weitere Details finden Sie im [Leitfaden zum Vorschauen von Änderungen](../workflows-teams/previewing-changes).

## Abwägungen

Automatisiertes CI/CD erfordert initialen Setup-Aufwand und die Verwaltung von Secrets (z. B. API-Tokens). Die langfristigen Vorteile eines automatisierten Deployment-Prozesses – darunter weniger menschliche Fehler und schnellere Update-Zyklen – überwiegen jedoch bei weitem die Anfangsinvestition. Stellen Sie bei großen Sites sicher, dass Ihr Workflow nur ausgelöst wird, wenn Dateien in Ihrem Dokumentationsverzeichnis geändert wurden, um CI-Minuten zu sparen.
