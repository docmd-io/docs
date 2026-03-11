---
title: "Menubar"
description: "How to structure and position your menubar, add links, drop-down menus and icons."
---

The `menubar` is a top-level navigation component that can be placed either at the very top of the page (fixed) or within the main content area (above the page header).

## Configuration

The menubar is configured within the `layout` section of your `docmd.config.js`.

```javascript
export default {
  layout: {
    menubar: {
      enabled: true,
      position: 'top', // 'top' or 'header'
      left: [
        { type: 'title', text: 'Brand', url: '/', icon: 'home' },
        { text: 'Docs', url: '/docs' },
        { 
          type: 'dropdown', 
          text: 'Resources', 
          items: [
            { text: 'GitHub', url: 'https://github.com/docmd-io/docmd', external: true },
            { text: 'Changelog', url: '/changelog' }
          ]
        }
      ],
      right: [
        { text: 'Twitter', url: 'https://twitter.com/docmd', icon: 'twitter' }
      ]
    }
  }
};
```

### Options

| Option | Type | Default | Description |
| --- | --- | --- | --- |
| `enabled` | `boolean` | `false` | Whether to show the menubar. |
| `position` | `string` | `'top'` | Positioning: `'top'` (fixed at absolute top) or `'header'` (above page title in main area). |
| `left` | `array` | `[]` | Navigation items for the left section. |
| `right` | `array` | `[]` | Navigation items for the right section. |

## Item Types

Each item in `left` or `right` can have the following properties:

### Standard Link
- `text`: The display text.
- `url`: The destination URL.
- `icon`: (Optional) Lucide icon name.
- `external`: (Optional) Whether to open in a new tab.

### Title
Set `type: 'title'` to style the item as a brand/logo link.

### Dropdown
Set `type: 'dropdown'` and provide an `items` array of links.

## Options Menu Integration

You can integrate the search bar and theme toggle into the menubar by setting `optionsMenu.position` to `'menubar'`.

```javascript
export default {
  layout: {
    optionsMenu: {
      position: 'menubar'
    }
  }
};
```

When positioned in the menubar, the options menu will appear on the **right region** of the menubar.

::: callout info
If the `menubar` is disabled or not configured, the options menu automatically falls back to `sidebar-top`.
:::

## Customization

You can customize the menubar's appearance using CSS variables in your `customCss`:

```css
:root {
  --menubar-height: 52px;
  --menubar-bg: #1a1b1e;
  --menubar-border: #2c2e33;
  --menubar-text: #c1c2c5;
}
```