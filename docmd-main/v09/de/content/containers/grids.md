---
title: "Grids"
description: "Organisieren Sie responsive mehrspaltige Layouts mithilfe von nativen Markdown-Flexbox-Containern in docmd."
---

Grids bieten ein natives, Markdown-gesteuertes Layout-System. Verwenden Sie den `grids`-Container, um Elemente nebeneinander zu strukturieren. Spalten balancieren den verfügbaren Platz automatisch aus und stapeln sich auf mobilen Viewports vertikal.

## Syntax-Referenz

```markdown
::: grids
    ::: grid
        Inhalt für die erste Spalte.
    :::
    ::: grid
        Inhalt für die zweite Spalte.
    :::
:::
```

| Container | Beschreibung |
| :--- | :--- |
| **`::: grids`** | Äußerer Wrapper-Container, der das responsive Flexbox-Layout einleitet. |
| **`::: grid`** | Innerer Spalten-Container. Deklarieren Sie so viele `grid`-Blöcke wie erforderlich. |

## Anwendungsbeispiele

### Karten nebeneinander

Kombinieren Sie `grids` mit `cards`, um mehrere Feature-Blöcke in einer responsiven Reihe zu präsentieren:

```markdown
::: grids
    ::: grid
        ::: card "Geschwindigkeit" icon:zap
        Basiert auf einer asynchronen, nicht-blockierenden I/O-Engine für maximale Performance.
        :::
    :::
    ::: grid
        ::: card "Skalierbarkeit" icon:layers
        Entwickelt für große Monorepos und Multi-Projekt-Workspaces.
        :::
    :::
:::
```

::: grids
    ::: grid
        ::: card "Geschwindigkeit" icon:zap
        Basiert auf einer asynchronen, nicht-blockierenden I/O-Engine für maximale Performance.
        :::
    :::
    ::: grid
        ::: card "Skalierbarkeit" icon:layers
        Entwickelt für große Monorepos und Multi-Projekt-Workspaces.
        :::
    :::
:::

### Dreispaltiges Layout

Fügen Sie einen dritten `grid`-Block hinzu, um eine dreispaltige Reihe zu erstellen:

```markdown
::: grids
    ::: grid
        ::: card "Such-Engine" icon:search
        Integrierter Volltext-Such-Indexierer.
        :::
    :::
    ::: grid
        ::: card "Lokalisierung" icon:globe
        Mehrsprachiges Verzeichnis-Routing und lokalisierte Suchindizes.
        :::
    :::
    ::: grid
        ::: card "Theming-Engine" icon:palette
        Integrierter Dunkelmodus und vollständige CSS-Variablen-Anpassung.
        :::
    :::
:::
```

::: grids
    ::: grid
        ::: card "Such-Engine" icon:search
        Integrierter Volltext-Such-Indexierer.
        :::
    :::
    ::: grid
        ::: card "Lokalisierung" icon:globe
        Mehrsprachiges Verzeichnis-Routing und lokalisierte Suchindizes.
        :::
    :::
    ::: grid
        ::: card "Theming-Engine" icon:palette
        Integrierter Dunkelmodus und vollständige CSS-Variablen-Anpassung.
        :::
    :::
:::

::: callout tip "Saubere strukturelle Signale" icon:lightbulb
Der `grids`-Container behält die Layout-Struktur rein in Markdown bei. Dies eliminiert rohen HTML-Overhead und stellt sicher, dass KI-Kontext-Indexierer Nebeneinander-Beziehungssignale sauber interpretieren.
:::