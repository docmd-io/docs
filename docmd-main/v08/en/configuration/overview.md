---
title: "General Configuration"
description: "Configure docmd.config.json to manage branding, custom schemas, routing, layout behaviour, and build engines."
---

The `docmd.config.json` file is the central configuration for your workspace. It controls site styling, sidebar hierarchies, localisation details, and compiler options.

## 1. The Configuration Schema

JSON is the standard configuration format. This allows high-performance serialisation across the engine's worker pools. 

However, `docmd.config.js` and `docmd.config.ts` remain fully supported if you need dynamic JavaScript logic.

```json
{
  "title": "My Project",
  "url": "https://docs.myproject.com",
  "src": "docs",
  "out": "site",
  "base": "/"
}
```

## 2. Core Settings

These top-level parameters configure the compiler's base inputs and destinations.

| Parameter | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `String` | `"Documentation"` | The formal name of your site. Appears in navigation headers and browser title tabs. |
| `url` | `String` | `null` | Your canonical production URL. Critical for SEO validation, Sitemap indexing, and OpenGraph metadata. |
| `src` | `String` | `"docs"` | Relative path to the folder containing your source Markdown (.md) files. |
| `out` | `String` | `"site"` | Relative path where the compiler writes the optimised production static site. |
| `base` | `String` | `"/"` | The root base path of your site (e.g., set to `/docs/` if hosting in a subfolder). |
| `tmp` | `String` | `null` | Custom directory for temporary compile files and caching. Defaults to an isolated system temp folder. |
| `i18n` | `Object` | `null` | Multi-language parameters. See the [Localisation Guide](localisation/translated-content.md). |
| `plugins` | `Object` | `{}` | Key-value mapping to configure standard and custom plugins. See [Plugins Guide](../plugins/usage.md). |
| `engine` | `String` | `"js"` | The active processing engine: `"js"` or `"rust"` (preview). |

## 3. Branding & Identity

Manage how your brand appears in the header and browser tabs.

```json
{
  "logo": {
    "light": "assets/images/logo-dark.png",
    "dark": "assets/images/logo-light.png",
    "href": "/",
    "alt": "Company Logo",
    "height": "32px"
  },
  "favicon": "assets/favicon.ico"
}
```

## 4. UI Layout & Behaviour

The engine provides a modular header and sidebar layout. Customise functional regions. Change component visibility like search and dark-mode toggles. Enable or disable breadcrumbs.

```json
{
  "layout": {
    "spa": true,
    "header": {
      "enabled": true
    },
    "sidebar": {
      "collapsible": true,
      "defaultCollapsed": false
    },
    "optionsMenu": {
      "position": "header",
      "components": {
        "search": true,
        "themeSwitch": true
      }
    }
  }
}
```

See the [Layout & UI Zones](layout-ui.md) guide for full visual customisation options.

## 5. Core Engine Features

Fine-tune how the parser processes your content files.

```json
{
  "minify": true,
  "autoTitleFromH1": true,
  "copyCode": true,
  "pageNavigation": true,
  "markdown": {
    "breaks": true
  }
}
```

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `minify` | `Boolean` | `true` | Compresses output HTML and JS structures for maximum speed. |
| `autoTitleFromH1` | `Boolean` | `true` | Resolves missing page titles using the first H1 header in the file. |
| `copyCode` | `Boolean` | `true` | Displays a "Copy Code" button on the top-right of syntax blocks. |
| `pageNavigation` | `Boolean` | `true` | Generates a right-hand "On This Page" table of contents automatically. |
| `markdown.breaks` | `Boolean` | `true` | Standardises line breaks. Set to `false` if you wrap markdown lines at 80 columns. |

::: callout warning "Standalone editLink Deprecated" icon:alert-triangle
The standalone `editLink` configuration is deprecated. Use the core [Git plugin](../plugins/git.md) instead. It provides identical edit link functionality alongside commit timestamps and metadata logs.
:::