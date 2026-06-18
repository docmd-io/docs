---
title: "Math-Plugin"
description: "Native KaTeX/LaTeX-Mathematik-Integration für docmd."
---

Das **Math-Plugin** fügt Ihren docmd-Sites native LaTeX- und KaTeX-Unterstützung hinzu.

Es verwendet `markdown-it-texmath`, integriert mit der `katex`-Berechnungs-Engine. Dies rendert Inline- und Block-Formeln reibungslos ohne komplexe clientseitige JavaScript-Bibliotheken.

## Konfiguration

Das Math-Plugin ist ein optionales Plugin. Installieren Sie es über die CLI:

```bash
npx @docmd/core add math
```

Aktivieren Sie es in Ihrer `docmd.config.json`:

### Beispiel

```json "docmd.config.json"
{
  "plugins": {
    "math": {}
  }
}
```

## Funktionsweise

1. Aktivieren Sie das Plugin über Ihre `docmd.config.json`.
2. Umschließen Sie Ihre Standard-LaTeX-Mathematik mit `$` (Inline) oder `$$` (Block)-Markierungen.
3. Die Engine verarbeitet diese Regeln während des Builds genau wie rohe statische HTML-Tags.
4. Minimal injizierte CSS-Styles stylen die Klassen automatisch. Dies führt zu sofortiger Visualisierung beim Laden der Seite.

## Bedingtes Asset-Laden (neu in 0.8.7)

Das KaTeX-Stylesheet (~30 KB) wird nur auf Seiten geladen, die tatsächlich Mathematik rendern. Seiten ohne Gleichungen überspringen den Fetch komplett, sodass eine 100-Seiten-Dokumentation mit nur 5 Mathematikseiten die CSS nur für diese 5 Seiten bezahlt. Die Erkennung scannt das gerenderte HTML jeder Seite nach `class="katex"`- oder `class="katex-display"`-Markern und injiziert das Asset bedingt. Keine Konfiguration erforderlich - das Verhalten ist automatisch.

## Verwendung

### Inline-Mathematik

Fügen Sie Standardgleichungen in einem Absatz mit einfachen Dollarzeichen `$` ein:

```markdown
Here is an inline equation: $E = mc^2$
```

Here is an inline equation: $E = mc^2$

### Block-Mathematik

Für breitere mathematische Beweise oder unterschiedliche Formulierungen verwenden Sie doppelte Dollarzeichen `$$` für die Blockformatierung:

```markdown
$$
\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}
$$
```

$$
\sum_{i=1}^n i^2 = \frac{n(n+1)(2n+1)}{6}
$$
