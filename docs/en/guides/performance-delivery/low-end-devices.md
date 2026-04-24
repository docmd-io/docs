---
title: "Low-End Device Optimization"
description: "How to build high-performance, accessible documentation that works seamlessly on low-powered hardware and slow network connections."
---

## Problem

Modern documentation sites often rely on heavy JavaScript runtimes just to display static text. For users on older mobile phones, budget laptops, or slow 3G/4G connections, these sites can take several seconds to load. The device's processor struggles to parse large JS bundles, resulting in "input lag," stuttering animations, and a poor overall reading experience.

## Why it matters

Technical documentation should be universally accessible. Forcing users in emerging markets or those on constrained hardware to download and execute a heavy framework just to read a tutorial creates an unnecessary barrier to learning. A lightweight site ensures your product information is available to everyone, regardless of their hardware or internet speed.

## Approach

Adopt an **HTML-First** strategy. `docmd` is designed with a zero-framework architecture, ensuring that the primary content is rendered into standard HTML during the build process. This keeps the browser's main thread unblocked, ensuring smooth scrolling and snappy navigation even on budget devices.

## Implementation

### 1. Minimal Runtime Footprint

By default, `docmd` does not use React, Vue, or any other heavy client-side framework for its core UI. This pre-rendered approach ensures that the initial "First Contentful Paint" happens almost immediately. To maintain this performance:
*   **Limit Custom Scripts**: Avoid adding large third-party libraries to your `customJs` configuration.
*   **Use Native Browser Features**: Rely on standard CSS and HTML5 elements which are highly optimized by all modern browsers.

### 2. Strategic Plugin Management

While [Plugins](../../plugins/usage) add powerful features, they can introduce significant performance overhead. For example, the [Mermaid Plugin](../../plugins/mermaid) requires a large engine to render diagrams. If your users are primarily on low-end devices, consider using static images for diagrams instead of client-side rendering.

### 3. Responsive and Optimized Media

Avoid serving oversized images to mobile users. Use modern formats like WebP and consider the `<picture>` tag for more granular control over responsive assets.

```html
<picture>
  <source srcset="/assets/mobile-hero.webp" media="(max-width: 600px)">
  <img src="/assets/desktop-hero.webp" alt="Feature Overview" loading="lazy">
</picture>
```
Using the `loading="lazy"` attribute ensures that images are only downloaded as they enter the user's viewport, saving bandwidth on slow connections.

### 4. Efficient Search Indexing

`docmd` generates scoped search indices to keep the memory footprint low. However, for extremely large sites, the [Search Plugin](../../plugins/search) can still be memory-intensive. Encourage users on mobile to use the search bar only when necessary, or optimize your index as described in the [Local-First Search Guide](../search/local-first-search).

## Trade-offs

Prioritizing performance for low-end devices often means avoiding "heavy" interactive features like complex 3D visualizations or large client-side data processing. This is a deliberate design choice that values **inclusivity and speed** over visual complexity, ensuring your documentation remains a useful resource for the widest possible audience.
