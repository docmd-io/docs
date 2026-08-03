---
title: "Verfügbare Themes"
description: "Erkunden Sie die eingebauten Themes von docmd, darunter Sky, Ruby und Retro. Lernen Sie, wie Sie mit einer einzigen Konfigurationszeile das Theme wechseln."
---

::: callout info "Was ist neu in 0.8.7"
Themes bleiben der einfachste Weg, einer Site eine neue Farbgebung zu geben. Wenn Sie eine andere **Layout-Struktur** benötigen (nicht nur Farben), sehen Sie sich die neue [Templates](templates.md)-Seite an — Templates liegen über den Themes und liefern eigene EJS-Partials sowie CSS/JS-Bundles.
:::

`docmd` bietet eine Reihe professionell gestalteter, hell/dunkel-responsiver Themes. Sie können die gesamte Ästhetik Ihrer Site durch Änderung eines einzigen Schlüssels in `docmd.config.json` umstellen.

## Themes wechseln

```json "docmd.config.json"
{
  "theme": {
    "name": "sky",
    "appearance": "system"
  }
}
```

## Eingebaute Theme-Galerie

| Theme | Am besten für | Vibes |
| :--- | :--- | :--- |
| `default` | Zurückhaltende Doku | Sauber, leichtgewichtig, neutral |
| `sky` | Produktdokumentation | Modern, hochwertig, Standardausgabe |
| `ruby` | Markenidentität | Anspruchsvoll, Serifen-Header, lebendig |
| `retro` | Entwicklertools | 80er-Terminals, Monospace, Neon-Akzente |

### 1. `default`
Genau das Theme, das für diese Dokumentations-Site verwendet wird. Verwenden Sie dies, wenn Sie umfangreiches eigenes CSS hinzufügen möchten und nicht möchten, dass eingebaute Designebenen stören.

### 2. `sky`
Ein moderner Dokumentations-Look mit klarer Typografie, subtilen Übergängen und kontrastreichen Hell-/Dunkel-Modi.

### 3. `ruby`
Ein von Serifen getriebenes Theme mit einer tiefen, juweltonigen Palette. Gut für Dokumentation, die Autorität ausstrahlen soll.

### 4. `retro`
Ein Vintage-Computing-inspiriertes Theme mit Phosphor-grünem Text auf schwarzem Hintergrund (Dunkelmodus), Scanline-Effekten und Monospace-Schriftarten (standardmäßig Fira Code).

::: callout warning "Reservierte Namen — nicht für Template-Namen verwenden"
Die vier oben genannten Werte (`default`, `sky`, `ruby`, `retro`) sind die einzigen reservierten CSS-Theme-Namen. Jeder andere Wert in `theme.name` wird automatisch zu einem Template-Namen hochgestuft (siehe [Templates](templates.md)). Wenn Sie einen CSS-Theme-ähnlichen Namen auf einem Template verwenden möchten, setzen Sie stattdessen explizit `theme.template`.
:::

## Theme-Architektur

1.  **CSS-Layering**: Themes sind additiv. Die Wahl von `sky` lädt die Basisstile von `default` und überlagert die `sky`-Palette.
2.  **Dunkelmodus**: Jedes Theme enthält eine eingebaute Dunkelmodus-Implementierung.
3.  **Live-Switching**: Wenn Nutzer Themes über die UI wechseln, aktualisiert die SPA-Engine die relevanten CSS-Variablen ohne Seiten-Neuladen.

::: callout tip
Die CSS-Variablennamen unterscheiden sich leicht zwischen den Themes (zum Beispiel existiert `--sky-primary` nur unter `sky`). Wenn Sie bei der Frage nach Hilfe zu eigenem CSS Ihren Theme-Namen erwähnen, bleiben Vorschläge korrekt.
:::