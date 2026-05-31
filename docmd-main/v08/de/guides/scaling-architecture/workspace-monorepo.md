---
title: "Workspace- & Monorepo-Architektur"
description: "So nutzen Sie den Workspace-Modus von docmd, um mehrere unabhängige Dokumentationsprojekte aus einem einzigen Repository ohne Redundanz zu verwalten."
---

## Das Problem

Große Organisationen pflegen Dokumentationen für mehrere unabhängige Produkte – z. B. ein SDK, ein CLI-Tool und eine Hauptplattform –, die jeweils eigene Versionierungen, Navigationsstrukturen und Release-Zyklen haben. Das Betreiben separater Dokumentations-Websites für jedes Produkt führt zu Redundanz: separate CI-Pipelines, separate Theme-Konfigurationen und separate Deployment-Jobs.

## Warum es wichtig ist

Fragmentierte Dokumentation ist schwer zu pflegen und verwirrt die Benutzer. Wenn die SDK-Dokumentation anders aussieht als die Plattform-Dokumentation, verlieren Benutzer das Vertrauen. Wenn jedes Projekt einen eigenen CI-Job benötigt, steigt Ihr Entwicklungsaufwand mit der Anzahl der Produkte. Ein einheitlicher Workspace löst beide Probleme mit einer einzigen Konfigurationsdatei.

## Der Ansatz

Verwenden Sie den **Workspace-Modus** von docmd. Definieren Sie alle Projekte in einer einzigen Root-Datei `docmd.config.json`. Legen Sie globale Standardwerte (Theme, Menüleiste, Logo) einmalig fest. Jedes Projekt erbt diese und kann bei Bedarf Werte überschreiben. Ein einziger Build-Befehl erzeugt ein einziges, direkt bereitstellbares Verzeichnis.

## Implementierung

### 1. Repository-Struktur

```text
my-org-docs/
├── assets/                   ← Gemeinsames Logo, Favicon, globales CSS
├── main-docs/                ← prefix: /
│   ├── docmd.config.json
│   └── docs/
├── sdk-docs/                 ← prefix: /sdk
│   ├── docmd.config.json
│   └── docs/
├── cli-docs/                 ← prefix: /cli
│   ├── docmd.config.json
│   └── docs/
├── docmd.config.json         ← Workspace-Root
└── package.json
```

### 2. Root-Workspace-Konfiguration

Definieren Sie globale Einstellungen einmal. Alle Projekte erben diese automatisch.

```json
{
  "workspace": {
    "projects": [
      { "prefix": "/",    "src": "main-docs", "title": "Plattform-Doku" },
      { "prefix": "/sdk", "src": "sdk-docs",  "title": "SDK-Referenz" },
      { "prefix": "/cli", "src": "cli-docs",  "title": "CLI-Referenz" }
    ],
    "switcher": {
      "enabled": true,
      "position": "sidebar-top"
    }
  },
  "theme": { "name": "default", "appearance": "system" },
  "logo": {
    "light": "assets/logo-dark.svg",
    "dark": "assets/logo-light.svg",
    "alt": "My Org"
  },
  "menubar": [
    { "text": "Plattform", "url": "/" },
    { "text": "SDK",      "url": "/sdk" },
    { "text": "CLI",      "url": "/cli" }
  ]
}
```

### 3. Projekt-spezifische Konfiguration

Jedes Projekt gibt nur das an, was vom Root abweicht. Dieses Beispiel für das SDK-Projekt fügt OpenAPI-Unterstützung hinzu und legt einen eigenen `title` fest:

```json
{
  "title": "SDK-Referenz",
  "src": "docs",
  "plugins": {
    "search": {},
    "openapi": {},
    "git": { "repo": "https://github.com/my-org/sdk" }
  },
  "versions": {
    "current": "v2",
    "all": [
      { "id": "v2", "dir": "docs",    "label": "v2.x (Stabil)" },
      { "id": "v1", "dir": "docs-v1", "label": "v1.x (Legacy)" }
    ]
  }
}
```

Das globale `theme`, das `logo` und die `menubar` aus der Root-Konfiguration werden weiterhin angewendet. Das SDK-Projekt fügt lediglich seine eigenen Plugins und Versionen hinzu.

### 4. Build & CI

Bauen Sie den gesamten Workspace mit einem einzigen Befehl:

```bash
npx @docmd/core build
```

Ein minimaler GitHub Actions-Workflow für CI/CD:

```yaml
name: Deploy Docs
on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'
      - run: npm install
      - run: npx @docmd/core build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: site/
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
    steps:
      - uses: actions/deploy-pages@v4
```

Oder generieren Sie den Workflow automatisch:

```bash
npx @docmd/core deploy --github-pages
```

### 5. Projekt-spezifische Entwicklungs-Rebuilds

Während der Entwicklung lösen Dateiänderungen gezielte Rebuilds nur für das betroffene Projekt aus:

```bash
npx @docmd/core dev
```

- Das Ändern einer Datei in `sdk-docs/docs/` baut nur das SDK-Projekt neu.
- Das Ändern der Root-Datei `docmd.config.json` löst einen vollständigen Workspace-Rebuild aus.
- Das Ändern einer gemeinsamen `assets/`-Datei baut alle Projekte neu auf.

### 6. Projekt-Switcher

Der integrierte Projekt-Switcher ermöglicht es Benutzern, zwischen Projekten zu navigieren, ohne die Dokumentations-Website verlassen zu müssen. Er wird automatisch aus dem `projects`-Array in der Root-Konfiguration befüllt. Das Feld `title` jedes Eintrags wird als Anzeigename verwendet.

```json
"switcher": {
  "enabled": true,
  "position": "sidebar-top"
}
```

Verfügbare Positionen: `sidebar-top` (Standard), `sidebar-bottom`, `options-menu`.

## Abwägungen

### Build-Dauer
Das Bauen von 3 Projekten dauert ungefähr dreimal so lange wie das eines einzelnen Projekts. Erwägen Sie bei sehr großen Workspaces (mehr als 10 Projekte), diese in separate CI-Jobs aufzuteilen, die auf einen gemeinsamen CDN-Pfad veröffentlichen.

### Präfixkonflikte
Wenn Ihr Root-Projekt einen Ordner namens `sdk/` hat und Sie außerdem ein Projekt mit `prefix: "/sdk"` definieren, gewinnt das präfigierte Projekt. Die Engine gibt eine Warnung aus. Überprüfen Sie Ihre Verzeichnisstruktur, bevor Sie neue Präfixe hinzufügen.

### Gemeinsame Navigation
Ein globales `navigation`-Array in der Root-Konfiguration ist als Fallback nützlich. Jedes Projekt sollte jedoch im Idealfall seine eigene `navigation.json` für eine präzise Steuerung verwalten. Siehe [Navigationskonfiguration](../../configuration/navigation.md).