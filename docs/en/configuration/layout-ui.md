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

## Global Components

Most UI zones are configured within the `layout` section of your `docmd.config.js`.

### Menubar

The menubar provides a high-level navigation layer above your documentation.

```javascript
layout: {
  menubar: {
    enabled: true,
    position: 'top', // 'top' (fixed) or 'header' (within content flow)
    left: [
      { type: 'title', text: 'Brand', url: '/', icon: 'home' },
      { text: 'Features', url: '/features' }
    ],
    right: [
      { text: 'GitHub', url: 'https://github.com/docmd-io/docmd', icon: 'github' }
    ]
  }
}
```

### The Page Header

The header is enabled by default. You can disable it site-wide or hide specific elements via page-level frontmatter.

```javascript
// docmd.config.js
layout: {
  header: {
    enabled: true // Set to false to hide the entire top header site-wide
  },
  breadcrumbs: true // Set to false to hide the breadcrumb trail site-wide
}
```

**Page-level override (Frontmatter):**
```yaml
---
title: "Special Page"
hideTitle: true # Hides the title from the sticky header for this specific page
---
```

## Utility Menus (Options Menu)

The `optionsMenu` consolidates core utilities like **Search**, **Theme Toggle**, and **Sponsorship**.

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

::: callout info "Container Fallback"
If the chosen position targets a container that is disabled, `docmd` will automatically render the options menu in the `sidebar-top` slot to ensure core utilities remain accessible.
:::

## Sidebar & Footer Controls

### Sidebar Behavior
```javascript
layout: {
  sidebar: {
    enabled: true,
    collapsible: true,       // Enables the expand/collapse animation
    defaultCollapsed: false,  // Sets the initial sidebar state
    position: 'left'
  }
}
```

### Footer Branding
`docmd` provides both **minimal** and **complete** layouts for your site footer.

```javascript
layout: {
  footer: {
    style: 'complete',
    description: 'Documentation built with docmd.',
    branding: true, // Controls the "Built with docmd" badge
    columns: [
      {
        title: 'Community',
        links: [{ text: 'GitHub', url: '...' }]
      }
    ]
  }
}
```

::: callout tip "AI-Optimised Interface"
When designing custom layouts, ensure the **Search** component is prominent in your `optionsMenu`. AI agents frequently utilise search as a primary anchor when exploring your documentation to locate specific technical context.
:::