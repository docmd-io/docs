---
title: "Starter-Template"
description: "Initialisieren Sie neue Dokumentations-Repositories unter Verwendung des offiziellen docmd Starter-Templates mit GitHub Pages-Bereitstellung."
---

Das `docmd-template`-Repository bietet einen schlüsselfertigen Ausgangspunkt für docmd-Projekte. Es wird mit einer vorkonfigurierten `docmd.config.json`, Beispiel-Markdown-Seiten, lokalen Entwicklungsskripten und einem automatisierten GitHub Actions-Bereitstellungs-Workflow geliefert.

::: button "Template verwenden" external:https://github.com/docmd-io/docmd-template/generate icon:github color:#2ea44f
::: button "Repository ansehen" external:https://github.com/docmd-io/docmd-template icon:external-link

## Schnelleinrichtung

### 1. Repository generieren

Klicken Sie auf GitHub auf **[Template verwenden](https://github.com/docmd-io/docmd-template/generate)**, um eine frische, ungeforkte Kopie des Repositorys unter Ihrem Konto zu erstellen.

### 2. Parameter konfigurieren

Aktualisieren Sie `docmd.config.json` mit Ihrem Projekttitel und Ihrer Ziel-URL:

```json "docmd.config.json"
{
  "title": "Meine Docs",
  "url": "https://<username>.github.io/<repository>"
}
```

### 3. GitHub Pages aktivieren

Konfigurieren Sie die Pages-Veröffentlichungseinstellungen in GitHub:

1. Navigieren Sie zu **Settings → Pages**.
2. Wählen Sie unter **Source** die Option **GitHub Actions**.
3. Speichern Sie die Auswahl.

### 4. Committen & Veröffentlichen

Pushen Sie Commits auf `main`. Der enthaltene Workflow kompiliert Ihre Website und veröffentlicht sie auf:

```text
https://<username>.github.io/<repository>/
```

## Repository-Struktur

```text
.github/
  workflows/
    docs.yml          # Automatisierter CI/CD-Build- und Veröffentlichungs-Workflow
docmd.config.json     # Konfigurationsdatei
docs/
  index.md            # Standard-Landingpage
package.json          # Entwicklungsskripte
```

## Lokaler Entwicklungs-Workflow

Klonen Sie Ihr Repository lokal und starten Sie den Dev-Server:

```bash
npm install
npm run dev
```

Die Website wird lokal unter `http://localhost:3000` mit Hot-Reloading bereitgestellt.

Um eine Produktions-Kompilierung lokal zu überprüfen:

```bash
npm run build
```

Das Ausgabeverzeichnis wird standardmäßig nach `site/` gebaut.

## CI/CD-Bereitstellungs-Workflow

Das Template enthält `.github/workflows/docs.yml`:

```yaml ".github/workflows/docs.yml"
name: Docs

on:
  push:
    branches: [main, master]
  workflow_dispatch:

permissions:
  contents: write
  pages: write
  id-token: write

concurrency:
  group: docs
  cancel-in-progress: false

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deploy.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: 24

      - name: Install
        run: npm install @docmd/core

      - name: Build
        run: npx @docmd/core build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./site

      - name: Deploy
        id: deploy
        uses: actions/deploy-pages@v4
```

## Benutzerdefinierte Domains

So binden Sie eine benutzerdefinierte Domain (z. B. `docs.example.com`):

1. Setzen Sie `url` in `docmd.config.json`:
   ```json
   { "url": "https://docs.example.com" }
   ```
2. Committen Sie eine `CNAME`-Datei mit Ihrer Domain in `docs/`.
3. Setzen Sie das Domain-Routing unter **Settings → Pages → Custom domain**.

::: callout tip "Template vs. GitHub Action" icon:git-branch
Das Starter-Template bietet ein fertiges Repository-Layout für neue Projekte. Wenn Sie Dokumentation zu einer bestehenden Codebasis hinzufügen, verwenden Sie direkt die [GitHub Action](./github-action).
:::