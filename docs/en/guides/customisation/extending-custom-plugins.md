---
title: "Extending docmd with Custom Plugins"
description: "A comprehensive guide on custom plugins."
---

## Problem

You have a hyper-specific internal requirement. For example, replacing all instances of the word `TODO-VER` with the actual version string pulled dynamically from a proprietary internal API server during build time. Native tools do not support this.

## Why it matters

Extensibility is the difference between a tool you outgrow in a year versus a framework that scales with you for a decade. Without an escape hatch, custom requirements force teams to maintain dirty shell-script wrappers around their builds.

## Approach

`docmd` utilizes a powerful, hook-based plugin architecture. You can inject Node.js logic at specific lifecycle phases (e.g., `preBuild`, `onRender`, `postBuild`) to arbitrarily modify the AST or HTML outputs.

## Implementation

Create a local javascript file that exports a valid `docmd` plugin object, and pass it directly to the configuration block.

```javascript
// plugins/version-injector.js
export default function VersionInjectorPlugin(options) {
  return {
    name: 'custom-version-injector',
    
    // Hook runs right before the site builds
    async preBuild(context) {
      this.versionData = await fetch('https://api.internal.com/version/latest').then(r => r.text());
    },

    // Hook intercepts HTML generated for every page
    onRender(html, pageContext) {
      if (!html) return html;
      return html.replace(/TODO-VER/g, this.versionData);
    }
  };
}
```

```javascript
// docmd.config.js
import VersionInjector from './plugins/version-injector.js';

export default defineConfig({
  plugins: {
    custom: [VersionInjector()]
  }
});
```

## Trade-offs

Writing custom plugins requires diving into Node.js asynchronous architecture. Furthermore, any custom logic running in the `onRender` loop applies to *every single page*. A slow regex or a heavy API call inside `onRender` will transform `docmd`'s native ~1-second execution time into a multi-minute crawl.
