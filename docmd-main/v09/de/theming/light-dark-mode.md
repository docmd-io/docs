---
title: "Hell- & Dunkelmodus"
description: "So konfigurieren Sie den Standard-Anzeigemodus und verwalten den Theme-Switcher für die beste Nutzererfahrung."
---

`docmd` wird mit hellen und dunklen Farbschemata ausgeliefert. Es folgt automatisch der System-Präferenz des Nutzers und erlaubt es ihm, diese über einen UI-Umschalter zu überschreiben.

## Standard-Anzeigemodus

Sie legen den Anfangszustand Ihrer Dokumentation in `docmd.config.json` fest.

```json "docmd.config.json"
{
  "theme": {
    "name": "sky",
    "appearance": "system"
  }
}
```

*   **`system`** (Standard): Entspricht der OS-Präferenz des Nutzers (empfohlen).
*   **`light`**: Erzwingt den Hellmodus beim ersten Laden.
*   **`dark`**: Erzwingt den Dunkelmodus beim ersten Laden.

## Umschalter konfigurieren

Der Theme-Switcher ist Teil des **Optionsmenüs**. Sie können seine Sichtbarkeit und Position im `layout`-Objekt steuern.

```json "docmd.config.json"
{
  "layout": {
    "optionsMenu": {
      "position": "header",
      "components": {
        "themeSwitch": true
      }
    }
  }
}
```

## Funktionsweise

Die Engine wendet ein `data-theme`-Attribut auf das `<body>`-Tag an:

*   `<body data-theme="light">`
*   `<body data-theme="dark">`

Wenn Sie ein themed Design wie `sky` verwenden, wird das Attribut zu `sky-light` oder `sky-dark`.

### CSS-Variablen

Themes verwenden für alle Farben CSS-Variablen. Überschreiben Sie sie in Ihrem eigenen CSS, um einen der beiden Modi neu zu stylen.

```css
:root {
  --docmd-primary: #4f46e5; /* Primärer Akzent für den Hellmodus */
}

html[data-theme="dark"] {
  --docmd-primary: #818cf8; /* Primärer Akzent für den Dunkelmodus */
}
```

## Nutzerpersistenz
Wenn ein Nutzer den Modus manuell umschaltet, wird seine Präferenz in `localStorage` gespeichert. `docmd` liest diesen Wert bei jedem Seitenaufruf sofort, um „Theme-Flickering" (FOUC) zu verhindern.

::: callout tip
Bei der Inhaltserstellung bevorzugen LLMs hochkontrastreiche Strukturen. `docmd` stellt sicher, dass Code-Snippets und Callouts in beiden Modi zugänglich bleiben, sodass `llms-full.txt`-Payloads korrekt als semantische Blöcke verstanden werden, unabhängig davon, welcher Modus beim Build aktiv war.
:::