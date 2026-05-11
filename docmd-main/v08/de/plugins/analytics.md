---
title: "Analytics-Plugin"
description: "Integrieren Sie Google Analytics 4 oder Legacy Universal Analytics und verfolgen Sie Benutzerinteraktionen automatisch."
---

Das Plugin `@docmd/plugin-analytics` ermöglicht es Ihnen, Google Analytics nahtlos in Ihre Dokumentation zu integrieren. Es unterstützt den modernen Google Analytics 4 (GA4) Standard, das ältere Universal Analytics (UA) und beinhaltet natives Event-Tracking für interaktionsreiche Dokumentationsseiten.

## Konfiguration

Aktivieren Sie Analytics, indem Sie Ihre Tracking-Anmeldedaten zum Abschnitt `plugins` der `docmd.config.js` hinzufügen.

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  plugins: {
    analytics: {
      // 1. Google Analytics 4 (Empfohlen)
      googleV4: { 
        measurementId: 'G-XXXXXXX' 
      },

      // 2. Älteres Universal Analytics
      googleUA: { 
        trackingId: 'UA-XXXXXXX-X' 
      },

      // 3. Einstellungen für Verhaltens-Tracking
      autoEvents: true,  // Klicks, Downloads und TOC-Interaktionen verfolgen
      trackSearch: true  // Von Lesern verwendete Suchbegriffe verfolgen
    }
  }
});
```

## Verfolgte Ereignisse (Events)

Wenn `autoEvents` aktiviert ist, erfasst das Plugin automatisch die folgenden Benutzerinteraktionen und sendet sie an Ihren Analytics-Anbieter:

*   **Externe Links**: Verfolgen, wann Benutzer die Seite für externe Ressourcen verlassen.
*   **Datei-Downloads**: Automatisches Protokollieren von Klicks auf Links mit dem `download`-Attribut oder gängigen Dateiendungen (`.pdf`, `.zip`, `.tar` etc.).
*   **Inhaltsverzeichnis (TOC)**: Überwachen, welche Abschnitte am interessantesten sind, indem Klicks in der rechten Seitennavigation verfolgt werden.
*   **Überschrift-Anker**: Protokollieren, wenn Benutzer auf „Permalinks“ (Anker von Überschriften) klicken, um spezifische Abschnitte zu teilen.
*   **Suchanfragen**: Wenn `trackSearch` aktiv ist, werden Suchbegriffe erfasst (mit einer Verzögerung von 1 Sekunde), um Ihnen zu helfen zu verstehen, wonach Ihre Benutzer suchen.

## Technische Details

Das Plugin fügt die erforderlichen Tracking-Skripte in den `<head>` jeder Seite ein. Event-Listener werden unter Verwendung einer effizienten Ereignisdelegation an das `<body>`-Element angehängt, um sicherzustellen, dass keine Auswirkungen auf die Ladeleistung der Seite oder die Übergänge der Single Page Application (SPA) entstehen.

::: callout info "Datenschutz & DSGVO"
Standardmäßig anonymisiert dieses Plugin IP-Adressen nicht, da dies nun nativ von GA4 gehandhabt wird. Wenn Sie ein erweitertes Cookie-Einwilligungsmanagement benötigen, können Sie Ihre Skripte für den Consent-Manager manuell über `customCss` oder einen benutzerdefinierten Plugin-Hook einbinden.
:::