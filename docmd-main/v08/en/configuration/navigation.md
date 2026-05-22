---
title: "Navigation Configuration"
description: "Structure your sidebar, categorise links, and configure icons for readers and search engines."
---

The compiler provides explicit control over your site navigation. A clear navigation hierarchy creates a logical reading sequence. This optimises the SPA experience and provides a clear context map for search indexing and AI models.

## 1. The Navigation Schema

An array of link objects in your `docmd.config.json` file controls the sidebar. Each object is a direct link or a nested category group.

<!-- SCREENSHOT: The sidebar navigation menu showing a two-level hierarchy with Lucide icons, an active page highlighted, and a collapsible section. -->

```json
{
  "navigation": [
    { "title": "Overview", "path": "/", "icon": "home" },
    { "title": "Quick Start", "path": "/getting-started/quick-start", "icon": "rocket" }
  ]
}
```

## 2. Supported Properties

Every item supports these settings:

| Property | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `title` | `String` | Yes | The text displayed in the sidebar menu. |
| `path` | `String` | No | Target URL. Relative local paths must begin with a forward slash (`/`). |
| `icon` | `String` | No | Name of any [Lucide Icon](external:https://lucide.dev/icons) in kebab-case format (e.g., `git-branch`). |
| `children` | `Array` | No | An array of nested navigation items to establish a submenu. |
| `collapsible`| `Boolean`| No | When `true`, the user can expand or collapse the category folder. |
| `external` | `Boolean`| No | When `true`, opens the link in a new browser tab. |

## 3. Organising Section Groups

Structure your sidebar using two primary grouping methods:

### Clicking Group (Direct Page + Child Folders)
Specify a `path` along with `children` for a category header. Clicking the title loads the landing page and expands the child links.

```json
{
  "title": "Cloud Services",
  "path": "/cloud/overview", 
  "children": [
    { "title": "AWS Setup", "path": "/cloud/aws" },
    { "title": "GCP Setup", "path": "/cloud/gcp" }
  ]
}
```

### Static Label (Category Headers Only)
Omit the `path` parameter. The header serves as a non-clickable title grouping related links. Use this to divide major technical categories without a single landing page.

```json
{
  "title": "Formatting & Elements",
  "icon": "layout-grid",
  "children": [
    { "title": "Syntax Guide", "path": "/content/syntax" },
    { "title": "Rich Containers", "path": "/content/containers" }
  ]
}
```

## 4. Automated Breadcrumbs

The engine automatically generates contextual breadcrumbs for every page. These display directly above the main page header to assist with rapid orientation.

<!-- SCREENSHOT: The breadcrumb navigation bar showing 'Overview > Configuration > Navigation' in a clean, small grey font above the H1 page header. -->

### Key Behaviours
*   **Automatic Resolution**: The engine traces the active route through your navigation tree to construct the hierarchy.
*   **Active Indicator**: The current page is the final, unlinked breadcrumb item.
*   **Mobile Optimisation**: Breadcrumbs simplify or hide dynamically on small viewports to save screen space.

### Disabling Breadcrumbs
Breadcrumbs are enabled by default. Update your site layout options to disable them globally:

```json
{
  "layout": {
    "breadcrumbs": false
  }
}
```

## 5. Navigation Resolution Cascading

The compiler uses a "closest file wins" cascading resolution system. This supports multiple versions or languages without bloating your global configuration.

```text
my-project/
├── docmd.config.json           [Level 3: Global Config] - Default Fallback
├── docs-v1.0/ 
│   ├── navigation.json       [Level 2: Version Navigation] - Overrides Global
│   └── zh/
│       └── navigation.json   [Level 1: Language Navigation] - Absolute Priority
```

1.  **Level 1: Language-Specific** (`navigation.json` inside a locale folder): Overrides all settings for this specific language and version.
2.  **Level 2: Version-Specific** (`navigation.json` inside a version folder): Overrides global configuration for this version across all languages.
3.  **Level 3: Global Configuration** (`config.navigation`): The base fallback definition in the central configuration file.

### Smart Broken-Link Prevention
The engine automatically checks if targeted files exist during Level 2 or 3 navigation fallback. Missing files are filtered out of the sidebar dynamically. This eliminates broken links for older versions or missing translations.

## 6. Icon Integration

The compiler includes the complete **Lucide Icon** system. Use the official Lucide name in kebab-case format (e.g., `settings`, `folder-open`, `book-marked-line`) to apply an icon.

::: callout tip "Optimising Sidebar Labels" icon:sparkles
Keep sidebar titles clear and descriptive. A concise navigation structure allows AI agents to parse your site map easily from the compiled `llms.txt` feed.
:::