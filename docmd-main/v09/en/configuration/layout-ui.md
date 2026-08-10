---
title: "Layout & UI Zones"
description: "Configure documentation layout regions, header widgets, sidebar trees, and footer parameters in docmd.config.json."
---

A standard `docmd` page consists of six core functional UI zones:

1. **Menubar**: Full-width top navigation bar for global cross-project links.
2. **Header**: Persistent secondary header displaying page title, breadcrumbs, and options menu.
3. **Sidebar**: Primary navigation tree for site content structure.
4. **Content Area**: Central Markdown rendering container with automated breadcrumbs.
5. **Table of Contents (TOC)**: Right-hand heading navigation for active articles.
6. **Footer**: Bottom region displaying copyright notices, branding attribution, and footer link columns.

## Component Layout Options

Configure interface zones in the `layout` section of your `docmd.config.json` manifest.

### The Menubar Zone

The menubar provides global site navigation, supporting logos, links, and nested dropdown menus:

- **Placement**: Fixed at the absolute viewport `top` or positioned within the `header`.
- **Documentation**: See [Menubar Configuration](./menubar.md) for full properties and customisation options.

### The Page Header Zone

The header displays active page titles, breadcrumbs, and options menus:

- **Global Toggle**: Enable or disable the header globally via `layout.header.enabled`. Toggle breadcrumbs via `layout.breadcrumbs`.
- **Per-Page Override**: Add `hideTitle: true` to a document's [Frontmatter](../content/frontmatter.md) to hide its header title locally.

### Context Copy Widgets

The header region includes contextual copy utilities: one-click copying of raw Markdown source and structured AI context prompts (containing page URL, title, description, and prose):

```json "docmd.config.json"
{
  "theme": {
    "copyWidgets": {
      "enabled": true,
      "raw": true,
      "context": true
    }
  }
}
```

- `enabled`: Set to `false` to disable the copy widgets bar completely.
- `raw`: Set to `false` to hide the "Copy Markdown" button.
- `context`: Set to `false` to hide the "Copy Context" button.

### Options Menu (Utilities)

The `optionsMenu` groups global utilities such as **Search**, **Theme Mode Toggle**, and **Sponsorship links**:

```json "docmd.config.json"
{
  "layout": {
    "optionsMenu": {
      "position": "header", 
      "components": {
        "search": true,      
        "themeSwitch": true, 
        "sponsor": "https://github.com/sponsors/mgks"
      }
    }
  }
}
```

::: callout info title:"Automatic Relocation Fallback" icon:sparkles
If `optionsMenu` is assigned to a container that is disabled, the compiler automatically moves the options menu to `sidebar-top` to preserve accessibility.
::: /callout

### Sidebar & Navigation

The sidebar serves as the primary navigation hierarchy:

- **Behaviour**: Supports desktop collapsing, smooth state transitions, and persistent route tracking.
- **Documentation**: See [Navigation Configuration](./navigation.md).

### Footer Region

`docmd` provides `minimal` and `complete` footer layouts:

```json "docmd.config.json"
{
  "layout": {
    "footer": {
      "style": "complete", 
      "description": "Documentation built with docmd.",
      "branding": true,
      "columns": [
        {
          "title": "Community",
          "links": [
            { "text": "GitHub", "url": "https://github.com/docmd-io/docmd" }
          ]
        }
      ]
    }
  }
}
```

::: callout tip "Visual Hierarchy Guidelines" icon:lightbulb
Reserve the top menubar for cross-domain navigation and use the sidebar for in-depth documentation structure. Clear separation keeps navigation intuitive for both users and web crawlers.
:::