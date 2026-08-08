---
title: "Anpassung & CSS-Variablen"
description: "Referenzhandbuch für docmd CSS-Variablen, visuelle Tokens und Komponentenklassen für fortgeschrittenes Styling."
---

`docmd` verwendet eine Design-Token-Architektur, die auf CSS-Variablen basiert. Gestalten Sie Kern-Website-Themes und Komponenten neu, indem Sie benutzerdefinierte Eigenschaften in `:root` in einem benutzerdefinierten Stylesheet überschreiben.

## CSS-Variablenreferenz

| CSS-Variable | Standard (Heller Modus) | Standard (Dunkler Modus) | Ziel des visuellen Tokens |
| :--- | :--- | :--- | :--- |
| `--bg-color` | `#ffffff` | `#0d0d0f` | Primärer Seitenhintergrund |
| `--text-color` | `#27272a` | `#d4d4d8` | Standard-Fließtext-Typografie |
| `--text-heading` | `#09090b` | `#fafafa` | Titel- und Überschriften-Elemente (`h1`–`h6`) |
| `--link-color` | `#068ad5` | `#38bdf8` | Primäre Akzent- und Hyperlink-Farbe |
| `--border-color` | `#e4e4e7` | `#27272a` | Linientrenner und Kartenränder |
| `--sidebar-bg` | `#fafafa` | `#09090b` | Navigations-Seitenleisten-Hintergrund |
| `--ui-border-radius` | `6px` | `6px` | UI-Eckenrundung für Buttons, Karten und Tags |
| `--sidebar-width` | `260px` | `260px` | Breite der Navigations-Seitenleistenspalte |

## Beispiele für CSS-Überschreibungen

Um die primäre Akzentfarbe Ihrer Website im hellen und dunklen Modus zu ändern, definieren Sie benutzerdefinierte Regeln in `assets/css/branding.css`:

```css
:root {
  --link-color: #f43f5e; /* Rose-Akzent (Heller Modus) */
}

body[data-theme="dark"] {
  --link-color: #fb7185; /* Rose-Akzent (Dunkler Modus) */
}
```

## Hauptkomponentenklassen

Richten Sie sich mit visuellen Layout-Klassen an spezifische UI-Komponenten:

* `.main-content`: Container für geparste Markdown-Fließtext-Inhalte.
* `.sidebar-nav`: Navigationsbaumliste innerhalb der Seitenleiste.
* `.page-header`: Obere Navigationsleiste (Menüleiste).
* `.docmd-search-modal`: Volltext-Such-Modal-Overlay.
* `.docmd-tabs`: Interaktive Tab-Container-Blöcke.
* `.callout`: Callout-Alert- und Hinweis-Container.

## Strukturelle Layout-Überschreibungen

Wenn CSS-Variablen-Überschreibungen nicht ausreichen und Sie die HTML-Layoutstruktur selbst ändern müssen (z. B. benutzerdefinierte Seitenleisten oder Fußzeilen), erstellen Sie ein **Template-Plugin**. Templates liefern benutzerdefinierte `.ejs`-Partials und werden direkt über CSS-Themes gelegt.

Siehe [Templates](templates.md) für vollständige Richtlinien zur Template-Entwicklung.