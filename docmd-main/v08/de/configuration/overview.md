---
title: "Allgemeine Konfiguration"
description: "Konfigurieren Sie docmd.config.json zur Verwaltung von Branding, benutzerdefinierten Schemas, Routing, Layout-Verhalten und Build-Engines."
---

Die Datei `docmd.config.json` ist die zentrale Konfiguration für Ihren Workspace. Sie steuert das Styling der Website, die Sidebar-Hierarchien, Lokalisierungsdetails und Compiler-Optionen.

## 1. Das Konfigurationsschema

JSON ist das Standard-Konfigurationsformat. Dies ermöglicht eine hochperformante Serialisierung über die Worker-Pools der Engine.

Jedoch werden `docmd.config.js` und `docmd.config.ts` weiterhin vollständig unterstützt, falls Sie dynamische JavaScript-Logik benötigen.

```json
{
  "title": "Mein Projekt",
  "url": "https://docs.myproject.com",
  "src": "docs",
  "out": "site",
  "base": "/"
}
```

## 2. Kerneinstellungen

Diese Parameter auf oberster Ebene konfigurieren die Basis-Eingaben und -Ziele des Compilers.

| Parameter | Typ | Standardwert | Beschreibung |
| :--- | :--- | :--- | :--- |
| `title` | `String` | `"Documentation"` | Der formelle Name Ihrer Website. Erscheint in Navigations-Headern und Browser-Titelleisten. |
| `url` | `String` | `null` | Ihre kanonische Produktions-URL. Wichtig für die SEO-Validierung, Sitemap-Indexierung und OpenGraph-Metadaten. |
| `src` | `String` | `"docs"` | Relativer Pfad zum Ordner, der Ihre Markdown-Quelldateien (.md) enthält. |
| `out` | `String` | `"site"` | Relativer Pfad, in den der Compiler die optimierte statische Website schreibt. |
| `base` | `String` | `"/"` | Der Stamm-Basispfad Ihrer Website (z. B. auf `/docs/` setzen, wenn sie in einem Unterordner gehostet wird). |
| `tmp` | `String` | `null` | Benutzerdefiniertes Verzeichnis für temporäre Kompilierungsdateien und Caching. Standardmäßig wird ein isolierter temporärer Systemordner verwendet. |
| `i18n` | `Object` | `null` | Parameter für Mehrsprachigkeit. Siehe den [Leitfaden zur Lokalisierung](localisation/translated-content.md). |
| `plugins` | `Object` | `{}` | Key-Value-Mapping zur Konfiguration von Standard- und benutzerdefinierten Plugins. Siehe [Plugin-Leitfaden](../plugins/usage.md). |
| `engine` | `String` | `"js"` | Die aktive Verarbeitungs-Engine: `"js"` oder `"rust"` (Vorschau). |

## 3. Branding & Identität

Verwalten Sie, wie Ihre Marke im Header und in den Browser-Tabs erscheint.

```json
{
  "logo": {
    "light": "assets/images/logo-dark.png",
    "dark": "assets/images/logo-light.png",
    "href": "/",
    "alt": "Firmenlogo",
    "height": "32px"
  },
  "favicon": "assets/favicon.ico"
}
```

## 4. UI-Layout & Verhalten

Die Engine bietet ein modulares Header- und Sidebar-Layout. Passen Sie funktionale Bereiche an. Ändern Sie die Sichtbarkeit von Komponenten wie Suche und Dark-Mode-Umschalter. Aktivieren oder deaktivieren Sie Breadcrumbs.

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

Siehe den Leitfaden [Layout & UI-Zonen](layout-ui.md) für alle Optionen zur visuellen Anpassung.

## 5. Kernfunktionen der Engine

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

| Option | Typ | Standardwert | Beschreibung |
| :--- | :--- | :--- | :--- |
| `minify` | `Boolean` | `true` | Komprimiert Ausgabe-HTML und -JS-Strukturen für maximale Geschwindigkeit. |
| `autoTitleFromH1` | `Boolean` | `true` | Löst fehlende Seitentitel anhand der ersten H1-Überschrift in der Datei auf. |
| `copyCode` | `Boolean` | `true` | Zeigt eine Schaltfläche "Code kopieren" oben rechts in Syntaxblöcken an. |
| `pageNavigation` | `Boolean` | `true` | Generiert automatisch ein rechtsseitiges Inhaltsverzeichnis ("Auf dieser Seite"). |
| `markdown.breaks` | `Boolean` | `true` | Standardisiert Zeilenumbrüche. Auf `false` setzen, wenn Sie Markdown-Zeilen bei 80 Spalten umbrechen. |

::: callout warning "Eigenständiger editLink veraltet" icon:alert-triangle
Die eigenständige `editLink`-Konfiguration ist veraltet. Verwenden Sie stattdessen das Kern-[Git-Plugin](../plugins/git.md). Es bietet dieselbe Editierlink-Funktionalität zusammen mit Commit-Zeitstempeln und Metadaten-Protokollen.
:::