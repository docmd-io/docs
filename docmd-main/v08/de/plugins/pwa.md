---
title: "PWA & Offline-Support"
description: "Verwandeln Sie Ihre Dokumentation in eine progressive Webanwendung mit Offline-Caching und mobil-optimierten Funktionen."
---

Das `@docmd/plugin-pwa`-Plugin verwandelt Ihre Dokumentation in eine Progressive Web App (PWA). Es fügt ein Web-Manifest für die mobile Installation hinzu und registriert einen Service Worker für das intelligente Offline-Caching. So bleibt Ihre technische Dokumentation auch in Umgebungen mit schlechter Internetverbindung zugänglich.

## Konfiguration

Passen Sie Ihre App-Branding-Einstellungen innerhalb des `plugins`-Abschnitts Ihrer `docmd.config.json` an.

| Option | Typ | Standardwert | Beschreibung |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | Aktiviert oder deaktiviert die Generierung des PWA-Manifests und Service Workers. |
| `themeColor` | `string` | `'#1e293b'` | Die Primärfarbe der mobilen Benutzeroberfläche des Browsers. |
| `bgColor` | `string` | `'#ffffff'` | Hintergrundfarbe für den Startbildschirm (Splash Screen) während der Installation. |
| `logo` | `string` | `null` | Pfad zum App-Icon (relativ zur Projektquelle). |

### Beispiel

```json
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

- **Offline-Caching**: Verwendet eine „Stale-While-Revalidate“-Strategie. Seiten werden sofort aus dem Cache geladen, während im Hintergrund nach Updates gesucht wird.
- **Mobile Installation**: Generiert eine `manifest.webmanifest`-Datei, die es Benutzern unter iOS und Android ermöglicht, die App nativ „Zum Home-Bildschirm hinzuzufügen“.
- **Intelligente Asset-Auflösung**: Erstellt App-Icons automatisch aus dem Logo oder Favicon Ihres Projekts, falls kein explizites Icon angegeben ist.
- **SPA-Kompatibel**: Vollständig kompatibel mit Single-Page-Application-Übergängen und Standard-Verzeichnis-Routing.

## Priorität der Icon-Auflösung

Das Plugin löst Ihre PWA-Icons anhand der folgenden Rangfolge auf:

1. `pwa.icons` - Explizites Array in der Konfiguration.
2. `pwa.logo` - Pfad relativ zur Quelle.
3. `config.logo` - Globales Website-Logo.
4. `config.favicon` - Globales Favicon.

::: callout tip "Testen von PWA-Funktionen"
Service Worker werden in `npx @docmd/core dev` umgangen, um Caching-Probleme während der Bearbeitung zu vermeiden. Um PWA-Funktionen zu testen, führen Sie `npx @docmd/core build` aus und stellen Sie das `site/`-Verzeichnis über einen statischen Host bereit.
:::