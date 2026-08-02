---
title: "Starter-Template"
description: "Verwenden Sie das offizielle docmd-Starter-Template, um in unter einer Minute eine vorkonfigurierte Dokumentations-Site mit GitHub-Pages-Bereitstellung zu erstellen."
---

# docmd Starter-Template

Das Repository `docmd-template` ist der schnellste Weg, um eine neue Dokumentations-Site zu starten. Es enthält eine funktionsfähige `docmd.config.json`, eine Beispielseite, eine `package.json` für die lokale Entwicklung sowie einen vorkonfigurierten GitHub-Actions-Workflow, der bei jedem Push automatisch zu GitHub Pages bereitstellt.

::: button "Template verwenden" external:https://github.com/docmd-io/docmd-template/generate icon:github color:#2ea44f
::: button "Repository ansehen" external:https://github.com/docmd-io/docmd-template icon:external-link

## Erste Schritte

### 1. Repository erstellen

Klicken Sie auf GitHub auf **[Template verwenden](https://github.com/docmd-io/docmd-template/generate)**. Vergeben Sie einen Namen für Ihr Repository und klicken Sie auf **Repository erstellen**. Sie müssen es nicht forken — das Template erzeugt eine saubere, eigenständige Kopie.

### 2. Site konfigurieren

Öffnen Sie `docmd.config.json` in Ihrem neuen Repository und passen Sie die Felder `title` und `url` an:

```json "docmd.config.json"
{
  "title": "Meine Docs",
  "url": "https://username.github.io/repo-name"
}
```

Ersetzen Sie `username` und `repo-name` durch Ihren GitHub-Benutzernamen und Repository-Namen.

### 3. GitHub Pages aktivieren

Dies ist ein einmaliger Schritt pro Repository:

1. Gehen Sie zu **Settings → Pages**.
2. Wählen Sie unter **Source** die Option **GitHub Actions**.
3. Speichern.

### 4. Pushen und bereitstellen

Pushen Sie eine beliebige Änderung auf `main`. Der enthaltene Workflow baut Ihre Site und stellt sie automatisch auf GitHub Pages bereit. Ihre Dokumentation ist dann erreichbar unter:

```
https://<username>.github.io/<repo-name>/
```

## Was ist enthalten

```
.github/
  workflows/
    docs.yml          # Automatisierter Build und Deploy bei Push auf main
docmd.config.json     # Site-Titel, URL und Ausgabeverzeichnis
docs/
  index.md            # Ihre erste Dokumentationsseite
package.json          # Skripte für die lokale Entwicklung
```

## Lokale Entwicklung

Klonen Sie Ihr Repository und starten Sie den Development-Server:

```bash
npm install
npm run dev
```

Die Site ist unter `http://localhost:3000` mit Live-Reload verfügbar. Änderungen an Markdown-Dateien werden sofort übernommen.

Um lokal eine Produktionsversion zu bauen:

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

Der Workflow installiert `@docmd/core` direkt ohne Lockfile — das ist Absicht, da das Template keine eingecheckte `package-lock.json` enthält und somit kein Caching durch `actions/setup-node` genutzt wird. So bleibt das Template frei von Abhängigkeiten und liefert trotzdem zuverlässige Deployments.

## Ihre erste Seite hinzufügen

Erstellen Sie eine neue Markdown-Datei in `docs/`:

```bash
docs/
  index.md        # Startseite
  getting-started.md
  api-reference.md
```

Fügen Sie eine `navigation.json` hinzu, um die Seitenleiste zu steuern:

```json "navigation.json"
[
  { "title": "Startseite", "path": "/" },
  { "title": "Erste Schritte", "path": "/getting-started" },
  { "title": "API-Referenz", "path": "/api-reference" }
]
```

Das vollständige Schema der Navigation finden Sie unter [Navigationskonfiguration](../configuration/navigation.md).

## Eigene Domain

So verwenden Sie eine eigene Domain (z. B. `docs.example.com`):

1. Aktualisieren Sie das Feld `url` in der `docmd.config.json`:
   ```json
   { "url": "https://docs.example.com" }
   ```
2. Legen Sie eine `CNAME`-Datei in Ihrem `docs/`-Verzeichnis an, die Ihre Domain enthält.
3. Konfigurieren Sie die Domain unter **Settings → Pages → Custom domain**.

## Starter-Template vs. GitHub Action

Das Template bietet Ihnen von Anfang an die volle Kontrolle über die Workflow-Datei und die Konfiguration. Die [GitHub Action](./github-action) eignet sich besser, um die docmd-Bereitstellung zu einem bestehenden Repository hinzuzufügen, ohne es umzustrukturieren.

| | Starter-Template | GitHub Action |
|---|---|---|
| Ausgangspunkt | Neues Repository | Bestehendes Repository |
| Workflow-Datei | Enthalten, von Ihnen editierbar | Sie schreiben sie, die Action übernimmt den Build |
| Konfiguration | Vorkonfiguriert | Automatisch erkannt oder erzeugt |
| Am besten geeignet für | Neue Projekte | Hinzufügen von Docs zu bestehenden Repos |