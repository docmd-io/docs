---
title: "Extending docmd with Custom Plugins"
description: "How to use docmd's lifecycle hooks to build custom functionality and extend the documentation engine."
---

## Problem

Sometimes you have a highly specific requirement that isn't covered by built-in features or existing plugins. For example, you might need to fetch data from an internal API during the build process or perform complex transformations on the generated HTML that go beyond simple CSS.

## Why it matters

Extensibility is what separates a static tool from a professional documentation framework. Without a clean way to inject custom logic, teams are often forced to maintain fragile shell scripts or post-processing wrappers that make the build process difficult to manage and debug.

## Approach

`docmd` features a robust, hook-based [Plugin API](../../plugins/building-plugins.md). You can write simple Node.js modules that intercept the documentation lifecycle at various stages—from initial configuration to final HTML generation—allowing you to arbitrarily modify content and behaviour.

## Implementation

### 1. Create a Local Plugin

A plugin is a standard JavaScript module that exports a descriptor and several lifecycle hooks.

```javascript
// plugins/version-injector.js
export default {
  // Plugin Metadata
  plugin: {
    name: 'version-injector',
    version: '1.0.0',
    capabilities: ['build'] // Required to use 'build' hooks
  },

  // State shared across hooks
  latestVersion: '0.0.0',

  // Runs once the configuration is resolved
  async onConfigResolved(config) {
    // Fetch data from an internal API
    const response = await fetch('https://api.internal.com/version');
    this.latestVersion = await response.text();
    console.log(`[Plugin] Fetched version: ${this.latestVersion}`);
  },

  // Intercepts HTML after Markdown parsing
  async onAfterParse(html, frontmatter) {
    if (!html) return html;
    // Replace placeholders with dynamic data
    return html.replace(/\{\{VERSION\}\}/g, this.latestVersion);
  }
};
```

### 2. Register the Plugin

You can register your local plugin by importing it into your `docmd.config.js`.

```javascript
// docmd.config.js
import VersionInjector from './plugins/version-injector.js';

export default {
  title: 'My Project Docs',
  plugins: {
    // Register by providing the imported module
    'version-injector': VersionInjector
  }
};
```

## Trade-offs

Custom plugins run in the Node.js environment during build time. While powerful, they can impact build performance if not optimised. Any logic in hooks like `onAfterParse` or `onPageReady` runs for *every* page in your site. Ensure your transformations are efficient (e.g., using optimised Regex) to keep build times fast.