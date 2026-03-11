---
title: "SEO & Meta Tags"
description: "Automatic SEO optimization, Open Graph integration, and AI Scraper control for your docmd site."
---

The `seo` plugin ensures your documentation is discoverable by search engines and looks professional when shared on social media. It handles technical meta-tag injection automatically.

## Quick Setup

```javascript
// docmd.config.js
export default {
  plugins: {
    seo: {
      defaultDescription: 'The official documentation for Project X.',
      openGraph: {
        defaultImage: '/assets/og-hero.jpg' // Shown on Twitter/LinkedIn
      },
      aiBots: {
        block: true // Automatically block common AI scrapers (GPTBot, etc)
      }
    }
  }
}
```

## Automatic Features

### 1. Smart Excerpts
If you forget to provide a `description` in your file's frontmatter, the SEO plugin automatically constructs a **150-character fallback description** from the beginning of your content. This ensures you never have "empty" snippets in Google search results.

### 2. AI Scraper Control
With `aiBots.block: true`, `docmd` injects `noindex` tags targetting 12+ major AI crawler agents (including `GPTBot`, `ClaudeBot`, and `Google-Extended`). This is the easiest way to keep your documentation out of bulk training datasets while remaining visible to humans.

## Per-Page Overrides

For maximum SEO precision, use the `seo` object in your Markdown frontmatter.

```yaml
---
title: "Advanced Setup Guide"
seo:
  description: "Learn how to configure our enterprise-grade security clusters in minutes."
  image: "/assets/guides/setup-social.png"
  noindex: false
  keywords: ["security", "cluster", "enterprise"]
---
```

## Structured Data (LD+JSON)
`docmd` can automatically generate [Article Schema](https://developers.google.com/search/docs/appearance/structured-data/article) to help Search Engines display rich snippets.

```yaml
---
title: "How to Build a docmd Plugin"
seo:
  ldJson: true
---
```

::: callout tip
A well-configured SEO plugin helps AI-powered search engines (like SearchGPT or Perplexity) summarize your site accurately. By providing clear descriptions and blocked bots, you control exactly how AI models perceive and source your content online.
:::