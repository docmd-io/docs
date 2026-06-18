---
title: "Workspaces"
description: "Erstellen Sie mehrere unabhängige Dokumentationsprojekte aus einer einzigen docmd-Instanz, mit kaskadierender globaler Konfiguration und eingebautem Projekt-Switcher."
---

Workspaces ermöglichen es Ihnen, mehrere Dokumentationsprojekte aus einem Repository zu erstellen und bereitzustellen. Jedes Projekt behält seine eigene Konfiguration. Globale Einstellungen, die am Workspace-Stamm definiert sind, kaskadieren automatisch in jedes Projekt.

```text
docs.example.com/           → Hauptdokumentation
docs.example.com/sdk/       → SDK-Referenz
docs.example.com/cli/       → CLI-Dokumentation
```

## Einrichtung

### 1. Verzeichnisstruktur

Ein Verzeichnis pro Projekt. Geteilte Assets und globale Konfiguration leben im Repository-Stamm.

```text
my-docs/
├── assets/                   ← geteilte Assets (alle Projekte erben diese)
├── main-docs/
│   ├── docmd.config.json     ← Projekt-Konfiguration (überschreibt Root-Standards)
│   └── docs/                 ← Projektinhalte
├── sdk-docs/
│   ├── docmd.config.json
│   └── docs/
├── docmd.config.json         ← Workspace-Root-Konfiguration
└── package.json
```

### 2. Root-Workspace-Konfiguration

Die Root-`docmd.config.json` verwendet den `workspace`-Schlüssel. Alle Top-Level-Schlüssel (z. B. `theme`, `menubar`, `logo`) wirken als **globale Standards** für jedes Projekt.

```json
{
  "workspace": {
    "projects": [
      { "prefix": "/",    "src": "main-docs", "title": "Docs" },
      { "prefix": "/sdk", "src": "sdk-docs",  "title": "SDK Reference" }
    ],
    "switcher": {
      "enabled": true,
      "position": "sidebar-top"
    }
  },
  "theme": { "name": "default", "appearance": "system" },
  "logo": {
    "light": "assets/logo-dark.svg",
    "dark": "assets/logo-light.svg"
  },
  "menubar": [
    { "text": "GitHub", "url": "https://github.com/my-org/my-repo", "external": true }
  ]
}
```

#### `workspace`-Optionen

| Schlüssel | Typ | Beschreibung |
| :-- | :--- | :---------- |
| `projects` | `Array` | Liste der Projekt-Einträge. Mindestens einer muss `prefix: "/"` verwenden. |
| `switcher` | `Object` | Steuert Sichtbarkeit und Position des [Projekt-Switchers](#projekt-switcher). |

#### Felder der Projekt-Einträge

| Schlüssel | Typ | Erforderlich | Beschreibung |
| :-- | :--- | :------- | :---------- |
| `prefix` | `String` | ✅ | URL-Präfix. Für das Root-Projekt `"/"` verwenden. |
| `src` | `String` | ✅ | Verzeichnispfad (relativ zu CWD) mit Projektinhalten und optionaler `docmd.config.json`. |
| `title` | `String` | - | Anzeigename in der Projekt-Switcher-UI. |

### 3. Projekt-Konfiguration

Jedes Projektverzeichnis kann eine eigene `docmd.config.json` haben. Hier definierte Einstellungen **überschreiben** die Workspace-Root-Standards.

```json
{
  "title": "SDK Reference",
  "src": "docs",
  "plugins": {
    "search": {},
    "openapi": {}
  }
}
```

Wird keine lokale Konfigurationsdatei gefunden, wendet die Engine Zero-Config-Auto-Routing mit den Workspace-Standards an.

### 4. Globale Konfigurations-Kaskadierung

Jeder in der Root-Workspace-Konfiguration definierte Schlüssel wird automatisch auf jedes Projekt angewendet. Projektkonfigurationen können diese Globalen selektiv überschreiben.

| Ebene | Priorität |
| :---- | :--------- |
| Root-Workspace-Konfiguration | Niedrigste (zuerst als Standards angewendet) |
| Projekt-`docmd.config.json` | Höher (überschreibt Root-Standards) |
| Projekt-`navigation.json` | Höchste (gewinnt immer für Navigation) |

**Beispiel**: Definieren Sie Ihr globales `theme` und `menubar` einmal am Root. Jedes Projekt muss nur `title`, `src` und seine eigenen `plugins` setzen.

::: callout info "Navigations-Priorität" icon:info
Eine projektweite `navigation.json` **hat immer Vorrang** vor jedem in der Workspace-Root-Konfiguration definierten `navigation`-Array. Existiert weder das eine noch das andere, fällt docmd auf automatisches Verzeichnis-Scanning zurück.
:::

## Projekt-Switcher

Der Projekt-Switcher rendert eine schlanke UI-Komponente zur Navigation zwischen Workspace-Projekten.

### Konfiguration

```json
{
  "workspace": {
    "switcher": {
      "enabled": true,
      "position": "sidebar-top"
    }
  }
}
```

| Position | Beschreibung |
| :------- | :---------- |
| `sidebar-top` (Standard) | Oben in der Sidebar fixiert, über der Navigation. |
| `sidebar-bottom` | Unten in der Sidebar fixiert. |
| `options-menu` | In das Header-Optionsmenü neben Suche und Theme-Toggles integriert. |

Der Switcher rendert nur, wenn zwei oder mehr Projekte definiert sind.

## Assets

### Geteilte Assets
Platzieren Sie Logos, Favicons und globales CSS im Root-`assets/`-Verzeichnis. Die Engine kopiert diese sowohl bei `dev` als auch bei `build` automatisch in die Ausgabe jedes Projekts.

### Projekt-spezifische Assets
Jedes Projekt kann ein eigenes `assets/`-Verzeichnis haben. Bei Dateinamen-Konflikten haben Projekt-Assets Vorrang vor geteilten Assets.

## Build & Entwicklung

### Dev-Server
```bash
npx @docmd/core dev
```
Baut alle Projekte und stellt sie über einen einzigen Port bereit. Dateiänderungen lösen **gezielte, projektweise** Rebuilds aus — nur das geänderte Projekt rendert neu, nicht der gesamte Workspace. Änderungen an der Root-Konfiguration lösen einen vollständigen Workspace-Rebuild aus.

### Produktions-Build
```bash
npx @docmd/core build
```
Gibt ein einzelnes statisches Verzeichnis aus. Alle Projekte werden in ihre jeweiligen Unterpfade zusammengeführt. Kein Reverse-Proxy oder komplexe CI-Pipelines erforderlich.

## Regeln & Einschränkungen

1. **Root-Projekt erforderlich**: Genau ein Projekt muss `prefix: "/"` haben.
2. **Eindeutige Präfixe**: Jedes Projekt muss ein eindeutiges URL-Präfix verwenden.
3. **`out` nur am Root**: Nur die Root-Workspace-Konfiguration steuert das Ausgabeverzeichnis. Projekt-Konfigurationen dürfen kein `out` definieren.
4. **Keine Präfix-Konflikte**: Wenn ein Root-Projekt einen Ordner namens `sdk/` hat und ein anderes Projekt `prefix: "/sdk"` verwendet, gibt die Engine eine Konfliktwarnung aus. Das Projekt mit Präfix gewinnt immer.

## Migration von Legacy-Konfigurationen

Die Pre-0.8.3-`projects`-Array-Syntax und andere Legacy-Konfigurationsschlüssel werden automatisch auf das moderne `workspace`-Schema normalisiert, um Abwärtskompatibilität zu gewährleisten.

Obwohl manuelle Aktualisierungen nicht zwingend erforderlich sind, können Sie Ihre Konfigurationsdatei mit der CLI automatisch auf das moderne Schema aktualisieren.

::: callout tip "Mit einem Befehl migrieren" icon:lightbulb
Führen Sie `npx @docmd/core migrate --upgrade` aus, um Ihre Root-Konfiguration automatisch auf das aktuelle Schema umzuschreiben.
:::
