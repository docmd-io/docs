---
title: "GitHub Action"
description: "Verwenden Sie die offizielle docmd-GitHub-Action, um Ihre Dokumentation auf GitHub Pages zu bauen und bereitzustellen — Zero Config in einem komponierbaren Schritt."
---

Die Action `docmd-io/deploy` baut Ihre Dokumentations-Site und gibt den Pfad zu den kompilierten Assets aus, bereit zum Hochladen auf GitHub Pages oder ein beliebiges anderes Hosting-Ziel. Sie übernimmt Node.js-Setup, Konfigurationserkennung, Abhängigkeitsinstallation und den Build-Schritt in einer einzigen komponierbaren Action.

::: button "Auf dem GitHub Marketplace ansehen" external:https://github.com/marketplace/actions/build-and-deploy-documentation-with-docmd icon:github
::: button "Quellcode" external:https://github.com/docmd-io/deploy icon:code

::: callout tip "Starten Sie ein neues Projekt?"
Verwenden Sie das [Starter-Template](./starter-template) — es enthält eine vorkonfigurierte Workflow-Datei und eine sofort einsatzbereite Repository-Struktur. Die GitHub Action eignet sich am besten, um die docmd-Bereitstellung zu einem **bestehenden** Repository hinzuzufügen.
:::

## Schnellstart

Fügen Sie die Action zu einer beliebigen Workflow-Datei in Ihrem Repository hinzu:

```yaml ".github/workflows/docs.yml"
# .github/workflows/docs.yml
name: Deploy Docs

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

Für den absolut minimalen Boilerplate verwenden Sie den gehosteten wiederverwendbaren Workflow. Er übernimmt Berechtigungen, Checkout, Build, Upload und Deploy in einem einzigen Aufruf:

```yaml ".github/workflows/docs.yml"
# .github/workflows/docs.yml
on:
  push:
    branches: [main]

jobs:
  docs:
    uses: docmd-io/deploy/.github/workflows/deploy.yml@v1
```

## Eingaben

| Eingabe | Standard | Beschreibung |
|-------|---------|-------------|
| `node` | `20` | Node.js-Version, die während des Builds verwendet wird |

## Ausgaben

| Ausgabe | Beschreibung |
|--------|-------------|
| `site-dir` | Relativer Pfad zum kompilierten Site-Verzeichnis (z. B. `site/`) |

## Was die Action tut

Die Action führt intern die folgenden Schritte aus:

1. **Richtet Node.js ein** mit der angegebenen Version.
2. **Erkennt Ihre Konfiguration** — durchsucht den Repository-Baum (bis zu zwei Ebenen tief) nach `docmd.config.json`, `docmd.config.js` oder `docmd.config.ts`. Konfigurationen in Unterverzeichnissen werden vollständig unterstützt.
3. **Initialisiert docmd** — wenn keine Konfiguration gefunden wird, führt sie `npx @docmd/core init` aus, um automatisch eine zu erstellen.
4. **Installiert Abhängigkeiten** — führt `npm ci` aus, wenn eine `package.json` vorhanden ist, andernfalls installiert sie `@docmd/core` direkt.
5. **Baut die Site** — führt `npx @docmd/core build` aus und liest das Ausgabeverzeichnis aus Ihrer Konfiguration.
6. **Gibt den Pfad aus** — stellt `site-dir` bereit, damit der Upload-Schritt weiß, wo sich die kompilierten Assets befinden.

## Einmalige Einrichtung

GitHub Pages muss so konfiguriert sein, dass es aus **GitHub Actions** bereitstellt (nicht aus einem Branch). Dies ist ein einmaliger Schritt pro Repository:

1. Rufen Sie Ihr Repository auf GitHub auf.
2. Navigieren Sie zu **Settings → Pages**.
3. Wählen Sie unter **Source** die Option **GitHub Actions**.
4. Speichern.

Danach löst jeder Push auf `main` automatisch eine Bereitstellung aus.

## Unterstützung für verschachtelte Konfigurationen

Wenn Ihre `docmd.config.json` in einem Unterverzeichnis liegt — z. B. `packages/docs/docmd.config.json` in einem Monorepo — erkennt die Action sie und übergibt `--cwd` automatisch an docmd. Es ist keine manuelle Pfadkonfiguration erforderlich.

## Eigene Domain

So verwenden Sie eine eigene Domain:

1. Fügen Sie eine `CNAME`-Datei in Ihr `docs/`-Verzeichnis (oder Ihren konfigurierten Asset-Ordner) ein, die Ihre Domain enthält, z. B. `docs.example.com`.
2. Setzen Sie das Feld `url` in der `docmd.config.json` auf Ihre eigene Domain, damit Sitemaps und kanonische Tags korrekt sind.
3. Konfigurieren Sie die Domain unter **Settings → Pages → Custom domain**.

## Action-Version festpinnen

Für Produktions-Dokumentations-Sites pinnen Sie auf einen bestimmten Release-Tag statt auf `@v1`:

```yaml ".github/workflows/docs.yml"
- uses: docmd-io/deploy@v1.0.0
  id: build
```

So vermeiden Sie unerwartetes Verhalten durch künftige kleinere Updates.

## Fehlerbehebung

**`Error: Dependencies lock file is not found`**

Dieser Fehler tritt auf, wenn `actions/setup-node` mit `cache: 'npm'` konfiguriert ist, aber keine `package-lock.json` existiert. Die Action `docmd-io/deploy` kümmert sich intern um Caching — fügen Sie bei Verwendung dieser Action keinen separaten `actions/setup-node`-Schritt mit `cache: 'npm'` hinzu.

**Build erfolgreich, aber die Site ist nicht erreichbar**

Stellen Sie sicher, dass GitHub Pages auf Bereitstellung aus **GitHub Actions** eingestellt ist, nicht aus einem Branch. Siehe [Einmalige Einrichtung](#einmalige-einrichtung) oben.

**Konfiguration wird nicht erkannt**

Die Action durchsucht bis zu zwei Verzeichnisebenen. Wenn Ihre Konfiguration tiefer liegt, übergeben Sie `--cwd` manuell in einem benutzerdefinierten Workflow-Schritt oder verwenden Sie den [Deployer](./deployer), um eine maßgeschneiderte Workflow-Datei zu erzeugen.