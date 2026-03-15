---
title: "Building Plugins"
description: "A comprehensive guide to extending docmd with custom logic and interactive features."
---

Plugins are the primary extension mechanism for `docmd`. They allow you to inject custom HTML, modify the Markdown parsing logic, and automate post-build tasks. This guide outlines the plugin API and best practices for creating shareable components.

## Plugin API Reference

A `docmd` plugin is a standard JavaScript object (or a module that exports one as default) that implements one or more of the following asynchronous hooks.

| Hook | Description |
| :--- | :--- |
| `markdownSetup(md, opts)` | Extend the `markdown-it` instance. Synchronous. |
| `generateMetaTags(config, page, root)` | Inject `<meta>` or `<link>` tags into the `<head>`. |
| `generateScripts(config, opts)` | Return an object containing `headScriptsHtml` and `bodyScriptsHtml`. |
| `getAssets(opts)` | Define external files or CDN scripts to be injected. |
| `onPostBuild(ctx)` | Run logic after the generation of all HTML files. |

## Creating a Local Plugin

Creating a plugin is as simple as defining a JavaScript file. For example, `my-plugin.js`:

```javascript
// my-plugin.js
import path from 'path';

export default {
  // 1. Extend the Markdown Parser
  markdownSetup: (md, options) => {
    // Example: Add a rule or use a markdown-it plugin
  },

  // 2. Inject Page Metadata
  generateMetaTags: async (config, page, relativePathToRoot) => {
    return `<meta name="x-build-id" content="${config._buildHash}">`;
  },

  // 3. Post-Build Automation
  onPostBuild: async ({ config, pages, outputDir, log, options }) => {
    log(`Custom Plugin: Verified ${pages.length} pages.`);
    // Example: Generate a custom manifest or notification
  }
};
```

To enable your plugin, reference its path in your `docmd.config.js`:

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  plugins: {
    './plugins/my-plugin.js': {
      // Your custom options go here
    }
  }
});
```

## Deep Dive: Asset Injection

The `getAssets()` hook allows your plugin to bundle client-side logic securely.

```javascript
getAssets: (options) => {
  return [
    {
      url: 'https://cdn.example.com/lib.js', // External CDN script
      type: 'js',
      location: 'head'
    },
    {
      src: path.join(__dirname, 'plugin-init.js'), // Local source
      dest: 'assets/js/plugin-init.js',            // Destination in build/
      type: 'js',
      location: 'body'
    }
  ];
}
```

## Best Practices

1.  **Async/Await**: Always use `async` functions for `onPostBuild` and metadata hooks to prevent blocking the build engine during I/O operations.
2.  **Statelessness**: Avoid maintaining state within the plugin object, as `docmd` may re-initialize plugins during development "Hot Reloads."
3.  **Naming Convention**: For community plugins, prefix your package name with `docmd-plugin-` (e.g., `docmd-plugin-analytics`).
4.  **Logging**: Use the provided `log()` helper in `onPostBuild` to ensure your messages respect the user's `--verbose` settings.

::: callout tip "AI-Ready Design 🤖"
The `docmd` plugin API is designed to be **LLM-Optimal**. Because the hooks use standard JavaScript objects and types without hidden complex class hierarchies, AI agents can generate bug-free custom plugins for you with minimal instruction.
:::