---
title: "Bilder & visuelle Medien"
description: "Betten Sie responsive Bilder ein, wenden Sie Styling-Attribute an und aktivieren Sie interaktives Lightbox-Zoomen."
---

docmd verwendet Standard-Markdown-Syntax für Bilder. Zentralisieren Sie Ihre Medien-Assets im `assets/images/`-Verzeichnis innerhalb Ihrer Projektquelle für saubere, konsistente Verweise.

```markdown
![Alt text](/assets/images/architecture.png "Optional tooltip title")
```

![Advanced Styling Example](/assets/images/docmd-preview.png){.with-border .with-shadow .size-medium .align-centre}

## Größenanpassung

Wenden Sie eine Größenklasse mit der `{ }`-Attributsyntax an. Es stehen drei vordefinierte Größen zur Verfügung.

```markdown
![Small icon](/assets/icon.png){ .size-small }
![Standard view](/assets/preview.png){ .size-medium }
![Full width banner](/assets/banner.png){ .size-large }
```

## Ausrichtung & Dekoration

Kombinieren Sie Ausrichtungs- und Dekorationsklassen in einem einzigen Attributblock.

```markdown
![Centred diagram](/assets/img.png){ .align-centre }
![Floating right with shadow](/assets/img.png){ .align-right .with-shadow .with-border }
```

## Bildunterschriften

Verwenden Sie das Standard-HTML5-`<figure>`-Element für präzise, barrierefreie Bildunterschriften.

```html
<figure>
  <img src="/assets/diagram.png" alt="Cloud Infrastructure Diagram">
  <figcaption>Figure 1.1: Core System Infrastructure Architecture.</figcaption>
</figure>
```

## Bildergalerien

Umschließen Sie mehrere `<figure>` mit einem `div.image-gallery`, um ein responsives, ausgewogenes Raster zu erzeugen.

```html
<div class="image-gallery">
  <figure>
    <img src="/assets/screen1.jpg" alt="User Dashboard View">
    <figcaption>Live Performance Monitor</figcaption>
  </figure>
  <figure>
    <img src="/assets/screen2.jpg" alt="Configuration Panel View">
    <figcaption>Project Global Settings</figcaption>
  </figure>
</div>
```

## Lightbox-Zoom

Wenn `mainScripts` aktiv ist, wendet docmd automatisch einen Vollbild-Zoomeffekt auf jedes Bild an, das mit der `.lightbox`-Klasse markiert oder in eine Galerie eingefügt ist.

```markdown
![Deep texture analysis](/assets/sample.png){ .lightbox }
```

::: callout tip "KI-Kontext & Barrierefreiheit" icon:sparkles
Geben Sie immer beschreibenden **Alt-Text** für jedes Bild an. Aussagekräftiger Alt-Text ist ein direktes, hochwertiges Signal für KI-Agenten beim Parsen des `llms.txt`-Streams und verbessert die Barrierefreiheit für Screenreader-Nutzer.
:::
