---
title: "Hero-Bereiche"
description: "Erstellen Sie eindrucksvolle Landingpage-Header und Marketing-Highlights rein in Markdown."
---

Der `hero`-Container erstellt professionelle, visuell beeindruckende Header für Landingpages. Er übernimmt komplexe CSS-Anforderungen wie **Split-Layouts**, **Glow-Effekte** und **Slider**, während die Authoring-Erfahrung einfach bleibt.

## Grundlegende Syntax

Standardmäßig zentriert der `hero`-Container seinen Inhalt, was ihn perfekt für Banner und einfache Schlagzeilen macht.

```markdown
::: hero
# Schneller entwickeln.
Von Markdown zu produktionsreifen Docs mit einem Befehl.

::: button "Erste Schritte" /intro color:blue
:::
```

## Fortgeschrittene Layouts

Der `hero`-Container unterstützt spezielle Flags, um sein strukturelles Verhalten zu steuern.

| Flag | Effekt |
| :--- | :--- |
| `layout:split` | Teilt den Hero-Bereich in einen Textbereich (links) und einen Medienbereich (rechts). Wird auf Mobilgeräten vertikal gestapelt. |
| `layout:slider` | Verwandelt den Hero-Bereich in einen horizontalen Slider mit Scroll-Snap-Verhalten. |
| `glow:true` | Fügt einen dezenten, radialen Gradienten-Glow (Leuchten) im Hintergrund ein. |

### Das Split-Layout (`== side`)

Verwenden Sie das Trennzeichen `== side`, um festzulegen, welcher Inhalt in den primären Textbereich und welcher in den sekundären "Seiten"-Bereich (normalerweise ein Bild oder eine Video-Einbettung) gelangt.

```markdown
::: hero layout:split glow:true
# docmd 2.0
Isomorphe Ausführung. KI-optimiert.

::: button "Schnellstart" /getting-started/basic-usage color:blue

== side
::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"
:::
```

::: hero layout:split glow:true
# docmd 2.0
Isomorphe Ausführung. KI-optimiert.

::: button "Schnellstart" /getting-started/basic-usage color:blue

== side
::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"
:::

### Das Slider-Layout (`== slide`)

Erstellen Sie einen interaktiven Hero-Slider, indem Sie das Trennzeichen `== slide` zwischen den verschiedenen Inhaltsknoten verwenden.

```markdown
::: hero layout:slider
== slide
# Isomorpher Kern
Die Engine rendert überall.
== slide
# KI-Optimierung
Entwickelt für die Ära der LLMs.
:::
```

::: hero layout:slider
== slide
# Isomorpher Kern
Die Engine rendert überall.
== slide
# KI-Optimierung
Entwickelt für die Ära der LLMs.
:::

## Responsives Verhalten

Der `hero`-Container ist standardmäßig vollständig responsiv:
- Auf dem **Desktop** wird bei `layout:split` alles nebeneinander angezeigt.
- Auf **Mobilgeräten** wechselt er automatisch zu einem zentrierten, vertikalen Stapel, um eine optimale Lesbarkeit zu gewährleisten.

## Best Practices

1.  **Glow-Effekte**: Verwenden Sie `glow:true` sparsam auf Websites im Dark-Mode für ein hochwertiges "Neon"-Gefühl.
2.  **Medientypen**: Der „Seiten“-Inhalt eines Split-Layouts ist perfekt für die `::: embed`-Komponente, hochwertige PNGs oder reine `<video>`-Tags geeignet.
3.  **CTA-Platzierung**: Platzieren Sie `::: button`-Elemente immer innerhalb des primären Textbereichs des Hero-Bereichs (vor dem Trennzeichen `== side`), um sicherzustellen, dass sie auf Mobilgeräten als Erstes gesehen werden.