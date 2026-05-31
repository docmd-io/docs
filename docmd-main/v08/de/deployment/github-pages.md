---
title: "GitHub Pages"
description: "Stellen Sie Ihre docmd-Dokumentation automatisch auf GitHub Pages bereit unter Verwendung eines generierten GitHub Actions CI/CD-Workflows."
---

Der Befehl `npx @docmd/core deploy --github-pages` generiert eine direkt verwendbare GitHub Actions-Workflow-Datei unter `.github/workflows/deploy.yml`. Pushen Sie diese in Ihr Repository. GitHub baut und stellt Ihre Website bei jedem Push auf `main` automatisch bereit.

```bash
npx @docmd/core deploy --github-pages
```

Dies erstellt eine auf Ihr Projekt zugeschnittene Datei `.github/workflows/deploy.yml`. Es ist keine manuelle Bearbeitung erforderlich.

## Was generiert wird

Der Workflow führt folgende Schritte aus:

1. Checkt Ihr Repository aus.
2. Installiert Node.js und Ihre Projekt-Abhängigkeiten.
3. Installiert die exakte Version von `@docmd/core`, die zur Erstellung der Datei verwendet wurde.
4. Führt `npx @docmd/core build` aus.
5. Lädt das Ausgabeverzeichnis als GitHub Pages-Artefakt hoch.
6. Stellt es auf GitHub Pages bereit.

## GitHub Pages aktivieren

Bevor Sie den Workflow pushen, aktivieren Sie GitHub Pages in Ihrem Repository:

1. Gehen Sie zu **Settings → Pages**.
2. Setzen Sie die **Source** auf **GitHub Actions**.

Sobald dies aktiviert ist, löst jeder Push auf `main` ein Deployment aus.

## Den Workflow anpassen

Die generierte Datei ist einfaches YAML. Sie können sie frei bearbeiten. Häufige Änderungen betreffen:

- **Branch**: Ändern Sie `branches: [main]` in den Namen Ihres Standard-Branches.
- **Node-Version**: Aktualisieren Sie `node-version: "20"`, um sie an Ihr Projekt anzupassen.
- **Build-Befehl**: Der Workflow verwendet standardmäßig `npx @docmd/core build`. Wenn Sie eine benutzerdefinierte Konfigurationsdatei verwenden, führen Sie `npx @docmd/core deploy --github-pages --config Ihre-Konfig.json` aus, um den Workflow neu zu generieren.

## Eigene Domain

Nach der Bereitstellung können Sie in den Repository-Einstellungen unter **Settings → Pages → Custom domain** eine benutzerdefinierte Domain hinzufügen. Tragen Sie diese Domain auch im Feld `url` Ihrer `docmd.config.json` ein und deployen Sie neu, damit Sitemaps und kanonische Tags korrekt bleiben.
