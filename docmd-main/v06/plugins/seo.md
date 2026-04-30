---
title: "SEO Plugin"
description: "Optimize your documentation for search engines and control AI crawler access with native meta tag generation."
---

The `@docmd/plugin-seo` plugin is responsible for generating high-quality metadata for every page. It ensures your documentation is not only discoverable by human readers on search engines but also correctly interpreted by AI models and social media platforms.

## Global Configuration

Configure site-wide SEO defaults in your `docmd.config.js`.

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  plugins: {
    seo: {
      defaultDescription: 'Comprehensive documentation for the docmd ecosystem.',
      aiBots: false, // Set to false to block common AI crawlers (GPTBot, etc.)
      openGraph: {
        defaultImage: '/assets/og-image.png'
      },
      twitter: {
        siteUsername: '@docmd_io',
        cardType: 'summary_large_image'
      }
    }
  }
});
```

## Page-Level Overrides

You can fine-tune SEO settings for individual pages using frontmatter. Page-level settings always take precedence over global defaults.

```yaml
---
title: "Advanced Configuration"
description: "Learn how to master docmd's internal engine."
noindex: true # Hide this specific page from all search engines
seo:
  keywords: ["docmd", "javascript", "ssg"]
  ogType: "article"
  canonicalUrl: "https://mysite.com/canonical-path"
  aiBots: true # Override global block to allow AI access to this page
---
```

## Core Features

### 1. Smart Description Fallback
If a description is not provided in the frontmatter or global config, the plugin automatically extracts the first 150 characters of the page's prose to use as the `<meta name="description">`, ensuring every page has basic metadata for search snippets.

### 2. AI Bot Governance
By setting `aiBots: false`, the plugin injects `noindex` instructions specifically for major AI crawlers (including `GPTBot`, `Claude-Web`, and `Google-Extended`). This allows you to differentiate between traditional search engine indexing and LLM training sessions.

### 3. Canonical Resolution
The plugin automatically generates `<link rel="canonical">` tags based on your `siteUrl`. It intelligently handles directory indexes, converting `guide/index.html` to a clean `/guide/` canonical URL to prevent duplicate content issues.

### 4. Rich Social Previews
Native support for Open Graph and Twitter Cards ensures that links to your documentation look professional when shared on platforms like X (Twitter), LinkedIn, and Discord.

::: callout tip "Search Discovery"
For the best SEO results, ensure your `siteUrl` is defined in the root of your configuration. Without a base URL, the plugin cannot generate absolute canonical links or Open Graph image paths.
:::

## Structured Data (LD+JSON)
`docmd` can automatically generate [Article Schema](https://developers.google.com/search/docs/appearance/structured-data/article) to help Search Engines display rich snippets.

```yaml
---
title: "How to Build a docmd Plugin"
seo:
  ldJson: true
---
```

::: callout tip "Structured Data"
A well-configured SEO plugin helps AI-powered search engines (like SearchGPT or Perplexity) summarize your site accurately. By providing clear descriptions and blocked bots, you control exactly how AI models perceive and source your content online.
:::