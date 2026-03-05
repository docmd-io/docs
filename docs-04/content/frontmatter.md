---
title: "Frontmatter Reference"
description: "The complete guide to page-level metadata and configuration in docmd."
---

Frontmatter allows you to override global settings on a per-page basis. It must be written in YAML format at the very top of your Markdown file.

## Core Metadata
| Key | Type | Description |
| :--- | :--- | :--- |
| `title` | `String` | **Required.** Sets the HTML `<title>` and the primary page header. |
| `description` | `String` | Sets the meta description for SEO and search results. |
| `keywords` | `Array` | A list of keywords for the `<meta name="keywords">` tag. |

## Visibility & SEO
| Key | Type | Description |
| :--- | :--- | :--- |
| `noindex` | `Boolean` | Excludes the page from the search index and search engines. |
| `llms` | `Boolean` | Set to `false` to exclude this page from the `llms.txt` file. |
| `sitemap` | `Object` | Custom sitemap settings: `priority` (0.0-1.0) and `changefreq` (e.g., `daily`). |

## Page Layout
| Key | Type | Description |
| :--- | :--- | :--- |
| `layout` | `String` | Set to `full` to hide the Table of Contents and use the full width. |
| `hideTitle` | `Boolean` | If `true`, the title is hidden from the sticky top header. |
| `toc` | `Boolean` | Set to `false` to disable the Table of Contents entirely. |
| `bodyClass` | `String` | Adds a custom CSS class to the `<body>` tag of this page. |

## Injection Slots
Use these keys to add custom HTML/JS to specific pages without changing your global config.

*   **`customHead`**: Injects HTML into the `<head>`.
*   **`customScripts`**: Injects HTML at the very end of the `<body>`.

## No-Style Mode (`noStyle: true`)
When `noStyle` is enabled, the docmd layout is removed. You must explicitly opt-in to components:

```yaml
---
noStyle: true
components:
  meta: true      # Injects SEO tags
  favicon: true   # Injects favicon
  css: true       # Injects docmd-main.css
  theme: true     # Injects theme CSS
  highlight: true # Injects syntax highlighting
  scripts: true   # Injects docmd-main.js
  layout: true    # Injects the content-area wrapper
  sidebar: true   # Injects the navigation sidebar
  footer: true    # Injects the footer
  branding: true  # Injects the "Built with docmd" badge
---
```

## Plugin Overrides
### SEO Plugin (`seo`)
*   `description`: Page-specific social description.
*   `image`: Social share image URL.
*   `ogType`: Open Graph type (default: `website`).
*   `twitterCard`: Twitter card type.
*   `canonicalUrl`: Sets a custom canonical link.