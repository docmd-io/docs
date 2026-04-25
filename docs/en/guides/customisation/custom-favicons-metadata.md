---
title: "Customising Favicons and Metadata"
description: "How to configure your site's visual identity in the browser and optimise social media previews."
---

## Problem

A default documentation site often lacks a distinct visual identity in the browser (using a generic favicon) and provides poor previews when links are shared on social media or communication tools like Slack and Discord. This reduces brand recognition and click-through rates.

## Why it matters

Your favicon is the primary visual anchor in a crowded browser window. High-quality OpenGraph and Twitter metadata ensure that your documentation looks professional and trustworthy when shared, providing context through titles, descriptions, and hero images.

## Approach

`docmd` provides a built-in `favicon` property for easy icon configuration. For advanced SEO and social metadata, leverage the [SEO Plugin](../../plugins/seo), which automates the generation of meta tags based on your project configuration and page frontmatter.

## Implementation

### 1. Configuring the Favicon

Place your favicon file (e.g., `favicon.svg` or `favicon.ico`) in your source directory and reference it in your `docmd.config.js`. `docmd` will automatically handle the relative pathing and cache-busting.

```javascript
// docmd.config.js
export default {
  title: 'My Project',
  favicon: '/favicon.svg' // Relative to source directory
};
```

### 2. Global SEO Configuration

Enable and configure the [SEO Plugin](../../plugins/seo) to set default social media previews for your entire site.

```javascript
// docmd.config.js
export default {
  url: 'https://docs.example.com',
  plugins: {
    seo: {
      defaultDescription: 'The ultimate guide to our amazing software.',
      openGraph: {
        defaultImage: '/static/og-banner.png'
      },
      twitter: {
        siteUsername: '@myproject',
        cardType: 'summary_large_image'
      }
    }
  }
};
```

### 3. Page-Specific Overrides

You can override SEO settings for individual pages using the `seo` property in the [Frontmatter](../../content/frontmatter).

```yaml
---
title: "Major Release v2.0"
description: "Everything you need to know about our new engine."
seo:
  image: "/assets/v2-hero-banner.png"
  keywords: ["release", "v2", "update", "performance"]
---
```

## Trade-offs

While the `favicon` property is convenient, it only supports a single file. For complex multi-size favicon sets (Apple Touch Icons, Android manifests, etc.), you may need to use a custom plugin to inject additional `<link>` tags into the `<head>`.
