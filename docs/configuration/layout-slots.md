---
title: "Layout & UI Slots"
description: "Master the structure of docmd by controlling headers, sidebars, and functional slots."
---

`docmd` treats the interface as a series of "Slots." Every major component—from the navigation sidebar to the search bar—can be toggled, moved, or customized.

## Visual Overview

A standard `docmd` page is divided into five primary zones:
1.  **Header**: Top bar containing title and utility buttons.
2.  **Sidebar**: Left-hand navigation tree.
3.  **Content Area**: Primary Markdown rendering zone.
4.  **Table of Contents (TOC)**: Right-hand heading navigation.
5.  **Footer**: Bottom area for copyright and links.

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
    position: 'header', // Options: 'header', 'sidebar-top', 'sidebar-bottom'
    components: {
      search: true,
      themeSwitch: true,
      sponsor: 'https://github.com/sponsors/yourname'
    }
  }
}
```

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
  branding: true,    // Manage docmd branding visibility
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