---
title: "Workspaces"
description: "Build multiple independent documentation projects from a single docmd instance with global configuration cascading and a premium project switcher."
---

Workspaces enable you to build and deploy multiple documentation projects from a single repository. Each project can maintain its own configuration while inheriting global defaults from the workspace root.

## Overview

A workspace is designed for organisations that maintain multiple tools, libraries, or products under one domain. Instead of running separate docmd instances, a single `docmd build` produces a unified site with a shared navigation experience.

```
docs.example.com/           → Main documentation
docs.example.com/api/       → API reference
docs.example.com/cli/       → CLI documentation
```

## Setup

### 1. Directory Structure

Organise your repository with one directory per project. Shared assets and global configurations live at the root.

```
my-docs/
├── assets/                   ← shared assets (all projects)
├── main-docs/
│   ├── docmd.config.json       ← project config (overrides root)
│   └── docs/                 ← project content
├── api-reference/
│   ├── docmd.config.json       ← project config
│   └── docs/                 ← project content
├── docmd.config.json           ← root workspace config
└── package.json
```

### 2. Workspace Configuration

The root `docmd.config.json` uses the `workspace` schema. Any other keys in this file (like `theme`, `menubar`, or `logo`) act as **global defaults** for all projects.

```json
{
  "workspace": {
    "projects": [
      { "prefix": "/", "src": "main-docs", "title": "Documentation" },
      { "prefix": "/api", "src": "api-reference", "title": "API Reference" }
    ],
    "switcher": {
      "enabled": true,
      "position": "sidebar-top"
    }
  },
  "theme": { "name": "nebula" },
  "menubar": [
    { "title": "GitHub", "path": "https://github.com/my-org/my-repo", "external": true }
  ]
}
```

#### Workspace Options

| Key | Description |
| :-- | :---------- |
| `projects` | An array of project entries. |
| `switcher` | Options for the [Project Switcher](#project-switcher). |

#### Project Entry Options

| Key | Description |
| :-- | :---------- |
| `prefix` | URL prefix for this project. Use `'/'` for the root project. |
| `src` | Directory containing this project's content and optional config. |
| `title` | Display title used in the Project Switcher. |

::: callout warning
**Legacy Support**: Older configurations using the root `projects` array are still supported, but we recommend migrating to the `workspace` schema for cascading configuration support.
:::

### 3. Global Configuration Cascading

One of the most powerful features of Workspaces is **Configuration Cascading**. Any setting defined in the root `docmd.config.json` is automatically applied to every project in the workspace.

For example, if you define your `menubar` and `theme` at the root, you don't need to repeat them in every sub-folder.

*   **Global Defaults**: Defined in the root config.
*   **Project Overrides**: Defined in the project-specific `docmd.config.json`. If a project defines its own `theme`, it will override the global one.

#### Navigation Overrides

Workspaces allow you to define a global `navigation` structure at the root, but individual projects can provide their own `navigation.json` or `navigation` key in their config to replace it.

- If a project directory contains a `navigation.json` file, it **always takes precedence** over any global navigation inherited from the workspace root.
- If no local navigation is found, the project will inherit the workspace's global navigation.
- If both are missing, docmd falls back to the high-performance [Auto-Router](/configuration/overview#zero-config-auto-router).

## Project Switcher

The **Project Switcher** is a premium UI component that allows users to seamlessly navigate between different projects in your workspace.

### Configuration

You can customise the switcher's visibility and position in the root workspace config:

```json
{
  "workspace": {
    "switcher": {
      "enabled": true,
      "position": "sidebar-top"
    }
  }
}
```

| Position | Description |
| :-- | :---------- |
| `sidebar-top` (default) | Placed at the very top of the sidebar. |
| `sidebar-bottom` | Placed at the bottom of the sidebar. |
| `options-menu` | Integrated into the header options menu (Search, Theme, etc.). |

## Assets

### Shared Assets
Place shared resources (logos, favicons, global CSS) in the root `assets/` directory. These are copied into every project's output automatically.

### Project-Specific Assets
Each project can have its own `assets/` directory. Project assets take priority over shared assets when filenames overlap.

## Development & Building

### Dev Server
```bash
docmd dev
```
The server builds all projects and serves them from a single port. File changes in any project trigger a targeted rebuild of only that project.

### Production Build
```bash
docmd build
```
Output is a single static directory (default: `site/`) containing all projects merged into their respective subpaths. No complex server-side routing or reverse proxies are required.

## Rules & Constraints

1.  **Root Project Required**: One project must have `prefix: '/'`.
2.  **Unique Prefixes**: Each project must have a unique URL prefix.
3.  **No `out` in Children**: The root workspace config controls the overall output directory.
4.  **Automatic Aliasing**: Menubar items support `title` (for `text`) and `path` (for `url`) for more flexible configuration.