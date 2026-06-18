---
title: "Starter-Template"
description: "Verwenden Sie das offizielle docmd-Starter-Template, um in unter einer Minute eine vorkonfigurierte Dokumentations-Site mit GitHub-Pages-Bereitstellung zu erstellen."
---

# docmd Starter-Template

Das `docmd-template`-Repository ist der schnellste Weg, um eine neue Dokumentations-Site zu starten. Es enthält eine funktionierende `docmd.config.json`, eine Beispielseite, eine `package.json` für die lokale Entwicklung und einen vorkonfigurierten GitHub-Actions-Workflow, der bei jedem Push automatisch zu GitHub Pages deployt.

::: button "Dieses Template verwenden" external:https://github.com/docmd-io/docmd-template/generate icon:github color:#2ea44f
::: button "Repository ansehen" external:https://github.com/docmd-io/docmd-template icon:external-link

## Erste Schritte

### 1. Erstellen Sie Ihr Repository

Klicken Sie in GitHub auf **[Dieses Template verwenden](https://github.com/docmd-io/docmd-template/generate)**. Geben Sie Ihrem Repository einen Namen und klicken Sie auf **Create repository**. Sie müssen es nicht forken — das Template erstellt eine saubere, unabhängige Kopie.

### 2. Konfigurieren Sie Ihre Site

Öffnen Sie `docmd.config.json` in Ihrem neuen Repository und aktualisieren Sie die Felder `title` und `url`:

```json "docmd.config.json"
{
  "title": "Meine Dokumentation",
  "url": "https://benutzername.github.io/repo-name"
}
```

Ersetzen Sie `benutzername` und `repo-name` durch Ihren GitHub-Benutzernamen und den Repository-Namen.

### 3. GitHub Pages aktivieren

Dies ist ein einmaliger Schritt pro Repository:

1. Gehen Sie zu **Settings → Pages**.
2. Wählen Sie unter **Source** die Option **GitHub Actions**.
3. Speichern.

### 4. Pushen und Deployen

Pushen Sie eine beliebige Änderung auf `main`. Der mitgelieferte Workflow baut Ihre Site und deployt sie automatisch zu GitHub Pages. Ihre Dokumentation wird hier verfügbar sein:

```
https://<benutzername>.github.io/<repo-name>/
```

## Was ist enthalten

```
.github/
  workflows/
    docs.yml          # Automatisierter Build und Deploy bei Push auf main
docmd.config.json     # Site-Titel, URL und Ausgabeverzeichnis
docs/
  index.md            # Ihre erste Dokumentationsseite
package.json          # Lokale Entwicklungs-Skripte
```

## Lokale Entwicklung

Klonen Sie Ihr Repository und führen Sie den Dev-Server aus:

```bash
npm install
npm run dev
```

Die Site ist unter `http://localhost:3000` mit Live-Reload verfügbar. Änderungen an Markdown-Dateien werden sofort übernommen.

Um lokal eine Produktionskopie zu bauen:

```bash
npm run build
```

Die kompilierte Site wird standardmäßig nach `site/` geschrieben.

## Enthaltener Workflow

Das Template wird mit `.github/workflows/docs.yml` ausgeliefert:

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
          node-version: 20

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

Der Workflow installiert `@docmd/core` direkt ohne Lock-Datei, was beabsichtigt ist — das Template hat keine übertragene `package-lock.json`, daher wird das `actions/setup-node`-Caching nicht verwendet. Dies hält das Template abhängigkeitsfrei und stellt gleichzeitig zuverlässiges Deployment sicher.

## Ihre erste Seite hinzufügen

Erstellen Sie eine neue Markdown-Datei in `docs/`:

```bash
docs/
  index.md        # Startseite
  getting-started.md
  api-reference.md
```

Fügen Sie eine `navigation.json` hinzu, um die Sidebar zu steuern:

```json "navigation.json"
[
  { "title": "Startseite", "path": "/" },
  { "title": "Erste Schritte", "path": "/erste-schritte" },
  { "title": "API-Referenz", "path": "/api-referenz" }
]
```

Den vollständigen Navigations-Konfigurations-Leitfaden finden Sie unter [Navigationskonfiguration](../configuration/navigation.md).

## Benutzerdefinierte Domain

Um eine benutzerdefinierte Domain zu verwenden (z. B. `docs.example.com`):

1. Aktualisieren Sie das `url`-Feld in `docmd.config.json`:
   ```json "docmd.config.json"
   { "url": "https://docs.example.com" }
   ```
2. Fügen Sie eine `CNAME`-Datei in Ihr `docs/`-Verzeichnis ein, die Ihre Domain enthält.
3. Konfigurieren Sie die Domain unter **Settings → Pages → Custom domain**.

## Starter-Template vs GitHub Action

Das Template gibt Ihnen von Anfang an vollständige Kontrolle über die Workflow-Datei und die Konfiguration. Die [GitHub Action](./github-action) eignet sich besser, um die docmd-Bereitstellung zu einem bestehenden Repository hinzuzufügen, ohne es umzustrukturieren.

| | Starter-Template | GitHub Action |
|---|---|---|
| Ausgangspunkt | Neues Repository | Bestehendes Repository |
| Workflow-Datei | Enthalten, yours to edit | Sie schreiben sie, die Action handhabt den Build |
| Konfiguration | Vorkonfiguriert | Automatisch erkannt oder generiert |
| Am besten für | Neue Projekte | Hinzufügen von Doku zu bestehenden Repos |
