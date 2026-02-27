---
title: "Using Plugins"
description: "Extend docmd's functionality with built-in integrations."
---

# Extending docmd

Plugins allow you to add complex features to your documentation site—like analytics tracking or AI context generation—without bloating the core engine. 

All core plugins are bundled with `@docmd/core`. You simply enable them in your `docmd.config.js` file.

## Configuration

Plugins are configured inside the `plugins` object. An empty object `{}` usually enables the plugin with its default settings. To disable a plugin, either remove it or set it to `false`.

```javascript
module.exports = {
  // ...
  plugins: {
    
    // Generates Meta Tags and Open Graph data
    seo: {
      defaultDescription: 'My documentation site',
      openGraph: { defaultImage: '/assets/og-image.png' }
    },
    
    // Injects Google Analytics
    analytics: {
      googleV4: { measurementId: 'G-XXXXXXXXXX' }
    },
    
    // Generates sitemap.xml
    sitemap: {
      defaultChangefreq: 'weekly'
    },
    
    // Enables Mermaid.js diagrams
    mermaid: {},
    
    // Offline search (Can also be toggled in layout.optionsMenu)
    search: {},
    
    // Generates an llms.txt file for AI agents
    llms: {} 
  }
};
```

## How Plugins Work

Plugins in `docmd` hook into various parts of the build process:

* They can add meta tags and scripts to the page head
* They can inject content or scripts at the beginning or end of the page body
* They can generate additional files in the output directory
* They can modify the HTML output of pages

All plugins are designed to be configurable through your config file, giving you control over their behavior. Explore the sidebar to see the specific configuration options available for each plugin.