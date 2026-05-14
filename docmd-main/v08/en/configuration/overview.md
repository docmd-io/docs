---
title: "General Configuration"
description: "Configure docmd.config.json schema, branding, layout, and engine features."
---

The `docmd.config.json` file serves as the definitive configuration for your documentation project. It controls site structure, branding, UI behaviour, and engine-level processing rules.

## The Configuration File

::: callout tip "JSON is the New Standard"
Starting in version 0.8.0, `docmd.config.json` is the standard and recommended configuration format. It allows for safe, high-performance serialisation across docmd's new multi-threaded worker pools.
Fallback to `docmd.config.js` and `docmd.config.ts` is still valid and fully supported if you require dynamic JavaScript logic.
:::

```json
{
  "title": "My Project",
  "url": "https://docs.myproject.com",
  "src": "docs",
  "out": "site",
  "tmp": ".my-output/my-docmd"
}
```

## Core Settings

`docmd` utilises a simple configuration schema. Below are the primary top-level settings:

| Key | Description | Default |
| :--- | :--- | :--- |
| `title` | The name of your documentation site. Used in the header and browser titles. | `Documentation` |
| `url` | Your production base URL. Critical for SEO, Sitemaps, and OpenGraph. | `null` |
| `src` | The relative path to the directory containing your Markdown files. | `docs` |
| `out` | The relative path for the generated static site output. | `site` |
| `tmp` | Configurable destination path for internal caches and build-time temporary files. If omitted, defaults to the device's isolated OS temp folder nested securely by project hash. | `null` |
| `base` | The base path if hosting in a subfolder (e.g., `/docs/`). | `/` |
| `i18n` | Configuration for [multi-language support](localisation/index.md). | `null` |
| `plugins` | Configuration for any standard or custom [plugins](../plugins/usage.md). | `{}` |
| `engine` | Build engine: `"js"` (default) or `"rust"` (preview). See [Engine Architecture](../release-notes/0-8-1.md). | `"js"` |

## Branding & Identity

Configure how your brand is represented in the navigation header and browser tabs.

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

## Site Layout & UI

`docmd` features a modular layout system. You can toggle UI components like the **Sidebar**, **Header**, **Menubar**, and **Global Search** via the `layout` object.

For a full breakdown of functional zones and configuration options, see [Layout & UI Zones](layout-ui.md).

## Core Engine Features

Fine-tune how `docmd` processes and renders your documentation content.

```json
{
  "minify": true,
  "autoTitleFromH1": true,
  "copyCode": true,
  "pageNavigation": true
}
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

::: callout warning "Deprecated: editLink"
The standalone `editLink` configuration option has been deprecated in favour of the [Git plugin](../plugins/git.md). The Git plugin provides the same edit link functionality plus additional features like last-updated timestamps and commit history tooltips. See the [migration guide](../plugins/git.md#migration-from-editlink) for details.
:::