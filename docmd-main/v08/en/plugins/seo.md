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
| `aiBots` | `boolean` | `true` | Set to `false` to block common AI crawlers (GPTBot, Claude-Web, etc.). |
| `openGraph` | `object` | `null` | Open Graph settings for social media (Facebook, LinkedIn). |
| `twitter` | `object` | `null` | Twitter (X) Card settings including username and card type. |

### Example

```json
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
```

## Features

- **Smart Fallbacks**: Automatically extracts the first 150 characters of prose if no description is provided.
- **AI Bot Governance**: Easily block or allow AI crawlers to differentiate between indexing and LLM training.
- **Canonical Resolution**: Automatically generates `<link rel="canonical">` tags to prevent duplicate content issues.
- **Rich Social Previews**: Native support for Open Graph and Twitter Cards for professional link sharing.
- **Structured Data**: Supports LD+JSON Article Schema for rich search snippets.

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