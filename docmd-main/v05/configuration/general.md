---
title: "General Configuration"
description: "Master the docmd.config.js schema. Configure branding, layout architecture, and core engine features."
---

The `docmd.config.js` file is the central brain of your documentation. It defines how your content is structured, how it looks, and how both humans and AI interact with it.

## The Configuration File

We recommend using the `defineConfig` helper. It provides full IDE autocomplete and type-checking, making it much easier to discover available settings.

```javascript
const { defineConfig } = require('@docmd/core');

module.exports = defineConfig({
  title: 'My Project',
  url: 'https://docs.myproject.com',
  // ... settings
});
```

## Core Settings (V3 Schema)

`docmd` v0.5.0 introduces a streamlined V3 schema. While legacy keys are still supported, we recommend transitioning to these modern labels:

| Key | Description | Default |
| :--- | :--- | :--- |
| `title` | The name of your documentation site. | `Documentation` |
| `url` | Production base URL. **Crucial for SEO and Sitemap.** | `null` |
| `src` | Directory containing your Markdown files. | `docs` |
| `out` | Directory for the compiled static site. | `site` |
| `base` | The base path if hosting in a subfolder (e.g., `/docs/`). | `/` |

## Branding

Customize how your brand appears in the header and browser tabs.

```javascript
logo: {
  light: 'assets/logo-dark.png', // Logo for light mode
  dark: 'assets/logo-light.png',  // Logo for dark mode
  href: '/',                      // Click destination
  alt: 'Company Logo'             // Accessibility text
},
favicon: 'assets/favicon.ico',
```

## Layout Architecture

`docmd` follows a component-based layout system. You can toggle and configure different parts of the UI via the `layout` object.

| Section | Key | Default | Description |
| :--- | :--- | :--- | :--- |
| **Global** | `spa` | `true` | Enables/Disables Single Page Application navigation. |
| **Header** | `header` | `{ enabled: true }` | Toggles the top navigation bar. |
| **Sidebar**| `sidebar`| `{ enabled: true, collapsible: true }` | Controls the navigation tree behavior. |
| **Footer** | `footer` | `{ style: 'minimal' }` | Supports `'minimal'` or `'complete'` styles. |

### The Options Menu
The Options Menu consolidates utility buttons like **Search**, **Theme Switching**, and **Sponsorship links**.

```javascript
layout: {
  optionsMenu: {
    position: 'header', // Options: 'header', 'sidebar-top', 'sidebar-bottom', 'menubar'
    components: {
      search: true,
      themeSwitch: true,
      sponsor: 'https://github.com/sponsors/your-profile'
    }
  }
}
```

::: callout info
If `optionsMenu.position` is set to `header` or `menubar` but the target container is disabled or null, it automatically falls back to `sidebar-top`.
:::

## Engine Features

Fine-tune how `docmd` processes your files.

```javascript
minify: true,           // Minifies production HTML, CSS, and JS
autoTitleFromH1: true,  // Automatically use the first # Heading if Frontmatter title is missing
copyCode: true,         // Adds a 'Copy' button to all code blocks
pageNavigation: true,   // Adds 'Next' and 'Previous' links at the bottom of pages
```

## Legacy Support

If you are upgrading from an older version of `docmd`, the following keys are automatically mapped to the V3 schema:

*   `siteTitle` → `title`
*   `siteUrl` / `baseUrl` → `url`
*   `srcDir` / `source` → `src`
*   `outDir` / `outputDir` → `out`

::: callout tip
Use `docmd migrate` to automatically upgrade your configuration file to the newest schema while keeping a backup of your old settings.
:::
