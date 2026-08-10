---
title: "Menubar Configuration"
description: "Configure the top navigation menubar, dropdown links, brand logos, and utility menus in docmd."
---

The `menubar` is a primary top navigation bar that provides global context across your documentation sub-sites. Position it as a fixed bar at the absolute viewport top or inline above the page header.

## Configuration Schema

Configure menubar items in the `layout.menubar` block of `docmd.config.json`:

```json "docmd.config.json"
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

### Configuration Options

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `enabled` | `Boolean` | `false` | Master toggle for menubar visibility. |
| `position` | `String` | `'top'` | `'top'` (fixed at absolute top of viewport) or `'header'` (inline above the page title). |
| `left` | `Array` | `[]` | Navigation items aligned to the left of the menubar. |
| `right` | `Array` | `[]` | Navigation items aligned to the right of the menubar. |

## Supported Item Types

The `left` and `right` arrays support three primary element types:

### 1. Standard Link
Renders a text link with optional icon and new-tab behaviour:
- `text`: Link label text.
- `url`: Relative path or external URL.
- `icon`: Optional Lucide icon name.
- `external`: When `true`, opens in a new browser tab.

### 2. Brand Title
Set `"type": "title"` to render styled brand headers (e.g. bold weights with home icon triggers).

### 3. Nested Dropdown Menu
Set `"type": "dropdown"` and supply an `items` array to render interactive flyout dropdown submenus.

## Utility Menu Integration

To position global utilities (such as full-text search, dark/light theme switch, and sponsorship links) in the menubar, set `optionsMenu.position` to `'menubar'`:

```json "docmd.config.json"
{
  "layout": {
    "optionsMenu": {
      "position": "menubar"
    }
  }
}
```

Utilities align to the **right region** automatically, rendering after any custom links defined in `right`.

::: callout info title:"Relocation Fallback" icon:sparkles
If the `menubar` is disabled while `optionsMenu.position` is set to `'menubar'`, utilities fall back automatically to the `sidebar-top` position.
::: /callout

## Custom Styling

Customise menubar styling by overriding CSS custom properties in your custom stylesheets. See [Custom CSS & JS](../theming/custom-css-js.md):

```css
:root {
  --menubar-h: 56px;
  --menubar-bg: var(--bg-color);
  --menubar-border: var(--border-color);
  --menubar-text: var(--text-color);
}
```