---
title: "General Configuration"
description: "Master docmd.config.json to manage branding, site metadata, routing, layout zones, and build compilers in docmd."
---

The `docmd.config.json` file serves as the central configuration manifest for your documentation workspace. It manages site branding, navigation sidebars, localisation parameters, and static site compiler options.

## Configuration Schema Formats

JSON is the primary configuration format, allowing high-performance serialisation across worker threads during parallel builds:

```json "docmd.config.json"
{
  "title": "My Technical Docs",
  "url": "https://docs.example.com",
  "src": "docs",
  "out": "site",
  "base": "/"
}
```

For dynamic setups requiring environment variables or programmatic logic, `docmd.config.ts` and `docmd.config.js` are fully supported:

::: tabs
== tab "TypeScript" icon:code-2
```typescript "docmd.config.ts"
import { UserConfig } from '@docmd/api';

const config: UserConfig = {
  title: process.env.DOCS_TITLE || 'My Technical Docs',
  src: 'docs',
  out: 'site'
};

export default config;
```
== tab "JavaScript" icon:file-code
```javascript "docmd.config.js"
module.exports = {
  title: process.env.DOCS_TITLE || 'My Technical Docs',
  src: 'docs',
  out: 'site'
};
```
:::

## Core Settings

These top-level properties configure base paths and global compiler options:

| Property | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `String` | `"Documentation"` | Formal site title displayed in navigation headers and browser tabs. |
| `url` | `String` | `""` | Canonical site URL. Essential for search engine optimisation, sitemap generation, and OpenGraph metadata. |
| `src` | `String` | `"docs"` | Relative directory containing source Markdown (`.md`) files. |
| `out` | `String` | `"site"` | Relative path where the compiler generates the production static bundle. |
| `base` | `String` | `"/"` | Root URL path prefix (e.g. `/docs/` when hosted in a subfolder). |
| `tmp` | `String` | `null` | Temporary build cache directory. Defaults to an isolated system temp folder. |
| `i18n` | `Object` | `null` | Multi-language parameters. See the [Localisation Guide](./localisation/translated-content.md). |
| `plugins` | `Object` | `{}` | Standard and third-party plugin configuration map. See [Plugins Guide](../plugins/usage.md). |
| `engine` | `String` | `"js"` | Processing engine: `"js"` or `"rust"` (alpha preview). |

## Branding & Identity

Configure brand logos and browser favicons in `docmd.config.json`:

```json "docmd.config.json"
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

## UI Layout and Behaviour

Configure headers, sidebars, search placement, and theme toggles:

```json "docmd.config.json"
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

Refer to the [Layout & UI Zones](./layout-ui.md) guide for comprehensive visual customisation options.

## Core Compiler Options

Fine-tune how `docmd` parses and transforms your Markdown content:

```json "docmd.config.json"
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
| `minify` | `Boolean` | `true` | Minifies compiled HTML, CSS, and JS assets for maximum load performance. |
| `autoTitleFromH1` | `Boolean` | `true` | Uses the document's first `# H1` heading as the title when frontmatter `title` is omitted. |
| `copyCode` | `Boolean` | `true` | Renders a "Copy Code" button on syntax-highlighted code blocks. |
| `pageNavigation` | `Boolean` | `true` | Renders "Previous" and "Next" page navigation links at the bottom of articles. |
| `markdown.breaks` | `Boolean` | `true` | Converts soft line breaks into line breaks. Set `false` if wrapping text manually at 80 columns. |

::: callout info "Git Integration replacing editLink" icon:git-branch
The standalone `editLink` configuration has been unified into the native [Git plugin](../plugins/git.md). It displays edit links, commit timestamps, and contributor metadata.
:::