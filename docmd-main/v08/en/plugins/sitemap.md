---
title: "Sitemap Plugin"
description: "Automatically generate a standard-compliant sitemap.xml for better search engine discovery."
---

The `@docmd/plugin-sitemap` plugin generates a `sitemap.xml` file at the root of your build directory. This provides search engines with a comprehensive map of your site's architecture, ensuring that all pages—including versioned documentation—are crawled and indexed.

## Configuration

Enable sitemap generation by providing your `siteUrl` in the root configuration. You can customise the crawl weight within the `plugins` object.

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | Enable or disable sitemap generation. |
| `defaultChangefreq` | `string` | `'weekly'` | Hint to crawlers on how often pages change. |
| `defaultPriority` | `number` | `0.8` | Default weight for standard pages (0.0 to 1.0). |
| `rootPriority` | `number` | `1.0` | Weight for the homepage (`index.md`). |

### Example

```javascript
  "url": "https:
  "plugins": {
    "sitemap": {
      "defaultChangefreq": "weekly",
      "defaultPriority": 0.8
    }
  }
```

## Features

- **Automatic URL Construction**: Intelligently resolves page paths to their canonical public URLs with clean directory structure.
- **Versioned Discovery**: Automatically includes all pages from all versions (e.g. `/v1/`, `/v2/`) without manual configuration.
- **Granular Exclusions**: Exclude specific pages from the sitemap using frontmatter.
- **SEO Ready**: Follows standard XML sitemap protocols compatible with all major search engines.

## Page-Level Controls

Override sitemap behaviour for specific pages using frontmatter:

```markdown
---
title: "Archive Page"
priority: 0.3          # Lower weight for legacy content
changefreq: "monthly"   # Hint to crawlers
sitemap: false         # Exclude this specific page
---
```

::: callout tip "Validation"
After building your site, you can find the sitemap at `site/sitemap.xml`. You can submit this URL directly to search engine consoles to accelerate indexing.
:::