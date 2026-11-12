---
title: "Math-Plugin"
description: "Native KaTeX- und LaTeX-Mathematikformelrendering mit bedingtem Asset-Laden."
---

Das `@docmd/plugin-math`-Plugin bietet natives LaTeX- und KaTeX-Mathematikgleichungsrendering für docmd. Angetrieben von `markdown-it-texmath` und KaTeX werden Formeln in statische HTML-Elemente mit optionaler CSS-Asset-Injizierung kompiliert.

## Installation & Setup

Installieren Sie das Plugin über die CLI:

```bash
npx @docmd/core add math
```

Aktivieren Sie das Plugin in `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "math": {}
  }
}
```

## Hauptfunktionen

* **Inline- & Block-Parsing**: Parst Gleichungen, die durch `$` (Inline) oder `$$` (Block) Begrenzer eingefasst sind.
* **Bedingte Asset-Injizierung**: Das KaTeX-Stylesheet (~30 KB) wird nur auf Seiten injiziert, die Formelelemente (`class="katex"` oder `class="katex-display"`) enthalten. Seiten ohne Formeln haben keinen Asset-Overhead.
* **Schnelle Initialisierung**: Mathematik-Markup wird während der Build-Zeit ausgewertet, um ein Layout-Shifting beim Laden der Seite zu verhindern.

## Verwendung & Syntax

### Inline-Mathematik

Betten Sie Formeln mit einfachen Dollarzeichen (`$`) in den Text ein:

```markdown
Die Energie-Masse-Äquivalenzgleichung lautet $E = mc^2$.
```

Die Energie-Masse-Äquivalenzgleichung lautet $E = mc^2$.

### Block-Mathematik

Rendern Sie mehrzeilige Beweise und zentrierte Gleichungen mit doppelten Dollarzeichen (`$$`):

```markdown
$$
\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}
$$
```

$$
\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}
$$

::: callout tip "Leistungsoptimierung" icon:zap
Da KaTeX-Assets bedingt pro Seite geladen werden, beeinträchtigt das Hinzufügen mathematischer Formeln zu einer Teilmenge von Seiten nicht die Ladezeiten des Rests Ihrer Dokumentationsseite.
:::