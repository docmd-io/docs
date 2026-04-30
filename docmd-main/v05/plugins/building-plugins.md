---
title: "Building Plugins"
description: "A guide for developers on how to create and share custom docmd plugins."
---

Plugins are the primary way to extend `docmd`. They allow you to hook into the Markdown parser, inject HTML into the layout, and execute logic after builds.

## Anatomy of a Plugin

A plugin is a JavaScript object exporting specific hook functions.

| Hook | Purpose |
| :--- | :--- |
| `markdownSetup(md)` | Access the `markdown-it` instance for custom rules. |
| `injectHead(config)` | Injects HTML into the `<head>`. |
| `injectBody(config)` | Injects HTML at the bottom of the `<body>`. |
| `getAssets()` | Returns a list of CSS/JS files to copy/inject. |
| `onPostBuild(ctx)` | Executes logic after all HTML is generated. |

## Creating a Local Plugin

You can create a plugin file in your project, for example `my-plugin.js`:

```javascript
// my-plugin.js
module.exports = {
  // 1. Extend Markdown
  markdownSetup: (md) => {
    // Example: Add a custom container or rule
    // md.use(require('markdown-it-emoji'));
  },

  // 2. Inject Styles/Scripts
  injectHead: (config) => {
    return `<meta name="custom-plugin" content="active">`;
  },

  // 3. Post-Build Action
  onPostBuild: async ({ config, pages, outputDir, log }) => {
    log('Plugin: Build finished! Processed ' + pages.length + ' pages.');
  }
};
```

To use it, require it in your `docmd.config.js`:

```javascript
// docmd.config.js
module.exports = {
  // ...
  plugins: {
    './my-plugin.js': {} // Key is path, Value is options object
  }
};
```

## Plugin API Reference

### `getAssets()`
Used to inject client-side scripts or CSS files.

```javascript
getAssets: () => {
  return [
    {
      src: path.join(__dirname, 'client-script.js'), // Source file
      dest: 'assets/js/plugin.js',                   // Destination in site/
      type: 'js',                                    // 'js' or 'css'
      location: 'body'                               // 'head' or 'body'
    }
  ];
}
```

### `onPostBuild({ config, pages, outputDir, log })`
*   `config`: The full project configuration object.
*   `pages`: Array of processed page objects `{ outputPath, frontmatter, htmlContent, searchData }`.
*   `outputDir`: Absolute path to the build output folder.
*   `log`: Helper function to print messages to the CLI console.

## Publishing a Plugin

To share your plugin with the community:
1.  Name your package `docmd-plugin-<name>` (recommended).
2.  Export the plugin object as the default export.
3.  Publish to NPM.

Users can then install it via `npm install docmd-plugin-name` and add it to their config:

```javascript
plugins: {
  'docmd-plugin-name': { /* options */ }
}
```

::: callout tip "AI-Generated Plugins 🤖"
The `docmd` plugin API is designed to be **LLM-Optimal**. Because the hooks are simple, stateless, and use standard JavaScript objects, an AI Agent can perfectly generate a complete plugin (e.g., for custom Markdown containers or third-party integrations) from a single prompt with minimal errors.
:::