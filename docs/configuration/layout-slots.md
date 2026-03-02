---
title: "Layout & UI Slots"
description: "Master the structure of docmd by controlling headers, sidebars, and functional slots."
---

`docmd` treats the interface as a series of "Slots." Every major component-from the navigation sidebar to the search bar, can be toggled, moved, or customized to fit your project's specific needs.

## Visual Overview

A standard `docmd` page is divided into the following structural areas:

1.  **Header:** The top bar containing the title and utility buttons.
2.  **Sidebar:** The left-hand navigation and category tree.
3.  **Content Area:** The primary Markdown rendering zone.
4.  **TOC (Table of Contents):** The right-hand heading navigation.
5.  **Footer:** The bottom area for copyright, links, and branding.

## The Header Slot

The header is enabled by default. You can disable it site-wide or customize its content.

```javascript
// docmd.config.js
layout: {
  header: {
    enabled: true,       // Set to false to hide the entire top bar
  }
}
```

### Hiding the Page Title in Header
By default, the header displays the `title` defined in your page frontmatter. If you prefer to show the title only within the text body (using an `<h1>`), you can hide it in the header on a per-page basis.

**In your Markdown file:**
```yaml
---
title: "Advanced Guide"
hideTitle: true  // Hides "Advanced Guide" from the sticky header
---
```

## Functional "Options Menu"

The `optionsMenu` is a unique functional slot that bundles the **Search**, **Theme Toggle**, and **Sponsor** buttons. You have full control over where this bundle appears.

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

## Sidebar & Navigation

The sidebar is your project's backbone. It can be made collapsible to give users more reading space.

```javascript
layout: {
  sidebar: {
    collapsible: true,      // Adds the toggle icon to the header
    defaultCollapsed: false, // Initial state for new visitors
    position: 'left'        // Standard docs layout
  }
}
```

## The Footer Slot

`docmd` offers two footer designs. The choice depends on the scale of your project.

### 1. Minimal Style
A single-line footer for copyright and branding. Great for clean, simple projects.

```javascript
footer: {
  style: 'minimal',
  content: '© 2026 My Project'
}
```

### 2. Complete Style
A multi-column footer designed for professional ecosystems. Supports descriptions and categorized links.

```javascript
footer: {
  style: 'complete',
  description: 'Built with docmd.',
  columns: [
    {
      title: 'Community',
      links: [{ text: 'GitHub', url: '...' }]
    }
  ]
}
```

## Hiding docmd Branding

While we appreciate you sharing the love, you can natively hide the "Built with docmd" badge in the footer for white-label or enterprise projects.

```javascript
layout: {
  footer: {
    hideBranding: true // Removes the docmd logo/link from the footer
  }
}
```