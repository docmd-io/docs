---
title: "Navigation"
description: "Configure your sidebar links, nested groups, icons, and category labels."
---

# Navigation Configuration

The sidebar navigation is controlled by the `navigation` array in your `docmd.config.js`. It allows you to define links, nest items into groups, and add visual icons.

## Basic Structure

Each item in the array is an object representing a link or a group.

```javascript
module.exports = {
  navigation: [
    { title: 'Home', path: '/', icon: 'home' },
    { title: 'Installation', path: '/guide/install', icon: 'download' }
  ]
}
```

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| **`title`** | `String` | **Required.** Text displayed in the sidebar. |
| **`path`** | `String` | Path to the page relative to your `srcDir`. Starts with `/`. |
| **`icon`** | `String` | Name of a [Lucide](https://lucide.dev/icons) icon (e.g., `rocket`, `settings`). |
| **`children`** | `Array` | An array of nested navigation items. |
| **`collapsible`**| `Boolean` | If `true` (on a parent), allows the user to expand/collapse the group. |
| **`external`** | `Boolean` | If `true`, opens the link in a new tab. |

## Grouping & Nesting

You can nest items infinitely. Groups can be either **Clickable Pages** or **Static Labels**.

### 1. Clickable Parent (Folder Page)
If you provide a `path` to a parent item, clicking it will take the user to that page *and* expand the menu.

```javascript
{
  title: 'Guides',
  path: '/guides/index', // Clicking "Guides" goes here
  children: [
    { title: 'Setup', path: '/guides/setup' }
  ]
}
```

### 2. Static Label (Category Header)
If you **omit the `path`** (or set it to `'#'`), the item becomes a non-clickable category label. This is useful for grouping related links visually.

```javascript
{
  title: 'Advanced Settings',
  icon: 'settings',
  // No path defined = Label only
  children: [
    { title: 'Theme Config', path: '/config/theme' },
    { title: 'Plugins', path: '/config/plugins' }
  ]
}
```

## Icons

`docmd` includes the full **Lucide** icon set. You can use any icon name (kebab-case) in the `icon` property.

*   `home` → 🏠
*   `book-open` → 📖
*   `rocket` → 🚀
*   `puzzle` → 🧩

## External Links

You can link to external websites directly from your sidebar.

```javascript
{ 
  title: 'GitHub Repo', 
  path: 'https://github.com/my-project', 
  icon: 'github',
  external: true 
}
```