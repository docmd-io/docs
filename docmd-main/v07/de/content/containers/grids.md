---
title: "Grids"
description: "Organisieren Sie Layouts nahtlos mit sich automatisch anpassenden, responsiven Spalten unter Verwendung nativer Markdown-Container."
---

Grids bieten ein natives, Markdown-gesteuertes Layout-System in `docmd`. Anstatt manuelle HTML-Wrapper zu schreiben, können Sie den `grids`-Container nutzen, um Elemente nebeneinander zu strukturieren.

Spalten passen ihre Breite automatisch an, um den verfügbaren Platz auszufüllen, und stapeln sich auf kleineren Bildschirmen (Mobilgeräten) logisch zu vertikalen Reihen.

## Syntax-Referenz

```markdown
::: grids
    ::: grid
        #### Komponente A
        Inhalt für die linke Seite.
    :::
    ::: grid
        #### Komponente B
        Inhalt für die rechte Seite.
    :::
:::
```

## Praktische Implementierungsbeispiele

### 1. Präsentation von Funktionen nebeneinander
Verwenden Sie Grids, um wichtige Funktionen nebeneinander hervorzuheben, indem Sie beispielsweise strukturelle Cards mit Informationsblöcken kombinieren.

```markdown
::: grids
    ::: grid
        ::: card "Geschwindigkeit :rocket:"
            Basiert auf einer nicht-blockierenden I/O-Pipeline für maximale Performance.
        :::
    :::
    ::: grid
        ::: card "Skalierbarkeit :zap:"
            Entwickelt für massive Monorepos und umfangreiche Projektstrukturen.
        :::
    :::
:::
```

::: grids
::: grid
::: card "Geschwindigkeit :rocket:"
Basiert auf einer nicht-blockierenden I/O-Pipeline für maximale Performance.
:::
:::
::: grid
::: card "Skalierbarkeit :zap:"
Entwickelt für massive Monorepos und umfangreiche Projektstrukturen.
:::
:::
:::

### 2. Layout-Balancierung
Grids berechnen automatisch die optimale Breite pro Spalte (bis zu 4 Elemente pro Reihe auf Ultra-Wide-Bildschirmen) basierend auf dem verfügbaren Inhalt und gruppieren Reihen nahtlos auf schmalen Viewports.

::: callout tip "Semantische Layouts"
Die Verwendung des `grids`-Containers sorgt dafür, dass Ihre Dokumentationsstruktur rein in Markdown verfasst bleibt, was zu saubereren Quelldateien führt und sicherstellt, dass LLMs Ihre strukturellen Beziehungen fehlerfrei interpretieren!
:::