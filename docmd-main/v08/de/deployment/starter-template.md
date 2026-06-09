---
title: "Starter-Vorlage"
description: "Verwenden Sie die offizielle docmd Starter-Vorlage, um in unter einer Minute eine vorkonfigurierte Dokumentationswebsite mit automatischer GitHub Pages-Bereitstellung zu erstellen."
---

# docmd Starter-Vorlage

Das `docmd-template`-Repository ist der schnellste Weg, eine neue Dokumentationswebsite zu starten. Es enthält eine funktionierende `docmd.config.json`, eine Beispielseite, eine `package.json` für die lokale Entwicklung und einen vorkonfigurierten GitHub Actions-Workflow, der bei jedem Push automatisch auf GitHub Pages bereitstellt.

::: button "Vorlage verwenden" external:https://github.com/docmd-io/docmd-template/generate icon:github color:#2ea44f
::: button "Repository ansehen" external:https://github.com/docmd-io/docmd-template icon:external-link

## Schnellstart

### 1. Ihr Repository erstellen

Klicken Sie auf GitHub auf **[Vorlage verwenden](https://github.com/docmd-io/docmd-template/generate)**. Geben Sie Ihrem Repository einen Namen und klicken Sie auf **Create repository**. Sie müssen es nicht forken — die Vorlage erstellt eine saubere, unabhängige Kopie.

### 2. Ihre Website konfigurieren

Öffnen Sie `docmd.config.json` in Ihrem neuen Repository und aktualisieren Sie die Felder `title` und `url`:

```json
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

### 4. Pushen und bereitstellen

Pushen Sie eine beliebige Änderung zu `main`. Der enthaltene Workflow erstellt Ihre Website und stellt sie automatisch auf GitHub Pages bereit. Ihre Dokumentation ist erreichbar unter:

```
https://<benutzername>.github.io/<repo-name>/
```

## Enthaltene Dateien

```
.github/
  workflows/
    docs.yml          # Automatischer Build und Deploy bei Push zu main
docmd.config.json     # Website-Titel, URL und Ausgabeverzeichnis
docs/
  index.md            # Ihre erste Dokumentationsseite
package.json          # Skripte für die lokale Entwicklung
```

## Lokale Entwicklung

Klonen Sie Ihr Repository und starten Sie den Entwicklungsserver:

```bash
npm install
npm run dev
```

Die Website ist unter `http://localhost:3000` mit Live-Reload verfügbar. Änderungen an Markdown-Dateien werden sofort übernommen.

Lokaler Build einer Produktionskopie:

```bash
npm run build
```

Die kompilierte Website wird standardmäßig in `site/` geschrieben.

## Ihre erste Seite hinzufügen

Erstellen Sie eine neue Markdown-Datei in `docs/`:

```bash
docs/
  index.md              # Startseite
  erste-schritte.md
  api-referenz.md
```

Fügen Sie eine `navigation.json` hinzu, um die Seitenleiste zu steuern:

```json
[
  { "title": "Startseite", "path": "/" },
  { "title": "Erste Schritte", "path": "/erste-schritte" },
  { "title": "API-Referenz", "path": "/api-referenz" }
]
```

Die vollständige Navigationskonfiguration finden Sie unter [Navigationskonfiguration](../configuration/navigation.md).

## Benutzerdefinierte Domain

So verwenden Sie eine benutzerdefinierte Domain (z. B. `docs.example.com`):

1. Aktualisieren Sie das Feld `url` in `docmd.config.json`:
   ```json
   { "url": "https://docs.example.com" }
   ```
2. Fügen Sie eine `CNAME`-Datei mit Ihrer Domain in Ihr `docs/`-Verzeichnis ein.
3. Konfigurieren Sie die Domain unter **Settings → Pages → Custom domain**.

## Starter-Vorlage vs. GitHub Action

Die Vorlage gibt Ihnen von Anfang an die volle Kontrolle über die Workflow-Datei und Konfiguration. Die [GitHub Action](./github-action) eignet sich besser zum Hinzufügen von docmd-Deployment zu einem bestehenden Repository, ohne es umzustrukturieren.

| | Starter-Vorlage | GitHub Action |
|---|---|---|
| Ausgangspunkt | Neues Repository | Bestehendes Repository |
| Workflow-Datei | Enthalten, frei bearbeitbar | Sie schreiben sie, Action übernimmt Build |
| Konfiguration | Vorkonfiguriert | Automatisch erkannt oder generiert |
| Geeignet für | Neue Projekte | Dokumentation zu bestehenden Repos hinzufügen |