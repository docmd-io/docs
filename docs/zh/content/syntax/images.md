---
title: "Images & Visual Media"
description: "Master media management: Responsive images, styling attributes, and automated Lightbox effects."
---

`docmd` utilises standard Markdown syntax for media integration. We recommend centralizing your media assets in the `assets/images/` directory within your project source.

```markdown
![Technical Diagram](/assets/images/architecture.png "Optional Tooltip Title")
```

## Technical Styling Reference

Assign specialised CSS classes and attributes directly to your images using the `{ .class }` attribute syntax.

### Dynamic Resizing
```markdown
![Small Scale](/assets/icon.png){ .size-small }
![Standard View](/assets/preview.png){ .size-medium }
![Full Scale](/assets/banner.png){ .size-large }
```

### Alignment & Layout
```markdown
![Centered Focus](/assets/img.png){ .align-center }
![Floating Right](/assets/img.png){ .align-right .with-shadow .with-border }
```

![Advanced Styling Example](/assets/images/docmd-preview.png){.with-border .with-shadow .size-medium .align-center}

## Structured Media Elements

### Figure Captions
For precise, accessible media captioning, use standard HTML5 `<figure>` elements.
```html
<figure>
  <img src="/assets/diagram.png" alt="Cloud Infrastructure Diagram">
  <figcaption>Figure 1.1: Core System Infrastructure Architecture.</figcaption>
</figure>
```

### Image Galleries
Organise multiple assets into a responsive, balanced grid using the `image-gallery` class.

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

## Interactive Lightbox Zoom

If the `mainScripts` component is active (default), `docmd` automatically applies a full-screen zoom effect to any image contained within a gallery or any image tagged with the `.lightbox` class.

```markdown
![Deep Texture Analysis](/assets/sample.png){ .lightbox }
```

::: callout tip "AI Context & Accessibility"
Always provide comprehensive **Alt-Text** for visual media. While advanced AI models possess vision capabilities, descriptive text within the Markdown source provides a direct, high-fidelity signal for the model's reasoning engine—enhancing architectural analysis and feature comprehension in the `llms-full.txt` stream.
:::