---
title: "Eigene Schriftarten & Branding"
description: "Passen Sie das Erscheinungsbild Ihrer Dokumentations-Website mithilfe von CSS-Variablen und Web-Schriftarten in docmd an Corporate-Identity-Richtlinien an."
---

Dokumentation dient als wichtiger Marken-Touchpoint. `docmd` verwendet ein CSS-Variablen-Token-System, das es Ihnen ermöglicht, Standard-Schriftartstapel und Marken-Farbpaletten zu überschreiben, ohne Kern-Engine-Stylesheets zu ändern.

## Anpassen visueller Tokens

`docmd` definiert visuelle Tokens als benutzerdefinierte CSS-Eigenschaften in `:root`. Überschreiben Sie diese Variablen in einem benutzerdefinierten Stylesheet (z. B. `assets/css/branding.css`).

### 1. Benutzerdefiniertes Stylesheet erstellen

```css
/* Web-Typografie importieren */
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@400;600;700&display=swap');

:root {
  /* Marken-Typografie-Stapel */
  --font-family-sans: "Outfit", system-ui, -apple-system, sans-serif;

  /* Marken-Farben (Heller Modus) */
  --link-color: #8a2be2;          /* Primäre Akzentfarbe */
  --link-colour-hover: #7b1fa2;
  --bg-color: #fcfcfd;            /* Subtiler Hintergrundton */
}

/* Dunkelmodus-Paletten-Überschreibungen */
:root[data-theme="dark"] {
  --bg-color: #0d1117;
  --link-color: #a855f7;
}
```

### 2. Benutzerdefiniertes CSS registrieren

Registrieren Sie Ihr Stylesheet in `docmd.config.json` unter `theme.customCss`:

```json "docmd.config.json"
{
  "theme": {
    "customCss": [
      "/assets/css/branding.css"
    ]
  }
}
```

::: callout tip "Performance & Laden von Schriftarten" icon:lightbulb
Hosten Sie benutzerdefinierte Schriftdateien nach Möglichkeit lokal in `assets/fonts/`, um die Netzwerklatenz zu minimieren. Geben Sie `font-display: swap` in `@font-face`-Deklarationen an, um Flash of Unstyled Text (FOUT) zu verhindern.
:::