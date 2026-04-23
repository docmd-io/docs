---
title: "Building Lightweight Documentation That Performs on Low-End Devices"
description: "A comprehensive guide on low-end devices."
---

## Problem

Documentation sites are increasingly adopting heavy Javascript frameworks (React, Vue) just to render markdown. When a developer on a low-end laptop or a mobile phone over a 3G connection tries to load the docs, their device struggles to parse the massive JavaScript bundle before the page even becomes interactive.

## Why it matters

Documentation should be accessible. Forcing users in emerging markets or those using older hardware to run a full Node.js-equivalent runtime in their browser just to read a text tutorial is highly exclusionary.

## Approach

Adopt an **HTML-First** (Zero-JS payload) or **Micro-SPA** architecture. Keep the browser's Main Thread completely unblocked.

## Implementation

`docmd` mathematically minimizes the runtime footprint by utilizing a zero-framework footprint. 

1. **Leverage the Isomorphic Engine:** `docmd` pre-renders everything server-side.
2. **Utilize `<picture>` tags:** Avoid loading massive PNGs on mobile constraints.

```markdown
<!-- docmd automatically handles markdown images, but for custom layouts, use responsive images -->
<picture>
  <source srcset="/assets/mobile-arch.webp" media="(max-width: 600px)">
  <img src="/assets/desktop-arch.webp" alt="Architecture Flow">
</picture>
```

3. **Disable Heavy Plugins:** If you suspect your user base relies heavily on low-end hardware, disable non-essential plugins like `mermaid` which execute heavy computations client-side.

```javascript
export default defineConfig({
  plugins: {
    mermaid: false // Prevents the 800kb mermaid engine from loading
  }
});
```

## Trade-offs

Building for low-end configurations limits your ability to add flashy, high-fidelity interactive canvas elements or WebGL backgrounds to your documentation. Prioritizing performance over visual extravagance is a deliberate design choice that must be universally adopted by the documentation team.
