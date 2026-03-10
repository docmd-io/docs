---
title: "Layout & UI Slots"
description: "Master the structure of docmd by controlling headers, sidebars, and functional slots."
---

A standard `docmd` page is divided into six primary zones:
1.  **Menubar**: A full-width top navigation bar. (Added in 0.5.2)
2.  **Header**: Secondary bar containing title and utility buttons.
3.  **Sidebar**: Left-hand navigation tree.
4.  **Content Area**: Primary Markdown rendering zone.
5.  **Table of Contents (TOC)**: Right-hand heading navigation.
6.  **Footer**: Bottom area for copyright and links.

### Item Properties

The menubar is configured within the `layout` section of your `docmd.config.js`.

```javascript
module.exports = {
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

For a deeper dive into menubar layouts, see the [Menubar Configuration](./menubar) page.

## The Header Slot

The header is enabled by default. Control it site-wide in your config:
```javascript
// docmd.config.js
layout: {
  header: {
    enabled: true // Set to false to hide the entire top bar
  }
}
```

### Hiding Page Title in Header
Hiding the title from the sticky header on specific pages is handled via frontmatter:
```yaml
---
title: "Advanced Guide"
hideTitle: true
---
```

## Multi-Functional Options Menu

The `optionsMenu` bundles **Search**, **Theme Toggle**, and **Sponsor** buttons.
```javascript
layout: {
  optionsMenu: {
    position: 'header', // Options: 'header', 'sidebar-top', 'sidebar-bottom', 'menubar' (Added in 0.5.2)
    components: {
      search: true,
      themeSwitch: true,
      sponsor: 'https://github.com/sponsors/yourname'
    }
  }
}
```

::: callout note "Automatic Container Fallback"
If the chosen position targets a disabled or missing container (e.g., `'header'` when header is disabled), `docmd` will automatically default to rendering the options menu in `sidebar-top`.
:::

## Sidebar & Footer Controls

### Sidebar
```javascript
layout: {
  sidebar: {
    collapsible: true,      // Adds the toggle icon
    defaultCollapsed: false, // Initial state
    position: 'left'
  }
}
```

### Footer
`docmd` offers **minimal** and **complete** layouts.
```javascript
footer: {
  style: 'complete',
  description: 'The ultimate docs tool.',
  hideBranding: false, // Set true to hide "Built with docmd"
  columns: [
    {
      title: 'Links',
      links: [{ text: 'GitHub', url: '...' }]
    }
  ]
}
```

::: callout tip "AI-Ready Branding 🤖"
When designing custom layouts using slots, always ensure the **Search** component is accessible in your `optionsMenu`. AI agents frequently look for the search bar as their primary interaction anchor when exploring your interface to find relevant technical information.
:::
