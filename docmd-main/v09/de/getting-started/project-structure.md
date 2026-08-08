---
title: "Projektstruktur"
description: "Erfahren Sie, wie `@docmd/core` physische Ordner und Markdown-Dateien dynamischen URLs und sauberer Navigation zuordnet."
---

Der Compiler nutzt Ihr lokales Dateisystem als Quelle der Wahrheit. Verzeichnisse werden zu Navigationsabschnitten, Markdown-Dateien zu Inhaltsseiten, und Ihre Dateisystemhierarchie übersetzt sich direkt in Web-URLs.

## 1. Standard-Projektstruktur

Führen Sie `npx @docmd/core init` aus, um ein minimales Workspace-Layout zu erstellen. Diese Struktur hält Quellinhalte von Assets und Produktions-Builds getrennt.

```text
my-docs/
├── docs/                 ← Quellverzeichnis mit Ihren Markdown (.md)-Seiten
│   └── index.md          ← Die Startseite (wird zu / aufgelöst)
├── assets/               ← Statische Web-Assets, die direkt von der Engine geladen werden
│   ├── css/              ← Eigene Stylesheets zur Anpassung des Seitenlayouts
│   ├── js/               ← Eigene Skripte zur Erweiterung browserseitiger Logik
│   └── images/           ← Markenlogos, Icons und Inline-Illustrationen
├── docmd.config.json     ← Zentrale Konfigurationsdatei
├── package.json          ← Node-Abhängigkeitsmanifest und Skripte
└── site/                 ← Optimiertes Verzeichnis für Produktions-Build-Ausgabe
```

::: callout info "Auflösung von Konfigurationsdateien" icon:settings
`docmd.config.json` (oder `docmd.config.ts`) ist das empfohlene primäre Konfigurationsformat. Das veraltete `docmd.config.js`-Format dient strikt als Fallback, wenn keine `.json`- oder `.ts`-Konfigurationsdateien vorhanden sind.
:::

## 2. Verzeichnis- und URL-Zuordnung

Der Compiler ordnet Dateien innerhalb Ihres Quellordners direkt öffentlichen URLs zu. Es gibt keine nachgestellten `.html`-Dateiendungen oder komplexen Routing-Regeln.

| Quelldatei | Aufgelöster URL-Pfad | Zweck |
| :--- | :--- | :--- |
| `docs/index.md` | `/` | Startseite |
| `docs/api.md` | `/api` | Haupt-API-Referenz |
| `docs/guides/setup.md` | `/guides/setup` | Technischer Leitfaden für Unterabschnitte |
| `docs/getting-started/quick-start.md` | `/getting-started/quick-start` | Mehrebene tiefe Seite |

::: callout tip "Automatische Header-Analyse" icon:info
Fehlt einer Datei ein expliziter `title` in ihrem YAML-Frontmatter, extrahiert die Engine automatisch den ersten `H1`-Überschriften-Tag (`# Überschrift`). Dieser Titel repräsentiert die Seite in Breadcrumbs und der Suchindexierung.
:::

## 3. Workspace-Monorepo-Struktur

Für komplexe Layouts oder große Projekte mit mehreren verschiedenen Produkten (wie einer Kern-Plattform, einem SDK und einem CLI-Tool) unterstützt `docmd` nativ eine **Workspace-Monorepo**-Verzeichnisstruktur. Dies ermöglicht es Ihnen, mehrere unabhängige Dokumentationsseiten aus einem einzigen Root-Repository zu verwalten und gleichzeitig ein einheitliches Branding zu wahren.

```text
my-docs-monorepo/
├── docmd.config.json         ← Root-Konfiguration (definiert globale Einstellungen)
├── assets/                   ← Geteilte globale Assets (von allen Projekten vererbt)
│   ├── css/                  ← Geteilte globale Stylesheets
│   └── images/               ← Geteilte Logos und Icons
├── package.json              ← Root-Abhängigkeitsmanifest
├── main-site/                ← Hauptprojekt-Verzeichnis
│   ├── docmd.config.json     ← Projektspezifische Konfigurations-Overrides
│   └── docs/                 ← Inhalt für main-site (wird zu / aufgelöst)
│       └── index.md
└── sdk-reference/            ← Sekundäres Projekt-Verzeichnis
    ├── docmd.config.json     ← Projektspezifische Konfigurations-Overrides
    └── docs/                 ← Inhalt für sdk-reference (wird zu /sdk aufgelöst)
        └── index.md
```

### Wichtige Workspace-Verzeichnis-Muster

::: grids
    ::: grid
        ::: card "Globale Konfigurationskaskadierung" icon:layers
        Jede in der Root-`docmd.config.json` definierte Konfiguration (wie `theme` oder `menubar`) dient als Fallback-Standard. Einzelne Projekte überschreiben diese Standards selektiv in ihren lokalen Konfigurationsdateien.
        :::
    :::
    ::: grid
        ::: card "Asset-Freigabe & Priorität" icon:folder-tree
        Gemeinsame Logos, globale benutzerdefinierte Stile und allgemeine Skripte befinden sich im Root-Verzeichnis `assets/`. Projektspezifische Assets überschreiben Root-Assets im Falle von Dateinamenskonflikten.
        :::
    :::
    ::: grid
        ::: card "Ausgabenkonsolidierung" icon:package-check
        Während des Build-Prozesses (`npx @docmd/core build`) führt die Engine alle Workspace-Projekte in ein einziges konsolidiertes Ausgabeverzeichnis zusammen (z. B. `./site/` und `./site/sdk/`), wodurch komplexe Reverse-Proxy-Setups überflüssig werden.
        :::
    :::
:::

Für vollständige Einrichtungsschritte und erweiterte Kaskadierungsregeln lesen Sie den [Workspace-Konfigurations-Leitfaden](../configuration/workspaces.md).
