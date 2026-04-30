---
title: "Building Plugins"
description: "A comprehensive guide to extending docmd with custom logic and interactive features."
---

Plugins are the primary extension mechanism for `docmd`. They allow you to inject custom HTML, modify the Markdown parsing logic, and automate post-build tasks. This guide outlines the plugin API and best practices for creating shareable components.

## Plugin Descriptor

Starting in `0.7.1`, every plugin should export a `plugin` descriptor declaring its identity and capabilities. This enables the engine to validate, isolate, and enforce capability boundaries at load time.

```javascript
export default {
  plugin: {
    name: 'my-analytics',
    version: '1.0.0',
    capabilities: ['head', 'body', 'post-build']
  },

  generateScripts: (config, opts) => { ... },
  onPostBuild: async (ctx) => { ... }
};
```

> **Note:** The descriptor is currently optional (soft deprecation warning). It will be **required starting 0.8.0**.

## Core Capabilities

The capabilities array in the descriptor dictates which hooks your plugin is allowed to use. 

| Capability | Allowed Hooks | Phase |
| :--- | :--- | :--- |
| `init` | `onConfigResolved` | Init |
| `markdown` | `markdownSetup` | Setup |
| `head` | `generateMetaTags`, `generateScripts` (head) | Render |
| `body` | `generateScripts` (body) | Render |
| `build` | `onBeforeParse`, `onAfterParse`, `onPageReady` | Build |
| `post-build`| `onPostBuild` | Post-Build |
| `dev` | `onDevServerReady` | Dev Server |
| `assets` | `getAssets` | Output |
| `actions` | `actions` | Interactive |
| `events` | `events` | Interactive |
| `translations`| `translations` | i18n |

Legacy plugins without a descriptor get full access to all hooks, so nothing breaks during the transition.

## Plugin API Reference

A `docmd` plugin is a standard JavaScript object (or a module that exports one as default) that implements one or more of the following hooks.

| Hook | Description |
| :--- | :--- |
| `markdownSetup(md, opts)` | Extend the `markdown-it` instance. Synchronous. |
| `generateMetaTags(config, page, root)` | Inject `<meta>` or `<link>` tags into the `<head>`. |
| `generateScripts(config, opts)` | Return an object containing `headScriptsHtml` and `bodyScriptsHtml`. |
| `getAssets(opts)` | Define external files or CDN scripts to be injected. |
| `onPostBuild(ctx)` | Run logic after the generation of all HTML files. |
| `translations(localeId)` | Return an object of translated strings for the given locale. |
| `actions` | An object of named action handlers for WebSocket RPC calls from the browser. |
| `events` | An object of named event handlers for fire-and-forget messages from the browser. |

## Creating a Local Plugin

Creating a plugin is as simple as defining a JavaScript file. For example, `my-plugin.js`:

```javascript
// my-plugin.js
import path from 'path';

export default {
  // Plugin descriptor (recommended)
  plugin: {
    name: 'my-plugin',
    version: '1.0.0',
    capabilities: ['head', 'post-build']
  },

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

To enable your plugin, reference its **full package name** in your `docmd.config.js`:

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  plugins: {
    'my-awesome-plugin': {
      // Your custom options go here
    }
  }
});
```

> **Note:** Shorthand names (e.g. `math`, `search`) are reserved exclusively for official `@docmd/plugin-*` packages. Third-party plugins must always be referenced by their full npm package name.

### Plugin Resolution
The `docmd` engine resolves plugin names as follows:
- **Official shorthands** (`math`, `search`, `seo`, etc.) automatically expand to `@docmd/plugin-<name>`. Since the `@docmd` npm scope is owned by the project, only official packages can exist under it.
- **Third-party plugins** must use their full package name (e.g. `my-awesome-plugin`, `@myorg/docmd-extras`). There is no alias or shorthand system for external plugins — this prevents confusion and eliminates supply-chain attack vectors entirely.

### Plugin Isolation

Every hook invocation is wrapped in a try/catch boundary. A broken plugin cannot crash the build or interfere with other plugins. Errors are logged and collected into a summary at the end of the build.

### Scoping Plugins (`noStyle`)
By default, plugins inject their CSS/JS universally. However, developers can explicitly prevent their plugin from rendering on `noStyle` pages (like minimal landing templates) by exporting a `noStyle` boolean:

```javascript
export default {
  noStyle: false, // Prevents generateMetaTags and generateScripts from running on noStyle pages

  generateScripts: () => { ... }
}
```
Users can also override this behaviour through their configuration (`plugins: { math: { noStyle: false } }`) or dynamically via Markdown frontmatter (`plugins: { math: true }`).

## Expanded Lifecycle Hooks

Docmd `0.7.1` extends the build process with deep integration hooks allowing plugins to manipulate configuration, raw sources, and HTML representations during generation.

| Hook | Description | Expected Return |
| :--- | :--- | :--- |
| **`onConfigResolved(config)`** | Reads or modifies the active normalised `config` right after initialisation. | `void` or `Promise<void>` |
| **`onDevServerReady(server, wss)`** | Exposes the raw Node.js `http.Server` and `WebSocketServer` during development mode (`docmd dev`). | `void` or `Promise<void>` |
| **`onBeforeParse(src, frontmatter)`** | Pre-processes raw markdown string data immediately before it is passed to markdown-it for parsing. | `string` or `Promise<string>` |
| **`onAfterParse(html, frontmatter)`** | Post-processes generated HTML representing the markdown body segment. | `string` or `Promise<string>` |
| **`onPageReady(page)`** | Accesses the fully assembled page metadata (`page.html`, `page.outputPath`, `page.frontmatter`) just before it is written to the destination file. | `void` or `Promise<void>` |

```javascript
export default {
  plugin: {
    name: "my-advanced-plugin",
    version: "1.0.0",
    capabilities: ["init", "build", "dev"]
  },
  onConfigResolved: (config) => {
    config.siteTitle = config.siteTitle + " (Modified)";
  },
  onBeforeParse: (src, frontmatter) => {
    return src.replace(/foo/gi, 'bar');
  },
  onPageReady: (page) => {
    // Append custom tracking bug into the final HTML file string
    page.html = page.html.replace('</body>', '<script>/* tracker */</script></body>');
  }
}
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

## Translating Plugins (i18n)

Plugins that render client-side UI should expose translatable strings via the `translations(localeId)` hook. The docmd engine will call this hook during the build process, merge the results with core system strings and user overrides, and pass them down.

The standard pattern is to store a JSON file for each language in an `i18n/` directory inside your plugin:

```javascript
// my-plugin.js
import fs from 'fs';
import path from 'path';

export default {
  plugin: {
    name: 'my-plugin',
    version: '1.0.0',
    capabilities: ['translations', 'body']
  },

  translations: (localeId) => {
    // 1. Try loading the specific locale
    try {
      const p = path.join(__dirname, 'i18n', `${localeId}.json`);
      return JSON.parse(fs.readFileSync(p, 'utf8'));
    } catch { }

    // 2. Fall back to English
    try {
      const p = path.join(__dirname, 'i18n', 'en.json');
      return JSON.parse(fs.readFileSync(p, 'utf8'));
    } catch { }

    return {};
  }
}
```

You can then inject these strings via `generateScripts` (using `config._activeLocale.id` to determine the current language), or rely on the engine to merge them into a global registry.

## WebSocket RPC Actions

Starting in `0.6.8`, plugins can register **action handlers** and **event handlers** that run on the dev server and are callable from the browser via the `window.docmd` API.

```javascript
// my-live-plugin.js
export default {
  plugin: {
    name: 'my-live-plugin',
    version: '1.0.0',
    capabilities: ['actions', 'events']
  },

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

1.  **Declare Capabilities**: Always export a `plugin` descriptor with your declared capabilities. This enables the engine to enforce boundaries and will be required in `0.8.0`.
2.  **Async/Await**: Always use `async` functions for `onPostBuild` and action handlers to prevent blocking the build engine during I/O operations.
3.  **Statelessness**: Avoid maintaining state within the plugin object, as `docmd` may re-initialise plugins during development "Hot Reloads."
4.  **Naming Convention**: For community plugins, prefix your package name with `docmd-plugin-` (e.g., `docmd-plugin-analytics`).
5.  **Action Namespacing**: Prefix your action names with your plugin name (e.g., `my-plugin:save-note`) to avoid collisions.
6.  **Action Validation**: As a robust API pattern, you should always define and require an explicit payload schema in your actions. This ensures a secure plugin ecosystem where unknown payload properties are stripped or rejected.
7.  **Logging**: Use the provided `log()` helper in `onPostBuild` to ensure your messages respect the user's `--verbose` settings.

::: callout tip "AI-Ready Design 🤖"
The `docmd` plugin API is designed to be **LLM-Optimal**. Because the hooks use standard JavaScript objects and types without hidden complex class hierarchies, AI agents can generate bug-free custom plugins for you with minimal instruction.
:::