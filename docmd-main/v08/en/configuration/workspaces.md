---
title: "Workspaces"
description: "Build multiple independent documentation projects from a single docmd instance, with global configuration cascading and a built-in Project Switcher."
---

Workspaces let you build and deploy multiple documentation projects from one repository. Each project keeps its own configuration. Global settings defined at the workspace root cascade automatically into every project.

```text
docs.example.com/           → Main documentation
docs.example.com/sdk/       → SDK reference
docs.example.com/cli/       → CLI documentation
```

## Setup

### 1. Directory Structure

One directory per project. Shared assets and global configuration live at the repository root.

```text
my-docs/
├── assets/                   ← shared assets (all projects inherit these)
├── main-docs/
│   ├── docmd.config.json     ← project config (overrides root defaults)
│   └── docs/                 ← project content
├── sdk-docs/
│   ├── docmd.config.json
│   └── docs/
├── docmd.config.json         ← workspace root config
└── package.json
```

### 2. Root Workspace Config

The root `docmd.config.json` uses the `workspace` key. Any top-level keys (e.g. `theme`, `menubar`, `logo`) act as **global defaults** for every project.

```json
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
    { "text": "GitHub", "url": "https://github.com/my-org/my-repo", "external": true }
  ]
}
```

#### `workspace` Options

| Key | Type | Description |
| :-- | :--- | :---------- |
| `projects` | `Array` | List of project entries. At least one must use `prefix: "/"`. |
| `switcher` | `Object` | Controls the [Project Switcher](#project-switcher) visibility and position. |

#### Project Entry Fields

| Key | Type | Required | Description |
| :-- | :--- | :------- | :---------- |
| `prefix` | `String` | ✅ | URL prefix. Use `"/"` for the root project. |
| `src` | `String` | ✅ | Directory path (relative to CWD) containing the project's content and optional `docmd.config.json`. |
| `title` | `String` | - | Display name shown in the Project Switcher UI. |

### 3. Project-Level Config

Each project directory can have its own `docmd.config.json`. Settings defined here **override** the workspace root defaults.

```json
{
  "title": "SDK Reference",
  "src": "docs",
  "plugins": {
    "search": {},
    "openapi": {}
  }
}
```

If no local config file is found, the engine applies zero-config auto-routing using the workspace defaults.

### 4. Global Configuration Cascading

Any key defined in the root workspace config automatically applies to every project. Project configs can selectively override any of these globals.

| Layer | Precedence |
| :---- | :--------- |
| Root workspace config | Lowest (applied first as defaults) |
| Project `docmd.config.json` | Higher (overrides root defaults) |
| Project `navigation.json` | Highest (always wins for navigation) |

**Example**: Define your global `theme` and `menubar` once at the root. Each project only needs to set `title`, `src`, and its own `plugins`.

::: callout info "Navigation Priority" icon:info
A project-level `navigation.json` file **always takes precedence** over any `navigation` array defined in the workspace root config. If neither exists, docmd falls back to automatic directory scanning.
:::

## Project Switcher

The Project Switcher renders a slim UI component for navigating between workspace projects.

### Configuration

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
| :------- | :---------- |
| `sidebar-top` (default) | Pinned at the top of the sidebar, above navigation. |
| `sidebar-bottom` | Pinned at the bottom of the sidebar. |
| `options-menu` | Integrated into the header options menu alongside search and theme toggles. |

The switcher only renders when two or more projects are defined.

## Assets

### Shared Assets
Place logos, favicons, and global CSS in the root `assets/` directory. The engine copies these into every project's output automatically during both `dev` and `build`.

### Project-Specific Assets
Each project can have its own `assets/` directory. Project assets take priority over shared assets when filenames conflict.

## Building & Development

### Dev Server
```bash
npx @docmd/core dev
```
Builds all projects and serves them from a single port. File changes trigger **targeted, per-project** rebuilds - only the modified project re-renders, not the whole workspace. Root config changes trigger a full workspace rebuild.

### Production Build
```bash
npx @docmd/core build
```
Outputs a single static directory. All projects merge into their respective subpaths. No reverse proxy or complex CI pipelines are required.

## Rules & Constraints

1. **Root Project Required**: Exactly one project must have `prefix: "/"`.
2. **Unique Prefixes**: Every project must use a unique URL prefix.
3. **`out` in Root Only**: Only the root workspace config controls the output directory. Child project configs must not define `out`.
4. **No Prefix Conflicts**: If a root project has a folder named `sdk/`, and another project uses `prefix: "/sdk"`, the engine emits a conflict warning. The prefixed project always wins.

## Migrating from Legacy Configurations

The pre-0.8.3 `projects` array syntax and other legacy configuration keys are automatically normalised to the modern `workspace` schema for backward compatibility. 

While manual updates are strictly not required, you can automatically upgrade your configuration file to the modern schema using the CLI.

::: callout tip "Migrate with one command" icon:lightbulb
Run `npx @docmd/core migrate --upgrade` to automatically rewrite your root configuration to the current schema.
:::