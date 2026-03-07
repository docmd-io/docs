---
title: "Navigation Configuration"
description: "How to structure your sidebar, categorize links, and assign icons for both humans and AI models."
---

`docmd` provides explicit control over your site's structure. By defining your `navigation` in `docmd.config.js`, you create a logical hierarchy that optimizes the Single Page Application (SPA) experience and provides a clear context map for AI models.

## The Navigation Array

Each object in the array defines a **Link** or a **Category Group**.

```javascript
module.exports = {
  navigation: [
    { title: 'Home', path: '/', icon: 'home' },
    { title: 'Installation', path: '/getting-started/installation', icon: 'download' }
  ]
}
```

## Available Properties

| Property | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| **`title`** | `String` | Yes | The display text. Also used as metadata for search and AI. |
| **`path`** | `String` | No | Destination URL. Must start with `/` for local markdown. |
| **`icon`** | `String` | No | name of a [Lucide Icon](https://lucide.dev/icons) (e.g. `rocket`). |
| **`children`** | `Array` | No | Nested items to create a dropdown or group. |
| **`collapsible`**| `Boolean` | No | If `true`, the group can be expanded/collapsed. |
| **`external`** | `Boolean` | No | If `true`, the link opens in a new tab. |

---

## Organizing Groups

You can nest navigation items infinitely. There are two primary ways to organize groups:

### 1. Clickable Group (Folder with Index)
If the parent has a `path`, clicking the label navigates to that page and expands the children.

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

### 2. Static Label (Category Wrapper)
If you **omit the `path`**, the item becomes a static category header. This is the best way to group related technical sections.

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

## Icons Integration

`docmd` comes pre-bundled with the entire **Lucide** icon library. Simply use the icon name in kebab-case. Common examples: `home`, `rocket`, `settings`, `github`, `terminal`, `brain-circuit`.

::: callout tip
When defining navigation, use descriptive `title` keys even if the page content starts with a header. Clear navigation titles allow LLMs (using `llms-full.txt`) to understand the relationships between different parts of your project even without reading the full file.
:::