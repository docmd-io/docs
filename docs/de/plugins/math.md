---
title: "Math-Plugin"
description: "Native KaTeX/LaTeX-Mathematik-Integration für docmd."
---

Das **Math-Plugin** fügt Ihren docmd-Websites native Unterstützung für LaTeX und KaTeX hinzu.

Es nutzt `markdown-it-texmath` in sicherer Integration mit der `katex`-Engine, um sowohl Inline-Mathematik als auch mathematische Blöcke reibungslos zu rendern, ohne dass komplexe clientseitige JavaScript-Bibliotheken erforderlich sind.

## Setup

```bash
docmd add math
```

```javascript
plugins: {
  math: {}
}
```

## Funktionsweise

1. Aktivieren Sie das Plugin über Ihre `docmd.config.js`.
2. Umschließen Sie Ihre Standard-LaTeX-Mathematik mit `$` (inline) oder `$$` (Block).
3. Der Server verarbeitet diese mathematischen Regeln während des Static-Site-Builds intelligent als reine statische HTML-Tags.
4. Minimal eingefügtes CSS übernimmt das Styling dieser Klassen automatisch, was zu einer sofortigen Visualisierung führt, sobald der Benutzer die Seite aufruft!

## Verwendung

### Inline-Mathematik

Sie können Standard-Gleichungen mithilfe von einfachen Dollarzeichen `$` nahtlos in einen Textabschnitt einfügen:

```markdown
Hier ist eine Inline-Gleichung: $E = mc^2$
```

Hier ist eine Inline-Gleichung: $E = mc^2$

### Mathematische Blöcke

Verwenden Sie für umfangreichere mathematische Beweise oder eigenständige Formeln doppelte Dollarzeichen `$$` für die Blockformatierung:

```markdown
$$
\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}
$$
```

$$
\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}
$$