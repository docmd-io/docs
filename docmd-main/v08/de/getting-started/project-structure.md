---
title: "Projektstruktur"
description: "Erfahren Sie, wie `@docmd/core` physische Ordner und Markdown-Dateien auf dynamische URLs und saubere Navigation abbildet."
---

Der Compiler verwendet Ihr lokales Dateisystem als Quelle der Wahrheit. Ordner werden zu Navigationsabschnitten, Markdown-Dateien zu Inhaltsseiten, und Ihre Verzeichnishierarchie übersetzt sich direkt in Web-URLs.

## 1. Standard-Projektgerüst

Führen Sie `npx @docmd/core init` aus, um ein minimales Workspace-Layout einzurichten. Diese Struktur trennt Quellinhalte von Assets und Produktions-Builds.

```text
my-docs/
├── docs/                 ← Quellverzeichnis mit Ihren Markdown- (.md) Seiten
│   └── index.md          ← Die Landingpage (löst zu / auf)
├── assets/               ← Statische Web-Assets, die direkt von der Engine geladen werden
│   ├── css/              ← Eigene Stylesheets zur Layoutanpassung
│   ├── js/               ← Eigene Skripte zur Erweiterung der Browser-Logik
│   └── images/           ← Markenlogos, Icons und Inline-Illustrationen
├── docmd.config.json     ← Zentrales Konfigurations-Schema
├── package.json          ← Node-Abhängigkeits-Manifest und Skripte
└── site/                 ← Optimiertes Produktions-Build-Ausgabeverzeichnis
```

::: callout info "Konfigurationsdatei-Auflösung" icon:settings
`docmd.config.json` (oder `docmd.config.ts`) ist das empfohlene primäre Konfigurationsformat. Das Legacy-Format `docmd.config.js` bleibt unterstützt, dient aber ausschließlich als Fallback, wenn `.json`- oder `.ts`-Konfigurationsdateien fehlen.
:::

## 2. Verzeichnis- und URL-Abbildung

Der Compiler bildet Dateien in Ihrem Quellverzeichnis direkt auf öffentliche URLs ab. Es gibt keine nachgestellten `.html`-Erweiterungen und keine komplexen Routing-Regeln.

| Quelldatei | Aufgelöster URL-Pfad | Zweck |
| :--- | :--- | :--- |
| `docs/index.md` | `/` | Home-Landingpage |
| `docs/api.md` | `/api` | Haupt-API-Referenz |
| `docs/guides/setup.md` | `/guides/setup` | Technischer Leitfaden einer Untersektion |
| `docs/getting-started/quick-start.md` | `/getting-started/quick-start` | Mehrstufige tiefe Seite |

::: callout tip "Automatisches Header-Parsing" icon:info
Fehlt einer Datei der `title` im YAML-Frontmatter, extrahiert die Engine den ersten `H1`-Tag (`# Heading`). Dieser Titel repräsentiert die Seite in Brotkrumen und Suche.
:::

## 3. Workspace-Monorepo-Struktur

Für komplexe Layouts oder große Projekte mit mehreren unterschiedlichen Produkten (z. B. eine Kernplattform, ein SDK und ein CLI-Tool) unterstützt `docmd` nativ eine **Workspace-Monorepo**-Verzeichnisstruktur. Damit können Sie mehrere unabhängige Dokumentations-Sites aus einem einzigen Root-Repository verwalten und gleichzeitig ein einheitliches Branding wahren.

```text
my-docs-monorepo/
├── docmd.config.json         ← Root-Konfiguration (definiert globale Einstellungen)
├── assets/                   ← Geteilte globale Assets (von allen Projekten geerbt)
│   ├── css/                  ← Geteilte globale Stylesheets
│   └── images/               ← Geteilte Logos und Icons
├── package.json              ← Root-Abhängigkeits-Manifest
├── main-site/                ← Root-Projektverzeichnis
│   ├── docmd.config.json     ← Projektspezifische Konfigurations-Overrides
│   └── docs/                 ← Inhalte für main-site (löst zu / auf)
│       └── index.md
└── sdk-reference/            ← Sekundäres Projektverzeichnis
    ├── docmd.config.json     ← Projektspezifische Konfigurations-Overrides
    └── docs/                 ← Inhalte für sdk-reference (löst zu /sdk auf)
        └── index.md
```

### Wichtige Workspace-Verzeichnismuster

*   **Globale Konfigurations-Kaskadierung:** Jede in der Root-`docmd.config.json` definierte Konfiguration (wie `theme` oder `menubar`) dient als Fallback-Standard. Einzelne Projekte können diese Standards in ihren eigenen lokalen Konfigurationsdateien selektiv überschreiben.
*   **Asset-Freigabe und Priorität:** Geteilte Logos, globale eigene Stile und gängige Skripte werden im Root-`assets/`-Verzeichnis abgelegt. Projekte können auch eigene lokale `assets/`-Verzeichnisse definieren; bei Dateinamen-Konflikten haben projektspezifische Assets immer Vorrang.
*   **Ausgabezusammenführung:** Während des Build-Prozesses (`npx @docmd/core build`) führt die Engine automatisch alle Projekte in einem einzigen konsolidierten Produktions-Ausgabeverzeichnis zusammen (z. B. `./site/` und `./site/sdk/`), sodass keine komplexen Reverse-Proxy-Setups oder isolierten Build-Pipelines erforderlich sind.

Vollständige Einrichtungsschritte und erweiterte Kaskadierungsregeln finden Sie im [Workspace-Konfigurations-Leitfaden](../configuration/workspaces.md)。