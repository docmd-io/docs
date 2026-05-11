---
title: "Hero-Abschnitte"
description: "Erstellen Sie wirkungsvolle Landingpage-Header und Marketing-Highlights rein in Markdown."
---

Der `hero`-Container erstellt professionelle, visuell beeindruckende Landingpage-Header. Er übernimmt komplexe CSS-Anforderungen wie **Split-Layouts**, **Glow-Effekte** und **Slider**, während die Bearbeitungserfahrung einfach bleibt.

## Basissyntax

Standardmäßig zentriert der `hero`-Container seinen Inhalt, was ihn ideal für Banner und einfache Schlagzeilen macht.

```markdown
::: hero
    # Schneller entwickeln.
    Vom Markdown zur Produktions-Doku mit einem Befehl.

    ::: button "Erste Schritte" /intro color:blue
:::
```

## Fortgeschrittene Layouts

Der `hero`-Container unterstützt spezielle Flags zur Steuerung seines strukturellen Verhaltens.

| Flag | Effekt |
| :--- | :--- |
| `layout:split` | Teilt den Hero in einen Textbereich (links) und einen Medienbereich (rechts). Stapelt sich auf Mobilgeräten vertikal. |
| `layout:slider` | Verwandelt den Hero in einen horizontalen Slider mit Scroll-Snap-Verhalten. |
| `glow:true` | Fügt ein subtiles, radiales Verlaufsleuchten im Hintergrund ein. |

### Das Split-Layout (`== side`)

Verwenden Sie das Trennzeichen `== side`, um zu definieren, welche Inhalte in den primären Textbereich und welche in den sekundären "Seiten"-Bereich (normalerweise ein Bild oder ein Video-Embed) fließen.

```markdown
::: hero layout:split glow:true
    # docmd 2.0
    Isomorphe Ausführung. KI-optimiert.

    ::: button "Quickstart" /getting-started/basic-usage color:blue

    == side
        ::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"
:::
```

::: hero layout:split glow:true
# docmd 2.0
Isomorphe Ausführung. KI-optimiert.

::: button "Quickstart" /getting-started/basic-usage color:blue

== side
::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"
:::

### Das Slider-Layout (`== slide`)

Erstellen Sie einen interaktiven Hero-Slider, indem Sie das Trennzeichen `== slide` zwischen verschiedenen Inhaltsknoten verwenden.

```markdown
::: hero layout:slider
    == slide
        # Isomorpher Core
        Die Engine rendert überall.
    == slide
        # KI-Optimierung
        Gebaut für das LLM-Zeitalter.
:::
```

::: hero layout:slider
    == slide
        # Isomorpher Core
        Die Engine rendert überall.
    == slide
        # KI-Optimierung
        Gebaut für das LLM-Zeitalter.
:::

## Responsives Verhalten

Der `hero`-Container ist standardmäßig voll responsiv:
- Auf dem **Desktop** wird `layout:split` nebeneinander angezeigt.
- Auf **Mobilgeräten** wechselt er automatisch zu einem zentrierten, vertikalen Stapel, um eine optimale Lesbarkeit zu gewährleisten.

## Best Practices

1.  **Glow-Effekte**: Verwenden Sie `glow:true` sparsam auf Websites im Dark Mode für ein hochwertiges "Neon"-Gefühl.
2.  **Medientypen**: Der "Seiten"-Inhalt eines Split-Layouts eignet sich perfekt für die `::: embed`-Komponente, hochwertige PNGs oder rohe `<video>`-Tags.
3.  **CTA-Platzierung**: Platzieren Sie `::: button`-Elemente immer im primären "Hero Copy"-Bereich (vor dem `== side`-Trennzeichen), um sicherzustellen, dass sie das Erste sind, was Benutzer auf Mobilgeräten sehen.