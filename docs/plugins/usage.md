---
title: "Using Plugins"
description: "Install, configure, and manage docmd plugins — from required defaults to optional add-ons."
---

`docmd` features a modular plugin architecture. Required plugins ship with the core and need no installation. Optional plugins can be installed with a single CLI command.

## Installing Plugins

Use the `docmd` CLI to install and remove plugins:

```bash
# Install a plugin
docmd add <plugin-name>

# Remove a plugin
docmd remove <plugin-name>
```

The installer automatically detects your package manager (npm, pnpm, yarn, or bun), resolves short names to full package names, and injects the plugin config into your `docmd.config.js`.

Use `--verbose` for full installer output:

```bash
docmd add threads --verbose
```

## Required Plugins

These plugins are bundled with `@docmd/core` — no installation needed. Enable them in your `docmd.config.js`:

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  plugins: {
    search: {},                        // Offline full-text search
    seo: { aiBots: false },            // Meta tags, Open Graph, AI bot controls
    sitemap: {},                       // Automatic sitemap.xml generation
    analytics: {},                     // Google Analytics v4
    pwa: { themeColor: '#0097ff' },    // Progressive Web App support
    llms: {},                          // LLM context generation (llms.txt)
    mermaid: {}                        // Native interactive diagrams
  }
});
```

## Optional Plugins

Optional plugins require installation before enabling.

| Plugin | Install Command | Description |
| :--- | :--- | :--- |
| [Threads](threads.md) | `docmd add threads` | Inline discussion comments stored in your markdown |

## Plugin Lifecycle

Plugins hook into different stages of the build and development process:

| Hook | Description |
| :--- | :--- |
| `markdownSetup(md, opts)` | Extend the Markdown parser with custom rules or containers |
| `generateMetaTags(config, page, root)` | Inject `<meta>` and `<link>` tags into the `<head>` |
| `generateScripts(config, opts)` | Inject scripts into `<head>` or `</body>` |
| `getAssets(opts)` | Define external files or CDN scripts to inject |
| `onPostBuild(ctx)` | Run logic after all HTML files are generated |
| `actions` | Server-side handlers callable from the browser via WebSocket RPC |
| `events` | Fire-and-forget handlers for browser-pushed events |

::: callout tip "AI-Transparent Architecture 🤖"
The plugin architecture is designed to be **deterministic**. Every meta-tag and script injected by a plugin is traceable, allowing AI agents (and human developers) to understand exactly how the site behaves without hidden side effects.
:::