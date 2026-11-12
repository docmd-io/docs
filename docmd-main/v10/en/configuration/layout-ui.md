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

### Title Format & Delimiters

Configure how document titles and site titles are composed across your documentation templates:

```json "docmd.config.json"
{
  "layout": {
    "titleSeparator": "-",
    "titleAppend": true
  }
}
```

- `titleSeparator`: The delimiter between the page title and site title in the browser tab `<title>` and social card previews. Defaults to a standard mid-sized hyphen (`"-"`). The compiler automatically formats non-empty separators with surrounding single spaces (`" - "`), so you can supply simple characters like `"-"` or `"|"`.
- `titleAppend`: Determines whether the site title is appended to page titles (`true` by default). Set to `false` to output only the page title. Can also be overridden on a per-page basis in frontmatter (`titleAppend: false`).

### Context Copy & Print Widgets

Directly above the article content, `docmd` provides contextual reading utilities: one-click copying of raw Markdown source, structured AI context prompts (containing page URL, title, description, and prose), and page printing:

```json "docmd.config.json"
{
  "layout": {
    "copyWidgets": {
      "enabled": true,
      "raw": true,
      "context": true
    },
    "print": false
  }
}
```

- `copyWidgets.enabled`: Set to `false` to disable the copy widgets bar completely.
- `copyWidgets.raw`: Set to `false` to hide the "Copy Markdown" button.
- `copyWidgets.context`: Set to `false` to hide the "Copy Context" button.
- `print`: Disabled (`false`) by default. When enabled (`true`), renders a Print button in the action row alongside copy widgets (and in the Focus Mode toolbar). The Print button is never placed on the header or menubar.

### Focus Mode (Distraction-Free Reading)

Focus Mode collapses sidebars, headers, table of contents, and floating elements, presenting a clean reading canvas optimised for reading long-form technical documentation:

```json "docmd.config.json"
{
  "layout": {
    "focusMode": false
  }
}
```

- **Default State**: Disabled (`false`) by default.
- **When Enabled**: Renders an expand/focus toggle in the options menu and enables the <kbd>Alt</kbd>+<kbd>F</kbd> shortcut.
- **Controls in Focus Mode**: Only three essential controls appear in the top-right corner: Print (if `layout.print` is enabled), Light/Dark Theme toggle, and Exit Focus Mode (<kbd>Esc</kbd> or <kbd>Alt</kbd>+<kbd>F</kbd>).

::: callout info title:"Backwards Compatibility" icon:sparkles
For existing projects upgrading from earlier versions, docmd automatically resolves legacy configurations, such as root-level `print`, `focusMode`, `customJs`, and `theme.copyWidgets`, with full backwards compatibility.
:::

### Options Menu (Utilities)

The `optionsMenu` groups global utilities such as **Search**, **Theme Mode Toggle**, **Focus Mode**, and **Sponsorship links**:

```json "docmd.config.json"
{
  "layout": {
    "optionsMenu": {
      "position": "header", 
      "components": {
        "search": true,      
        "themeSwitch": true,
        "focusMode": true,
        "sponsor": "https://github.com/sponsors/mgks"
      }
    }
  }
}
```

::: callout info title:"Automatic Relocation Fallback" icon:sparkles
If `optionsMenu` is assigned to a container that is disabled, the compiler automatically moves the options menu to `sidebar-top` to preserve accessibility.
:::

### Sidebar & Navigation

The sidebar is the primary navigation hierarchy:

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