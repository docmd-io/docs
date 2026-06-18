---
title: "Eigene Fonts und Branding"
description: "Wie Sie das Erscheinungsbild Ihrer Dokumentation über CSS-Variablen an Ihre Corporate Identity anpassen."
---

## Problem

Sicherzustellen, dass Ihre Dokumentations-Plattform problemlos zu Ihrer Corporate Identity passt, ist entscheidend für ein professionelles Erscheinungsbild. Der Standard-Font-Stack und die Farbpalette gewährleisten allgemeine Lesbarkeit, spiegeln jedoch möglicherweise nicht die Persönlichkeit Ihrer Marke wider.

## Warum es wichtig ist

Dokumentation ist ein wichtiger Marken-Touchpoint. Verwendet Ihr Produkt eine spezifische Typografie (wie "Outfit") und eine charakteristische Primärfarbe, sollte Ihre Dokumentation diese Entscheidungen widerspiegeln. Konsistenz über alle Web-Präsenzen hinweg baut Vertrauen auf und bietet eine kohärente User Experience.

## Ansatz

docmd verwendet ein System aus CSS Custom Properties (Variablen), das die visuellen Tokens des Layouts definiert. Sie können diese Variablen einfach in einem benutzerdefinierten Stylesheet überschreiben, ohne die Kern-Engine zu verändern.

## Implementierung

### 1. Erstellen Sie ein benutzerdefiniertes Stylesheet

Erstellen Sie eine Datei namens `custom.css` in Ihrem Quellverzeichnis und überschreiben Sie die `:root`-Variablen.

```css
/* Importieren Sie Ihren Marken-Font */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&display=swap');

:root {
  /* Marken-Typografie */
  --font-family-sans: "Outfit", system-ui, -apple-system, sans-serif;
  
  /* Marken-Farben (Light Mode) */
  --link-color: #8a2be2;      /* Ihre Primär-Markenfarbe */
  --link-colour-hover: #7b1fa2;
  --bg-color: #fcfcfd;        /* Dezenter Hintergrund-Ton */
}

/* Dark Mode Überschreibungen */
:root[data-theme="dark"] {
  --bg-color: #0d1117;
  --link-color: #a855f7;
}
```

### 2. Registrieren Sie das Stylesheet

Fügen Sie Ihre benutzerdefinierte CSS-Datei zum Array `theme.customCss` in Ihrer `docmd.config.json` hinzu.

```json
  "theme": {
    "customCss": ["/custom.css"]
  }
```

## Abwägungen

Das Importieren externer Fonts (wie Google Fonts) fügt der initialen Seitenlade-Zeit Latenz hinzu. Um die Performance zu optimieren, erwägen Sie das lokale Hosten Ihrer Font-Dateien. Verwenden Sie `font-display: swap`, um einen "Flash of Unstyled Text" (FOUT) zu verhindern, während der benutzerdefinierte Font lädt.
