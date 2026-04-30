---
title: "General Configuration"
description: "Configure docmd.config.js schema, branding, layout, and engine features."
---

The `docmd.config.js` file serves as the definitive configuration for your documentation project. It controls site structure, branding, UI behaviour, and engine-level processing rules.

## The Configuration File

We recommend using the `defineConfig` helper provided by `@docmd/core`. This provides full IDE autocomplete and type-checking, enabling effortless discovery of available settings.

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  title: 'My Project',
  url: 'https://docs.myproject.com',
  // ... configuration settings
});
```

## Core Settings

`docmd` utilises a simple configuration schema. Below are the primary top-level settings:

| Key | Description | Default |
| :--- | :--- | :--- |
| `title` | The name of your documentation site. Used in the header and browser titles. | `Documentation` |
| `url` | Your production base URL. Critical for SEO, Sitemaps, and OpenGraph. | `null` |
| `src` | The relative path to the directory containing your Markdown files. | `docs` |
| `out` | The relative path for the generated static site output. | `site` |
| `base` | The base path if hosting in a subfolder (e.g., `/docs/`). | `/` |
| `i18n` | Configuration for [multi-language support](localisation/index.md). | `null` |
| `plugins` | Configuration for any standard or custom [plugins](../plugins/usage.md). | `{}` |

## Branding & Identity

Configure how your brand is represented in the navigation header and browser tabs.

```javascript
logo: {
  light: 'assets/images/logo-dark.png',  // Logo shown in Light Mode
  dark: 'assets/images/logo-light.png',  // Logo shown in Dark Mode
  href: '/',                             // Link destination when clicking the logo
  alt: 'Company Logo',                   // Alternative text for accessibility
  height: '32px'                         // Optional: Explicit height for the logo
},
favicon: 'assets/favicon.ico',           // Path to your site's favicon
```

## Site Layout & UI

`docmd` features a modular layout system. You can toggle UI components like the **Sidebar**, **Header**, **Menubar**, and **Global Search** via the `layout` object.

For a full breakdown of functional zones and configuration options, see [Layout & UI Zones](layout-ui.md).

## Core Engine Features

Fine-tune how `docmd` processes and renders your documentation content.

```javascript
minify: true,           // Minifies production assets (CSS/JS) for better performance
autoTitleFromH1: true,  // Uses the first H1 heading as the page title if frontmatter 'title' is missing
copyCode: true,         // Adds a 'Copy' button to all code blocks automatically
pageNavigation: true,   // Adds 'Previous' and 'Next' navigation links at the bottom of pages
```

## Legacy Support

If you are upgrading from an older version of `docmd`, the following keys are automatically mapped to the modern schema for backward compatibility:

*   `siteTitle` → `title`
*   `siteUrl` / `baseUrl` → `url`
*   `srcDir` / `source` → `src`
*   `outDir` / `outputDir` → `out`

::: callout tip
Execute `docmd migrate` to automatically upgrade your configuration file to the latest schema while preserving a backup of your original settings.
:::