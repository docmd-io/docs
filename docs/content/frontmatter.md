---
title: "Frontmatter"
description: "How to use YAML frontmatter to define page metadata, SEO settings, and layout options."
---

# Frontmatter

Every Markdown (`.md`) file in `docmd` uses YAML frontmatter to define metadata. This block must be at the very top of the file, enclosed by triple dashes (`---`).

## Basic Structure

```yaml
---
title: "Page Title"
description: "A short summary for SEO and search results."
---
```

## Supported Fields

These are the fields that `docmd` active uses to change the behavior of your site.

### Core Metadata

| Field | Type | Description |
| :--- | :--- | :--- |
| **`title`** | String | **Required.** Sets the HTML `<title>` and the main `<h1>` header of the page. |
| **`description`**| String | Sets the `<meta name="description">` tag. Crucial for SEO. |

### Build Behavior

| Field | Type | Description |
| :--- | :--- | :--- |
| **`noindex`** | Boolean | If `true`, excludes the page from the **Search Index** and adds a `noindex` meta tag to prevent Google/Bing indexing. Useful for drafts or private pages. |
| **`noStyle`** | Boolean | If `true`, disables the default theme/layout. Used for creating [Landing Pages](/content/no-style-pages). |

### Plugin Specifics

Plugins look for specific keys in the frontmatter to override global settings.

**SEO Plugin:**
```yaml
seo:
  image: "/assets/og-image.png"
  keywords: ["documentation", "generator"]
```

**Sitemap Plugin:**
```yaml
sitemap:
  priority: 1.0
  changefreq: "daily"
```

**LLM Plugin:**
```yaml
llms: false  # Exclude this page from llms.txt
```

## Example

```yaml
---
title: "Installation Guide"
description: "How to install docmd on Windows, Mac, and Linux."
noindex: false
seo:
  keywords: ["install", "setup", "guide"]
---

# Installation

Content starts here...
```

::: callout warning Note on Sorting
`docmd` does not currently use `order` or `date` fields to sort pages. Navigation order is determined strictly by your `docmd.config.js` navigation array.
:::