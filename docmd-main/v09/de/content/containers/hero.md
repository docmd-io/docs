---
title: "Hero-Bereiche"
description: "Erstellen Sie wirkungsstarke Landingpage-Header und Marketing-Highlights rein in Markdown."
---

Der `hero`-Container erstellt visuell beeindruckende Landingpage-Header. Er handhabt komplexe Layouts inklusive Splits, Glow-Effekten und Slidern, ohne benutzerdefiniertes HTML zu benötigen.

## Syntax-Referenz

```markdown
::: hero [property:value...]
    # Page Title
    A short supporting tagline.

    ::: button "Call to Action" /target-url
:::
```

| Parameter | Typ | Beschreibung |
| :--- | :--- | :--- |
| **Layout** | `layout:split` \| `layout:slider` | `split` teilt den Hero in einen Textbereich und einen Medienbereich. `slider` erstellt ein horizontales Scroll-Snap-Karussell. |
| **Glow** | `glow:true` | Injiziert einen subtilen radialen Gradienten-Glow im Hintergrund. |
| **Seiten-Trenner** | `== side` | Wird mit `layout:split` verwendet. Alles nach diesem Trenner rendert im sekundären (rechten) Bereich. |
| **Slide-Trenner** | `== slide` | Wird mit `layout:slider` verwendet. Jeder `== slide` definiert ein neues Karussell-Panel. |

## Beispiele

### Split-Layout

Verwenden Sie den `== side`-Trenner, um Inhalte in einen primären Textbereich und einen sekundären Medienbereich aufzuteilen.

```markdown
::: hero layout:split glow:true
    # docmd
    Isomorphic execution. AI-optimised.

    ::: button "Quickstart" ../../getting-started/quick-start.md color:blue

    == side
        ::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"
:::
```

::: hero layout:split glow:true
# docmd
Isomorphic execution. AI-optimised.

::: button "Quickstart" ../../getting-started/quick-start.md color:blue

== side
::: embed "https://www.youtube.com/watch?v=0CSyIBHQy9g"
:::

### Slider-Layout

Verwenden Sie `== slide`-Trenner, um ein automatisch fortschreitendes Karussell von Inhalts-Panels zu erstellen.

```markdown
::: hero layout:slider
    == slide
        # Isomorphic Core
        The engine renders everywhere.
    == slide
        # AI Optimisation
        Built for the LLM era.
:::
```

::: hero layout:slider
    == slide
        # Isomorphic Core
        The engine renders everywhere.
    == slide
        # AI Optimisation
        Built for the LLM era.
:::

::: callout tip "Best Practices"
Verwenden Sie `glow:true` auf dunklen Sites sparsam für ein Premium-Gefühl. Platzieren Sie `::: button`-Elemente im primären Textbereich, vor `== side`, um sicherzustellen, dass sie auf mobilen Bildschirmen sichtbar bleiben.
:::