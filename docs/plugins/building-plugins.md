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
| `actions` | An object of named action handlers for WebSocket RPC calls from the browser. |
| `events` | An object of named event handlers for fire-and-forget messages from the browser. |

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

## WebSocket RPC Actions

Starting in `0.6.8`, plugins can register **action handlers** and **event handlers** that run on the dev server and are callable from the browser via the `window.docmd` API.

```javascript
// my-live-plugin.js
export default {
  // Server-side action — browser calls via docmd.call()
  actions: {
    'my-plugin:save-note': async (payload, ctx) => {
      const content = await ctx.readFile(payload.file);
      const updated = content + '\n\n> ' + payload.note;
      await ctx.writeFile(payload.file, updated);
      return { saved: true };
    }
  },

  // Server-side event — browser sends via docmd.send()
  events: {
    'my-plugin:page-viewed': (data, ctx) => {
      console.log(`Page viewed: ${data.path}`);
    }
  }
};
```

The `ctx` (ActionContext) object provides:

| Method | Description |
| :--- | :--- |
| `ctx.readFile(path)` | Read a file relative to the project root. |
| `ctx.writeFile(path, content)` | Write a file (triggers rebuild + reload). |
| `ctx.readFileLines(path)` | Read a file as an array of lines. |
| `ctx.broadcast(event, data)` | Push an event to all connected browsers. |
| `ctx.source` | Source editing tools for block-level markdown manipulation. |
| `ctx.projectRoot` | Absolute path to the project root. |
| `ctx.config` | Current docmd site configuration. |

All file operations are sandboxed to the project root — path traversal attempts are rejected automatically.

::: callout info "Dev Mode Only 🛡️"
The WebSocket RPC system is only active during `docmd dev`. Production builds do not include the API client or any server-side action handling.
:::

## Best Practices

1.  **Async/Await**: Always use `async` functions for `onPostBuild` and action handlers to prevent blocking the build engine during I/O operations.
2.  **Statelessness**: Avoid maintaining state within the plugin object, as `docmd` may re-initialize plugins during development "Hot Reloads."
3.  **Naming Convention**: For community plugins, prefix your package name with `docmd-plugin-` (e.g., `docmd-plugin-analytics`).
4.  **Action Namespacing**: Prefix your action names with your plugin name (e.g., `my-plugin:save-note`) to avoid collisions.
5.  **Logging**: Use the provided `log()` helper in `onPostBuild` to ensure your messages respect the user's `--verbose` settings.

::: callout tip "AI-Ready Design 🤖"
The `docmd` plugin API is designed to be **LLM-Optimal**. Because the hooks use standard JavaScript objects and types without hidden complex class hierarchies, AI agents can generate bug-free custom plugins for you with minimal instruction.
:::