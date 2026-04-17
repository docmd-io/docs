---
title: "Navigation Configuration"
description: "Structure your sidebar, categorise links, and assign icons for human readers and LLMs."
---

`docmd` provides explicit control over your site's structure. By defining your `navigation` in `docmd.config.js`, you create a logical hierarchy that optimises the Single Page Application (SPA) experience and provides a clear context map for AI models and search engines.

## The Navigation Array


<!-- SCREENSHOT: Sidebar navigation showing a two-level hierarchy with icons, an active page highlighted, and a collapsible group. -->

Each object in the array defines a **Link** or a **Category Group**.

```javascript
export default defineConfig({
  navigation: [
    { title: 'Home', path: '/', icon: 'home' },
    { title: 'Installation', path: '/getting-started/installation', icon: 'download' }
  ]
});
```

## Available Properties

| Property | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| **`title`** | `String` | Yes | The display text for the link or category. |
| **`path`** | `String` | No | Destination URL. Must start with `/` for local paths. |
| **`icon`** | `String` | No | Name of a [Lucide Icon](https://lucide.dev/icons) (e.g., `rocket`). |
| **`children`** | `Array` | No | Nested items used to create a submenu or group. |
| **`collapsible`**| `Boolean` | No | If `true`, the group can be expanded/collapsed by the user. |
| **`external`** | `Boolean` | No | If `true`, the link opens in a new browser tab. |

## Organizing Groups

You can nest navigation items to create deep hierarchies. There are two primary ways to organise groups:

### 1. Clickable Group (Directory with Index)
If the parent has a `path`, clicking the label navigates to that page and automatically expands the children in the sidebar.

```javascript
{
  title: 'Cloud Setup',
  path: '/cloud/overview', 
  children: [
    { title: 'AWS', path: '/cloud/aws' },
    { title: 'GCP', path: '/cloud/gcp' }
  ]
}
```

### 2. Static Label (Category Header)
If you **omit the `path`**, the item becomes a static category header. This is the recommended approach for grouping related technical sections that don't share a common landing page.

```javascript
{
  title: 'Content & Formatting',
  icon: 'layout',
  children: [
    { title: 'Syntax Guide', path: '/content/syntax' },
    { title: 'Containers', path: '/content/containers' }
  ]
}
```

## Automated Breadcrumbs


<!-- SCREENSHOT: Breadcrumb bar above the page title showing "Home > Getting Started > Installation" with clickable links. -->

`docmd` automatically generates breadcrumbs for every page based on your navigation hierarchy. These crumbs are rendered above the main page title to improve orientation and navigation speed.

### Behavior
*   **Auto-Resolution**: The engine traces the path through your `navigation` tree to identify the current page's ancestors.
*   **Active State**: The current page is listed as the final, non-linked crumb.
*   **Mobile Support**: Breadcrumbs are intelligently adjusted or hidden on smaller screens to preserve header space.

### Disabling Breadcrumbs
Breadcrumbs are enabled by default. To disable them site-wide, update your `docmd.config.js`:

```javascript
layout: {
  breadcrumbs: false
}
```

## External Versioned Navigation

When maintaining multiple versions of your documentation (e.g., `v1`, `v2`), managing a massive central configuration can become cumbersome.

`docmd` supports **Navigation V2**, allowing you to place a `navigation.json` file at the root of your versioned directory (e.g., `docs-v1/navigation.json`).

The JSON file must follow the standard array structure:

```json
[
  { "title": "Home", "path": "/" },
  { "title": "Release Notes", "path": "/release-notes" }
]
```

**Resolution Priority:**
When rendering a versioned page, the sidebar is resolved in this order:
1.  **`navigation.json`**: Checked first within the specific version source folder.
2.  **`versions.navigation`**: Checked within the version definition in `docmd.config.js`.
3.  **Default Navigation**: Falls back to the main site navigation.

## Icons Integration

`docmd` comes pre-bundled with the entire **Lucide** icon library. Simply use the icon name in kebab-case (e.g., `brain-circuit`, `terminal`, `settings`).

::: callout tip
Use descriptive `title` keys even if the page content starts with a header. Clear, consistent navigation titles allow AI agents (using `llms-full.txt`) to build an accurate mental map of your project structure effortlessly.
:::