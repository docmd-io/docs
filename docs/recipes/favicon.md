---
title: "Recipe: Implementing Custom Favicons"
description: "Establish project-wide branding by adding a custom favicon to your build."
---

The favicon is a critical branding element rendered within the browser tab. `docmd` provides a centralized configuration key to automate the injection and resolution of these assets.

## 1. Format Preparation

While `docmd` supports `.png` and `.svg` sources, utilize an `.ico` bundle for maximum legacy browser compatibility. Ensure your asset is at least 32x32px.

## 2. Asset Staging

Place your processed image within the `assets/` directory of your project source.

```bash
# Recommended Directory Mapping
my-project/
  ├── assets/
  │   └── brand-favicon.ico  <-- Source asset
  ├── docs/
  └── docmd.config.js
```

## 3. Configuration Binding

Define the `favicon` property within your `docmd.config.js`. The path should reflect the location relative to the final `site/` output root.

```javascript
export default {
  // ...
  // Maps to site/assets/brand-favicon.ico
  favicon: '/assets/brand-favicon.ico', 
  // ...
};
```

## 4. Final Build & Verification

Execute `docmd build`. The engine will automatically:
1.  Copy the asset to the production build directory.
2.  Inject high-priority `<link rel="icon">` tags into the `<head>` of every generated HTML page.