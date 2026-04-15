---
title: "Sitemap Plugin"
description: "Automatically generate a standard-compliant sitemap.xml for better search engine discovery."
---

The `@docmd/plugin-sitemap` plugin automatically generates a `sitemap.xml` file at the root of your build directory. This file provides search engines like Google and Bing with a comprehensive map of your site's architecture, ensuring that all pages—including deep links within versioned documentation—are crawled and indexed.

## Configuration

Enable sitemap generation by providing your `siteUrl` in the root configuration. You can customise the crawl weight of various sections within the `plugins` object.

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  siteUrl: 'https://docs.example.com', // Required for sitemap generation
  plugins: {
    sitemap: {
      defaultChangefreq: 'weekly', // 'always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'
      defaultPriority: 0.8,        // Default weight for standard pages
      rootPriority: 1.0            // Weight for the homepage (index.md)
    }
  }
});
```

## Page-Level Controls

You can override sitemap behaviour for specific pages using frontmatter.

```yaml
---
title: "Archive Page"
priority: 0.3          # Lower weight for legacy content
changefreq: "monthly"   # Hint to crawlers that this page rarely changes
lastmod: "2024-03-15"   # Explicitly set the last modification date
sitemap: false         # Exclude this specific page from the sitemap.xml
---
```

## Core Features

### 1. Automatic URL Construction
The plugin intelligently resolves page paths to their canonical public URLs. It handles directory indexes automatically, ensuring that `guide/index.html` is listed as `https://yoursite.com/guide/` to maintain clean URL structures.

### 2. Versioned Discovery
If your project uses [Versioning](../configuration/versioning), the sitemap plugin automatically includes all pages from all versions (e.g., `/v1/getting-started`, `/v2/getting-started`), allowing search engines to discover your archived documentation without manual configuration.

### 3. Smart Exclusions
Pages marked with `noindex: true` or `sitemap: false` in their frontmatter are automatically excluded from the generated `sitemap.xml`, giving you granular control over what is presented to search engines.

::: callout tip "Validation"
After building your site, you can typically find the sitemap at `your-output-dir/sitemap.xml`. Most search engine consoles allow you to submit this file directly to accelerate indexing.
:::