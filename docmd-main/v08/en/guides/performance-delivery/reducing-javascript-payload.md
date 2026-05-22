---
title: "Reducing JS Payload"
description: "How to maintain a high-performance documentation site by optimising your JavaScript dependencies and using docmd's zero-framework architecture."
---

## Problem

Many modern documentation tools rely on heavy JavaScript frameworks (like React or Vue) to render static text. These frameworks add several hundred kilobytes to the initial page load. The browser must download, parse, and execute large amounts of code before the site becomes fully interactive. This leads to slow loading times and "ghost clicks" on low-end devices.

## Why it matters

A large JavaScript payload directly impacts "Time to Interactive" (TTI). In technical documentation, users need answers quickly. Any delay caused by heavy framework initialisation is a significant usability barrier. Keeping your payload small ensures that search, navigation, and theme switching are instantaneous.

## Approach

docmd uses a **zero-framework** architecture for its core client-side logic. By utilising Vanilla JavaScript and native browser APIs instead of a heavy Virtual DOM, we keep the total JS payload for a standard site under **20KB**. This lightweight foundation ensures maximum performance across all devices.

## Implementation

### 1. Use Native Browser APIs

Avoid importing heavy libraries like jQuery or Lodash for simple tasks. Modern browsers have reliable native APIs that handle almost any documentation-related requirement with zero overhead.

```javascript
  // Add custom scripts in docmd.config.json
  customJs: ["/static/js/my-custom-logic.js"]
```

### 2. Strategic Plugin Management

While [Plugins](../../plugins/usage.md) add powerful features, some significantly increase your JavaScript payload. For example, the [Mermaid Plugin](../../plugins/mermaid.md) requires a large client-side library to render diagrams. Only enable heavy plugins if they are essential to your content.

### 3. Defer Non-Critical Scripts

If you include third-party services like analytics or feedback widgets, ensure they load asynchronously or are deferred. This prevents them from blocking the rendering of your documentation.

```html
<!-- In your custom head injection -->
<script src="https://analytics.com/script.js" async defer></script>
```

### 4. Optimise Assets

Ensure any custom JavaScript you provide is minified and compressed. docmd handles the minification of its core assets, but you are responsible for optimising any files you add to your `static/` directory.

## Trade-offs

Building complex interactive features with Vanilla JavaScript requires more manual effort than using a declarative framework. However, for documentation - where 95% of the content is static text and images - the performance gains of a zero-framework approach far outweigh the convenience of a heavy framework.