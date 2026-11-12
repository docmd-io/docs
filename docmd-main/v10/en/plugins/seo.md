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
| `titleSeparator` | `string` | `"-"` | Separator placed between page title and site title in `<title>` and social cards. Single spaces are added automatically (`" - "`). Can also be configured in `layout.titleSeparator`. |
| `titleAppend` | `boolean` | `true` | Appends site title to page title. Set to `false` to output only the page title. Can also be set in `layout.titleAppend`. |
| `breadcrumbs` | `boolean` | `true` | Automatically injects Schema.org `BreadcrumbList` JSON-LD structured data on all non-root pages. |
| `organization` | `object` | `null` | Schema.org `Organization` structured data (name, url, logo, sameAs) injected on the site root/home page. |
| `webSite` | `object \| boolean` | `true` | Schema.org `WebSite` structured data with Sitelinks `SearchAction` emitted on the site homepage. |
| `aiBots` | `boolean` | `true` | Allow (`true`) or block (`false`) AI training web crawlers (GPTBot, ChatGPT-User, Google-Extended, CCBot). |
| `openGraph` | `object` | `null` | Open Graph social media metadata (Facebook, LinkedIn). |
| `twitter` | `object` | `null` | Twitter (X) Card settings including handle and card type. |

### Global SEO Configuration Example

```json "docmd.config.json"
{
  "layout": {
    "titleSeparator": "-",
    "titleAppend": true
  },
  "plugins": {
    "seo": {
      "defaultDescription": "Comprehensive technical documentation for the docmd platform.",
      "breadcrumbs": true,
      "organization": {
        "name": "docmd",
        "url": "https://docmd.io",
        "logo": "https://docmd.io/assets/images/docmd-logo.png",
        "sameAs": [
          "https://github.com/docmd-io/docmd",
          "https://x.com/docmd_io"
        ]
      },
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
* **Canonical URL Emission**: Injects `<link rel="canonical">` elements to prevent duplicate indexing issues. Set `canonicalUrl: false` in frontmatter to suppress.
* **Social Preview Cards**: Generates Open Graph and Twitter Card tags with unified page titles and separators.
* **Structured Data (JSON-LD)**: Injects `BreadcrumbList`, `Organization`, and `WebSite` (Sitelinks SearchAction) schemas, with support for custom frontmatter `ldJson` payloads.

## `robots.txt` Resolution Order

The SEO plugin evaluates `robots.txt` in top-down priority order:

1. **Site Root** (`site/robots.txt`) - Checked first; if present, existing contents are preserved.
2. **Source Assets Folder** (`assets/robots.txt`) - If present in your source assets directory, it is automatically copied to the site output root (`site/robots.txt`).
3. **Auto-Generated Default** - If no custom file is found, `docmd` generates `robots.txt` dynamically based on your plugin configuration.

Recommended file organisation:

```text
my-docs/
├── assets/
│   └── robots.txt  # Author custom rules here
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