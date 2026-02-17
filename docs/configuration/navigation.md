---
title: "Navigation Config"
description: "How to configure the sidebar navigation tree in docmd.config.js."
---

# Sidebar Navigation

The sidebar is the primary way users explore your documentation. It is defined in your `docmd.config.js` file under the `navigation` key.

## Basic Structure

The `navigation` array contains objects representing links or categories.

```javascript
// docmd.config.js
module.exports = {
  navigation: [
    { title: 'Home', path: '/', icon: 'home' },
    { title: 'Getting Started', path: '/getting-started', icon: 'rocket' },
  ]
}
```

## Properties

| Property | Type | Description |
| :--- | :--- | :--- |
| `title` | String | **Required.** Text displayed in the sidebar. |
| `path` | String | Path to the page (relative to `srcDir`). Start with `/`. |
| `icon` | String | Name of a Lucide icon (e.g., `'home'`, `'settings'`). |
| `external` | Boolean | If `true`, opens in a new tab. |
| `children` | Array | Nested items for a dropdown/accordion. |
| `collapsible`| Boolean | If `true` (on a parent), makes the group toggleable. |

## Nested Groups (Dropdowns)

To create a group, use the `children` property. Groups can be nested infinitely.

```javascript
{
  title: 'Advanced',
  icon: 'cpu',
  collapsible: true, // User can close this group
  children: [
    { title: 'API', path: '/api' },
    { title: 'CLI', path: '/cli' }
  ]
}
```

## External Links in Sidebar

You can link to external tools directly from your docs.

```javascript
{ 
  title: 'GitHub', 
  path: 'https://github.com/my/repo', 
  icon: 'github',
  external: true 
}
```