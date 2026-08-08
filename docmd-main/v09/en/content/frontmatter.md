---
title: "Frontmatter Reference"
description: "Configure page-level metadata, search indexing, layout overrides, and component controls in docmd."
---

Frontmatter enables page-level configuration overrides. Declare YAML metadata at the absolute top of your Markdown files between triple-dash delimiters (`---`).

## Core Metadata Properties

| Key | Type | Description |
| :--- | :--- | :--- |
| `title` | `String` | **Recommended.** Sets the HTML `<title>` tag and primary page header. |
| `description` | `String` | Sets the meta description for SEO and search engine previews. |
| `keywords` | `Array` | List of search keywords injected into `<meta name="keywords">`. |

::: callout tip "Metadata Best Practices" icon:sparkles
Providing an explicit `title` and `description` in frontmatter ensures search engines and AI context generators index your documentation accurately.
:::

## Indexing & Visibility Controls

| Key | Type | Description |
| :--- | :--- | :--- |
| `noindex` | `Boolean` | When `true`, excludes the page from search indexing and sitemap generation. |
| `llms` | `Boolean` | Set to `false` to exclude the document from compiled AI context files (`llms.txt`). |
| `hideTitle` | `Boolean` | When `true`, hides the main title from the page header area. |
| `bodyClass` | `String` | Appends custom CSS classes to the top-level `<body>` element. |

## Layout & Viewport Configuration

| Key | Type | Description |
| :--- | :--- | :--- |
| `layout` | `String` | Set to `"full"` to expand content width and disable the Table of Contents (TOC). |
| `toc` | `Boolean` | Set to `false` to disable the right-hand Table of Contents sidebar. |
| `noStyle` | `Boolean` | Disables standard UI chrome (Sidebar, Header, Footer) for bespoke HTML pages. |
| `titleAppend` | `Boolean` | Set to `false` to prevent appending the global site title to metadata tags. |

### Component Fine-Grained Controls (`noStyle`)

When `noStyle: true` is active, specify individual UI components to preserve:

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

## Plugin & SEO Overrides

| Key | Type | Description |
| :--- | :--- | :--- |
| `image` | `String` | URL for social sharing preview cards (`og:image`). |
| `aiBots` | `Boolean` | Set to `false` to prevent AI crawlers from scraping the page. |
| `canonicalUrl` | `String` | Custom canonical URL for SEO indexing. |