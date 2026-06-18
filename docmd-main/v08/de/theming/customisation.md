---
title: "Anpassung & Variablen"
description: "Eine vollständige Referenz der CSS-Variablen und Komponentenklassen von docmd für fortgeschrittenes Styling."
---

`docmd` ist mit einer CSS-Variablen-zentrierten Architektur aufgebaut. Das bedeutet, Sie können den gesamten Stil Ihrer Site neu definieren, indem Sie einfach einige Schlüssel in einem `:root`-Block überschreiben — ohne komplexe CSS-Selektoren zu schreiben.

## Globale Variablenreferenz

| Variable | Standard (Hell) | Standard (Dunkel) | Beschreibung |
| :--- | :--- | :--- | :--- |
| `--bg-color` | `#ffffff` | `#0d0d0f` | Hauptseitenhintergrund. |
| `--text-color` | `#27272a` | `#d4d4d8` | Standard-Body-Text. |
| `--text-heading` | `#09090b` | `#fafafa` | Titel- und Header-Farben. |
| `--link-color` | `#068ad5` | `#38bdf8` | Primäre Akzentfarbe / Links. |
| `--border-color` | `#e4e4e7` | `#27272a` | Trenner und Rahmen. |
| `--sidebar-bg` | `#fafafa` | `#09090b` | Navigations-Hintergrund. |
| `--ui-border-radius` | `6px` | `6px` | Rundung aller UI-Elemente. |
| `--sidebar-width` | `260px` | `260px` | Breite der Sidebar-Spalte. |

## Beispielüberschreibung

Um die primäre Akzentfarbe Ihrer Site zu ändern, fügen Sie dies zu Ihrer `customCss` hinzu:

```css
:root {
  --link-color: #f43f5e; /* Rose 500 */
}

body[data-theme="dark"] {
  --link-color: #fb7185; /* Rose 400 */
}
```

## Komponenten ansprechen

Wenn Sie bestimmte Komponenten stylen müssen, verwenden Sie diese Top-Level-Klassen:

*   `.main-content`: Der Wrapper für alle Markdown-Inhalte.
*   `.sidebar-nav`: Die interne Navigationsliste.
*   `.page-header`: Die obere Navigationsleiste.
*   `.docmd-search-modal`: Das Such-Overlay.
*   `.docmd-tabs`: Tab-Container-Komponenten.
*   `.callout`: Die Alarm-/Hinweis-Boxen.

## Spezifität-Fehlerbehebung
Die meisten `docmd`-Stile verwenden eine geringe Spezifität. Wenn Ihre Überschreibungen nicht angewendet werden, stellen Sie sicher, dass Ihre `customCss` korrekt registriert ist, und prüfen Sie, ob das Hinzufügen eines `body`-Präfixes (z. B. `body .main-content`) hilft.

::: callout tip
Da `docmd` Standard-CSS-Variablen verwendet, können Sie eine KI fragen: *"Gib mir eine professionelle Farbpalette mit --link-color und --bg-color für docmd"*. Das Modell wird in der Lage sein, fertig einfügbares CSS bereitzustellen, das perfekt mit den eingebauten Themes integriert.
:::

## Brauchen Sie ein völlig anderes Layout?

Wenn CSS-Überschreibungen nicht ausreichen, schreiben Sie ein **Template-Plugin** — ein Paket, das sein eigenes `layout.ejs` (und alle Partials, die Sie überschreiben möchten) sowie ein CSS/JS-Bundle liefert. Templates sind erstklassige Plugins mit `capabilities: ['template']` und werden über das bestehende Theme-+-customCss-System gelegt.

Den vollständigen Leitfaden und eine Beispiel-Template-Paketstruktur finden Sie unter [Templates](templates.md).