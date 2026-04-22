---
title: "Layout & UI Zones"
description: "Control the interface structure by managing headers, sidebars, and functional UI slots."
---

A standard `docmd` page is divided into six primary functional zones:

1.  **Menubar**: A full-width top navigation bar for global site links.
2.  **Header**: The persistent secondary bar containing the page title and utility buttons.
3.  **Sidebar**: The primary navigation tree (usually on the left).
4.  **Content Area**: The central Markdown rendering zone, including **Breadcrumbs**.
5.  **Table of Contents (TOC)**: Right-hand heading navigation for the current page.
6.  **Footer**: Bottom area for copyright, branding, and site-wide links.

## Global Component Configuration

`docmd` features a modular layout system. Most UI zones are configured within the `layout` section of your `docmd.config.js`.

### Menubar
The menubar provides a high-level navigation layer above your documentation. It supports brand titles, regular links, and nested dropdowns.

*   **Location**: Fixed at the `top` or inline within the `header`.
*   **Documentation**: See [Menubar Configuration](./menubar) for full item schemas and styling.

### The Page Header
The header contains the page title, breadcrumbs, and usually the utility menus. 

*   **Controls**: Enable/disable the header or breadcrumbs site-wide via `layout.header` and `layout.breadcrumbs`.
*   **Overriding**: Use `hideTitle: true` in your [Page Frontmatter](../content/frontmatter) to hide the title area on specific pages.

### Utility Menus (Options Menu)
The `optionsMenu` consolidates core utilities like **Global Search**, **Theme Toggle**, and **Sponsorship links**.

```javascript
layout: {
  optionsMenu: {
    position: 'header', // Options: 'header', 'sidebar-top', 'sidebar-bottom', 'menubar'
    components: {
      search: true,      // Enable full-text search
      themeSwitch: true, // Enable Light/Dark mode toggle
      sponsor: 'https://github.com/sponsors/your-profile' 
    }
  }
}
```

::: callout info "Automatic Fallback"
If the chosen position targets a container that is disabled, `docmd` will automatically render the options menu in the `sidebar-top` slot to ensure core utilities remain accessible.
:::

### Sidebar & Navigation
The sidebar is the primary navigation tree for your site. Its structure is defined either in your config or via external JSON files.

*   **Behavior**: Supports animations, collapsible groups, and automatic path preservation.
*   **Documentation**: See [Navigation Configuration](./navigation) for structuring your sidebar tree.

### Footer
`docmd` provides both **minimal** and **complete** layouts for your site footer.

```javascript
layout: {
  footer: {
    style: 'complete', // Options: 'minimal' or 'complete'
    description: 'Documentation built with docmd.',
    branding: true,    // Controls the "Built with docmd" badge
    columns: [
      {
        title: 'Community',
        links: [
          { text: 'GitHub', url: 'https://github.com/docmd-io/docmd' }
        ]
      }
    ]
  }
}
```

::: callout tip "Interface Hierarchy"
For the best user experience, keep your **Menubar** for global external links and your **Sidebar** for logical documentation structure. AI agents frequently utilize this hierarchy to understand the relationship between different documentation modules.
:::