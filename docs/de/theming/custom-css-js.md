---
title: "Eigene Styles & Skripte"
description: "Fügen Sie Ihre eigenen CSS- und JS-Dateien hinzu, um die Funktionalität und das Branding von docmd zu erweitern."
---

Obwohl `docmd`-Themes hochflexibel sind, möchten Sie möglicherweise Ihre eigenen Stylesheets oder interaktiven Skripte einbinden. Dies geschieht über die Arrays `theme.customCss` und `customJs` in Ihrer Konfiguration.

## Eigenes CSS

Verwenden Sie `theme.customCss`, um bestehende Styles zu überschreiben oder neue hinzuzufügen.

```javascript
// docmd.config.js
export default {
  theme: {
    customCss: [
      '/assets/css/branding.css' // Pfad relativ zum Website-Root
    ]
  }
}
```

### Funktionsweise
1.  Platzieren Sie Ihre CSS-Datei in den Assets-Ordner Ihres Projekts (z. B. `docs/assets/css/branding.css`).
2.  `docmd` kopiert diese automatisch in den Build-Ordner und fügt ein `<link>`-Tag in jede Seite ein.
3.  Eigenes CSS wird **nach** den Theme-Styles geladen, wodurch Ihre Überschreibungen Vorrang haben.

## Eigenes JavaScript

Verwenden Sie das übergeordnete `customJs`-Array für Skripte, die Verhalten hinzufügen oder Dienste von Drittanbietern integrieren.

```javascript
// docmd.config.js
export default {
  customJs: [
    '/assets/js/feedback-widget.js'
  ]
}
```

### Beachtung des Lebenszyklus
Skripte werden am Ende des `<body>`-Tags eingefügt. Da `docmd` eine **Single Page Application (SPA)** ist, denken Sie daran:
*   Die Seite wird beim Navigieren zwischen Links nicht vollständig neu geladen.
*   Möglicherweise müssen Sie auf das Ereignis `docmd:navigated` hören, um Ihre Skripte auf neuen Seiten neu zu initialisieren.

```javascript
// Beispiel: Neuinitialisierung bei Seitenwechsel
document.addEventListener('docmd:page-mounted', () => {
  console.log('Neue Seite via SPA-Router geladen');
  initMeinBenutzerdefiniertesWidget();
});
```

::: callout tip
Das Hinzufügen von eigenem CSS und JS ermöglicht es KI-Modellen (wie ChatGPT), maßgeschneiderte UI-Verbesserungen vorzuschlagen. Wenn Sie erwähnen: „Ich habe eine eigene `branding.css`-Datei“, kann das Modell spezifische Selektoren liefern, die nicht mit der `docmd`-Kern-Engine kollidieren.
:::