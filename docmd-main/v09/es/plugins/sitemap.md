---
title: "Sitemap Plugin"
description: "Automatically generate standard-compliant sitemap.xml files for multi-version documentation sites in docmd."
---

The `@docmd/plugin-sitemap` plugin generates a standard `sitemap.xml` file at the root of your site output directory during compilation. This provides web crawlers and search engines with a map of your site structure, ensuring all pages and version routes are indexed efficiently.

## Configuration Options

Configure sitemap generation parameters in `docmd.config.json`:

| Option | Type | Default | Technical Description |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | Enable or disable sitemap generation. |
| `defaultChangefreq` | `string` | `'weekly'` | Crawl frequency hint for search engine bots. |
| `defaultPriority` | `number` | `0.8` | Priority weight for standard documentation pages (`0.0` to `1.0`). |
| `rootPriority` | `number` | `1.0` | Priority weight for site homepage (`index.md`). |

### Global Sitemap Example

```json "docmd.config.json"
{
  "url": "https://docs.docmd.io",
  "plugins": {
    "sitemap": {
      "defaultChangefreq": "weekly",
      "defaultPriority": 0.8
    }
  }
}
```

## Key Capabilities

* **Canonical Domain Mapping**: Resolves relative page routes to absolute URLs based on `config.url`.
* **Version Route Indexing**: Automatically indexes pages across all configured documentation versions (`/v09/`, `/v08/`, etc.).
* **Per-Page Exclusion**: Skips pages containing `sitemap: false` or `noindex: true` in frontmatter.
* **Protocol Compliance**: Produces XML formatted according to the standard sitemaps.org specification.

## Page-Level Controls

Override sitemap parameters for specific documents using [Page Frontmatter](../content/frontmatter.md):

```yaml
---
title: "Legacy Migration Guide"
priority: 0.3          # Lower crawl weight for legacy content
changefreq: "monthly"   # Hint to search engine crawlers
sitemap: false         # Exclude page from sitemap.xml
---
```

::: callout tip "Sitemap Verification" icon:check-circle
After compilation, locate `sitemap.xml` at `site/sitemap.xml`. Submit this URL directly to search console dashboards to accelerate page discovery.
:::