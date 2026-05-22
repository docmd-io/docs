---
title: "Images & Visual Media"
description: "Embed responsive images, apply styling attributes, and enable interactive lightbox zoom."
---

docmd uses standard Markdown syntax for images. Centralise your media assets in the `assets/images/` directory within your project source for clean, consistent references.

```markdown
![Alt text](/assets/images/architecture.png "Optional tooltip title")
```

![Advanced Styling Example](/assets/images/docmd-preview.png){.with-border .with-shadow .size-medium .align-centre}

## Sizing

Apply a size class using the `{ }` attribute syntax. Three predefined sizes are available.

```markdown
![Small icon](/assets/icon.png){ .size-small }
![Standard view](/assets/preview.png){ .size-medium }
![Full width banner](/assets/banner.png){ .size-large }
```

## Alignment & Decoration

Combine alignment and decoration classes in a single attribute block.

```markdown
![Centred diagram](/assets/img.png){ .align-centre }
![Floating right with shadow](/assets/img.png){ .align-right .with-shadow .with-border }
```

## Figure Captions

Use the standard HTML5 `<figure>` element for precise, accessible image captioning.

```html
<figure>
  <img src="/assets/diagram.png" alt="Cloud Infrastructure Diagram">
  <figcaption>Figure 1.1: Core System Infrastructure Architecture.</figcaption>
</figure>
```

## Image Galleries

Wrap multiple figures in a `div.image-gallery` to produce a responsive, balanced grid.

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

## Lightbox Zoom

When `mainScripts` is active, docmd automatically applies a full-screen zoom effect to any image tagged with the `.lightbox` class or placed inside a gallery.

```markdown
![Deep texture analysis](/assets/sample.png){ .lightbox }
```

::: callout tip "AI Context & Accessibility" icon:sparkles
Always provide descriptive **alt text** for every image. Meaningful alt text is a direct, high-fidelity signal for AI agents parsing the `llms.txt` stream and improves accessibility for screen reader users.
:::