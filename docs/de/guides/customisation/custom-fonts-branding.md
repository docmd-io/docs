---
title: "Benutzerdefinierte Schriftarten und Branding"
description: "So passen Sie das Erscheinungsbild Ihrer Dokumentation mithilfe von CSS-Variablen an Ihre Unternehmensidentität an."
---

## Problem

Die nahtlose Anpassung Ihrer Dokumentationsplattform an Ihre Unternehmensidentität ist entscheidend für ein professionelles Erscheinungsbild. Die Standard-Schriftarten und Farbpaletten sind auf allgemeine Lesbarkeit ausgelegt, spiegeln jedoch möglicherweise nicht Ihre spezifische Markenpersönlichkeit wider.

## Warum es wichtig ist

Die Dokumentation ist ein wichtiger Marken-Touchpoint. Wenn Ihr Hauptprodukt eine bestimmte Typografie (wie "Outfit") und eine markante Primärfarbe verwendet, sollte Ihre Dokumentation dieselben Entscheidungen widerspiegeln. Konsistenz über alle Ihre Web-Assets hinweg schafft Vertrauen und bietet eine kohärentere User Experience.

## Ansatz

`docmd` verwendet ein System von CSS-Variablen (Custom Properties), die die visuellen Token des Layouts definieren. Sie können diese Variablen ganz einfach in einem benutzerdefinierten Stylesheet überschreiben, ohne die Core-Engine ändern zu müssen.

## Implementierung

### 1. Erstellen eines benutzerdefinierten Stylesheets

Erstellen Sie eine Datei namens `custom.css` in Ihrem Quellverzeichnis (oder einem Unterverzeichnis) und überschreiben Sie die `:root`-Variablen.

```css
/* Importieren Sie Ihre Markenschriftart */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap');

:root {
  /* Marken-Typografie */
  --font-family-sans: "Outfit", system-ui, -apple-system, sans-serif;
  
  /* Markenfarben (Light Mode) */
  --link-color: #8a2be2;      /* Ihre primäre Markenfarbe */
  --link-color-hover: #7b1fa2;
  --bg-color: #fcfcfd;        /* Dezente Hintergrundtönung */
}

/* Overrides für Dark Mode */
:root[data-theme="dark"] {
  --bg-color: #0d1117;
  --link-color: #a855f7;
}
```

### 2. Registrieren des Stylesheets

Fügen Sie Ihre benutzerdefinierte CSS-Datei dem Array `theme.customCss` in Ihrer `docmd.config.js` hinzu.

```javascript
// docmd.config.js
export default {
  theme: {
    customCss: ['/custom.css']
  }
};
```

## Abwägungen

Das Importieren externer Schriftarten (z. B. von Google Fonts) führt zu einer geringfügigen Verzögerung beim ersten Laden der Seite. Um die Performance zu optimieren, sollten Sie in Erwägung ziehen, Ihre Schriftdateien lokal in Ihrem Projekt zu hosten und `font-display: swap` zu verwenden, um ein "Flackern von unformatiertem Text" (FOUT) während des Ladens zu verhindern.
