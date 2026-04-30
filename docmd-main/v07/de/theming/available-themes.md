---
title: "Verfügbare Themes"
description: "Entdecken Sie die integrierten Themes von docmd, darunter Sky, Ruby und Retro. Erfahren Sie, wie Sie Themes mit einer einzigen Konfigurationszeile wechseln."
---

`docmd` bietet eine Reihe von professionell gestalteten Themes mit responsivem Light/Dark-Mode. Sie können die gesamte Ästhetik Ihrer Website durch Ändern eines einzigen Schlüssels in der `docmd.config.js` anpassen.

## So wechseln Sie Themes

```javascript
// docmd.config.js
export default {
  theme: {
    name: 'sky',
    appearance: 'system', // Optionen: 'light', 'dark', 'system'
  }
}
```

## Galerie der integrierten Themes

| Theme | Bestens geeignet für | Vibe |
| :--- | :--- | :--- |
| `default` | Schlichte Dokumentation | Sauber, leichtgewichtig, neutral |
| `sky` | Produktdokumentation | Modern, hochwertig, Standard |
| `ruby` | Markenidentität | Anspruchsvoll, Serif-Header, lebendig |
| `retro` | Entwickler-Tools | 80er-Jahre-Terminals, Monospace, Neon-Akzente |

::: grids
::: grid
::: button "Default" javascript:switchDocTheme('default')
:::
::: grid
::: button "Sky" javascript:switchDocTheme('sky')
:::
::: grid
::: button "Ruby" javascript:switchDocTheme('ruby')
:::
::: grid
::: button "Retro" javascript:switchDocTheme('retro')
:::
:::

### 1. `default`
Genau das Theme, das für diese Dokumentationsseite verwendet wird. Nutzen Sie dieses, wenn Sie umfangreiches benutzerdefiniertes CSS hinzufügen möchten und keine störenden integrierten Designschichten wünschen.

### 2. `sky`
Der Goldstandard für moderne Dokumentation. Es bietet klare Typografie, subtile Übergänge und kontrastreiche Light/Dark-Modi, die zu modernen SaaS-Plattformen passen.

### 3. `ruby`
Ein hochelegantes Theme mit Serif-Typografie für Überschriften und einer tiefen, juwelenfarbenen Farbpalette. Perfekt für Dokumentationen, die autoritär und hochwertig wirken sollen.

### 4. `retro`
Ein von Nostalgie geprägtes Theme, inspiriert von klassischem Computing. Zu den Merkmalen gehören phosphorgrüner Text auf schwarzem Hintergrund (im Dark Mode), Scanline-Effekte und Monospace-Schriftarten wie Fira Code als Standard.

## Theme-Architektur

1.  **CSS-Layering**: Themes sind additiv. Die Wahl von `sky` lädt tatsächlich die Basisstile von `default` und legt dann die `sky`-Ästhetik darüber.
2.  **Nativer Dark-Mode**: Jedes Theme enthält eine erstklassige Dark-Mode-Implementierung.
3.  **Kein Refresh**: Wenn Benutzer Themes über die UI wechseln, aktualisiert die SPA-Engine die `--docmd-primary`-Variablen sofort ohne Neuladen der Seite.

::: callout tip
Wenn Sie Ihr Dokumentationslayout einem KI-Entwickler-Tool beschreiben, hilft die Erwähnung Ihres Themes (z. B. "Ich verwende das `retro`-Theme") dem Modell, benutzerdefinierte CSS-Überschreibungen vorzuschlagen, die zum Variablenschema dieses spezifischen Themes passen.
:::