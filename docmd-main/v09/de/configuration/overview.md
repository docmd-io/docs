---
title: "Allgemeine Konfiguration"
description: "Meistern Sie docmd.config.json zur Verwaltung von Branding, Website-Metadaten, Routing, Layout-Zonen und Build-Compilern in docmd."
---

Die Datei `docmd.config.json` dient als zentrales Konfigurationsmanifest für Ihren Dokumentations-Workspace. Sie verwaltet Website-Branding, Navigations-Sidebars, Lokalisierungsparameter und Optionen des statischen Website-Compilers.

## Konfigurations-Schema-Formate
 
`docmd` unterstützt `docmd.config.jsonc` und `docmd.config.json`. Beide Formate unterstützen einzeilige (`//`) Kommentare, mehrzeilige (`/* */`) Kommentare und nachgestellte Kommas (trailing commas):

```jsonc "docmd.config.jsonc"
{
  // Website-Branding und kanonische Adresse
  "title": "Meine Technische Dokumentation",
  "url": "https://docs.example.com",

  /* Quell- und Build-Ausgabeverzeichnisse */
  "src": "docs",
  "out": "site",
  "base": "/",
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
| `engine` | `String` | `"js"` | Verarbeitungs-Engine: `"js"` (Standard-JavaScript-Engine) oder `"rust"` (nativer Beschleuniger via `@docmd/engine-rust`). |
| `i18n` | `Object` | `null` | Mehrsprachigkeitsparameter. Siehe den [Lokalisierungs-Leitfaden](./localisation/translated-content.md). |
| `plugins` | `Object` | `{}` | Konfigurationsmap für Standard- und Drittanbieter-Plugins. Siehe [Plugins-Leitfaden](../plugins/usage.md). |

::: callout info title:"Abwärtskompatibilität" icon:history
`docmd` bewahrt 100%ige Abwärtskompatibilität für ältere Konfigurationsmanifeste:
- Ältere Root-Schlüssel (`siteTitle`, `siteUrl`, `srcDir`, `outputDir`) werden nahtlos auf moderne Schlüssel (`title`, `url`, `src`, `out`) abgebildet.
- `customJs` und `customCss` werden in `theme.customJs` und `theme.customCss` überführt.
- `htmlPolicy` wird auf `security.html` abgebildet.
- `focusMode` und `print` auf Root-Ebene werden auf `layout.focusMode` und `layout.print` abgebildet.
:::

## Branding & Identität

Konfigurieren Sie Marken-Logos, Browser-Favicons sowie benutzerdefinierte Stylesheets oder Skripte:

```json "docmd.config.json"
{
  "logo": {
    "light": "assets/images/logo-dark.png",
    "dark": "assets/images/logo-light.png",
    "href": "/",
    "alt": "Unternehmens-Logo",
    "height": "32px"
  },
  "favicon": "assets/favicon.ico",
  "theme": {
    "name": "default",
    "appearance": "system",
    "customCss": [
      "/assets/css/branding.css"
    ],
    "customJs": [
      "/assets/js/feedback.js"
    ]
  }
}
```

## UI-Layout und Verhalten

Konfigurieren Sie Header, Sidebars, Suchplatzierung, Theme-Umschalter und Lese-Werkzeuge:

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
    },
    "focusMode": false,
    "print": false,
    "copyCode": true,
    "pageNavigation": true,
    "copyWidgets": {
      "enabled": true,
      "raw": true,
      "context": true
    }
  }
}
```

Weitere Informationen finden Sie im Leitfaden für [Layout & UI-Zonen](./layout-ui.md).

## Content- & Sicherheitsrichtlinien

Feinabstimmung der Analyse von Markdown und Durchsetzung der HTML-Sicherheit:

```json "docmd.config.json"
{
  "minify": true,
  "autoTitleFromH1": true,
  "markdown": {
    "breaks": true,
    "linkify": true,
    "typographer": true,
    "linkifyDefaultScheme": "https"
  },
  "security": {
    "html": "allow"
  }
}
```

| Option | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `minify` | `Boolean` | `true` | Minimiert kompilierte HTML-, CSS- und JS-Assets für maximale Ladeleistung. |
| `autoTitleFromH1` | `Boolean` | `true` | Verwendet die erste `# H1`-Überschrift des Dokuments als Titel, wenn `title` im Frontmatter fehlt. |
| `markdown.breaks` | `Boolean` | `true` | Wandelt weiche Zeilenumbrüche in Umbrüche um. Auf `false` setzen, wenn Text manuell bei 80 Spalten umgebrochen wird. |
| `markdown.linkify` | `Boolean` | `true` | Konvertiert URL-Text und einfache Domains automatisch in klickbare Links. Auf `false` setzen zum Deaktivieren. |
| `markdown.typographer` | `Boolean` | `true` | Aktiviert typografischen Ersatz für Anführungszeichen, Gedankenstriche und Symbole. Auf `false` setzen für wörtliche Ausgabe. |
| `markdown.linkifyDefaultScheme` | `String` | `"https"` | URL-Schema für automatisch verlinkte Bare-Domains (z.B. `github.com` → `https://github.com`). Verwenden Sie `"http"` nur für interne oder Legacy-Umgebungen ohne HTTPS. |
| `security.html` | `String` | `"allow"` | HTML-Bereinigungsmodus: `"allow"`, `"escape"` oder `"strip"`. Siehe [Sicherheitsleitfaden](./security.md). |
| `layout.copyCode` | `Boolean` | `true` | Rendert eine "Code kopieren"-Schaltfläche auf syntax-hervorgehobenen Codeblöcken. |
| `layout.pageNavigation` | `Boolean` | `true` | Rendert "Vorherige" und "Nächste" Navigationslinks am Ende von Artikeln. |
| `layout.focusMode` | `Boolean` | `false` | Aktiviert den ablenkungsfreien Fokus-Modus mit Tastenkombinationen (`Alt+F`). |
| `layout.print` | `Boolean` | `false` | Aktiviert die Druckschaltfläche in der Artikel-Aktionsleiste und in der Fokus-Toolbar. |

::: callout info "Git-Integration ersetzt editLink" icon:git-branch
Die eigenständige `editLink`-Konfiguration wurde im nativen [Git-Plugin](../plugins/git.md) vereinheitlicht. Es zeigt Bearbeitungs-Links, Commit-Zeitstempel und Mitwirkenden-Metadaten an.
:::
