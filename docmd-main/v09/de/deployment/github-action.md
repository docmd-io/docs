---
title: "GitHub Action"
description: "Erstellen und stellen Sie docmd-Dokumentation auf GitHub Pages mit der offiziellen GitHub Action docmd-io/deploy bereit."
---

Die GitHub Action `docmd-io/deploy` kompiliert Ihre Dokumentations-Website und macht den generierten Build-Artefaktpfad für nachgelagerte Veröffentlichungsschritte verfügbar.

::: button "Auf dem GitHub Marketplace ansehen" external:https://github.com/marketplace/actions/build-and-deploy-documentation-with-docmd icon:github
::: button "Quellcode" external:https://github.com/docmd-io/deploy icon:code

::: callout tip "Starten Sie ein neues Projekt?" icon:rocket
Verwenden Sie das [Starter-Template](./starter-template) für neue Repositories. Die eigenständige GitHub Action wurde entwickelt, um die docmd-Kompilierung in **bestehende** Repositories zu integrieren.
:::

## Workflow-Konfiguration

Fügen Sie die Action zu `.github/workflows/docs.yml` hinzu:

```yaml ".github/workflows/docs.yml"
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

## Wiederverwendbares Workflow-Muster

Für Setups ohne Boilerplate referenzieren Sie den gehosteten wiederverwendbaren Workflow:

```yaml ".github/workflows/docs.yml"
on:
  push:
    branches: [main]

jobs:
  docs:
    uses: docmd-io/deploy/.github/workflows/deploy.yml@v1
```

## Action-Eingaben & -Ausgaben

### Eingaben

| Parameter | Typ | Standard | Technische Beschreibung |
| :--- | :--- | :--- | :--- |
| `node` | `string` | `"20"` | Ziel-Node.js-Engine-Version für die Build-Ausführung. |

### Ausgaben

| Parameter | Technische Beschreibung |
| :--- | :--- |
| `site-dir` | Relativer Pfad zum kompilierten statischen Site-Ausgabeverzeichnis (z. B. `site/`). |

## Build-Ausführungsschritte

Die Action führt den folgenden internen Workflow aus:

1. **Umgebungseinrichtung**: Konfiguriert die angegebene Node.js-Laufzeitversion.
2. **Automatische Konfigurationserkennung**: Durchsucht bis zu 2 Verzeichnisebenen tief nach `docmd.config.json`, `docmd.config.js` oder `docmd.config.ts`.
3. **Automatische Initialisierung**: Wenn keine Konfiguration entdeckt wird, löst sie automatisch `npx @docmd/core init` aus.
4. **Abhängigkeitsauflösung**: Führt `npm ci` aus, wenn `package.json` vorhanden ist; andernfalls wird `@docmd/core` direkt installiert.
5. **Statischer Site-Build**: Löst `npx @docmd/core build` aus und erfasst die Ausgabeverzeichnis-Pfade.

## Repository-Einrichtung für GitHub Pages

Konfigurieren Sie GitHub Pages für die Bereitstellung aus **GitHub Actions**:

1. Öffnen Sie Ihr Repository auf GitHub.
2. Navigieren Sie zu **Settings → Pages**.
3. Wählen Sie unter **Build and deployment → Source** die Option **GitHub Actions**.

## Unterpfad- & benutzerdefinierte Domain-Konfiguration

### Unterpfad-Bereitstellung

GitHub Pages stellt Projekt-Websites unter Unterpfaden bereit (`https://<username>.github.io/<repository>/`). Geben Sie Ihre vollständige Site-URL in `docmd.config.json` an:

```json "docmd.config.json"
{
  "url": "https://username.github.io/my-repo"
}
```

docmd extrahiert das Pfadpräfix `/my-repo/` automatisch und wendet es auf interne Asset-Referenzen und Navigationslinks an.

### Benutzerdefinierte Domains

So konfigurieren Sie eine benutzerdefinierte Domain:

1. Fügen Sie eine `CNAME`-Datei mit Ihrem Hostnamen (z. B. `docs.example.com`) in `docs/` ein.
2. Aktualisieren Sie die Eigenschaft `url` in `docmd.config.json` passend zu Ihrer Domain.
3. Konfigurieren Sie die benutzerdefinierte Domain unter **Settings → Pages → Custom domain**.

::: callout tip "Action-Releases pinnen" icon:shield-check
Für Produktionsumgebungen pinnen Sie Ihre Workflow-Schritte auf explizite Versions-Tags (z. B. `uses: docmd-io/deploy@v1.0.0`), um sich vor unerwarteten Breaking Changes zu schützen.
:::