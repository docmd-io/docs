---
title: "菜单栏"
description: "Structure and position your menubar, manage navigation links, and configure drop-down menus."
---

The `menubar` is a premium navigation layer that provides global context across your documentation site. It can be positioned as a fixed bar at the top of the viewport or as a relative component above the page header.

## Configuration

The menubar is configured within the `layout` section of your `docmd.config.js`.

```javascript
export default defineConfig({
  layout: {
    menubar: {
      enabled: true,
      position: 'top', // 'top' (fixed) or 'header' (inline)
      left: [
        { type: 'title', text: 'Brand', url: '/', icon: 'home' },
        { text: 'Documentation', url: '/docs' },
        { 
          type: 'dropdown', 
          text: 'Ecosystem', 
          items: [
            { text: 'GitHub', url: 'https://github.com/docmd-io/docmd', external: true },
            { text: 'Live Editor', url: 'https://live.docmd.io' }
          ]
        }
      ],
      right: [
        { text: 'Support', url: '/support', icon: 'help-circle' }
      ]
    }
  }
});
```

### Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `enabled` | `Boolean` | `false` | Toggles the visibility of the menubar. |
| `position` | `String` | `'top'` | `'top'` (fixed at absolute top) or `'header'` (positioned above the page title). |
| `left` | `Array` | `[]` | Navigation items aligned to the left section. |
| `right` | `Array` | `[]` | Navigation items aligned to the right section. |

## Item Types

The `left` and `right` arrays support various item types to structure your navigation effectively:

### 1. Standard Link
The most common item type.
- `text`: Display label.
- `url`: Path or external URL.
- `icon`: Optional Lucide icon name.
- `external`: Set to `true` to open in a new tab.

### 2. Title (Brand)
Set `type: 'title'` to apply branding styles (usually bold or with a specific font weight) to the link.

### 3. Dropdown Menu
Set `type: 'dropdown'` and provide an `items` array to create a nested menu.

## Utility Integration

You can host the global search and theme toggle within the menubar by setting the `optionsMenu.position` to `'menubar'`.

```javascript
layout: {
  optionsMenu: {
    position: 'menubar'
  }
}
```

When integrated, the options menu will automatically align to the **right region** of the menubar, appearing after any links defined in the `right` array.

::: callout info
If the `menubar` is disabled, any utility components assigned to it will automatically fall back to the `sidebar-top` position.
:::

## Custom Styling

You can fine-tune the menubar's appearance using CSS variables in your `customCss` files:

```css
:root {
  --menubar-height: 56px;
  --menubar-bg: var(--docmd-bg-secondary);
  --menubar-border: var(--docmd-border-color);
  --menubar-text: var(--docmd-text-primary);
}
```