---
title: "Frontmatter Reference"
description: "The complete guide to page-level metadata and configuration in docmd."
---

Frontmatter allows you to override global settings on a per-page basis. It must be written in YAML format at the very top of your Markdown file.

## Core Metadata

| Key | Type | Description |
| :--- | :--- | :--- |
| `title` | `String` | **Required.** Sets the HTML `<title>` and the primary section header. |
| `description` | `String` | Sets the meta description for SEO and search results. |
| `keywords` | `Array` | A list of keywords for the `<meta name="keywords">` tag. |


::: callout warning "Title is important"
While not strictly required, the `title` field is strongly recommended. Without it, docmd falls back to the first `# H1` heading or the filename — which can produce less ideal `<title>` tags and search results.
:::


## Visibility & Indexing

| Key | Type | Description |
| :--- | :--- | :--- |
| `noindex` | `Boolean` | Excludes the page from the internal search index. |
| `llms` | `Boolean` | Set to `false` to exclude this page from the AI context files (`llms.txt`). |
| `hideTitle` | `Boolean` | Hides the title from the sticky header (useful if using a custom H1). |
| `bodyClass` | `String` | Adds a custom CSS class to the `<body>` tag of this page. |

## Layout Control

| Key | Type | Description |
| :--- | :--- | :--- |
| `layout` | `String` | Set to `full` to use the primary content width and hide the TOC sidebar. |
| `toc` | `Boolean` | Set to `false` to disable the Table of Contents entirely. |
| `noStyle` | `Boolean` | Disables the entire `docmd` UI (Sidebar, Header, Footer) for custom pages. |

### `noStyle` Component Control

When `noStyle: true` is active, you must explicitly opt-in to the components you wish to retain:

```yaml
---
noStyle: true
components:
  meta: true      # Injects SEO metadata
  favicon: true   # Injects site favicon
  css: true       # Injects docmd-main.css
  theme: true     # Injects theme-specific styling
  highlight: true # Injects syntax highlighting
  scripts: true   # Injects the SPA router logic
  sidebar: true   # Injects the navigation sidebar
  footer: true    # Injects the site footer
---
```

## Plugin Overrides

### SEO (`seo`)
*   `image`: Custom social share image URL for the page.
*   `aiBots`: Set to `false` to block specifically AI crawlers from this page.
*   `canonicalUrl`: Sets a custom canonical link for SEO.