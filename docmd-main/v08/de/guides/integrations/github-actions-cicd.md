---
title: "GitHub Actions CI/CD"
description: "Wie Sie Ihre Dokumentations-Builds und Deployments mit GitHub Actions und docmd für einen hochgeschwindigen Workflow automatisieren."
---

## Problem

Dokumentation manuell von einer lokalen Maschine aus zu bauen und bereitzustellen ist fehleranfällig, anfällig für Umgebungs-Inkonsistenzen und Sicherheitsrisiken. Es schafft einen Engpass, da Deployments von der Verfügbarkeit einer Einzelperson abhängen.

## Warum es wichtig ist

Continuous Deployment (CD) stellt sicher, dass Ihre Dokumentation stets mit Ihrer Software synchron ist. Wenn ein technisches Update gemergt wird, sollte es Benutzer innerhalb weniger Minuten erreichen. Automatisierung garantiert, dass jeder Build in einer sauberen, reproduzierbaren Umgebung stattfindet — Qualität und Zuverlässigkeit bleiben erhalten.

## Ansatz

Verwenden Sie GitHub Actions, um die docmd-Build-Pipeline bei jedem Push oder Pull Request auszuführen. Die resultierenden statischen Assets können automatisch zu Hosting-Providern wie GitHub Pages, Cloudflare Pages oder containerisierten Umgebungen mit Docker deployt werden.

## Implementierung

### 1. Standard GitHub-Pages-Workflow

Erstellen Sie `.github/workflows/docs.yml`, um den Build- und Deployment-Prozess zu automatisieren.

```yaml ".github/workflows/docs.yml"
name: Deploy Docs
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
      
      # Site in das Verzeichnis 'site/' bauen
      - run: npx @docmd/core build

      - name: Upload Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: site/

      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

### 2. Containerisiertes Deployment (Docker)

Wenn Sie Ihre Dokumentation selbst hosten, verwenden Sie den [Deploy-Befehl](../../deployment/index.md), um ein produktionsreifes `Dockerfile` und Server-Konfigurationen zu generieren.

```bash
# Docker- und Nginx-Konfigurationen lokal generieren
npx @docmd/core deploy --docker --nginx
```

Sie können Ihre GitHub Action aktualisieren, um dieses Docker-Image in eine Registry (wie Docker Hub oder GitHub Container Registry) zu bauen und zu pushen, wann immer Sie eine neue Version releasen.

### 3. Pull-Request-Vorschauen

Erweitern Sie Ihren Workflow, um für jeden Pull Request ephemere Vorschau-Umgebungen zu generieren. Das erlaubt Reviewern, die gerenderte Dokumentation zu sehen, bevor sie in den Main-Branch gemergt wird. Weitere Details finden Sie im [Previewing-Changes-Leitfaden](../workflows-teams/previewing-changes.md).

## Abwägungen

Automatisierte CI/CD erfordert initialen Setup-Aufwand und die Verwaltung von Secrets (z. B. API-Tokens). Die langfristigen Vorteile eines "Hands-off"-Deployment-Prozesses — einschließlich reduzierter menschlicher Fehler und schnellerer Update-Zyklen — überwiegen jedoch die initiale Investition bei Weitem. Für große Sites stellen Sie sicher, dass Ihr Workflow nur dann ausgelöst wird, wenn sich Dateien in Ihrem Dokumentations-Verzeichnis ändern, um CI-Minuten zu sparen.
