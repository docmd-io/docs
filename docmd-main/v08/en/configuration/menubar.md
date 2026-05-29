---
title: "Menubar"
description: "Structure and position your menubar, manage navigation links, and configure drop-down menus."
---

The `menubar` is a premium navigation layer. It provides global context across your site. Position it as a fixed bar at the viewport top or relatively above the page header.

## Configuration

Configure the menubar in the `layout` section of your `docmd.config.json`.

```json
{
  "layout": {
    "menubar": {
      "enabled": true,
      "position": "top", 
      "left": [
        { "type": "title", "text": "Brand", "url": "/", "icon": "home" },
        { "text": "Documentation", "url": "/docs" },
        { 
          "type": "dropdown", 
          "text": "Ecosystem", 
          "items": [
            { "text": "GitHub", "url": "https://github.com/docmd-io/docmd" },
            { "text": "Live Editor", "url": "https://live.docmd.io" }
          ]
        }
      ],
      "right": [
        { "text": "Support", "url": "/support", "icon": "help-circle" }
      ]
    }
  }
}
```

### Options

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `enabled` | `Boolean` | `false` | Toggles menubar visibility. |
| `position` | `String` | `'top'` | `'top'` (fixed at absolute top) or `'header'` (positioned above the page title). |
| `left` | `Array` | `[]` | Left-aligned navigation items. |
| `right` | `Array` | `[]` | Right-aligned navigation items. |

## Item Types

The `left` and `right` arrays support various item types.

### 1. Standard Link
The most common item type.
- `text`: Display label.
- `url`: Path or external URL.
- `icon`: Optional Lucide icon name.
- `external`: Set to `true` to open in a new tab.

### 2. Title (Brand)
Set `type: 'title'` to apply branding styles (e.g. bold fonts).

### 3. Dropdown Menu
Set `type: 'dropdown'` and provide an `items` array to create a nested menu.

## Utility Integration

Host the global search and theme toggle in the menubar. Set `optionsMenu.position` to `'menubar'`.

```json
{
  "layout": {
    "optionsMenu": {
      "position": "menubar"
    }
  }
}
```

The options menu automatically aligns to the **right region**. It appears after any links defined in the `right` array.

::: callout info "Automatic Fallback"
If the `menubar` is disabled, assigned utilities automatically fall back to the `sidebar-top` position.
:::

## Custom Styling

Use CSS variables in your custom stylesheets to override the menubar appearance. See [Custom CSS & JS](../theming/custom-css-js.md) for details.

```css
:root {
  --menubar-height: 56px;
  --menubar-bg: var(--docmd-bg-secondary);
  --menubar-border: var(--docmd-border-colour);
  --menubar-text: var(--docmd-text-primary);
}
```