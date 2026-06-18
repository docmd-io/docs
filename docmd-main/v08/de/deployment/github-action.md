---
title: "GitHub Action"
description: "Verwenden Sie die offizielle docmd GitHub Action, um Ihre Dokumentation auf GitHub Pages bereitzustellen — Zero-Config, ein kombinierbarer Schritt."
---

Die `docmd-io/deploy` Action erstellt Ihre Dokumentationswebsite und gibt den Pfad zu den kompilierten Assets aus, bereit zum Hochladen auf GitHub Pages oder ein anderes Hosting-Ziel. Sie übernimmt Node.js-Setup, Konfigurationserkennung, Abhängigkeitsinstallation und den Build-Schritt in einer einzigen, kombinierbaren Action.

::: button "Im GitHub Marketplace ansehen" external:https://github.com/marketplace/actions/build-and-deploy-documentation-with-docmd icon:github
::: button "Quellcode" external:https://github.com/docmd-io/deploy icon:code

::: callout tip "Neues Projekt starten?"
Verwenden Sie die [Starter-Vorlage](./starter-template) — sie enthält eine vorkonfigurierte Workflow-Datei und eine einsatzbereite Repository-Struktur. Die GitHub Action eignet sich am besten zum Hinzufügen von docmd-Deployment zu einem **bestehenden** Repository.
:::

## Schnellstart

Fügen Sie die Action zu einer beliebigen Workflow-Datei in Ihrem Repository hinzu:

```yaml ".github/workflows/docs.yml"
# .github/workflows/docs.yml
name: Dokumentation bereitstellen

on:
  push:
    branches: [main]

permissions:
  contents: write
  pages: write
  id-token: write

jobs:
  docs:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deploy.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4

      - uses: docmd-io/deploy@v1
        id: build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: ${{ steps.build.outputs.site-dir }}

      - uses: actions/deploy-pages@v4
        id: deploy
```

## Wiederverwendbarer Workflow

Für minimalen Boilerplate verwenden Sie den gehosteten wiederverwendbaren Workflow. Er übernimmt Berechtigungen, Checkout, Build, Upload und Deploy in einem Aufruf:

```yaml ".github/workflows/docs.yml"
# .github/workflows/docs.yml
on:
  push:
    branches: [main]

jobs:
  docs:
    uses: docmd-io/deploy/.github/workflows/deploy.yml@v1
```

## Eingabeparameter

| Parameter | Standard | Beschreibung |
|-----------|----------|--------------|
| `node` | `20` | Node.js-Version für den Build |

## Ausgabeparameter

| Ausgabe | Beschreibung |
|---------|--------------|
| `site-dir` | Relativer Pfad zum kompilierten Site-Verzeichnis (z. B. `site/`) |

## Was die Action tut

1. **Node.js einrichten** — mit der angegebenen Version.
2. **Konfiguration erkennen** — sucht im Repository-Baum (bis zu zwei Ebenen tief) nach `docmd.config.json`, `docmd.config.js` oder `docmd.config.ts`. Unterverzeichnis-Konfigurationen werden vollständig unterstützt.
3. **docmd initialisieren** — falls keine Konfiguration gefunden wird, führt `npx @docmd/core init` aus.
4. **Abhängigkeiten installieren** — führt `npm ci` aus, wenn eine `package.json` vorhanden ist, andernfalls wird `@docmd/core` direkt installiert.
5. **Website erstellen** — führt `npx @docmd/core build` aus und liest das Ausgabeverzeichnis aus der Konfiguration.
6. **Pfad ausgeben** — stellt `site-dir` bereit, damit der Upload-Schritt die kompilierten Assets findet.

## Erstmalige Einrichtung

GitHub Pages muss so konfiguriert sein, dass die Bereitstellung über **GitHub Actions** erfolgt (nicht über einen Branch). Dies ist ein einmaliger Schritt pro Repository:

1. Öffnen Sie Ihr Repository auf GitHub.
2. Navigieren Sie zu **Settings → Pages**.
3. Wählen Sie unter **Source** die Option **GitHub Actions**.
4. Speichern.

Nach diesem Schritt löst jeder Push zu `main` automatisch ein Deployment aus.

## Unterstützung für verschachtelte Konfigurationen

Befindet sich Ihre `docmd.config.json` in einem Unterverzeichnis – beispielsweise `packages/docs/docmd.config.json` in einem Monorepo – erkennt die Action dies automatisch und übergibt `--cwd` an docmd. Eine manuelle Pfadkonfiguration ist nicht erforderlich.

## Benutzerdefinierte Domain

So verwenden Sie eine benutzerdefinierte Domain:

1. Fügen Sie eine `CNAME`-Datei mit Ihrer Domain zu Ihrem `docs/`-Verzeichnis hinzu (oder Ihrem konfigurierten Assets-Ordner), z. B. `docs.example.com`.
2. Setzen Sie das Feld `url` in `docmd.config.json` auf Ihre benutzerdefinierte Domain, damit Sitemaps und kanonische Tags korrekt sind.
3. Konfigurieren Sie die Domain unter **Settings → Pages → Custom domain**.

## Action-Version festlegen

Für Produktions-Dokumentationsseiten verwenden Sie einen spezifischen Release-Tag anstelle von `@v1`:

```yaml ".github/workflows/docs.yml"
- uses: docmd-io/deploy@v1.0.0
  id: build
```

Dies verhindert unerwartetes Verhalten durch zukünftige Minor-Updates.

## Fehlerbehebung

**`Error: Dependencies lock file is not found`**

Dieser Fehler tritt auf, wenn `actions/setup-node` mit `cache: 'npm'` konfiguriert ist, aber keine `package-lock.json` vorhanden ist. Die `docmd-io/deploy` Action verwaltet das Caching intern — fügen Sie keinen separaten `actions/setup-node`-Schritt mit `cache: 'npm'` hinzu, wenn Sie diese Action verwenden.

**Build erfolgreich, aber die Website ist nicht live**

Stellen Sie sicher, dass GitHub Pages auf die Bereitstellung über **GitHub Actions** und nicht über einen Branch eingestellt ist. Siehe [Erstmalige Einrichtung](#erstmalige-einrichtung) oben.

**Konfiguration nicht erkannt**

Die Action durchsucht bis zu zwei Verzeichnisebenen. Wenn Ihre Konfiguration tiefer liegt, übergeben Sie `--cwd` manuell in einem benutzerdefinierten Workflow-Schritt oder verwenden Sie den [Deployer](./deployer), um eine maßgeschneiderte Workflow-Datei zu generieren.