---
title: "Navigation Configuration"
description: "Structure sidebar navigation, organise categories, and configure icons for readers and search engines in docmd."
---

`docmd` provides explicit control over your site's navigation hierarchy. A structured sidebar creates a logical reading sequence, optimising both the Single Page Application (SPA) user experience and search engine indexability.

## The Navigation Schema

The `navigation` array in `docmd.config.json` controls the sidebar. Each object represents a direct page link or a nested category group:

<img width="260" class="with-border" src="/assets/previews/navigation-hierarchy.webp">

```json "docmd.config.json"
{
  "navigation": [
    { "title": "Overview", "path": "/", "icon": "home" },
    { "title": "Quick Start", "path": "/getting-started/quick-start", "icon": "rocket" }
  ]
}
```

## Supported Link Properties

Every item in the navigation array supports the following properties:

| Property | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | `String` | Yes | Menu label displayed in the sidebar. |
| `path` | `String` | No | Target URL route. Relative local paths must start with a leading slash (`/`). |
| `icon` | `String` | No | Name of any [Lucide Icon](external:https://lucide.dev/icons) in kebab-case format (e.g. `git-branch`). |
| `children` | `Array` | No | Array of nested navigation items defining a submenu. |
| `collapsible`| `Boolean`| No | When `true`, enables expanding or collapsing category groups. |
| `external` | `Boolean`| No | When `true`, opens the destination link in a new browser tab. |

## Organising Navigation Groups

Structure your sidebar using two primary grouping patterns:

### Interactive Category Headers (Landing Page + Children)

Specify a `path` alongside `children` for a category section. Clicking the header navigates to the landing page and toggles child items:

```json "docmd.config.json"
{
  "title": "Cloud Services",
  "path": "/cloud/overview", 
  "children": [
    { "title": "AWS Setup", "path": "/cloud/aws" },
    { "title": "GCP Setup", "path": "/cloud/gcp" }
  ]
}
```

### Static Category Labels (Group Headers Only)

Omit the `path` property. The category header acts as a non-clickable title grouping related links:

```json "docmd.config.json"
{
  "title": "Formatting & Elements",
  "icon": "layout-grid",
  "children": [
    { "title": "Syntax Guide", "path": "/content/syntax" },
    { "title": "Rich Containers", "path": "/content/containers" }
  ]
}
```

## Contextual Breadcrumbs

The engine resolves contextual breadcrumbs for every page dynamically, rendering them above the main page header:

<img width="500" class="with-border" src="/assets/previews/navigation-breadcrumb.webp">

- **Automatic Path Tracing**: The engine traces the active route through the navigation tree to build breadcrumb segments.
- **Active Page Indicator**: The current document is displayed as the unlinked final item.
- **Responsive Layout**: Breadcrumbs adapt dynamically to small mobile viewports.

To disable breadcrumbs globally, update `layout.breadcrumbs`:

```json "docmd.config.json"
{
  "layout": {
    "breadcrumbs": false
  }
}
```

## Cascading Navigation Resolution

`docmd` uses a "closest file wins" cascading resolution system. This allows versioned or localised subfolders to define dedicated sidebars without duplicating global options:

```text
my-project/
├── docmd.config.json         [Level 3: Global Config] - Default Fallback
├── docs-v1.0/ 
│   ├── navigation.json       [Level 2: Version Navigation] - Overrides Global
│   └── zh/
│       └── navigation.json   [Level 1: Language Navigation] - Top Priority
```

1. **Level 1 (Language Specific)**: `navigation.json` inside a locale folder overrides navigation for that language and version.
2. **Level 2 (Version Specific)**: `navigation.json` inside a version folder overrides global navigation for that specific release.
3. **Level 3 (Global Base)**: `navigation` array in `docmd.config.json` serves as the base fallback.

### Broken-Link Failsafe

During Level 2 or 3 fallback resolution, the engine checks whether targeted files exist on disk. Non-existent paths are filtered out of the rendered sidebar automatically.

## Icon System Integration

`docmd` embeds the complete **Lucide Icon** set natively. Pass any official Lucide icon name in kebab-case format (e.g. `settings`, `folder-open`, `book-marked`) to apply an icon.

::: callout tip "Optimising Sidebar Labels for AI Engines" icon:sparkles
Keep sidebar titles clear and concise. A structured navigation tree helps AI agents parse your documentation structure efficiently via the compiled `llms.txt` endpoint.
:::