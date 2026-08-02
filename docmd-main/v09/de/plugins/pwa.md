---
title: "PWA & Offline-Unterstützung"
description: "Verwandeln Sie Ihre Dokumentation in eine Progressive Web App mit Offline-Caching und Mobile-First-Funktionen."
---

Das `@docmd/plugin-pwa`-Plugin verwandelt Ihre Dokumentation in eine Progressive Web App. Es schreibt ein Web-Manifest für die mobile Installation und registriert einen Service Worker, der Seiten für das Offline-Lesen zwischenspeichert.

## Konfiguration

Passen Sie Ihr App-Branding im `plugins`-Abschnitt Ihrer `docmd.config.json` an.

| Option | Typ | Standard | Beschreibung |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | Aktiviert/deaktiviert die PWA-Manifest- und Service-Worker-Erzeugung. |
| `themeColor` | `string` | `'#1e293b'` | Die Hauptfarbe der mobilen UI-Browser-Chrome. |
| `bgColor` | `string` | `'#ffffff'` | Hintergrundfarbe für den Splash-Screen während der Installation. |
| `logo` | `string` | `null` | Pfad zum App-Symbol (relativ zur Projektquelle). |

### Beispiel

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

## Funktionen

- **Offline-Caching**: stale-while-revalidate-Strategie. Seiten werden aus dem Cache geladen und dann im Hintergrund aktualisiert.
- **Installierbar**: emittiert ein `manifest.webmanifest`, damit Nutzer die Site auf iOS und Android auf ihrem Startbildschirm installieren können.
- **Automatische Icons**: leitet PWA-Icons aus Ihrem Projekt-Logo oder Favicon ab, wenn kein explizites Symbol angegeben ist.
- **SPA-freundlich**: funktioniert mit dem SPA-Router und dem Standard-Verzeichnis-Routing.

## Icon-Auflösungs-Priorität

Das Plugin löst Ihre PWA-Icons nach folgender Priorität auf:

1. `pwa.icons` - Explizites Array in der Konfiguration.
2. `pwa.logo` - Pfad relativ zur Quelle.
3. `config.logo` - Globales Site-Logo.
4. `config.favicon` - Globales Favicon.

::: callout tip "PWA-Funktionen testen"
Service Worker werden in `npx @docmd/core dev` umgangen, um Cache-Probleme beim Bearbeiten zu vermeiden. Um PWA-Funktionen zu testen, führen Sie `npx @docmd/core build` aus und bedienen Sie das `site/`-Verzeichnis über einen Static Host.
:::