---
title: "General Configuration"
description: "Master docmd.config.json to manage branding, site metadata, routing, layout zones, and build compilers in docmd."
---

The `docmd.config.json` or `docmd.config.jsonc` file is the central configuration manifest for your documentation workspace. It manages site branding, navigation sidebars, localisation parameters, and static site compiler options.

## Configuration Schema Formats

`docmd` supports `docmd.config.jsonc` and `docmd.config.json`. Both formats support single-line (`//`) comments, multi-line (`/* */`) comments, and trailing commas:

```jsonc "docmd.config.jsonc"
{
  // Site branding and canonical address
  "title": "My Technical Docs",
  "url": "https://docs.example.com",

  /* Source and build output directories */
  "src": "docs",
  "out": "site",
  "base": "/",
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
| `engine` | `String` | `"js"` | Processing engine: `"js"` (default pure JavaScript engine) or `"rust"` (native binary accelerator via `@docmd/engine-rust`). |
| `i18n` | `Object` | `null` | Multi-language parameters. See the [Localisation Guide](./localisation/translated-content.md). |
| `plugins` | `Object` | `{}` | Standard and third-party plugin configuration map. See [Plugins Guide](../plugins/usage.md). |

::: callout info title:"Backwards Compatibility" icon:history
`docmd` preserves 100% backward compatibility for older configuration manifests:
- Legacy root keys (`siteTitle`, `siteUrl`, `srcDir`, `outputDir`) map smoothly to modern keys (`title`, `url`, `src`, `out`).
- `customJs` and `customCss` map into `theme.customJs` and `theme.customCss`.
- `htmlPolicy` maps into `security.html`.
- `focusMode` and `print` at root map into `layout.focusMode` and `layout.print`.
:::

## Branding & Identity

Configure brand logos, browser favicons, and custom stylesheets or client scripts:

```json "docmd.config.json"
{
  "logo": {
    "light": "assets/images/logo-dark.png",
    "dark": "assets/images/logo-light.png",
    "href": "/",
    "alt": "Company Logo",
    "height": "32px"
  },
  "favicon": "assets/favicon.ico",
  "theme": {
    "name": "default",
    "appearance": "system",
    "customCss": [
      "/assets/css/branding.css"
    ],
    "customJs": [
      "/assets/js/feedback.js"
    ]
  }
}
```

## UI Layout and Behaviour

Configure headers, sidebars, search placement, theme toggles, and reading tools:

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
    },
    "focusMode": false,
    "print": false,
    "copyCode": true,
    "pageNavigation": true,
    "copyWidgets": {
      "enabled": true,
      "raw": true,
      "context": true
    }
  }
}
```

Refer to the [Layout & UI Zones](./layout-ui.md) guide for comprehensive visual customisation options.

## Content & Security Policies

Fine-tune how `docmd` parses Markdown and enforces HTML security:

```json "docmd.config.json"
{
  "minify": true,
  "autoTitleFromH1": true,
  "markdown": {
    "breaks": true,
    "linkify": true,
    "typographer": true,
    "linkifyDefaultScheme": "https"
  },
  "security": {
    "html": "allow"
  }
}
```

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `minify` | `Boolean` | `true` | Minifies compiled HTML, CSS, and JS assets for maximum load performance. |
| `autoTitleFromH1` | `Boolean` | `true` | Uses the document's first `# H1` heading as the title when frontmatter `title` is omitted. |
| `markdown.breaks` | `Boolean` | `true` | Converts soft line breaks into line breaks. Set `false` if wrapping text manually at 80 columns. |
| `markdown.linkify` | `Boolean` | `true` | Automatically converts URL text and bare domains into clickable links. Set `false` to disable autolinking. |
| `markdown.typographer` | `Boolean` | `true` | Enables language-neutral replacement of typographic quotes, dashes, and symbols. Set `false` to leave verbatim. |
| `markdown.linkifyDefaultScheme` | `String` | `"https"` | URL scheme prepended to bare-domain autolinks (e.g. `github.com` → `https://github.com`). Use `"http"` only for internal or legacy environments without HTTPS. |
| `security.html` | `String` | `"allow"` | HTML sanitisation mode: `"allow"`, `"escape"`, or `"strip"`. See [Security Guide](./security.md). |
| `layout.copyCode` | `Boolean` | `true` | Renders a "Copy Code" button on syntax-highlighted code blocks. |
| `layout.pageNavigation` | `Boolean` | `true` | Renders "Previous" and "Next" page navigation links at the bottom of articles. |
| `layout.focusMode` | `Boolean` | `false` | Enables distraction-free reading mode with keyboard shortcuts (`Alt+F`). |
| `layout.print` | `Boolean` | `false` | Enables print button in the article action row and focus toolbar. |

::: callout info "Git Integration replacing editLink" icon:git-branch
The standalone `editLink` configuration has been unified into the native [Git plugin](../plugins/git.md). It displays edit links, commit timestamps, and contributor metadata.
:::