---
title: "Images & Visual Media"
description: "Embed responsive images, apply attribute classes for sizing and alignment, and configure interactive lightboxes in docmd."
---

`docmd` uses standard Markdown image syntax. Centralise media assets within the `assets/` directory in your project root for consistent path references.

```markdown
![Alt text](/assets/images/architecture.png "Optional tooltip title")
```

![Advanced Styling Example](/assets/images/docmd-preview.png){.with-border .with-shadow .size-medium .align-centre}

## Image Sizing Classes

Apply explicit sizing using attribute class notation `{ }`:

```markdown
![Small icon preview](/assets/icon.png){ .size-small }
![Standard UI view](/assets/preview.png){ .size-medium }
![Full-width layout banner](/assets/banner.png){ .size-large }
```

## Alignment & Styling Attributes

Combine alignment and visual decoration classes in a single attribute block:

```markdown
![Centred architectural diagram](/assets/img.png){ .align-centre }
![Right-aligned preview with shadow](/assets/img.png){ .align-right .with-shadow .with-border }
```

## HTML5 Figure Captions

Use standard HTML5 `<figure>` and `<figcaption>` elements for accessible image captions:

```html
<figure>
  <img src="/assets/diagram.png" alt="Cloud Infrastructure Architecture">
  <figcaption>Figure 1.1: Multi-Region Cloud Deployment Architecture.</figcaption>
</figure>
```

## Responsive Image Galleries

Wrap multiple `<figure>` components in a `div.image-gallery` container to render responsive media grids:

```html
<div class="image-gallery">
  <figure>
    <img src="/assets/screen1.jpg" alt="Dashboard Analytics Screen">
    <figcaption>Real-Time Performance Dashboard</figcaption>
  </figure>
  <figure>
    <img src="/assets/screen2.jpg" alt="Configuration Panel Screen">
    <figcaption>Global Settings Interface</figcaption>
  </figure>
</div>
```

## Lightbox Zoom Overlays

When client scripts are active, `docmd` automatically attaches full-screen lightbox zoom behavior to images tagged with `.lightbox` or nested within `.image-gallery` containers:

```markdown
![System schematic preview](/assets/sample.png){ .lightbox }
```

::: callout tip "Accessibility & Search Optimization" icon:sparkles
Always supply descriptive **alt text** for every image. High-quality alt text provides semantic context for screen readers and AI agents parsing the `llms.txt` context stream.
:::