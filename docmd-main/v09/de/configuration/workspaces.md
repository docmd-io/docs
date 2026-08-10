---
title: "Multi-Projekt-Workspaces"
description: "Bauen und deployen Sie Multi-Projekt-Dokumentations-Websites aus einem einzigen Repository mit geteilten Assets und Projekt-Umschaltern in docmd."
---

Workspaces ermöglichen es Ihnen, mehrere unabhängige Dokumentationsprojekte aus einem einzigen Repository zu bauen und zu deployen. Jedes Unterprojekt behält seine eigenen Konfigurationsoptionen und erbt gleichzeitig globale Standards, die im Workspace-Root definiert sind.

```text
docs.example.com/           → Haupt-Produktdokumentation
docs.example.com/sdk/       → SDK-API-Referenz
docs.example.com/cli/       → CLI-Tooling-Leitfaden
```

## Verzeichnis-Einrichtung

Organisieren Sie Ihr Repository in separate Projekt-Unterverzeichnisse. Geteilte statische Assets und globale Workspace-Konfigurationen befinden sich im Repository-Root:

```text
my-docs/
├── assets/                   ← Geteilte statische Assets (von allen Projekten vererbt)
├── main-docs/
│   ├── docmd.config.json     ← Projektkonfiguration (überschreibt Root-Standards)
│   └── docs/                 ← Hauptprojekt Markdown-Inhalte
├── sdk-docs/
│   ├── docmd.config.json     ← SDK-Projektkonfiguration
│   └── docs/                 ← SDK-Projekt Markdown-Inhalte
├── docmd.config.json         ← Workspace-Root-Konfiguration
└── package.json
```

## Workspace-Konfigurationsschema

Die Datei `docmd.config.json` im Root verwendet den Schlüssel `workspace` zur Deklaration von Projekten. Top-Level-Parameter (z. B. `theme`, `menubar`, `logo`) dienen als **globale Standards** für alle Unterprojekte:

```json "docmd.config.json"
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
    { "text": "GitHub", "url": "https://github.com/docmd-io/docmd", "external": true }
  ]
}
```

### `workspace`-Optionen

| Eigenschaft | Typ | Beschreibung |
| :--- | :--- | :--- |
| `projects` | `Array` | Liste von Projekteinträgen. Genau ein Projekt muss `prefix: "/"` zuweisen. |
| `switcher` | `Object` | Steuert Position und Rendering des [Projekt-Umschaltmenüs](#das-projekt-umschaltmenü-ui). |

### Felder der Projekteinträge

| Feld | Typ | Erforderlich | Beschreibung |
| :--- | :--- | :--- | :--- |
| `prefix` | `String` | Ja | URL-Routenpräfix. Verwenden Sie `"/"` für das Root-Projekt. |
| `src` | `String` | Ja | Unterverzeichnispfad mit Projektinhalten und optionaler `docmd.config.json`. |
| `title` | `String` | Nein | Im Projekt-Umschaltmenü angezeigter Name. |

## Übersteuerungen auf Projektebene

Unterprojekte können eigene `docmd.config.json`-Manifeste führen. Auf Projektebene definierte Parameter **überschreiben** die Standards des Workspace-Roots:

```json "docmd.config.json"
{
  "title": "SDK Reference",
  "src": "docs",
  "plugins": {
    "search": {},
    "openapi": {}
  }
}
```

Wenn ein Unterprojekt keine lokale Konfigurationsdatei hat, wendet der Compiler automatisches Zero-Config-Routing mit den Workspace-Standards an.

## Konfigurations-Kaskadierungshierarchie

Konfigurationsoptionen kaskadieren über ein 3-stufiges Rangfolgemodell:

| Stufe | Priorität | Beschreibung |
| :--- | :--- | :--- |
| **Root-Workspace-Konfiguration** | Basis-Standard | Wird zuerst auf alle Workspace-Projekte angewendet. |
| **Projektkonfiguration (`docmd.config.json`)** | Höher | Überschreibt Root-Workspace-Standards für dieses spezifische Projekt. |
| **Projektnavigation (`navigation.json`)** | Höchste Priorität | Hat immer Vorrang beim Rendering der Sidebars. |

::: callout info title:"Navigations-Vorrang" icon:info
Ein `navigation.json`-Manifest auf Projektebene **hat immer Vorrang** vor jedem globalen `navigation`-Array, das in der Root-Workspace-Konfiguration definiert ist.
::: /callout

## Das Projekt-Umschaltmenü UI

Der Projekt-Umschalter rendert eine barrierefreie Dropdown-Komponente, die es Lesern ermöglicht, zwischen Workspace-Unterprojekten zu wechseln:

```json "docmd.config.json"
{
  "workspace": {
    "switcher": {
      "enabled": true,
      "position": "sidebar-top"
    }
  }
}
```

| Position | Rendering-Ort |
| :--- | :--- |
| `sidebar-top` (Standard) | Oben in der Sidebar angeheftet, über den Navigationslinks. |
| `sidebar-bottom` | Unten in der Sidebar angeheftet. |
| `options-menu` | In das Header-Optionsmenü neben Suche und Theme-Schaltern integriert. |

Der Projekt-Umschalter wird automatisch gerendert, wenn zwei oder mehr Workspace-Projekte deklariert sind.

## Asset-Verwaltung

- **Geteilte Assets**: Platzieren Sie Logos, Favicons und globales benutzerdefiniertes CSS im Root-Verzeichnis `assets/`. Alle Workspace-Projekte erben diese Assets während der Entwicklung und Build-Kompilierung.
- **Projekt-Assets**: Unterprojekte können lokale `assets/`-Unterverzeichnisse führen. Projektspezifische Assets überschreiben geteilte Root-Assets bei Dateinamenskonflikten.

## Entwicklungs- & Build-Befehle

::: tabs
== tab "Entwicklungsserver" icon:play
Führen Sie den Multi-Projekt-Dev-Server aus:
```bash
npx @docmd/core dev
```
Baut alle Workspace-Projekte und stellt sie auf einem einzigen HTTP-Port bereit. Dateibearbeitungen lösen gezielte Hot-Updates pro Projekt aus, ohne den gesamten Workspace neu zu bauen.
== tab "Produktions-Build" icon:box
Generieren Sie das Produktionspaket:
```bash
npx @docmd/core build
```
Gibt ein einzelnes konsolidiertes statisches Verzeichnis aus. Alle Projekte kompilieren in ihre jeweiligen Unterpfade, ohne dass Reverse-Proxy-Setups erforderlich sind.
:::

## Workspace-Einschränkungen

1. **Root-Projekt-Anforderung**: Genau ein Projekt muss `prefix: "/"` zuweisen.
2. **Eindeutige Routenpräfixe**: Jedes Projekt muss eine eindeutige URL-Präfix-Zeichenkette verwenden.
3. **Root-Level `out`-Steuerung**: Das Ausgabeverzeichnis (`out`) wird ausschließlich auf Workspace-Root-Ebene konfiguriert; Unterprojekt-Konfigurationen dürfen `out` nicht angeben.

## Konfigurations-Schema-Migration

Um ältere Workspace-Definitionen auf das moderne `workspace`-Schemaformat zu aktualisieren, führen Sie den automatisierten CLI-Migrationshelfer aus:

::: callout tip "Automatisches Konfigurations-Upgrade" icon:sparkles
Führen Sie `npx @docmd/core migrate --upgrade` aus, um alte Konfigurationsdateien automatisch auf das v0.9.0-Workspace-Schema umzuschreiben.
:::
