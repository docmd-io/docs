---
title: "PWA- & Offline-Plugin"
description: "Verwandeln Sie Dokumentationsportale in Offline-First Progressive Web Applications mit Service-Worker-Caching."
---

Das `@docmd/plugin-pwa`-Plugin verwandelt Ihre Dokumentationsseite in eine installierbare Progressive Web Application (PWA). Es generiert ein W3C Web Application Manifest (`manifest.webmanifest`) und registriert einen Service Worker für Offline-Caching und die Installation auf mobilen Plattformen.

## Konfigurationsoptionen

Konfigurieren Sie PWA-Eigenschaften in `docmd.config.json`:

| Option | Typ | Standard | Technische Beschreibung |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | Aktivieren oder deaktivieren Sie die PWA-Manifest- und Service-Worker-Kompilierung. |
| `themeColor` | `string` | `'#1e293b'` | Farbe des Browser-UI-Chrome-Headers. |
| `bgColor` | `string` | `'#ffffff'` | Hintergrundfarbe des Installations-Splash-Screens. |
| `logo` | `string` | `null` | Pfad zum App-Icon (relativ zum Dokumentationsquellstamm). |

### Globales Konfigurationsbeispiel

```json "docmd.config.json"
{
  "plugins": {
    "pwa": {
      "themeColor": "#1e293b",
      "bgColor": "#ffffff",
      "logo": "assets/app-icon.png"
    }
  }
}
```

## Hauptfunktionen

* **Offline Service Worker**: Implementiert eine Stale-While-Revalidate-Caching-Strategie. Seiten werden sofort aus dem lokalen Cache geladen, während der Netzwerkstatus im Hintergrund überprüft wird.
* **Home-Screen-Installation**: Gibt gültige Manifest-Metadaten aus, mit denen Benutzer die Dokumentationsseite auf iOS, Android, macOS und Windows anheften können.
* **Asset-Skalierung**: Generiert automatisch die erforderlichen PWA-Icon-Größen (192x192, 512x512) aus dem primären Site-Branding.

## Priorität der Icon-Auflösung

Das PWA-Plugin wertet Icon-Pfade in folgender Reihenfolge von oben nach unten aus:

1. `plugins.pwa.icons` — Explizites Icon-Array, das in der Konfiguration definiert ist.
2. `plugins.pwa.logo` — Plugin-spezifischer Icon-Pfad.
3. `config.logo` — Globaler Site-Logo-Pfad.
4. `config.favicon` — Globaler Site-Favicon-Pfad.

::: callout tip "Testen der Offline-Funktionalität" icon:smartphone
Die Service-Worker-Registrierung ist während der lokalen Entwicklung (`npx @docmd/core dev`) deaktiviert, um zu verhindern, dass zwischengespeicherte Assets Live-Bearbeitungen beeinträchtigen. Um PWA-Funktionen zu testen, bauen Sie die Seite (`npx @docmd/core build`) und stellen Sie das Ausgabeverzeichnis (`site/`) über HTTPS oder localhost bereit.
:::