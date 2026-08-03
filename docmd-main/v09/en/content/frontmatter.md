---
title: "Frontmatter Reference"
description: "The complete guide to page-level metadata and configuration."
---

Frontmatter overrides global settings for specific pages. Write it in YAML format at the top of your Markdown files.

## Core Metadata

| Key | Type | Description |
| :--- | :--- | :--- |
| `title` | `String` | **Required.** Sets the HTML `<title>` and the primary section header. |
| `description` | `String` | Sets the meta description for SEO and search results. |
| `keywords` | `Array` | A list of keywords for the `<meta name="keywords">` tag. |

::: callout warning "Title is Important" icon:triangle-alert
The `title` field is strongly recommended. Without it, the engine falls back to the first `# H1` heading or the filename. This can produce less ideal search results.
:::

## Visibility & Indexing

| Key | Type | Description |
| :--- | :--- | :--- |
| `noindex` | `Boolean` | Excludes the page from the internal search index. |
| `llms` | `Boolean` | Set to `false` to exclude this page from AI context files (`llms.txt`). |
| `hideTitle` | `Boolean` | Hides the title from the sticky header. Useful for custom H1s. |
| `bodyClass` | `String` | Adds a custom CSS class to the `<body>` tag. |

## Layout Control

| Key | Type | Description |
| :--- | :--- | :--- |
| `layout` | `String` | Set to `full` to use maximum width and hide the TOC sidebar. |
| `toc` | `Boolean` | Set to `false` to disable the Table of Contents entirely. |
| `noStyle` | `Boolean` | Disables the entire UI (Sidebar, Header, Footer) for custom pages. |
| `titleAppend` | `Boolean` | Set to `false` to prevent appending the site title to metadata tags. Default is `true`. |

### `noStyle` Component Control

When `noStyle: true` is active, you must opt-in to the components you wish to retain.

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
*   `aiBots`: Set to `false` to block AI crawlers from this page.
*   `canonicalUrl`: Sets a custom canonical link for SEO.