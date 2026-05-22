---
title: "Extending docmd with Custom Plugins"
description: "How to use docmd's lifecycle hooks to build custom functionality and extend the documentation engine."
---

## Problem

Sometimes you have specific requirements not covered by built-in features. For example, you might need to fetch data from an internal API during the build process or perform complex transformations on the generated HTML.

## Why it matters

Extensibility separates a static tool from a professional documentation framework. Without a clean way to inject custom logic, teams maintain fragile shell scripts or post-processing wrappers. This makes the build process difficult to manage and debug.

## Approach

docmd features a reliable, hook-based [Plugin API](../../plugins/building-plugins.md). Write simple Node.js modules that intercept the documentation lifecycle at various stages. This allows you to arbitrarily modify content and behaviour from initial configuration to final HTML generation.

## Implementation

### 1. Create a Local Plugin

A plugin is a standard JavaScript module that exports a descriptor and lifecycle hooks.

```javascript
// plugins/version-injector.js

let latestVersion = "0.0.0";

export default {
  // Plugin Descriptor
  plugin: {
    "name": "version-injector",
    "version": "1.0.0",
    "capabilities": ["init", "build"]
  },

  // Lifecycle Hooks
  async onConfigResolved(config) {
    // Fetch external data once during initialisation
    const response = await fetch("https://api.example.com/version");
    latestVersion = await response.text();
    console.log(`[Plugin] Fetched version: ${latestVersion}`);
  },

  // Modify HTML before writing
  async onBeforeRender(page) {
    if (!page.html) return;

    page.html = page.html.replace(/\{\{VERSION\}\}/g, latestVersion);
    page.frontmatter.computedVersion = latestVersion;
  }
};
```

### 2. Register the Plugin

Register your local plugin by importing it into your `docmd.config.js` (or `docmd.config.ts`). JSON config files cannot use imports - use the `.js` or `.ts` format for plugin registration.

```javascript
import VersionInjector from "./plugins/version-injector.js";

export default {
  "title": "My Project Docs",
  "plugins": {
    // Inject the local plugin object
    "version-injector": VersionInjector
  }
};
```

## Trade-offs

Custom plugins run in the Node.js environment during build time. While powerful, they can impact build performance if unoptimised. Any logic in hooks like `onAfterParse` or `onPageReady` runs for *every* page in your site. Ensure your transformations are efficient (e.g., using optimised Regex) to keep build times fast.