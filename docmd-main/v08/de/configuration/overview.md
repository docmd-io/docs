---
title: "Allgemeine Konfiguration"
description: "Konfigurieren Sie docmd.config.json für Branding, benutzerdefinierte Schemas, Routing, Layout-Verhalten und Build-Engines."
---

Die Datei `docmd.config.json` ist die zentrale Konfiguration Ihres Workspaces. Sie steuert Site-Styling, Sidebar-Hierarchien, Lokalisierungsdetails und Compiler-Optionen.

## 1. Das Konfigurations-Schema

JSON ist das Standard-Konfigurationsformat. Dies ermöglicht Hochleistungs-Serialisierung über die Worker-Pools der Engine.

`docmd.config.js` und `docmd.config.ts` bleiben jedoch vollständig unterstützt, falls Sie dynamische JavaScript-Logik benötigen.

```json "docmd.config.json"
{
  "title": "My Project",
  "url": "https://docs.myproject.com",
  "src": "docs",
  "out": "site",
  "base": "/"
}
```

## 2. Kerneinstellungen

Diese Parameter der obersten Ebene konfigurieren die Basiseingaben und Ziele des Compilers.

| Parameter | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `title` | `String` | `"Documentation"` | Der formelle Name Ihrer Site. Erscheint in Navigations-Headern und Browser-Titelleisten. |
| `url` | `String` | `""` | Ihre kanonische Produktions-URL. Entscheidend für SEO-Validierung, Sitemap-Indexierung und OpenGraph-Metadaten. |
| `src` | `String` | `"docs"` | Relativer Pfad zum Ordner mit Ihren Markdown- (.md) Quelldateien. |
| `out` | `String` | `"site"` | Relativer Pfad, unter dem der Compiler die optimierte statische Produktions-Site ausgibt. |
| `base` | `String` | `"/"` | Der Basispfad Ihrer Site (z. B. auf `/docs/` setzen, wenn Sie in einem Unterordner hosten). |
| `tmp` | `String` | `null` | Benutzerdefiniertes Verzeichnis für temporäre Compile-Dateien und Caching. Standardmäßig ein isoliertes System-Temp-Verzeichnis. |
| `i18n` | `Object` | `null` | Mehrsprachigkeits-Parameter. Siehe den [Lokalisierungs-Leitfaden](localisation/translated-content.md). |
| `plugins` | `Object` | `{}` | Key-Value-Mapping zur Konfiguration von Standard- und benutzerdefinierten Plugins. Siehe [Plugins-Leitfaden](../plugins/usage.md). |
| `engine` | `String` | `"js"` | Die aktive Verarbeitungs-Engine: `"js"` oder `"rust"` (Vorschau). |

## 3. Branding & Identität

Verwalten Sie, wie Ihre Marke im Header und in Browser-Tabs erscheint.

```json
{
  "logo": {
    "light": "assets/images/logo-dark.png",
    "dark": "assets/images/logo-light.png",
    "href": "/",
    "alt": "Company Logo",
    "height": "32px"
  },
  "favicon": "assets/favicon.ico"
}
```

## 4. UI-Layout und -Verhalten

Die Engine bietet ein modulares Header- und Sidebar-Layout. Passen Sie funktionale Bereiche an. Schalten Sie die Sichtbarkeit von Komponenten um (Suche, Dunkelmodus-Schalter, Brotkrumen).

```json
{
  "layout": {
    "spa": true,
    "header": {
      "enabled": true
    },
    "sidebar": {
      "collapsible": true,
      "defaultCollapsed": false
    },
    "optionsMenu": {
      "position": "header",
      "components": {
        "search": true,
        "themeSwitch": true
      }
    }
  }
}
```

Vollständige visuelle Anpassungsoptionen finden Sie im [Layout- & UI-Zonen](layout-ui.md)-Leitfaden.

## 5. Kern-Engine-Funktionen

Feinabstimmung, wie der Parser Ihre Inhaltsdateien verarbeitet.

```json
{
  "minify": true,
  "autoTitleFromH1": true,
  "copyCode": true,
  "pageNavigation": true,
  "markdown": {
    "breaks": true
  }
}
```

| Option | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `minify` | `Boolean` | `true` | Komprimiert die ausgegebene HTML- und JS-Struktur für maximale Geschwindigkeit. |
| `autoTitleFromH1` | `Boolean` | `true` | Löst fehlende Seitentitel anhand der ersten H1-Überschrift in der Datei auf. |
| `copyCode` | `Boolean` | `true` | Zeigt oben rechts auf Syntax-Blöcken eine Schaltfläche „Code kopieren". |
| `pageNavigation` | `Boolean` | `true` | Fügt unten auf jeder Seite Links auf die vorherige und nächste Seite basierend auf der Navigationsreihenfolge hinzu. |
| `markdown.breaks` | `Boolean` | `true` | Standardisiert Zeilenumbrüche. Auf `false` setzen, wenn Sie Markdown-Zeilen bei 80 Spalten umbrechen. |

::: callout warning "Eigenständige editLink-Konfiguration veraltet" icon:alert-triangle
Die eigenständige `editLink`-Konfiguration ist veraltet. Verwenden Sie stattdessen das zentrale [Git-Plugin](../plugins/git.md). Es bietet dieselbe Edit-Link-Funktionalität sowie Commit-Zeitstempel und Metadaten-Logs.
:::
