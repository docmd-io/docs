---
title: "Projektstruktur"
description: "Erfahren Sie, wie `@docmd/core` physische Ordner und Markdown-Dateien auf dynamische URLs und eine saubere Navigation abbildet."
---

Der Compiler verwendet Ihr lokales Dateisystem als Quelle der Wahrheit. Ordner werden zu Navigationsabschnitten, Markdown-Dateien zu Inhaltsseiten. Ihre Verzeichnishierarchie wird direkt in Web-URLs übersetzt.

## 1. Standard-Projektgerüst

Führen Sie `npx @docmd/core init` aus, um ein minimales Workspace-Layout zu erstellen. Diese Struktur trennt Quellinhalte von Assets und Produktions-Builds.

```text
my-docs/
├── docs/                 ← Quellverzeichnis mit Ihren Markdown-Seiten (.md)
│   └── index.md          ← Die Startseite (wird zu / aufgelöst)
├── assets/               ← Statische Web-Assets, die direkt von der Engine geladen werden
│   ├── css/              ← Eigene Stylesheets zur Anpassung des Seitenlayouts
│   ├── js/               ← Eigene Skripte zur Erweiterung der clientseitigen Logik
│   └── images/           ← Markenlogos, Icons und eingebettete Grafiken
├── docmd.config.json     ← Zentrales Konfigurationsschema
├── package.json          ← Node-Abhängigkeitsmanifest und Skripte
└── site/                 ← Optimiertes Produktions-Build-Ausgabeverzeichnis
```

::: callout info "Auflösung der Konfigurationsdatei" icon:settings
`docmd.config.json` (oder `docmd.config.ts`) ist das empfohlene primäre Konfigurationsformat. Das veraltete `docmd.config.js`-Format wird weiterhin unterstützt, dient jedoch nur als Ausweichlösung, wenn keine `.json`- oder `.ts`-Konfigurationsdateien vorhanden sind.
:::

## 2. Zuordnung von Verzeichnissen und URLs

Der Compiler ordnet Dateien in Ihrem Quellordner direkt öffentlichen URLs zu. Es gibt keine nachgestellten `.html`-Erweiterungen oder komplexe Routing-Regeln.

| Quelldatei | Aufgelöster URL-Pfad | Zweck |
| :--- | :--- | :--- |
| `docs/index.md` | `/` | Startseite |
| `docs/api.md` | `/api` | Haupt-API-Referenz |
| `docs/guides/setup.md` | `/guides/setup` | Technischer Leitfaden für Unterabschnitt |
| `docs/getting-started/quick-start.md` | `/getting-started/quick-start` | Mehrstufige Inhaltsseite |

::: callout tip "Automatische Überschriftenanalyse" icon:info
Wenn eine Datei keinen `title` im YAML-Frontmatter enthält, extrahiert die Engine die erste `H1`-Überschrift (`# Überschrift`). Dieser Titel repräsentiert die Seite in Breadcrumbs und der Suche.
:::

## 3. Workspace-Monorepo-Struktur

Für komplexe Layouts oder große Projekte mit mehreren unterschiedlichen Produkten (wie einer Kernplattform, einem SDK und einem CLI-Tool) unterstützt `docmd` nativ eine **Workspace-Monorepo**-Verzeichnisstruktur. Dies ermöglicht es Ihnen, mehrere unabhängige Dokumentations-Websites aus einem einzigen Root-Repository zu verwalten und gleichzeitig ein einheitliches Branding beizubehalten.

```text
my-docs-monorepo/
├── docmd.config.json         ← Root-Konfiguration (definiert globale Einstellungen)
├── assets/                   ← Gemeinsam genutzte globale Assets (von allen Projekten geerbt)
│   ├── css/                  ← Gemeinsam genutzte globale Stylesheets
│   └── images/               ← Gemeinsam genutzte logos und Icons
├── package.json              ← Root-Abhängigkeitsmanifest
├── main-site/                ← Hauptprojekt-Verzeichnis
│   ├── docmd.config.json     ← Projektspezifische Konfigurations-Überschreibungen
│   └── docs/                 ← Inhalt für Hauptprojekt (wird zu / aufgelöst)
│       └── index.md
└── sdk-reference/            ← Sekundäres Projektverzeichnis
    ├── docmd.config.json     ← Projektspezifische Konfigurations-Überschreibungen
    └── docs/                 ← Inhalt für SDK-Referenz (wird zu /sdk aufgelöst)
        └── index.md
```

### Wichtige Workspace-Verzeichnismuster

*   **Vererbung der globalen Konfiguration:** Jede in der Root-Datei `docmd.config.json` definierte Konfiguration (wie `theme` oder `menubar`) dient als Standard-Fallback. Einzelne Projekte können diese Standards in ihren eigenen lokalen Konfigurationsdateien gezielt überschreiben.
*   **Asset-Freigabe und Priorität:** Gemeinsame Logos, globale benutzerdefinierte Stile und gemeinsame Skripte werden im globalen `assets/`-Verzeichnis abgelegt. Projekte können auch eigene lokale `assets/`-Verzeichnisse definieren; bei Namenskonflikten haben projektspezifische Assets immer vorrang.
*   **Konsolidierung der Ausgabe:** Während des Build-Prozesses (`npx @docmd/core build`) führt die Engine automatisch alle Projekte in einem einzigen konsolidierten Produktions-Ausgabeverzeichnis zusammen (z. B. `./site/` und `./site/sdk/`), wodurch komplexe Setups mit Reverse-Proxies oder isolierten Build-Pipelines entfallen.

Ausführliche Einrichtungsschritte und fortgeschrittene Vererbungsregeln finden Sie im [Leitfaden zur Workspace-Konfiguration](../configuration/workspaces.md).