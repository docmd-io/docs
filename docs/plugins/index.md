---
title: "Using Plugins"
description: "Extend docmd's functionality with built-in plugins."
---

# Extending docmd with Plugins

`docmd` supports a plugin system to add extra features and integrations to your documentation site without bloating the core tool. Plugins can modify the build process, inject content into pages, or add site-wide functionalities.

## Enabling Plugins

You enable and configure plugins in your config file within the `plugins` object. Each plugin is configured using its key with a corresponding configuration object.

```javascript
module.exports = {
  // ... other config ...
  plugins: {
    // SEO Plugin
    seo: {
      defaultDescription: 'Your site-wide meta description',
      openGraph: {
        defaultImage: '/assets/images/og-preview.png',
      },
    },
    // Analytics Plugin
    analytics: {
      googleV4: {
        measurementId: 'G-XXXXXXXXXX'
      }
    },
    // Sitemap Plugin
    sitemap: {
      defaultChangefreq: 'weekly',
      defaultPriority: 0.8
    },
    // Mermaid Plugin (Diagrams)
    mermaid: {} 
  },
  // ...
};
```

## Core Plugins

`docmd` ships with several core plugins that are available out-of-the-box:

* **[SEO & Meta Tags](@docmd/plugin-seo):** Automatically generates common SEO-related meta tags (description, Open Graph, Twitter Cards).
* **[Analytics Integration](@docmd/plugin-analytics):** Easily add tracking snippets for popular web analytics services like Google Analytics.
* **[Sitemap](@docmd/plugin-sitemap):** Generates a sitemap.xml file for search engines to better discover and index your content.
* **[Mermaid](@docmd/plugin-mermaid):** Renders flowcharts and diagrams from markdown code blocks.

Click on the links above or see the sidebar for detailed configuration of each core plugin.

## How Plugins Work

Plugins in `docmd` hook into various parts of the build process:

* They can add meta tags and scripts to the page head
* They can inject content or scripts at the beginning or end of the page body
* They can generate additional files in the output directory
* They can modify the HTML output of pages

All plugins are designed to be configurable through your config file, giving you control over their behavior.