---
title: "Images & Lightbox"
description: "Adding images, styling galleries, and enabling lightbox zoom effects."
---

Use standard Markdown syntax. We recommend storing images in your `assets/images/` directory.

```markdown
![Alt Text](/assets/images/screenshot.png "Optional Title")
```

## Image Styling (v0.5.1+)

Add specific classes using the `{ .class }` syntax.

### Sizing
```markdown
![Small](/assets/icon.png){ .size-small }
![Medium](/assets/preview.png){ .size-medium }
![Large](/assets/banner.png){ .size-large }
```

### Alignment & Effects
```markdown
![Centered](/assets/img.png){ .align-center }
![Right](/assets/img.png){ .align-right .with-shadow .with-border }
```

![preview with styling](/assets/images/docmd-preview.png){.with-border .with-shadow .size-medium}

## Captions & Galleries

### Figure Captions
Use standard HTML for precise captioning:
```html
<figure>
  <img src="/path/to/image.jpg" alt="Description">
  <figcaption>This is the caption</figcaption>
</figure>
```

### Image Galleries
Group multiple images into a responsive grid.

```html
<div class="image-gallery">
  <figure>
    <img src="/assets/img1.jpg" alt="View 1">
    <figcaption>Dashboard</figcaption>
  </figure>
  <figure>
    <img src="/assets/img2.jpg" alt="View 2">
    <figcaption>Settings</figcaption>
  </figure>
</div>
```

## Lightbox (Zoom)

If `mainScripts` is enabled (default), any image inside a gallery or any image with the `.lightbox` class will open a full-screen zoom view on click.

```markdown
![Click to Zoom](/assets/diagram.png){ .lightbox }
```

::: callout tip
Always provide descriptive **Alt-Text**. While modern AI agents can "see" images, descriptive text in the markdown source acts as a direct hint for the model's reasoning engine, especially when images contain complex diagrams or architectural flows.
:::