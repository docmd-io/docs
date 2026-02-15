---
title: "Building Plugins"
description: "Learn how to create custom plugins to extend docmd capabilities."
---

# Building Plugins

`docmd` features a flexible hook-based plugin system. Plugins can modify the Markdown parser, inject HTML tags, manage static assets, or perform actions after the build completes.

## Anatomy of a Plugin

A plugin is simply a JavaScript object (or a function returning an object) that exports specific hook functions. You can define plugins inline in your `docmd.config.js` or create them as separate NPM packages.

### Available Hooks

| Hook | Description |
| :--- | :--- |
| `markdownSetup(md)` | Access the `markdown-it` instance to add rules or plugins. |
| `injectHead(config)` | Return HTML string to inject into `<head>`. |
| `injectBody(config)` | Return HTML string to inject at the end of `<body>`. |
| `getAssets()` | Return a list of CSS/JS files to copy and inject. |
| `onPostBuild(context)` | Run logic after the HTML files are generated (e.g., sitemaps). |

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