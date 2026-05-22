---
title: "Project Structure"
description: "Learn how docmd maps physical folders and Markdown files to dynamic URLs and clean navigation."
---

The compiler uses your local filesystem as the source of truth. Folders become navigation sections. Markdown files become content pages. Your directory hierarchy translates directly into web URLs.

## 1. Standard Project Scaffold

Scaffolding a default project establishes a minimal workspace layout. This structure keeps source content separated from assets and production builds.

```text
my-docs/
├── docs/                 ← Source directory containing your Markdown (.md) pages
│   └── index.md          ← The landing page (resolves to /)
├── assets/               ← Static web assets loaded directly by the engine
│   ├── css/              ← Custom stylesheets for customising page layout
│   ├── js/               ← Custom scripts to extend browser-side logic
│   └── images/           ← Brand logos, icons, and inline illustrations
├── docmd.config.json     ← Central configuration script
├── package.json          ← Node dependency manifest and scripts
└── site/                 ← Generated production build output folder
```

::: callout info "Configuration File Resolution" icon:settings
`docmd.config.json` (or `docmd.config.ts`) is the recommended, primary configuration format. The legacy `docmd.config.js` format remains supported but acts strictly as a fallback when `.json` or `.ts` configuration files are missing.
:::

## 2. Directory and URL Mapping

The compiler maps files within your source folder directly to public URLs. There are no trailing `.html` extensions or complex routing rules.

| Source File | Resolved URL Path | Purpose |
| :--- | :--- | :--- |
| `docs/index.md` | `/` | Home Landing Page |
| `docs/api.md` | `/api` | Main API Reference |
| `docs/guides/setup.md` | `/guides/setup` | Sub-section Technical Guide |

::: callout tip "Automatic Header Parsing"
If a file lacks a `title` in its YAML frontmatter, the engine extracts the first `H1` tag (`# Heading`). This title represents the page in breadcrumb navigation and search.
:::

## 3. Workspace Monorepo Structure

For complex layouts or large projects with multiple distinct products (such as a core platform, an SDK, and a CLI tool), `docmd` natively supports a **Workspace Monorepo** directory structure. This allows you to manage multiple independent documentation sites from a single root repository while maintaining unified branding.

```text
my-docs-monorepo/
├── docmd.config.json         ← Root configuration (defines global settings)
├── assets/                   ← Shared global assets (inherited by all projects)
│   ├── css/                  ← Shared global stylesheets
│   └── images/               ← Shared logos and icons
├── package.json              ← Root dependency manifest
├── main-site/                ← Root project directory
│   ├── docmd.config.json     ← Project-specific config overrides
│   └── docs/                 ← Content for main-site (resolves to /)
│       └── index.md
└── sdk-reference/            ← Secondary project directory
    ├── docmd.config.json     ← Project-specific config overrides
    └── docs/                 ← Content for sdk-reference (resolves to /sdk)
        └── index.md
```

### Key Workspace Directory Patterns

*   **Global Configuration Cascading:** Any configuration defined in the root `docmd.config.json` (such as `theme` or `menubar`) acts as a fallback default. Individual projects can selectively override these defaults in their own local config files.
*   **Asset Sharing and Priority:** Shared logos, global custom styles, and common scripts are placed in the root `assets/` directory. Projects can also define their own local `assets/` directories; in the event of filename conflicts, project-specific assets always take precedence.
*   **Output Consolidation:** During the build process (`npx @docmd/core build`), the engine automatically merges all projects into a single consolidated production output directory (e.g. `./site/` and `./site/sdk/`), negating the need for complex reverse proxy setups or isolated build pipeline configuration.