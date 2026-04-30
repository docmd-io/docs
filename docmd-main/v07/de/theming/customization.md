---
title: "Anpassung & Variablen"
description: "Eine vollständige Referenz der CSS-Variablen und Komponentonklassen von docmd für fortgeschrittenes Styling."
---

`docmd` basiert auf einer CSS-Variablen-Architektur. Das bedeutet, dass Sie Ihre gesamte Website neu gestalten können, indem Sie einfach ein paar Schlüssel in einem `:root`-Block überschreiben, ohne komplexe CSS-Selektoren schreiben zu müssen.

## Referenz der globalen Variablen

| Variable | Standard (Hell) | Standard (Dunkel) | Beschreibung |
| :--- | :--- | :--- | :--- |
| `--bg-color` | `#ffffff` | `#09090b` | Hintergrund der Hauptseite. |
| `--text-color` | `#3f3f46` | `#a1a1aa` | Standardfließtext. |
| `--text-heading` | `#09090b` | `#fafafa` | Farben für Titel und Überschriften. |
| `--link-color` | `#068ad5` | `#068ad5` | Primäre Akzentfarbe / Links. |
| `--border-color` | `#e4e4e7` | `#27272a` | Trennlinien und Rahmen. |
| `--sidebar-bg` | `#fafafa` | `#09090b` | Hintergrund der Navigation. |
| `--ui-border-radius` | `6px` | `6px` | Rundung für alle UI-Elemente. |
| `--sidebar-width` | `260px` | `260px` | Breite der Seitenleiste. |

## Beispiel für eine Überschreibung

Um die primäre Akzentfarbe Ihrer Website zu ändern, fügen Sie dies zu Ihrem `customCss` hinzu:

```css
:root {
  --link-color: #f43f5e; /* Rose 500 */
}

body[data-theme="dark"] {
  --link-color: #fb7185; /* Rose 400 */
}
```

## Ansprechen von Komponenten

Wenn Sie bestimmte Komponenten stylen möchten, verwenden Sie diese übergeordneten Klassen:

*   `.main-content`: Der Wrapper für alle Markdown-Inhalte.
*   `.sidebar-nav`: Die interne Navigationsliste.
*   `.page-header`: Die obere Navigationsleiste.
*   `.docmd-search-modal`: Das Such-Overlay.
*   `.docmd-tabs`: Komponenten des Tab-Containers.
*   `.callout`: Die Hinweis- und Warnungsboxen.

## Fehlerbehebung bei der Selektivität (Specificity)
Die meisten `docmd`-Styles verwenden eine niedrige Selektivität. Wenn Ihre Überschreibungen nicht übernommen werden, stellen Sie sicher, dass Ihr `customCss` korrekt registriert ist und prüfen Sie, ob das Hinzufügen eines `body`-Präfixes (z. B. `body .main-content`) hilft.

::: callout tip
Da `docmd` Standard-CSS-Variablen verwendet, können Sie eine KI fragen: *"Gib mir eine professionelle Farbpalette mit --link-color und --bg-color für docmd"*. Das Modell wird in der Lage sein, sofort kopierbares CSS bereitzustellen, das sich perfekt in die integrierten Themes integriert.
:::