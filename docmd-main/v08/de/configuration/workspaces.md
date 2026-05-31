---
title: "Workspaces"
description: "Erstellen Sie mehrere unabhängige Dokumentationsprojekte aus einer einzigen docmd-Instanz, mit globaler Konfigurationsvererbung und einem integrierten Projekt-Switcher."
---

Mit Workspaces können Sie mehrere Dokumentationsprojekte aus einem einzigen Repository erstellen und bereitstellen. Jedes Projekt behält seine eigene Konfiguration. Globale Einstellungen, die am Workspace-Root definiert sind, vererben sich automatisch an jedes Projekt.

```text
docs.example.com/           → Hauptdokumentation
docs.example.com/sdk/       → SDK-Referenz
docs.example.com/cli/       → CLI-Dokumentation
```

## Einrichtung

### 1. Verzeichnisstruktur

Ein Verzeichnis pro Projekt. Gemeinsame Assets und die globale Konfiguration befinden sich im Repository-Root.

```text
my-docs/
├── assets/                   ← Gemeinsame Assets (werden von allen Projekten geerbt)
├── main-docs/
│   ├── docmd.config.json     ← Projektkonfiguration (überschreibt Root-Standards)
│   └── docs/                 ← Projektinhalte
├── sdk-docs/
│   ├── docmd.config.json
│   └── docs/
├── docmd.config.json         ← Workspace-Root-Konfiguration
└── package.json
```

### 2. Root-Workspace-Konfiguration

Die Root-Datei `docmd.config.json` verwendet den Schlüssel `workspace`. Alle übergeordneten Schlüssel (z. B. `theme`, `menubar`, `logo`) dienen als **globale Standardwerte** für jedes Projekt.

```json
{
  "workspace": {
    "projects": [
      { "prefix": "/",    "src": "main-docs", "title": "Doku" },
      { "prefix": "/sdk", "src": "sdk-docs",  "title": "SDK-Referenz" }
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
| `projects` | `Array` | Liste der Projekteinträge. Mindestens ein Eintrag muss `prefix: "/"` verwenden. |
| `switcher` | `Object` | Steuert die Sichtbarkeit und Position des [Projekt-Switchers](#projekt-switcher). |

#### Projekteintragsfelder

| Schlüssel | Typ | Erforderlich | Beschreibung |
| :-- | :--- | :------- | :---------- |
| `prefix` | `String` | ✅ | URL-Präfix. Verwenden Sie `"/"` für das Root-Projekt. |
| `src` | `String` | ✅ | Verzeichnispfad (relativ zum CWD), der die Inhalte des Projekts und eine optionale `docmd.config.json` enthält. |
| `title` | `String` | - | Anzeigename, der in der UI des Projekt-Switchers angezeigt wird. |

### 3. Konfiguration auf Projektebene

Jedes Projektverzeichnis kann eine eigene `docmd.config.json` besitzen. Hier definierte Einstellungen **überschreiben** die Standards des Workspace-Roots.

```json
{
  "title": "SDK-Referenz",
  "src": "docs",
  "plugins": {
    "search": {},
    "openapi": {}
  }
}
```

Wenn keine lokale Konfigurationsdatei gefunden wird, wendet die Engine ein Zero-Config-Auto-Routing unter Verwendung der Workspace-Standards an.

### 4. Globale Konfigurationsvererbung

Jeder im Root-Workspace definierte Schlüssel gilt automatisch für jedes Projekt. Projektkonfigurationen können selektiv alle diese globalen Werte überschreiben.

| Ebene | Priorität |
| :---- | :--------- |
| Root-Workspace-Konfiguration | Niedrigste (wird zuerst als Standard angewendet) |
| Projekt-`docmd.config.json` | Höher (überschreibt Root-Standards) |
| Projekt-`navigation.json` | Höchste (gewinnt immer für die Navigation) |

**Beispiel**: Definieren Sie Ihr globales `theme` und `menubar` einmal im Root. Jedes Projekt muss nur `title`, `src` and seine eigenen `plugins` festlegen.

::: callout info "Priorität der Navigation" icon:info
Eine `navigation.json`-Datei auf Projektebene **hat immer Vorrang** vor jedem `navigation`-Array, das in der Root-Konfiguration des Workspace definiert ist. Wenn keine von beiden existiert, fällt docmd auf die automatische Verzeichnis-Scannung zurück.
:::

## Projekt-Switcher

Der Projekt-Switcher rendert eine schlanke UI-Komponente zum Navigieren zwischen Workspace-Projekten.

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
| `sidebar-top` (Standard) | Oben in der Seitenleiste angeheftet, über der Navigation. |
| `sidebar-bottom` | Unten in der Seitenleiste angeheftet. |
| `options-menu` | Integriert in das Header-Optionsmenü neben Suche und Theme-Umschaltern. |

Der Switcher wird nur gerendert, wenn zwei oder mehr Projekte definiert sind.

## Assets

### Gemeinsame Assets
Platzieren Sie Logos, Favicons und globales CSS im Root-Verzeichnis `assets/`. Die Engine kopiert diese bei `dev` und `build` automatisch in die Ausgabe jedes Projekts.

### Projektspezifische Assets
Jedes Projekt kann ein eigenes `assets/`-Verzeichnis besitzen. Projekt-Assets haben bei Namenskonflikten Vorrang vor gemeinsamen Assets.

## Bauen & Entwicklung

### Dev-Server
```bash
npx @docmd/core dev
```
Baut alle Projekte und stellt sie über einen einzigen Port bereit. Dateiänderungen lösen **zielgerichtete, projektspezisifische** Rebuilds aus - nur das modifizierte Projekt wird neu gerendert, nicht der gesamte Workspace. Änderungen an der Root-Konfiguration lösen einen vollständigen Workspace-Rebuild aus.

### Produktions-Build
```bash
npx @docmd/core build
```
Gibt ein einzelnes statisches Verzeichnis aus. Alle Projekte werden in ihre jeweiligen Unterpfade zusammengeführt. Es ist kein Reverse-Proxy oder eine komplexe CI-Pipeline erforderlich.

## Regeln & Einschränkungen

1. **Root-Projekt erforderlich**: Genau ein Projekt muss `prefix: "/"` verwenden.
2. **Eindeutige Präfixe**: Jedes Projekt muss ein eindeutiges URL-Präfix verwenden.
3. **`out` nur im Root**: Nur die Root-Workspace-Konfiguration steuert das Ausgabeverzeichnis. Konfigurationen von Child-Projekten dürfen `out` nicht definieren.
4. **Keine Präfixkonflikte**: Wenn ein Root-Projekt einen Ordner namens `sdk/` hat und ein anderes Projekt `prefix: "/sdk"` verwendet, gibt die Engine eine Konfliktwarnung aus. Das präfigierte Projekt gewinnt immer.

## Migration von Legacy-Konfigurationen

Die Syntax des `projects`-Arrays vor 0.8.3 und andere ältere Konfigurationsschlüssel werden zur Abwärtskompatibilität automatisch in das moderne `workspace`-Schema überführt.

Obwohl manuelle Updates nicht zwingend erforderlich sind, können Sie Ihre Konfigurationsdatei mithilfe der CLI automatisch auf das moderne Schema aktualisieren.

::: callout tip "Mit einem Befehl migrieren" icon:lightbulb
Führen Sie `npx @docmd/core migrate --upgrade` aus, um Ihre Root-Konfiguration automatisch auf das aktuelle Schema umzuschreiben.
:::