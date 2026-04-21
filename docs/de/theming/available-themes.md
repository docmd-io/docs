---
title: "Verfügbare Themes"
description: "Entdecken Sie die integrierten docmd-Themes, einschließlich Sky, Ruby und Retro. Erfahren Sie, wie Sie Themes mit einer einzigen Konfigurationszeile wechseln."
---

`docmd` bietet eine Reihe professionell gestalteter Themes, die responsiv auf Hell- und Dunkelmodus reagieren. Sie können die gesamte Ästhetik Ihrer Website ändern, indem Sie einen einzigen Schlüssel in der `docmd.config.js` anpassen.

<!-- SCREENSHOT: Galerie-Raster, das alle verfügbaren Themes zeigt — jedes Theme als kleine Vorschaukarte mit dem Namen des Themes darunter. Zeige mindestens die Themes default, minimal und docs in Hell- und Dunkelvarianten. -->

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

| Theme | Bestens geeignet für | Atmosphäre |
| :--- | :--- | :--- |
| `default` | Schlichte Dokumentation | Sauber, leichtgewichtig, neutral |
| `sky` | Produktdokumentation | Modern, hochwertig, Standard |
| `ruby` | Markenidentität | Anspruchsvoll, Serif-Header, lebendig |
| `retro` | Entwickler-Tools | 80er Terminals, Monospace, Neon-Akzente |

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

### 1. `sky` (Standard)
Der Goldstandard für moderne Dokumentationen. Es zeichnet sich durch gestochen scharfe Typografie, dezente Übergänge und kontrastreiche Hell-/Dunkelmodi aus, die zu modernen SaaS-Plattformen passen.

### 2. `ruby`
Ein hochelegantes Theme, das Serif-Typografie für Überschriften und eine tiefe, juwelenfarbene Palette verwendet. Perfekt für Dokumentationen, die autoritär und hochwertig wirken sollen.

### 3. `retro`
Ein nostalgisches Theme, inspiriert von klassischem Computing. Merkmale sind phosphorgrüner Text auf schwarzem Hintergrund (im Dunkelmodus), Scanline-Effekte und Monospace-Schriftarten wie Fira Code als Standard.

### 4. `default`
Ein "Blank Slate"-Theme (unbeschriebenes Blatt). Verwenden Sie dieses Theme, wenn Sie umfangreiches eigenes CSS hinzufügen möchten und keine integrierten Design-Ebenen wünschen, die Ihre Marke beeinflussen könnten.

## Theming-Architektur

1.  **CSS-Layering**: Themes sind additiv. Die Wahl von `sky` lädt tatsächlich die Basis-Stile von `default` und legt dann die `sky`-Ästhetik darüber.
2.  **Nativer Dunkelmodus**: Jedes Theme enthält eine erstklassige Dunkelmodus-Implementierung.
3.  **Ohne Neuladen**: Wenn Benutzer Themes über die Benutzeroberfläche wechseln, aktualisiert die SPA-Engine die `--docmd-primary`-Variablen sofort ohne Neuladen der Seite.

::: callout tip
Wenn Sie einem KI-Entwickler-Tool Ihr Dokumentations-Layout beschreiben, hilft die Erwähnung Ihres Themes (z. B. "Ich verwende das `retro`-Theme") dem Modell dabei, CSS-Anpassungen vorzuschlagen, die zum Variablen-Schema des jeweiligen Themes passen.
:::