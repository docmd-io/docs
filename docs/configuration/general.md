---
title: "General Configuration"
description: "Configure the core settings, layout, and appearance of your docmd site."
---

# General Configuration

The `docmd.config.js` file is the heart of your project. It exports a JavaScript object that controls everything from your site title to the footer layout.

## Core Metadata

These settings define the identity of your site.

```javascript
module.exports = {
  siteTitle: 'My Project',
  siteUrl: 'https://mysite.com', // Crucial for SEO & Sitemap plugins
  srcDir: 'docs',                // Default: 'docs'
  outputDir: 'site',             // Default: 'site'
  
  // Branding
  logo: {
    light: 'assets/logo-dark.png', // Shown in light mode
    dark: 'assets/logo-light.png', // Shown in dark mode
    href: '/',                     // Link destination
    alt: 'Project Logo'
  },
  favicon: 'assets/favicon.ico'
}
```

## Layout Architecture

`docmd` (v0.4.8+) uses a nested `layout` object to organize UI components.

```javascript
layout: {
  // 1. Single Page Application Router
  // Enables seamless page transitions without refresh.
  spa: true,

  // 2. Header Configuration
  header: {
    enabled: true
  },

  // 3. Sidebar Configuration
  sidebar: {
    collapsible: true,      // Adds the toggle button to header
    defaultCollapsed: false // Initial state
  },

  // 4. Options Menu (Search, Theme, Sponsor)
  // Consolidates utility buttons into one location.
  optionsMenu: {
    position: 'header', // 'header' or 'sidebar-bottom'
    components: {
      search: true,
      themeSwitch: true,
      sponsor: 'https://github.com/sponsors/my-name'
    }
  },

  // 5. Footer Configuration
  footer: {
    style: 'complete', // 'minimal' or 'complete'
    copyright: '© 2026 My Project',
    description: 'Documentation built with docmd.',
    
    // Only used if style is 'complete'
    columns: [
      {
        title: 'Resources',
        links: [
          { text: 'Guide', url: '/guide' },
          { text: 'API', url: '/api' }
        ]
      }
    ]
  }
}
```

## Theme & Styles

Control the visual appearance.

```javascript
theme: {
  name: 'default',        // 'default', 'sky', 'ruby', 'retro'
  defaultMode: 'system',  // 'light', 'dark', or 'system'
  codeHighlight: true,    // Enable syntax highlighting
  
  // Array of paths relative to outputDir
  customCss: ['assets/css/custom.css'] 
}
```

## Feature Toggles

Disable specific features if you don't need them.

```javascript
// Global Feature Flags
minify: true,          // Minify HTML/CSS/JS in production
autoTitleFromH1: true, // Use first # Heading as title if frontmatter missing
copyCode: true,        // Show copy button on code blocks
pageNavigation: true,  // Show Next/Prev links at bottom of pages
```