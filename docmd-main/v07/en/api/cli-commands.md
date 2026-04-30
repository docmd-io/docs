---
title: "CLI Commands"
description: "Command-line reference for docmd — all available commands and options."
---

## Commands Overview

| Command | Description |
|:--------|:------------|
| [`docmd init`](#docmd-init) | Scaffold a new documentation project |
| [`docmd dev`](#docmd-dev) | Start the development server with hot reload |
| [`docmd build`](#docmd-build) | Generate a production static site |
| [`docmd live`](#docmd-live) | Launch the browser-based Live Editor |
| [`docmd stop`](#docmd-stop) | Kill running dev servers |
| [`docmd deploy`](#docmd-deploy) | Generate deployment configs (Docker, Nginx, Caddy) |
| [`docmd migrate`](#docmd-migrate) | Upgrade legacy configs to V2 schema |
| [`docmd add <plugin>`](#docmd-add-plugin) | Install and configure a plugin |
| [`docmd remove <plugin>`](#docmd-remove-plugin) | Remove a plugin and its config |

## Global Options

| Option | Alias | Description |
|:-------|:------|:------------|
| `--config <path>` | `-c` | Path to config file (default: `docmd.config.js`) |
| `--verbose` | `-V` | Show detailed build logs |
| `--version` | `-v` | Output the installed version |
| `--help` | `-h` | Display help menu |
| `--cwd <path>` | — | Override working directory (for monorepos) |

## `docmd init`

Scaffold a new documentation project in the current directory.

```bash
docmd init
```

Creates:
- `docs/index.md` — boilerplate home page
- `docmd.config.js` — recommended defaults
- Updated `package.json` with build scripts

## `docmd dev`

Start a development server with instant hot reload.

```bash
docmd dev [options]
```

| Option | Alias | Description |
|:-------|:------|:------------|
| `--port <number>` | `-p` | Server port (default: `3000`) |
| `--config <path>` | `-c` | Path to config file |

## `docmd build`

Generate a production-ready static site in `site/`.

```bash
docmd build [options]
```

| Option | Alias | Description |
|:-------|:------|:------------|
| `--offline` | — | Rewrite links to `.html` for `file://` browsing |
| `--config <path>` | `-c` | Path to config file |

## `docmd live`

Launch the browser-based Live Editor.

```bash
docmd live [options]
```

| Option | Description |
|:-------|:------------|
| `--build-only` | Generate the editor bundle without starting the server |

## `docmd stop`

Kill running docmd dev servers.

```bash
docmd stop [options]
```

| Option | Alias | Description |
|:-------|:------|:------------|
| `--port <number>` | `-p` | Stop only the server on this port |
| `--force` | `-f` | Also kill `serve` processes on ports 3000, 3001, 8080, 8081 |

## `docmd deploy`

Generate deployment configuration files.

```bash
docmd deploy [options]
```

| Option | Description |
|:-------|:------------|
| `--docker` | Generate a `Dockerfile` |
| `--nginx` | Generate `nginx.conf` |
| `--caddy` | Generate `Caddyfile` |
| `--force` | Overwrite existing deployment files |

## `docmd migrate`

Upgrade legacy docmd V1 configs to the V2 schema.

```bash
docmd migrate
```

Automatically re-maps deprecated keys (e.g., `siteTitle` → `title`) and restructures the config object.

## `docmd add <plugin>`

Install and configure an official or community plugin.

```bash
docmd add <plugin-name>
```

| Example | Description |
|:--------|:------------|
| `docmd add analytics` | Install `@docmd/plugin-analytics` |
| `docmd add search` | Install `@docmd/plugin-search` |

The CLI detects your package manager (npm, pnpm, yarn, or bun) and injects recommended defaults into `docmd.config.js`.

## `docmd remove <plugin>`

Safely uninstall a plugin and clean up its config.

```bash
docmd remove <plugin-name>
```

Removes:
- The npm package
- Plugin configuration from `docmd.config.js`

::: callout tip "Agent-Compatible Logging :robot:"
`docmd` uses structured terminal logging. AI agents can parse output precisely for error detection and automated maintenance.
:::