---
title: "Customising Favicons & Metadata"
description: "Configure site favicons, OpenGraph cards, and Twitter metadata in docmd for social sharing and search engines."
---

Custom favicons and OpenGraph metadata ensure your documentation appears professional when bookmarked in browser tabs or shared across social networks and communication channels.

## Favicon Configuration

Place your favicon file (e.g. `favicon.svg` or `favicon.ico`) in your `assets/` directory and configure the `favicon` property in `docmd.config.json`:

```json "docmd.config.json"
{
  "title": "Documentation Core",
  "favicon": "/assets/favicon.svg"
}
```

`docmd` handles path resolution and cache-busting headers automatically during compilation.

## Global SEO & Social Metadata

Configure the built-in [SEO Plugin](../plugins/seo.md) in `docmd.config.json` to generate site-wide meta tags and social card previews:

```json "docmd.config.json"
{
  "url": "https://docs.docmd.io",
  "plugins": {
    "seo": {
      "defaultDescription": "Technical documentation for docmd.",
      "openGraph": {
        "defaultImage": "/assets/og-banner.png"
      },
      "twitter": {
        "siteUsername": "@docmd_io",
        "cardType": "summary_large_image"
      }
    }
  }
}
```

## Page-Level Metadata Overrides

Override site-wide SEO defaults for specific pages using the `seo` property in [Page Frontmatter](../content/frontmatter.md):

```yaml
---
title: "Major Release Announcement"
description: "Overview of new features introduced in docmd."
seo:
  image: "/assets/v09-banner.png"
  keywords: ["release", "v09", "documentation", "performance"]
---
```

::: callout tip "Multi-Resolution Favicons" icon:lightbulb
The top-level `favicon` configuration setting covers primary browser requirements. For multi-resolution favicon sets (such as Apple Touch Icons or Android web manifests), inject additional `<link>` headers via custom plugins or template head slots.
:::