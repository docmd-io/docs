---
title: "Using Plugins"
description: "How to enable and configure docmd's powerful plugin ecosystem."
---

`docmd` features a modular architecture. While the core engine handles Markdown conversion and routing, specialized features are implemented via plugins.

## Enabling Core Plugins

Most official plugins ship bundled with `@docmd/core` and simply need to be enabled in your `docmd.config.js`.

```javascript
// docmd.config.js
export default {
  plugins: {
    // 1. Search (Built-in offline search)
    search: {},

    // 2. SEO (Meta tags & canonical URLs)
    seo: { aiBots: false },

    // 3. PWA (Mobile App support)
    pwa: { themeColor: '#0097ff' },

    // 4. LLM (AI Context generation)
    llms: { fullContext: true },

    // 5. Mermaid (Native Diagrams)
    mermaid: {}
  }
}
```

## Plugin Lifecycle

Plugins hook into different stages of the build process:
*   **`onPreBuild`**: Modifies the file list or adds files before compilation.
*   **`onPostBuild`**: Generates secondary artifacts (like `sitemap.xml` or `service-worker.js`).
*   **`generateMetaTags`**: Injects custom HTML into the `<head>` of every page.
*   **`generateScripts`**: Injects JavaScript before the closing `</body>` tag.

## External Plugins

To use a plugin from npm, install it and require it in your config.

```bash
npm install @docmd/plugin-analytics
```

```javascript
// docmd.config.js
import  from '';

export default {
  plugins: {
    analytics: { googleV4: { measurementId: 'G-XXXX' } }
  }
}
```

::: callout tip
Our plugin architecture is designed to be **transparent**. Every meta-tag and script injected by a plugin is clearly defined and traceable. This allows AI models to understand exactly how your site's functionality is being extended without guessing.
:::