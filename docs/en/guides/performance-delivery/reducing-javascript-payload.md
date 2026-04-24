---
title: "Reducing JS Payload"
description: "How to maintain a high-performance documentation site by optimizing your JavaScript dependencies and leveraging docmd's zero-framework architecture."
---

## Problem

Many modern documentation tools rely on heavy JavaScript frameworks (like React or Vue) just to render static text. These frameworks can add several hundred kilobytes to your initial page load, forcing the browser to download, parse, and execute large amounts of code before the site becomes fully interactive. This leads to slow loading times and "ghost clicks" on low-end devices.

## Why it matters

A large JavaScript payload directly impacts "Time to Interactive" (TTI). In technical documentation, where users need answers quickly, any delay caused by heavy framework initialization is a significant usability barrier. Keeping your payload small ensures that search, navigation, and theme switching are instantaneous from the moment the page appears.

## Approach

`docmd` uses a **zero-framework** architecture for its core client-side logic. By utilizing Vanilla JavaScript and native browser APIs instead of a heavy Virtual DOM, we keep the total JS payload for a standard site under **20KB**. This lightweight foundation ensures maximum performance across all devices and network conditions.

## Implementation

### 1. Leverage Native Browser APIs

Avoid importing heavy libraries like jQuery or Lodash for simple tasks. Modern browsers have robust native APIs that can handle almost any documentation-related requirement with zero overhead.

```javascript
// docmd.config.js
export default {
  // ✅ Use a small, purpose-built script instead of a heavy library
  customJs: ['/static/js/my-custom-logic.js']
};
```

### 2. Strategic Plugin Management

While [Plugins](../../plugins/usage) add powerful features, some can significantly increase your JavaScript payload. For example, the [Mermaid Plugin](../../plugins/mermaid) requires a large client-side library to render diagrams. Only enable heavy plugins if they are essential to your content, and consider their impact on overall page weight.

### 3. Defer Non-Critical Scripts

If you need to include third-party services like analytics or feedback widgets, ensure they are loaded asynchronously or deferred so they don't block the rendering of your documentation.

```html
<!-- In your custom head injection -->
<script src="https://analytics.com/script.js" async defer></script>
```

### 4. Optimize Assets

Ensure that any custom JavaScript you provide is minified and compressed. `docmd` handles the minification of its core assets, but you are responsible for the optimization of any files you add to your `static/` directory.

## Trade-offs

Building complex interactive features with Vanilla JavaScript can require more manual effort than using a declarative framework. However, for documentation—where 95% of the content is static text and images—the performance gains of a zero-framework approach far outweigh the developer convenience of a heavy framework.
