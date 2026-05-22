---
title: "Low-End Device Optimisation"
description: "How to build high-performance, accessible documentation that works easily on low-powered hardware and slow network connections."
---

## Problem

Modern documentation sites often rely on heavy JavaScript runtimes to display static text. For users on older mobile phones or slow connections, these sites take several seconds to load. The processor struggles to parse large JS bundles, resulting in "input lag" and a poor reading experience.

## Why it matters

Technical documentation should be universally accessible. Forcing users on constrained hardware to download a heavy framework creates an unnecessary barrier to learning. A lightweight site ensures product information is available to everyone, regardless of hardware or internet speed.

## Approach

Adopt an **HTML-First** strategy. docmd uses a zero-framework architecture. The primary content is rendered into standard HTML during the build process. This keeps the browser's main thread unblocked, ensuring smooth scrolling and snappy navigation even on budget devices.

## Implementation

### 1. Minimal Runtime Footprint

By default, docmd does not use React or Vue for its core UI. This pre-rendered approach ensures the initial "First Contentful Paint" happens almost immediately. To maintain this performance:
*   **Limit Custom Scripts**: Avoid adding large third-party libraries to your `customJs` configuration.
*   **Use Native Browser Features**: Rely on standard CSS and HTML5 elements.

### 2. Strategic Plugin Management

While [Plugins](../../plugins/usage.md) add powerful features, they introduce performance overhead. For example, the [Mermaid Plugin](../../plugins/mermaid.md) requires a large engine to render diagrams. If your users are on low-end devices, use static images instead of client-side rendering.

### 3. Responsive and Optimised Media

Avoid serving oversized images to mobile users. Use modern formats like WebP and consider the `<picture>` tag for granular control over responsive assets.

```html
<picture>
  <source srcset="/assets/mobile-hero.webp" media="(max-width: 600px)">
  <img src="/assets/desktop-hero.webp" alt="Feature Overview" loading="lazy">
</picture>
```
Using the `loading="lazy"` attribute ensures images are only downloaded as they enter the user's viewport, saving bandwidth.

### 4. Efficient Search Indexing

docmd generates scoped search indices to keep the memory footprint low. However, for extremely large sites, the [Search Plugin](../../plugins/search.md) can still be memory-intensive. Optimise your index as described in the [Local-First Search Guide](../search/local-first-search.md).

## Trade-offs

Prioritising performance for low-end devices means avoiding "heavy" interactive features like complex 3D visualisations. This is a deliberate design choice that values inclusivity and speed over visual complexity. It ensures your documentation remains useful for the widest audience possible.