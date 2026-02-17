---
title: "Images & Lightbox"
description: "Adding images, galleries, and enabling lightbox zoom effects."
---

# Images & Media

## Basic Images

Use standard Markdown syntax to embed images. We recommend storing images in your `assets/images/` folder.

```markdown
![Alt Text](../../assets/images/screenshot.png "Optional Title")
```

## Image Styling

You can add classes to images using the attribute syntax `{ .class }` after the image.

### Sizing
```markdown
![Small](../../assets/icon.png){ .size-small }
![Medium](../../assets/preview.png){ .size-medium }
![Large](../../assets/banner.png){ .size-large }
```

### Alignment
```markdown
![Centered](../../assets/img.png){ .align-center }
![Right](../../assets/img.png){ .align-right }
```

### Shadows & Borders
```markdown
![Styled](../../assets/img.png){ .with-shadow .with-border }
```

![preview with styling](/assets/images/docmd-preview.png){.with-border .with-shadow .size-medium}

### Responsive Images

All images in docmd are responsive by default, automatically scaling to fit their container.

## Image Captions

Add captions to your images using the figure syntax:

```markdown
<figure>
  <img src="/path/to/image.jpg" alt="Description of image">
  <figcaption>This is the caption for the image</figcaption>
</figure>
```

## Image Galleries and Lightbox

docmd includes built-in lightbox functionality for image galleries. When users click on an image in a gallery, it opens in a full-screen lightbox view.

## Image Galleries

You can group multiple images into a responsive grid using the `image-gallery` class, use `figcaption` for image captioning. This requires raw HTML wrapping.

```html
<div class="image-gallery">
  <figure>
    <img src="../../assets/img1.jpg" alt="View 1">
    <figcaption>Dashboard View</figcaption>
  </figure>
  <figure>
    <img src="../../assets/img2.jpg" alt="View 2">
    <figcaption>Settings View</figcaption>
  </figure>
</div>
```

<div class="image-gallery">
  <figure>
    <img src="/assets/images/docmd-preview.png" alt="Feature 1">
    <figcaption>Feature One</figcaption>
  </figure>
  <figure>
    <img src="/assets/images/docmd-preview.png" alt="Feature 2">
    <figcaption>Feature Two</figcaption>
  </figure>
</div>

## Lightbox (Zoom)

If `mainScripts` is enabled (default), clicking any image in a gallery or any image with the `.lightbox` class will open a full-screen zoom view.

```markdown
![Click to Zoom](../../assets/diagram.png){ .lightbox }
```

## Image Optimization Best Practices

For optimal performance:

1. **Use appropriate formats**:
   - JPEG for photographs
   - PNG for images with transparency
   - SVG for icons and logos
   - WebP for better compression (with fallbacks)

2. **Optimize file sizes**:
   - Compress images before adding them to your documentation
   - Consider using tools like ImageOptim, TinyPNG, or Squoosh

3. **Provide responsive images**:
   - Use the HTML `<picture>` element for advanced responsive image scenarios

4. **Specify dimensions**:
   - Always include width and height attributes to prevent layout shifts