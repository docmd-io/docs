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

## Visibility & Control (v0.5.1+)

| Key | Type | Description |
| :--- | :--- | :--- |
| `noindex` | `Boolean` | Excludes the page from the search results. |
| `llms` | `Boolean` | Set to `false` to exclude this page from the `llms.txt` / `llms-full.txt` files. |
| `hideTitle` | `Boolean` | If `true`, the title is hidden from the sticky header (use this if you have a custom H1). |
| `bodyClass` | `String` | Adds a custom CSS class to the `<body>` tag of this page. |

## Page Layout & Components

| Key | Type | Description |
| :--- | :--- | :--- |
| `layout` | `String` | Set to `full` to hide the Table of Contents and use the primary width. |
| `toc` | `Boolean` | Set to `false` to disable the Table of Contents entirely. |
| `noStyle`| `Boolean` | Removes the entire docmd UI (Sidebar, Header, Footer) for custom landing pages. |

### `noStyle` Component Control
When `noStyle: true` is enabled, you must explicitly opt-in to components you want to keep:

```yaml
---
noStyle: true
components:
  meta: true      # Injects SEO tags
  favicon: true   # Injects favicon
  css: true       # Injects docmd-main.css
  theme: true     # Injects theme colors/overrides
  highlight: true # Injects syntax highlighting
  scripts: true   # Injects docmd-main.js (for SPA/Search)
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
*   `aiBots`: Set to `false` to block AI crawlers from this specific page.
*   `canonicalUrl`: Sets a custom canonical link.