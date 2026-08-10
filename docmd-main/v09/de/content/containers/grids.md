---
title: "Grids"
description: "Organisieren Sie responsive mehrspaltige Layouts mithilfe von nativen Markdown-Flexbox-Containern in docmd."
---

Grids bieten ein natives, Markdown-gesteuertes Layout-System. Verwenden Sie den `grids`-Container, um Elemente nebeneinander zu strukturieren. Spalten balancieren den verfügbaren Platz automatisch aus und stapeln sich auf mobilen Viewports vertikal.

## Container-Syntax

```markdown
::: grids # Äußerer Flexbox-Grid-Wrapper Öffner
    ::: grid # Innerer Spalten-Container Öffner
        Inhalt für Spalte 1 (Karten, Text, Buttons, Code-Blöcke)...
    ::: /grid # Expliziter Spalten-Schließer

    ::: grid # Innerer Spalte 2 Öffner
        Inhalt für Spalte 2...
    ::: /grid
::: /grids # Expliziter Wrapper-Schließer
```

## Funktionen & Unterstützte Attribute

| Container / Element | Typ | Beschreibung |
| :--- | :--- | :--- |
| **`::: grids`** | Äußerer Container | Wrapper, der das responsive Flexbox-Layout einleitet. |
| **`::: grid`** | Sub-Container | Spalten-Container. Deklarieren Sie mehrere `grid`-Blöcke innerhalb von `grids`. |
| **Flex-Verteilung** | Responsiv | Spalten richten sich auf dem Desktop horizontal aus und stapeln sich mobil vertikal. |
| **Schließ-Tags** | `::: /grids`, `::: /grid`, `:::` | Unterstützt benannte Schließ-Tags oder generische `:::`-Schließer. |

::: callout info "v0.9.1+ Standardisierung der Container-Syntax" icon:sparkles
Ab **v0.9.1** führt `docmd` explizite Öffnungs- und Schließungs-Container-Tags (z.B. `::: card` ... `::: /card`, `::: tab` ... `::: /tab`), explizite Key-Value-Eigenschaften (`title:"..."`, `url:"..."`) und nachfolgende `# Kommentare` ein. Diese modernisierte Syntax wird für alle neuen Dokumentationen empfohlen. Die vollständige Abwärtskompatibilität für alte Sub-Block-Marker (`== tab`, `1.`) und Positionsparameter bleibt strikt erhalten.
:::


## Anwendungsbeispiele

### Karten nebeneinander

Kombinieren Sie `grids` mit `cards`, um mehrere Feature-Blöcke in einer responsiven Reihe zu präsentieren:

```markdown
::: grids
    ::: grid
        ::: card title:"Geschwindigkeit" icon:zap
        Basiert auf einer asynchronen, nicht-blockierenden I/O-Engine für maximale Performance.
        ::: /card
    ::: /grid
    ::: grid
        ::: card title:"Skalierbarkeit" icon:layers
        Entwickelt für große Monorepos und Multi-Projekt-Workspaces.
        ::: /card
    ::: /grid
::: /grids
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
        ::: card title:"Such-Engine" icon:search
        Integrierter Volltext-Such-Indexierer.
        ::: /card
    ::: /grid
    ::: grid
        ::: card title:"Lokalisierung" icon:globe
        Mehrsprachiges Verzeichnis-Routing und lokalisierte Suchindizes.
        ::: /card
    ::: /grid
    ::: grid
        ::: card title:"Theming-Engine" icon:palette
        Integrierter Dunkelmodus und vollständige CSS-Variablen-Anpassung.
        ::: /card
    ::: /grid
::: /grids
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