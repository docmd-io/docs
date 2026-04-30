---
title: "Multi-Project Configuration"
description: "Build multiple independent documentation sites from a single docmd instance. Shared assets, independent versioning, one deployment."
---

Build and deploy multiple documentation projects from a single repository. Each project maintains its own configuration, versioning, and navigation while sharing a common theme and asset pipeline.

## Overview

Multi-project mode is designed for organisations that maintain multiple tools, libraries, or products under one domain. Instead of running separate docmd instances behind a reverse proxy, a single `docmd build` produces a unified `site/` directory.

```
docs.example.com/           → Main documentation
docs.example.com/sdk/       → SDK reference
docs.example.com/cli/       → CLI documentation
```

## Setup

### 1. Directory Structure

Organise your repository with one directory per project:

```
my-docs/
├── assets/                   ← shared assets (all projects)
├── main-docs/
│   ├── docmd.config.js       ← project config
│   └── v01/                  ← versioned content
│       └── en/
├── sdk-docs/
│   ├── docmd.config.js       ← project config
│   └── docs/                 ← unversioned content
├── docmd.config.js           ← root multi-project config
└── package.json
```

### 2. Root Configuration

The root `docmd.config.js` contains **only** the `projects` array:

```javascript
module.exports = defineConfig({
  projects: [
    { prefix: '/', src: 'main-docs' },
    { prefix: '/sdk', src: 'sdk-docs' }
  ]
});
```

| Key | Description |
| :-- | :---------- |
| `prefix` | URL prefix for this project. Use `'/'` for the root project. |
| `src` | Directory containing this project's `docmd.config.js` and content. |

::: callout warning
Every multi-project configuration **must** include a root project with `prefix: '/'`.
:::

### 3. Project Configurations

Each project directory has its own `docmd.config.js` with full independent configuration. Do **not** include `src` or `out` keys — the parent config provides those automatically.

Each project can have completely independent:
- **i18n** — different locales, different default languages
- **Versioning** — different version numbers and structures
- **Plugins** — enable only what each project needs
- **Navigation** — custom sidebar for each project

## Assets

### Shared Assets

Place shared resources (logos, favicons, global CSS) in the root `assets/` directory. These are copied into every project's output automatically.

### Project-Specific Assets

Each project can have its own `assets/` directory. Project assets take priority over shared assets when filenames overlap.

```
my-docs/
├── assets/
│   └── images/
│       └── logo.png          ← used by all projects
├── sdk-docs/
│   └── assets/
│       └── images/
│           └── logo.png      ← overrides shared logo for SDK only
```

## Development

Start the multi-project dev server:

```bash
docmd dev
```

The server builds all projects and serves them from a single port:

```
┌─ DEV SERVER
│
│  Local           http://127.0.0.1:3000
│  Network         http://192.168.1.5:3000
│
│  Project         http://127.0.0.1:3000/
│  Project         http://127.0.0.1:3000/sdk
└──────────────────────────────────────────────────────────
```

File changes in any project trigger a targeted rebuild with live reload. Only the affected project rebuilds — other projects remain untouched for fast iteration. Shared asset changes rebuild all projects.

## Building & Deployment

```bash
docmd build
```

Output is a single static directory:

```
site/
├── index.html              ← main-docs root
├── sdk/
│   └── index.html          ← sdk-docs root
├── assets/                 ← merged assets
├── 404.html
└── sitemap.xml
```

Deploy to any static hosting (GitHub Pages, Netlify, Vercel, Cloudflare Pages) with no additional configuration. No nginx or proxy rules needed.

## Rules & Constraints

1. **Root project required** — one project must have `prefix: '/'`
2. **No duplicate prefixes** — each project needs a unique URL prefix
3. **No `src`/`out` in children** — the parent config provides these
4. **Independent everything** — each project has its own title, versions, i18n, plugins, and navigation
5. **Root config is minimal** — only `projects` should be in the root `docmd.config.js`

## Example

The official docmd documentation uses multi-project to serve the main docs and semantic search docs from one domain:

```javascript
// Root docmd.config.js
module.exports = defineConfig({
  projects: [
    { prefix: '/', src: 'docmd-main' },
    { prefix: '/search', src: 'docmd-search' }
  ]
});
```

Check the [documentation repo](external:https://github.com/docmd-io/docs).

This produces:

- `docs.docmd.io/` — main docmd documentation (versioned, multilingual)
- `docs.docmd.io/search/` — docmd search documentation (independent versioning)

Each project has its own:
- `docmd.config.js` with different title, URL, and plugins
- Version structure (main has v0.5–v0.7, search has its own versioning)
- Navigation and sidebar configuration