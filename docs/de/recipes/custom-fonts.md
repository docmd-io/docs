---
title: "Rezept: Eigene Schriftarten integrieren"
description: "Personalisieren Sie die Typografie Ihrer Website über Google Fonts und das Überschreiben von CSS-Variablen."
---

`docmd` nutzt ein robustes System von CSS-Variablen zur Verwaltung von Design-Tokens. Die Personalisierung der Typografie Ihrer Website umfasst das Importieren externer Schriftarten-Assets und das Überschreiben der zentralen Root-Variablen.

## 1. Definieren Sie Ihr Typografie-Manifest

Erstellen Sie eine eigene CSS-Datei in Ihrem Projekt (z. B. `assets/css/typography.css`).

Wählen Sie Ihre gewünschte Schriftart auf [Google Fonts](https://fonts.google.com) aus und nutzen Sie die `@import`-Anweisung, um die Assets abzurufen. Ordnen Sie diese Schriftarten dann den Typografie-Tokens von `docmd` zu.

```css
/* assets/css/typography.css */

/* 1. Schriftarten-Assets importieren */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;700&family=JetBrains+Mono&display=swap');

:root {
  /* 2. Den primären Sans-Serif-Stack überschreiben */
  --font-family-sans: "Outfit", -apple-system, system-ui, sans-serif;
  
  /* 3. Den Monospace-Stack (Code-Blöcke) überschreiben */
  --font-family-mono: "JetBrains Mono", monospace;
}
```

## 2. Registrieren Sie das Stylesheet

Binden Sie Ihr benutzerdefiniertes Manifest über die Datei `docmd.config.js` in die Build-Pipeline ein.

```javascript
export default {
  // ...
  theme: {
    name: 'sky',
    appearance: 'dark',
    customCss: [
      '/assets/css/typography.css' // Der Pfad ist absolut relativ zum site/-Verzeichnis
    ]
  }
}
```

## 3. Änderungen überprüfen

Führen Sie `docmd dev` aus, um eine Vorschau der typografischen Änderungen zu erhalten. Die Engine bündelt automatisch das benutzerdefinierte CSS und wendet die Variablen-Überschreibungen auf alle Dokumentationsknoten an.