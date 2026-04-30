---
title: "Sitemap Plugin"
description: "Automatically generate sitemap.xml to improve search engine discoverability."
---

The `sitemap` plugin generates a standard `sitemap.xml` file during the build process. This ensures your content is indexed correctly by Google and other crawlers.

## Enabling the Plugin

```javascript
// docmd.config.js
module.exports = {
  siteUrl: 'https://mydocs.com',   // Required for absolute URLs
  plugins: {
    sitemap: {
      defaultChangefreq: 'weekly', // Default: weekly
      defaultPriority: 0.8         // Default: 0.8
    }
  }
};
```

## Frontmatter Overrides

You can control sitemap behavior on a per-page basis.

*   **Exclude Page:** `sitemap: false`
*   **Custom Settings**:
    ```yaml
    ---
    sitemap:
      changefreq: 'daily'
      priority: 1.0
    ---
    ```

## How It Works

1.  **Scanning**: The plugin scans every HTML file generated during the build.
2.  **Absolute Mapping**: It uses your `siteUrl` to generate the final URLs. Ensure this is defined without a trailing slash.
3.  **Generation**: It writes `sitemap.xml` to the root of your output directory.

::: callout tip "AI Discoverability 🤖"
While traditional search engines use sitemaps, **AI Agents** and **Knowledge Crawlers** use them to prioritize which pages to ingest into their training or RAG sets first. A well-configured sitemap ensures your most important sections (like "Guides") are processed before minor utility pages.
:::