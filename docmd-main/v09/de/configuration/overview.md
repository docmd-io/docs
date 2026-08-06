---
title: "Allgemeine Konfiguration"
description: "Meistern Sie docmd.config.json zur Verwaltung von Branding, Website-Metadaten, Routing, Layout-Zonen und Build-Compilern in docmd."
---

Die Datei `docmd.config.json` dient als zentrales Konfigurationsmanifest für Ihren Dokumentations-Workspace. Sie verwaltet Website-Branding, Navigations-Sidebars, Lokalisierungsparameter und Optionen des statischen Website-Compilers.

## Konfigurations-Schema-Formate

JSON ist das primäre Konfigurationsformat, das eine hochperformante Serialisierung über Worker-Threads hinweg bei parallelen Builds ermöglicht:

```json "docmd.config.json"
{
  "title": "Meine Technische Dokumentation",
  "url": "https://docs.example.com",
  "src": "docs",
  "out": "site",
  "base": "/"
}
```

Für dynamische Setups, die Umgebungsvariablen oder programmgesteuerte Logik erfordern, werden `docmd.config.ts` und `docmd.config.js` vollständig unterstützt:

::: tabs
== tab "TypeScript" icon:code-2
```typescript "docmd.config.ts"
import { UserConfig } from '@docmd/api';

const config: UserConfig = {
  title: process.env.DOCS_TITLE || 'Meine Technische Dokumentation',
  src: 'docs',
  out: 'site'
};

export default config;
```
== tab "JavaScript" icon:file-code
```javascript "docmd.config.js"
module.exports = {
  title: process.env.DOCS_TITLE || 'Meine Technische Dokumentation',
  src: 'docs',
  out: 'site'
};
```
:::

## Kerneinstellungen

Diese Top-Level-Eigenschaften konfigurieren Basispfade und globale Compiler-Optionen:

| Eigenschaft | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `title` | `String` | `"Documentation"` | Formaler Seitentitel, der in Navigations-Headern und Browser-Tabs angezeigt wird. |
| `url` | `String` | `""` | Kanonische Website-URL. Wichtig für Suchmaschinenoptimierung, Sitemap-Generierung und OpenGraph-Metadaten. |
| `src` | `String` | `"docs"` | Relatives Verzeichnis mit den Quell-Markdown-Dateien (`.md`). |
| `out` | `String` | `"site"` | Relativer Pfad, in dem der Compiler das statische Produktionspaket generiert. |
| `base` | `String` | `"/"` | Root-URL-Pfadpräfix (z. B. `/docs/` bei Hosting in einem Unterordner). |
| `tmp` | `String` | `null` | Temporäres Build-Cache-Verzeichnis. Standardmäßig ein isolierter System-Temp-Ordner. |
| `i18n` | `Object` | `null` | Mehrsprachigkeitsparameter. Siehe den [Lokalisierungs-Leitfaden](./localisation/translated-content.md). |
| `plugins` | `Object` | `{}` | Konfigurationsmap für Standard- und Drittanbieter-Plugins. Siehe [Plugins-Leitfaden](../plugins/usage.md). |
| `engine` | `String` | `"js"` | Verarbeitungs-Engine: `"js"` oder `"rust"` (Alpha-Vorschau). |

## Branding & Identität

Konfigurieren Sie Marken-Logos und Browser-Favicons in `docmd.config.json`:

```json "docmd.config.json"
{
  "logo": {
    "light": "assets/images/logo-dark.png",
    "dark": "assets/images/logo-light.png",
    "href": "/",
    "alt": "Unternehmens-Logo",
    "height": "32px"
  },
  "favicon": "assets/favicon.ico"
}
```

## UI-Layout und Verhalten

Konfigurieren Sie Header, Sidebars, Suchplatzierung und Theme-Umschalter:

```json "docmd.config.json"
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

Weitere Informationen finden Sie im Leitfaden für [Layout & UI-Zonen](./layout-ui.md).

## Kern-Compiler-Optionen

Feinabstimmung der Analyse und Transformation Ihrer Markdown-Inhalte durch `docmd`:

```json "docmd.config.json"
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
| `minify` | `Boolean` | `true` | Minimiert kompilierte HTML-, CSS- und JS-Assets für maximale Ladeleistung. |
| `autoTitleFromH1` | `Boolean` | `true` | Verwendet die erste `# H1`-Überschrift des Dokuments als Titel, wenn `title` im Frontmatter fehlt. |
| `copyCode` | `Boolean` | `true` | Rendert eine "Code kopieren"-Schaltfläche auf syntax-hervorgehobenen Codeblöcken. |
| `pageNavigation` | `Boolean` | `true` | Rendert "Vorherige" und "Nächste" Navigationslinks am Ende von Artikeln. |
| `markdown.breaks` | `Boolean` | `true` | Wandelt weiche Zeilenumbrüche in Umbrüche um. Auf `false` setzen, wenn Text manuell bei 80 Spalten umgebrochen wird. |

::: callout info "Git-Integration ersetzt editLink" icon:git-branch
Die eigenständige `editLink`-Konfiguration wurde im nativen [Git-Plugin](../plugins/git.md) vereinheitlicht. Es zeigt Bearbeitungs-Links, Commit-Zeitstempel und Mitwirkenden-Metadaten an.
:::
