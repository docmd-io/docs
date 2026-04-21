---
title: "Raster (Grids)"
description: "Organisieren Sie Ihr Layout nahtlos mit automatisch anpassbaren, responsiven Spalten unter Verwendung nativer Markdown-Container."
---

Raster bieten ein natives, Markdown-gesteuertes Layout-System in `docmd`. Anstatt manuelle HTML-Wrapper zu schreiben, können Sie den `grids`-Container nutzen, um Elemente nebeneinander zu strukturieren.

Die Spalten passen ihre Breite automatisch an, um den verfügbaren Platz auszufüllen, und stapeln sich auf kleineren Bildschirmen (Mobilgeräten) logisch zu vertikalen Reihen.

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

### 1. Funktionen nebeneinander präsentieren
Verwenden Sie Raster, um Kernfunktionen nebeneinander hervorzuheben, beispielsweise durch die Kombination von strukturellen Karten mit Informationsblöcken.

```markdown
::: grids
::: grid
::: card "Geschwindigkeit :rocket:"
Aufgebaut auf einer nicht-blockierenden I/O-Pipeline für maximale Leistung.
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
Aufgebaut auf einer nicht-blockierenden I/O-Pipeline für maximale Leistung.
:::
:::
::: grid
::: card "Skalierbarkeit :zap:"
Entwickelt für massive Monorepos und umfangreiche Projektstrukturen.
:::
:::
:::

### 2. Layout-Balancierung
Raster berechnen automatisch die optimale Breite pro Spalte (bis zu 4 Elemente pro Reihe auf Ultra-Wide-Bildschirmen) basierend auf dem verfügbaren Inhalt und gruppieren Reihen nahtlos auf schmalen Viewports.

::: callout tip "Semantische Layouts"
Die Verwendung des `grids`-Containers hält Ihre Dokumentationsstruktur rein in Markdown verfasst, was zu saubereren Quelldateien führt und sicherstellt, dass LLMs Ihre strukturellen Beziehungen fehlerfrei interpretieren!
:::