---
title: "Hell- & Dunkelmodus"
description: "So konfigurieren Sie den Standard-Ansichtsmodus und verwalten den Theme-Umschalter für die beste Benutzererfahrung."
---

`docmd` bietet integrierte Unterstützung für helle und dunkle Farbschemata. Es erkennt automatisch die Systemeinstellungen der Benutzer und ermöglicht manuelle Überschreibungen über einen UI-Umschalter.

<!-- SCREENSHOT: Geteilter Bildschirm, der dieselbe Dokumentationsseite im Hellmodus (links) und im Dunkelmodus (rechts) zeigt, wobei die Schaltfläche zum Umschalten des Themes in beiden eingekreist ist. -->

## Standard-Ansichtsmodus

Sie legen den Anfangszustand Ihrer Dokumentation in der `docmd.config.json` fest.

```json
{
  "theme": {
    "name": "sky",
    "appearance": "system"
  }
}
```

*   **`system`**: Entspricht der Betriebssystem-Präferenz des Benutzers (Empfohlen).
*   **`light`**: Erzwingt den Hellmodus beim ersten Laden.
*   **`dark`**: Erzwingt den Dunkelmodus beim ersten Laden.

## Konfiguration der Umschalt-Schaltfläche

Der Theme-Umschalter ist Teil des **Optionsmenüs**. Sie können dessen Sichtbarkeit und Position innerhalb des `layout`-Objekts steuern.

```json
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

## Funktionsweise (Technisch)

Die Theme-Engine wendet ein `data-theme`-Attribut auf das `<body>`-Tag an:

*   `<body data-theme="light">`
*   `<body data-theme="dark">`

Wenn Sie ein themenbasiertes Design wie `sky` verwenden, lautet das Attribut `sky-light` oder `sky-dark`.

### CSS-Variablen
`docmd`-Themes verwenden CSS-Variablen für alle Farben. Sie können diese Variablen in Ihrem eigenen CSS überschreiben, um das Aussehen beider Modi anzupassen.

```css
/* Benutzerdefinierte CSS-Überschreibung */
:root {
  --docmd-primary: #4f46e5; /* Primärer Akzent für Hellmodus */
}

body[data-theme="dark"] {
  --docmd-primary: #818cf8; /* Primärer Akzent für Dunkelmodus */
}
```

## Benutzer-Persistenz
Wenn ein Benutzer den Modus manuell umschaltet, wird seine Präferenz im `localStorage` gespeichert. `docmd` liest diesen Wert bei jedem Seitenladen sofort aus, um "Theme-Flackern" (FOUC) zu verhindern.

::: callout tip
Bei der Generierung von Inhalten bevorzugen LLMs kontrastreiche Strukturen. `docmd` stellt sicher, dass Code-Snippets und Callouts in beiden Modi barrierefrei bleiben. Dies gewährleistet, dass `llms-full.txt`-Payloads als semantische Blöcke korrekt verstanden werden, unabhängig davon, welcher Modus während des Builds aktiv war.
:::