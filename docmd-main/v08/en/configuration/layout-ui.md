---
title: "Layout & UI Zones"
description: "Control the interface structure by managing headers, sidebars, and functional UI slots."
---

A standard page contains six primary functional zones:

1.  **Menubar**: A full-width top navigation bar for global site links.
2.  **Header**: A persistent secondary bar. It contains the page title and utility buttons.
3.  **Sidebar**: The primary navigation tree, usually on the left.
4.  **Content Area**: The central Markdown rendering zone. Includes **Breadcrumbs**.
5.  **Table of Contents (TOC)**: Right-hand heading navigation for the current page.
6.  **Footer**: Bottom area for copyright, branding, and site-wide links.

## Global Component Configuration

The engine uses a modular layout system. Configure most UI zones in the `layout` section of your `docmd.config.json`.

### Menubar
The menubar provides a high-level navigation layer. It supports brand titles, regular links, and nested dropdowns.

*   **Location**: Fixed at the `top` or inline within the `header`.
*   **Documentation**: See [Menubar Configuration](menubar.md) for schemas and styling.

### The Page Header
The header displays the page title, breadcrumbs, and utility menus. 

*   **Controls**: Enable or disable the header globally via `layout.header`. Toggle breadcrumbs via `layout.breadcrumbs`.
*   **Overriding**: Use `hideTitle: true` in your [Page Frontmatter](../content/frontmatter.md) to hide the title area locally.

### Copy Widgets (AI Integration)
To help developers and LLM agents working with your documentation, docmd includes integrated copy buttons in the breadcrumbs bar. These buttons allow copy-pasting the raw Markdown of the page, or the unified LLM context.

Configure these buttons under the `theme.copyWidgets` settings block in your `docmd.config.json`:

```json
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

*   `enabled`: Set to `false` to disable the copy widgets bar completely.
*   `raw`: Set to `false` to hide the "Copy Markdown" button.
*   `context`: Set to `false` to hide the "Copy Context" button.

### Utility Menus (Options Menu)
The `optionsMenu` groups core utilities like **Global Search**, **Theme Toggle**, and **Sponsorship links**.

```json
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

::: callout info "Automatic Fallback" icon:sparkles
If the chosen position targets a disabled container, the engine moves the options menu to `sidebar-top`. This ensures utilities remain accessible.
:::

### Sidebar & Navigation
The sidebar is the primary navigation tree. Define its structure in your config or external JSON files.

*   **Behaviour**: Supports animations, collapsible groups, and automatic path preservation.
*   **Documentation**: See [Navigation Configuration](navigation.md).

### Footer
The engine provides **minimal** and **complete** layouts for your site footer.

```json
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

::: callout tip "Interface Hierarchy" icon:lightbulb
Keep your **Menubar** for global links. Use your **Sidebar** for logical documentation structure. AI agents rely on this hierarchy to understand the relationships between modules.
:::