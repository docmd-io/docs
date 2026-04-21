---
title: "Allgemeine Konfiguration"
description: "Konfigurieren Sie das Schema der docmd.config.js, Branding, Layout und Engine-Funktionen."
---

Die Datei `docmd.config.js` dient als definitive Konfiguration für Ihr Dokumentationsprojekt. Sie steuert die Seitenstruktur, das Branding, das UI-Verhalten und die Verarbeitungsregeln auf Engine-Ebene.

## Die Konfigurationsdatei

Wir empfehlen die Verwendung des `defineConfig`-Helpers von `@docmd/core`. Dieser bietet vollständige IDE-Autovervollständigung und Typüberprüfung, was das Entdecken verfügbarer Einstellungen mühelos macht.

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  title: 'Mein Projekt',
  url: 'https://docs.meinprojekt.de',
  // ... Konfigurationseinstellungen
});
```

## Kern-Einstellungen

`docmd` verwendet ein einfaches Konfigurationsschema. Unten sind die wichtigsten Einstellungen auf oberster Ebene aufgeführt:

| Schlüssel | Beschreibung | Standard |
| :--- | :--- | :--- |
| `title` | Der Name Ihrer Dokumentationsseite. Wird im Header und in Browsertiteln verwendet. | `Documentation` |
| `url` | Ihre Produktions-Basis-URL. Wichtig für SEO, Sitemaps und OpenGraph. | `null` |
| `src` | Der relative Pfad zum Verzeichnis, das Ihre Markdown-Dateien enthält. | `docs` |
| `out` | Der relative Pfad für die generierte statische Website-Ausgabe. | `site` |
| `base` | Der Basispfad, wenn die Website in einem Unterordner gehostet wird (z. B. `/docs/`). | `/` |
| `i18n` | Konfiguration für die [Sprachunterstützung](./localisation.md). | `null` |
| `plugins` | Konfiguration für Standard- oder benutzerdefinierte [Plugins](../plugins/usage.md). | `{}` |

## Branding & Identität

Konfigurieren Sie, wie Ihre Marke im Navigations-Header und in Browser-Tabs dargestellt wird.

```javascript
logo: {
  light: 'assets/images/logo-dark.png',  // Logo im Hellmodus
  dark: 'assets/images/logo-light.png',  // Logo im Dunkelmodus
  href: '/',                             // Ziel-Link beim Klicken auf das Logo
  alt: 'Unternehmenslogo',               // Alternativtext für Barrierefreiheit
  height: '32px'                         // Optional: Explizite Höhe für das Logo
},
favicon: 'assets/favicon.ico',           // Pfad zum Favicon Ihrer Website
```

## Layout-Architektur

<!-- SCREENSHOT: Volle Seite mit Seitenleiste, Header, Breadcrumbs, Inhaltsverzeichnis und Footer — versehen mit Pfeilen, die auf jeden konfigurierbaren Bereich zeigen (Sidebar, TOC, Breadcrumbs, Footer, Optionsmenü). -->

`docmd` verfügt über ein modulares Layout-System. Über das `layout`-Objekt können Sie UI-Komponenten umschalten und das Navigationsverhalten konfigurieren.

| Bereich | Schlüssel | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| **Global** | `spa` | `true` | Ermöglicht nahtlose Single-Page-Application-Navigation ohne Browser-Reloads. |
| **Header** | `header` | `{ enabled: true }` | Schaltet die obere Navigationsleiste ein/aus. |
| **Sidebar**| `sidebar`| `{ enabled: true, collapsible: true }` | Steuert den Navigationsbaum der Seitenleiste und sein Verhalten. |
| **Footer** | `footer` | `{ style: 'minimal' }` | Unterstützt die Footer-Styles `'minimal'` oder `'complete'`. |

### Werkzeugmenü (Optionsmenü)

Das Optionsmenü fasst Werkzeugkomponenten wie **Globale Suche**, **Theme-Umschalter** und **Sponsoring-Links** zusammen.

```javascript
layout: {
  optionsMenu: {
    position: 'header', // Optionen: 'header', 'sidebar-top', 'sidebar-bottom', 'menubar'
    components: {
      search: true,      // Integrierte Volltextsuche aktivieren
      themeSwitch: true, // Hell-/Dunkelmodus-Umschalter aktivieren
      sponsor: 'https://github.com/sponsors/dein-profil' // Optionale URL für ein Herz-Icon/Link
    }
  }
}
```

::: callout info
Wenn `optionsMenu.position` auf `header` oder `menubar` eingestellt ist, diese Container aber deaktiviert sind, fällt das Menü automatisch auf `sidebar-top` zurück.
:::

## Funktionen der Core-Engine

Passen Sie an, wie `docmd` Ihre Dokumentationsinhalte verarbeitet und rendert.

```javascript
minify: true,           // Minimiert Produktions-Assets (CSS/JS) für bessere Performance
autoTitleFromH1: true,  // Verwendet die erste H1-Überschrift als Seitentitel, wenn 'title' im Frontmatter fehlt
copyCode: true,         // Fügt automatisch eine 'Kopieren'-Schaltfläche zu allen Code-Blöcken hinzu
pageNavigation: true,   // Fügt Navigationslinks für 'Vorherige' und 'Nächste' am Ende der Seiten hinzu
```

## Unterstützung veralteter Versionen (Legacy)

Wenn Sie von einer älteren Version von `docmd` aktualisieren, werden die folgenden Schlüssel automatisch dem modernen Schema zugeordnet, um die Abwärtskompatibilität zu gewährleisten:

*   `siteTitle` → `title`
*   `siteUrl` / `baseUrl` → `url`
*   `srcDir` / `source` → `src`
*   `outDir` / `outputDir` → `out`

::: callout tip
Führen Sie `docmd migrate` aus, um Ihre Konfigurationsdatei automatisch auf das neueste Schema zu aktualisieren, wobei ein Backup Ihrer ursprünglichen Einstellungen erhalten bleibt.
:::