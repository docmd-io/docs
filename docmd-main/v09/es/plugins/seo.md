---
title: "SEO Plugin"
description: "Optimise your documentation site for search engine indexing, social card previews, and AI crawler governance."
---

The `@docmd/plugin-seo` plugin generates semantic HTML metadata and social media preview tags for every page across your site. It ensures your documentation is discoverable by search engines, correctly structured for social platforms, and compliant with AI crawler policies.

## Configuration Options

Configure site-wide SEO defaults in `docmd.config.json`. Page-level frontmatter settings override global defaults.

| Option | Type | Default | Technical Description |
| :--- | :--- | :--- | :--- |
| `defaultDescription` | `string` | `null` | Fallback description for pages lacking explicit frontmatter descriptions. |
| `aiBots` | `boolean` | `true` | Allow (`true`) or block (`false`) AI training web crawlers (GPTBot, ChatGPT-User, Google-Extended, CCBot). |
| `openGraph` | `object` | `null` | Open Graph social media metadata (Facebook, LinkedIn). |
| `twitter` | `object` | `null` | Twitter (X) Card settings including handle and card type. |

### Global SEO Configuration Example

```json "docmd.config.json"
{
  "plugins": {
    "seo": {
      "defaultDescription": "Comprehensive technical documentation for the docmd platform.",
      "aiBots": false,
      "twitter": {
        "siteUsername": "@docmd_io",
        "cardType": "summary_large_image"
      }
    }
  }
}
```

## Core Capabilities

* **Automated `robots.txt`**: Generates a standard `robots.txt` at the output root including sitemap locations and AI bot rules.
* **Smart Excerpt Generation**: Automatically extracts the initial 150 characters of body prose if no page description is defined.
* **AI Bot Governance**: Set `aiBots: false` to block AI training scrapers while allowing search engine crawlers.
* **Canonical URL Emission**: Injects `<link rel="canonical">` elements to prevent duplicate indexing issues.
* **Social Preview Cards**: Generates Open Graph and Twitter Card tags.
* **Structured Data (JSON-LD)**: Injects Article Schema JSON-LD blocks for rich search engine snippets.

## `robots.txt` Resolution Order

The SEO plugin evaluates `robots.txt` in top-down priority order:

1. **Site Root** (`site/robots.txt`) - Checked first; if present, existing contents are preserved.
2. **Source Assets Folder** (`assets/robots.txt`) - If present in your source assets directory, it is automatically copied to the site output root (`site/robots.txt`).
3. **Auto-Generated Default** - If no custom file is found, `docmd` generates `robots.txt` dynamically based on your plugin configuration.

Recommended file organization:

```text
my-docs/
├── assets/
│   └── robots.txt    ← Author custom rules here
├── index.md
└── docmd.config.json
```

## Page-Level SEO Overrides

Override site-wide SEO defaults for specific documents using [Page Frontmatter](../content/frontmatter.md):

```yaml
---
title: "Advanced Engine Architecture"
noindex: true # Hide page from search engine indexes
seo:
  keywords: ["docmd", "architecture", "engine"]
  aiBots: true # Allow AI scrapers on this page
  ldJson: true # Inject Article Schema
---
```

::: callout tip "Base URL Configuration" icon:link
Define the `url` property in `docmd.config.json` (e.g. `https://docs.docmd.io`) to enable valid absolute canonical links and social preview image URLs.
:::