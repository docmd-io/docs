---
title: "Zero-Config Architecture"
description: "Discover docmd's zero-config heuristics engine that automatically discovers documentation files, routes paths, and structures sites without configuration."
---

`docmd` features an intelligent heuristics engine designed to parse, discover, and structure documentation automatically. Developers can compile, serve, and translate technical sites without writing a single line of initial configuration.

## How Heuristic Discovery Works

When executed in a directory without a `docmd.config.json` manifest, the engine initializes **Zero-Config Mode**. It scans the workspace for documentation content and applies automated heuristics:

::: steps

1. **Source Directory Discovery**: Scans candidate directories in priority order: `docs/`, `src/docs/`, `documentation/`, `content/`, and `.` (root directory fallback).
2. **Version & Locale Extraction**: Automatically parses version folders matching `v[0-9]+` (e.g. `v1.0`, `v09`) and two-letter locale codes (e.g. `en`, `de`, `zh`).
3. **Automated Sidebar Routing**: Generates a clean navigation tree by analyzing file hierarchies and converting hyphenated basenames (`getting-started.md` → `Getting Started`).

:::

If no documentation content is located in the target workspace, `docmd` initialises a fresh starter template automatically.

## Zero-Config Directory Conventions

To maximise the effectiveness of Zero-Config mode, adopt these directory conventions:

- **Explicit File Naming**: Use clear, hyphenated or camelCase filenames. The autoloader converts them into human-readable sidebar labels.
- **Directory Grouping**: Group related Markdown documents inside subfolders to automatically build collapsible sidebar categories.
- **Index Fallback**: Place an `index.md` or `README.md` at the root of each content folder to serve as its default landing page.
- **Clean Output Path**: When using root `.` as your source folder, built static assets output to `./site/`, which is ignored automatically by source controls and compilers.

## Built-in Default Behaviours

A `docmd` site operates out of the box with sensible defaults. Configure individual properties in `docmd.config.json` only when overriding default values.

::: callout info "Opting out of defaults" icon:sliders
To disable a default behaviour, set its key to `false` or an empty value. For instance, setting `pageNavigation: false` removes bottom previous/next page links.
:::

### Top-Level Defaults

| Property | Default | Description |
| :--- | :--- | :--- |
| `pageNavigation` | `true` | Renders previous/next article links at the bottom of pages. |
| `copyCode` | `true` | Appends copy buttons to code blocks. |
| `autoTitleFromH1` | `true` | Resolves missing page titles using the first `# H1` heading in the file. |

### Layout & UI Defaults

| Property | Default | Description |
| :--- | :--- | :--- |
| `layout.spa` | `true` | Single Page Application client-side route navigation. |
| `layout.breadcrumbs` | `true` | Contextual breadcrumb bar above page headers. |
| `layout.header.enabled` | `true` | Persistent top navigation header bar. |
| `layout.sidebar.collapsible` | `true` | Collapsible sidebar category groups on desktop viewports. |
| `layout.sidebar.defaultCollapsed` | `false` | Sidebar categories start in an expanded state. |
| `layout.optionsMenu.position` | `"header"` | Positions search and theme controls in the header. |
| `layout.optionsMenu.components.search` | `true` | Enables built-in full-text search modal trigger. |
| `layout.optionsMenu.components.themeSwitch` | `true` | Enables light/dark appearance mode switch. |
| `layout.optionsMenu.components.sponsor` | `null` | Optional sponsorship link URL. |

### Footer Defaults

| Property | Default | Description |
| :--- | :--- | :--- |
| `layout.footer.style` | `"minimal"` | Compact single-line footer bar. |
| `layout.footer.copyright` | `` `© ${new Date().getFullYear()}` `` | Dynamic current-year copyright string. |
| `layout.footer.branding` | `true` | Displays "Built with docmd" attribution link. |

### Theme & Styling Defaults

| Property | Default | Description |
| :--- | :--- | :--- |
| `theme.name` | `"default"` | Base theme (`default`, `sky`, `ruby`, `retro`). Custom names auto-promote to [template names](../theming/templates.md). |
| `theme.appearance` | `"system"` | Default colour mode following system preferences (`system`, `light`, `dark`). |
| `theme.codeHighlight` | `true` | Syntax highlighting on code blocks. |

### Opt-in Extended Features

| Property | Default | Description |
| :--- | :--- | :--- |
| `cookie` | `null` | Opt-in cookie consent dialog. See [Cookie Consent](./cookie-consent.md). |
| `layout.banner` | `null` | Opt-in site announcement banner. See [Site Banner](./site-banner.md). |
| `theme.template` | `null` | Opt-in custom site template selection. See [Templates](../theming/templates.md). |