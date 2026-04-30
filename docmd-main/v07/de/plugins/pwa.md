---
title: "PWA & Offline-Support"
description: "Verwandeln Sie Ihre Dokumentation in eine Progressive Web App mit Offline-Caching und mobil-optimierten Funktionen."
---

Das **PWA-Plugin** verwandelt Ihre Dokumentation in eine Progressive Web App mit Offline-Caching und mobiler Installation. Es fügt ein Web-Manifest für die mobile Installation hinzu und registriert einen Service Worker für das intelligente Offline-Caching. So bleibt Ihre technische Dokumentation auch in Umgebungen mit schlechter Internetverbindung zugänglich.

## Setup

```bash
docmd add pwa
```

## Konfiguration

Das PWA-Plugin kann innerhalb des Abschnitts `plugins` der `docmd.config.js` an Ihr Branding angepasst werden.

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  plugins: {
    pwa: {
      enabled: true,           // Standardmäßig aktiviert, wenn das Plugin geladen ist
      themeColor: '#1e293b',   // Die Primärfarbe der mobilen Benutzeroberfläche
      bgColor: '#ffffff',      // Hintergrundfarbe für den Startbildschirm (Splash Screen)
      logo: '/assets/logo.png' // Fallback für App-Icons, falls nicht explizit definiert
    }
  }
});
```

## Kernfunktionen

### 1. Offline-Caching
Das Plugin generiert automatisch eine `service-worker.js`-Datei, die eine „Stale-While-Revalidate“-Caching-Strategie implementiert. Wenn ein Benutzer eine Seite besucht, tut der Service Worker Folgendes:
*   Er liefert sofort die im Cache gespeicherte Version für maximale Geschwindigkeit aus.
*   Er lädt im Hintergrund die neueste Version aus dem Netzwerk.
*   Er aktualisiert den Cache für den nächsten Besuch.

### 2. Mobile Installation

<!-- SCREENSHOT: Mobiles Gerät (iOS oder Android), das die Aufforderung „Zum Home-Bildschirm hinzufügen“ für eine docmd-basierte Website zeigt, sowie das resultierende App-Icon auf dem Home-Bildschirm. -->

Durch die Erstellung einer `manifest.webmanifest` und das Einfügen der erforderlichen `<meta>`-Tags ermöglicht das Plugin Benutzern unter iOS und Android die Funktion „Zum Home-Bildschirm hinzufügen“. Ihre Dokumentation verhält sich dann wie eine eigenständige Anwendung mit eigenem Startbildschirm und Fensterrahmen.

### 3. Intelligente Asset-Auflösung
Das Plugin versucht, App-Icons automatisch zu generieren, indem es nach dem `logo` oder `favicon` Ihres Projekts sucht. Für mehr Kontrolle können Sie ein explizites `icons`-Array angeben:

```javascript
pwa: {
  icons: [
    { src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' }
  ]
}
```

## Technische Umsetzung

Der Service Worker ist so konzipiert, dass er mit dem Single Page Application (SPA)-Routing kompatibel ist. Er enthält spezifische Ausfallsicherungslogik für die strengen Sicherheitsrichtlinien von Safari in Bezug auf umgeleitete Streams und gewährleistet so Stabilität in allen modernen Browsern.

::: callout tip "Entwicklungsmodus"
Service Worker werden im lokalen Entwicklungsmodus (`docmd dev`) normalerweise deaktiviert oder umgangen, um zu verhindern, dass aggressives Caching Ihre Bearbeitungen stört. Um die PWA-Funktionalität zu testen, führen Sie einen Produktions-Build mit `docmd build` aus und stellen Sie das Ausgabe-Verzeichnis über einen statischen Host bereit.
:::

### Vollständiges Entfernen

Löschen Sie einfach den `pwa`-Block aus Ihren `plugins`. Beim nächsten Ausführen von `docmd build` wird kein neues Manifest generiert. Wenn Benutzer die Website besuchen, prüft der clientseitige Bootstrap von docmd (`docmd-main.js`) das Vorhandensein von `<link rel="manifest">`. Falls dieser fehlt, aber ein Service Worker registriert ist, werden automatisch **alle vorhandenen Service Worker deregistriert** und der Cache geleert — es ist keine Aktion des Benutzers erforderlich.

::: callout warning
Die Dateien `manifest.webmanifest` und `service-worker.js` aus einem vorherigen Build bleiben auf der Festplatte erhalten, bis Sie Ihr Ausgabe-Verzeichnis (standardmäßig `site/`) mit `docmd build` überschreiben oder mittels `rm -rf site` löschen. Dies ist ein Artefakt im Dateisystem, keine aktive PWA.
:::

## Konfigurationsreferenz

Alle Felder sind optional. Die Standardwerte sind für die Nutzung ohne Konfiguration ausgelegt.

```javascript
export default {
  plugins: {
    pwa: {
      // --- Icon-Konfiguration ---
      // Priorität: pwa.logo > config.logo > config.favicon > (keine Icons)
      logo: 'assets/images/app-icon.png', // Pfad relativ zu Ihrem Quellordner

      // Oder für die volle manuelle Kontrolle:
      icons: [
        { src: '/assets/images/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/assets/images/icon-512.png', sizes: '512x512', type: 'image/png' }
      ],

      // --- Manifest-Farben ---
      themeColor: '#1e293b',  // Browser-Chrome / Primärfarbe der oberen Leiste
      bgColor: '#ffffff',     // Hintergrund des Startbildschirms während der Installation

      // --- Das Plugin komplett deaktivieren ---
      enabled: false
    }
  }
}
```

### Priorität der Icon-Auflösung

docmd löst Ihr PWA-Icon gemäß der folgenden Rangfolge auf:

1. `pwa.icons` — Manuelles Array, wird unverändert verwendet.
2. `pwa.logo` — Einzelner Bildpfad, wird für Einträge in 192x192 und 512x512 verwendet.
3. `config.logo` — Ihr globales Website-Logo.
4. `config.favicon` — Ihr globales Favicon.
5. *(Keine Icons im Manifest deklariert)* — Falls keiner der obigen Punkte gesetzt ist.

## Lokales Testen

Browser beschränken Service Worker auf `https://` oder `localhost`. Verwenden Sie:

```bash
docmd dev
```

Öffnen Sie die Chrome DevTools → **Application** → **Manifest** und **Service Workers**, um die aktivierte Registrierung in Echtzeit zu sehen.

Das Safari-Panel → **Entwickler** → **Service-Worker** funktioniert gleichermaßen.