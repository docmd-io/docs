---
title: "SEO Plugin"
description: "Optimise your documentation for search engines and control AI crawler access with native meta tag generation."
---

The `@docmd/plugin-seo` plugin generates high-quality metadata for every page. It ensures your documentation is not only discoverable by human readers on search engines but also correctly interpreted by AI models and social media platforms.

## Configuration

Configure site-wide SEO defaults in your `docmd.config.json`. Page-level settings always take precedence over global defaults.

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `defaultDescription` | `string` | `null` | Fallback description for pages without frontmatter descriptions. |
| `aiBots` | `boolean` | `true` | Allow (`true`) or block (`false`) AI training bots. When `false`, blocks GPTBot, ChatGPT-User, Google-Extended, CCBot, and other AI crawlers. |
| `openGraph` | `object` | `null` | Open Graph settings for social media (Facebook, LinkedIn). |
| `twitter` | `object` | `null` | Twitter (X) Card settings including username and card type. |

### Example

```json
{
  "plugins": {
    "seo": {
      "defaultDescription": "Comprehensive documentation for the docmd ecosystem.",
      "aiBots": false,
      "twitter": {
        "siteUsername": "@docmd_io",
        "cardType": "summary_large_image"
      }
    }
  }
}
```

## Features

- **Automatic robots.txt**: Generates `robots.txt` if missing, with sitemap reference and AI bot directives.
- **Smart Fallbacks**: Automatically extracts the first 150 characters of prose if no description is provided.
- **AI Bot Governance**: By default, AI bots are allowed to index content. Set `aiBots: false` to block AI training bots whilst still allowing traditional search engines.
- **Canonical Resolution**: Automatically generates `<link rel="canonical">` tags to prevent duplicate content issues.
- **Rich Social Previews**: Native support for Open Graph and Twitter Cards for professional link sharing.
- **Structured Data**: Supports LD+JSON Article Schema for rich search snippets.

## robots.txt Auto-Generation

The plugin automatically generates a `robots.txt` file during the build process if one doesn't exist in your output directory.

**Generated content includes:**

```txt
User-agent: *
Allow: /

# Sitemap
Sitemap: https://your-domain.com/sitemap.xml
```

**Blocking AI Training Bots:**

When `aiBots: false` is set, the generated `robots.txt` includes:

```txt
# Block AI training bots
User-agent: GPTBot
Disallow: /
User-agent: ChatGPT-User
Disallow: /
User-agent: Google-Extended
Disallow: /
# ... (additional AI crawlers)
```

### robots.txt Location Strategy

The plugin intelligently handles `robots.txt` across multiple locations:

**Priority Order:**
1. **Site root** (`site/robots.txt`) - Checked first, highest priority
2. **Assets folder** (`site/assets/robots.txt`) - Copied to site root if found

**Behaviour:**

- If `robots.txt` exists in **site root**: Preserved, no action taken
- If `robots.txt` exists in **assets folder**: Automatically copied to site root (recommended location for SEO)
- If `robots.txt` not found: Auto-generated based on SEO configuration

**Recommended Practice:**

Place your custom `robots.txt` in the `assets/` folder of your documentation source. The plugin will copy it to the site root during build:

```
your-docs/
├── assets/
│   └── robots.txt    ← Place here
├── index.md
└── docmd.config.json
```

After build, it appears at the correct location:

```
site/
├── robots.txt        ← Copied here (SEO standard location)
├── assets/
│   └── robots.txt    ← Also preserved here
└── index.html
```

::: callout tip "Why Site Root?"
Search engines expect `robots.txt` at the domain root (`https://example.com/robots.txt`). The plugin ensures your file is always in the correct location, whether you provide a custom one or let it auto-generate.
:::

## Page-Level Overrides

Fine-tune settings for individual pages using frontmatter:

```markdown
---
title: "Advanced Configuration"
noindex: true # Hide from all search engines
seo:
  keywords: ["docmd", "javascript", "ssg"]
  aiBots: true # Override global block for this page
  ldJson: true # Enable Article Schema
---
```

::: callout tip "Search Discovery"
For best results, ensure your `url` is defined in the root of your configuration. Without a base URL, the plugin cannot generate absolute canonical links or social image paths.
:::