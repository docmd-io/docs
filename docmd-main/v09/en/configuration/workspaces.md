---
title: "Multi-Project Workspaces"
description: "Build and deploy multi-project documentation sites from a single repository with shared assets and project switchers in docmd."
---

Workspaces allow you to build and deploy multiple independent documentation projects from a single repository. Each sub-project maintains its own configuration options while inheriting global defaults defined at the workspace root.

```text
docs.example.com/           → Main Product Documentation
docs.example.com/sdk/       → SDK API Reference
docs.example.com/cli/       → CLI Tooling Guide
```

## Directory Setup

Organise your repository into separate project subdirectories. Shared static assets and global workspace configurations reside at the repository root:

```text
my-docs/
├── assets/                   ← shared static assets (inherited by all projects)
├── main-docs/
│   ├── docmd.config.json     ← project-level config (overrides root defaults)
│   └── docs/                 ← main project Markdown content
├── sdk-docs/
│   ├── docmd.config.json     ← SDK project config
│   └── docs/                 ← SDK project Markdown content
├── docmd.config.json         ← workspace root configuration
└── package.json
```

## Workspace Configuration Schema

The root `docmd.config.json` file uses the `workspace` key to declare projects. Top-level parameters (e.g. `theme`, `menubar`, `logo`) act as **global defaults** across all sub-projects:

```json "docmd.config.json"
{
  "workspace": {
    "projects": [
      { "prefix": "/",    "src": "main-docs", "title": "Docs" },
      { "prefix": "/sdk", "src": "sdk-docs",  "title": "SDK Reference" }
    ],
    "switcher": {
      "enabled": true,
      "position": "sidebar-top"
    }
  },
  "theme": { "name": "default", "appearance": "system" },
  "logo": {
    "light": "assets/logo-dark.svg",
    "dark": "assets/logo-light.svg"
  },
  "menubar": [
    { "text": "GitHub", "url": "https://github.com/docmd-io/docmd", "external": true }
  ]
}
```

### `workspace` Options

| Property | Type | Description |
| :--- | :--- | :--- |
| `projects` | `Array` | List of project entries. Exactly one project must assign `prefix: "/"`. |
| `switcher` | `Object` | Controls the [Project Switcher](#project-switcher) position and rendering. |

### Project Entry Fields

| Field | Type | Required | Description |
| :--- | :--- | :--- | :--- |
| `prefix` | `String` | Yes | URL route prefix. Use `"/"` for the root project. |
| `src` | `String` | Yes | Subdirectory path containing project content and optional `docmd.config.json`. |
| `title` | `String` | No | Display name rendered in the Project Switcher UI dropdown. |

## Project-Level Overrides

Sub-projects can maintain dedicated `docmd.config.json` manifests. Parameters defined at the project level **override** workspace root defaults:

```json "docmd.config.json"
{
  "title": "SDK Reference",
  "src": "docs",
  "plugins": {
    "search": {},
    "openapi": {}
  }
}
```

If a sub-project omits a local config file, the compiler applies zero-config automatic routing using workspace defaults.

## Configuration Cascading Hierarchy

Configuration options cascade through a 3-layer precedence model:

| Layer | Priority | Description |
| :--- | :--- | :--- |
| **Root Workspace Config** | Base Default | Applied first across all workspace projects. |
| **Project Config (`docmd.config.json`)** | Higher | Overrides root workspace defaults for that specific project. |
| **Project Navigation (`navigation.json`)** | Top Priority | Always takes precedence for rendering sidebars. |

::: callout info "Navigation Precedence" icon:info
A project-level `navigation.json` manifest **always takes precedence** over any global `navigation` array defined in the root workspace config.
:::

## The Project Switcher UI

The Project Switcher renders an accessible dropdown component enabling readers to jump between workspace sub-projects:

```json "docmd.config.json"
{
  "workspace": {
    "switcher": {
      "enabled": true,
      "position": "sidebar-top"
    }
  }
}
```

| Position | Rendering Location |
| :--- | :--- |
| `sidebar-top` (default) | Pinned at the top of the sidebar, above navigation links. |
| `sidebar-bottom` | Pinned at the bottom of the sidebar. |
| `options-menu` | Integrated into the header options menu alongside search and theme switches. |

The Project Switcher renders automatically when two or more workspace projects are declared.

## Asset Management

- **Shared Assets**: Place logos, favicons, and global custom CSS in the root `assets/` directory. All workspace projects inherit these assets during development and build compilation.
- **Project Assets**: Sub-projects can maintain local `assets/` subdirectories. Project-specific assets override shared root assets when filenames collide.

## Development & Build Commands

::: tabs
== tab "Development Server" icon:play
Run the multi-project dev server:
```bash
npx @docmd/core dev
```
Builds all workspace projects and serves them on a single HTTP port. File edits trigger targeted, per-project hot updates without rebuilding the whole workspace.
== tab "Production Build" icon:box
Generate production bundle:
```bash
npx @docmd/core build
```
Outputs a single unified static directory. All projects compile into their respective subpaths without requiring reverse proxy setups.
:::

## Workspace Constraints

1. **Root Project Requirement**: Exactly one project must assign `prefix: "/"`.
2. **Unique Route Prefixes**: Every project must use a unique URL prefix string.
3. **Root-Level `out` Control**: Output directory (`out`) is configured exclusively at the workspace root level; sub-project configs must not specify `out`.

## Configuration Schema Migration

To upgrade legacy workspace definitions to the modern `workspace` schema format, execute the automated CLI migration helper:

::: callout tip "Automated Config Upgrade" icon:sparkles
Run `npx @docmd/core migrate --upgrade` to automatically rewrite legacy configuration files to the v0.9.0 workspace schema.
:::