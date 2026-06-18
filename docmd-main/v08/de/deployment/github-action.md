---
title: "GitHub Action"
description: "Verwenden Sie die offizielle docmd GitHub Action, um Ihre Dokumentation zu bauen und zu GitHub Pages zu deployen — null Konfiguration, ein komponierbarer Schritt."
---

Die `docmd-io/deploy`-Action baut Ihre Dokumentations-Site und gibt den Pfad zu den kompilierten Assets aus, bereit zum Hochladen zu GitHub Pages oder einem anderen Bereitstellungsziel. Sie handhabt Node.js-Setup, Konfigurationserkennung, Dependency-Installation und den Build-Schritt in einer einzigen komponierbaren Action.

::: button "Auf dem GitHub Marketplace ansehen" external:https://github.com/marketplace/actions/build-and-deploy-documentation-with-docmd icon:github
::: button "Quellcode" external:https://github.com/docmd-io/deploy icon:code

::: callout tip "Starten Sie ein neues Projekt?"
Verwenden Sie das [Starter-Template](./starter-template) — es enthält eine vorkonfigurierte Workflow-Datei und eine sofort einsatzbereite Repository-Struktur. Die GitHub Action eignet sich am besten, um die docmd-Bereitstellung zu einem **bestehenden** Repository hinzuzufügen.
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

Für den absoluten Mindest-Boilerplate verwenden Sie den gehosteten wiederverwendbaren Workflow. Er handhabt Berechtigungen, Checkout, Build, Upload und Deployment in einem Aufruf:

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
| `node` | `20` | Zu verwendende Node.js-Version während des Builds |

## Ausgaben

| Ausgabe | Beschreibung |
|--------|-------------|
| `site-dir` | Relativer Pfad zum kompilierten Site-Verzeichnis (z. B. `site/`) |

## Was die Action tut

Die Action führt intern die folgenden Schritte aus:

1. **Richtet Node.js ein** unter Verwendung der angegebenen Version.
2. **Erkennt Ihre Konfiguration** — durchsucht den Repository-Baum (bis zu zwei Ebenen tief) nach `docmd.config.json`, `docmd.config.js` oder `docmd.config.ts`. Unterverzeichnis-Konfigurationen werden vollständig unterstützt.
3. **Initialisiert docmd** — wenn keine Konfiguration gefunden wird, führt sie `npx @docmd/core init` aus, um automatisch eine zu erstellen.
4. **Installiert Abhängigkeiten** — führt `npm ci` aus, wenn eine `package.json` vorhanden ist, andernfalls installiert sie `@docmd/core` direkt.
5. **Baut die Site** — führt `npx @docmd/core build` aus und liest das Ausgabeverzeichnis aus Ihrer Konfiguration.
6. **Gibt den Pfad aus** — stellt `site-dir` bereit, damit der Upload-Schritt weiß, wo die kompilierten Assets zu finden sind.

## Ersteinrichtung

GitHub Pages muss so konfiguriert werden, dass es von **GitHub Actions** aus bereitgestellt wird (nicht von einem Branch). Dies ist ein einmaliger Schritt pro Repository:

1. Gehen Sie in GitHub zu Ihrem Repository.
2. Navigieren Sie zu **Settings → Pages**.
3. Wählen Sie unter **Source** die Option **GitHub Actions**.
4. Speichern.

Danach löst jeder Push auf `main` automatisch eine Bereitstellung aus.

## Unterstützung für verschachtelte Konfigurationen

Wenn Ihre `docmd.config.json` in einem Unterverzeichnis liegt — zum Beispiel `packages/docs/docmd.config.json` in einem Monorepo — erkennt die Action dies und übergibt automatisch `--cwd` an docmd. Es ist keine manuelle Pfadkonfiguration erforderlich.

## Benutzerdefinierte Domain

Um eine benutzerdefinierte Domain zu verwenden:

1. Fügen Sie eine `CNAME`-Datei in Ihr `docs/`-Verzeichnis (oder Ihren konfigurierten Assets-Ordner) ein, die Ihre Domain enthält, z. B. `docs.example.com`.
2. Setzen Sie das `url`-Feld in `docmd.config.json` auf Ihre benutzerdefinierte Domain, damit Sitemaps und kanonische Tags korrekt sind.
3. Konfigurieren Sie die Domain unter **Settings → Pages → Custom domain**.

## Action-Version festlegen

Für Produktions-Dokumentationsseiten verwenden Sie einen spezifischen Release-Tag anstelle von `@v1`:

```yaml ".github/workflows/docs.yml"
- uses: docmd-io/deploy@v1.0.0
  id: build
```

Dies verhindert unerwartetes Verhalten durch zukünftige Minor-Updates.

## Fehlerbehebung

**`Fehler: Abhängigkeiten-Lockdatei nicht gefunden`**

Dies tritt auf, wenn `actions/setup-node` mit `cache: 'npm'` konfiguriert ist, aber keine `package-lock.json` vorhanden ist. Die `docmd-io/deploy`-Action handhabt das Caching intern — fügen Sie bei Verwendung dieser Action keinen separaten `actions/setup-node`-Schritt mit `cache: 'npm'` hinzu.

**Build erfolgreich, aber Site ist nicht live**

Stellen Sie sicher, dass GitHub Pages so eingestellt ist, dass es von **GitHub Actions** bereitgestellt wird, nicht von einem Branch. Siehe [Ersteinrichtung](#ersteinrichtung) oben.

**Konfiguration nicht erkannt**

Die Action durchsucht bis zu zwei Verzeichnisebenen. Wenn Ihre Konfiguration tiefer liegt, übergeben Sie `--cwd` manuell in einem benutzerdefinierten Workflow-Schritt oder verwenden Sie den [Deployer](./deployer), um eine maßgeschneiderte Workflow-Datei zu generieren.
