---
title: "Using Plugins"
description: "Enable and configure docmd's powerful plugin ecosystem to extend your site's functionality."
---

`docmd` features a modular architecture designed for performance and flexibility. While the core engine handles Markdown conversion and routing, specialized features—from SEO optimization to interactive diagrams—are implemented via a robust plugin system.

## Enabling Core Plugins

Most official plugins are bundled with `@docmd/core` and can be enabled directly within your `docmd.config.js`.

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  plugins: {
    // 1. Search (Built-in offline full-text search)
    search: {},

    // 2. SEO (Meta tags, Open Graph, and AI bot controls)
    seo: { aiBots: false },

    // 3. PWA (Mobile App support and offline caching)
    pwa: { themeColor: '#0097ff' },

    // 4. LLM (Context generation for AI models)
    llms: {},

    // 5. Mermaid (Native interactive diagrams)
    mermaid: {}
  }
});
```

## Plugin Lifecycle

Plugins hook into different stages of the build process to inject functionality without bloating the core engine:

*   **`onPostBuild`**: Executes logic after all HTML pages are generated (useful for generating `sitemap.xml`, search indexes, or `llms.txt`).
*   **`generateMetaTags`**: Injects custom HTML `<meta>` and `<link>` tags into the `<head>` of every page.
*   **`generateScripts`**: Injects specific JavaScript or HTML fragments into the `<head>` or before the closing `</body>` tag.
*   **`markdownSetup`**: Allows plugins to extend the Markdown parser with custom rules, containers, or syntax.

## External Plugins

To use a community or third-party plugin from npm, install it via your package manager and reference it in your configuration.

```bash
npm install @docmd/plugin-analytics
```

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  plugins: {
    // Reference by package name or local path
    'analytics': { 
      googleV4: { measurementId: 'G-XXXX' } 
    }
  }
});
```

::: callout tip "AI-Transparent Architecture 🤖"
The plugin architecture is designed to be **deterministic**. Every meta-tag and script injected by a plugin is traceable, allowing AI agents (and human developers) to understand exactly how the site behaves without hidden side effects.
:::