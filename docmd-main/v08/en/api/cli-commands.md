---
title: "CLI Commands"
description: "Command-line reference for docmd - all available commands and options."
---

## Commands Overview

| Command | Description |
|:--------|:------------|
| [`npx @docmd/core init`](#npx-docmdcore-init) | Scaffold a new documentation project |
| [`npx @docmd/core dev`](#npx-docmdcore-dev) | Start the development server with hot reload |
| [`npx @docmd/core build`](#npx-docmdcore-build) | Generate a production static site |
| [`npx @docmd/core live`](#npx-docmdcore-live) | Launch the browser-based Live Editor |
| [`npx @docmd/core stop`](#npx-docmdcore-stop) | Kill running dev servers |
| [`npx @docmd/core deploy`](#npx-docmdcore-deploy) | Generate deployment configs |
| [`npx @docmd/core migrate`](#npx-docmdcore-migrate) | Upgrade legacy configs or migrate from other tools |
| [`npx @docmd/core add <plugin>`](#npx-docmdcore-add-plugin) | Install and configure a plugin |
| [`npx @docmd/core remove <plugin>`](#npx-docmdcore-remove-plugin) | Remove a plugin and its config |

## Global Options

| Option | Alias | Description |
|:-------|:------|:------------|
| `--config <path>` | `-c` | Path to config file (default: `docmd.config.json`) |
| `--verbose` | `-V` | Show detailed build logs |
| `--version` | `-v` | Output the installed version |
| `--help` | `-h` | Display help menu |
| `--cwd <path>` | - | Override working directory (for monorepos) |

## `npx @docmd/core init`

Scaffold a new documentation project in the current directory.

```bash
npx @docmd/core init
```

Creates:
- `docs/index.md` - boilerplate home page
- `docmd.config.json` - recommended defaults
- Updated `package.json` with build scripts

## `npx @docmd/core dev`

Start a development server with instant hot reload.

```bash
npx @docmd/core dev [options]
```

| Option | Alias | Description |
|:-------|:------|:------------|
| `--port <number>` | `-p` | Server port (default: `3000`) |
| `--config <path>` | `-c` | Path to config file |

## `npx @docmd/core build`

Generate a production-ready static site in `site/`.

```bash
npx @docmd/core build [options]
```

| Option | Alias | Description |
|:-------|:------|:------------|
| `--offline` | - | Rewrite links to `.html` for `file://` browsing |
| `--config <path>` | `-c` | Path to config file |

## `npx @docmd/core live`

Launch the browser-based Live Editor.

```bash
npx @docmd/core live [options]
```

| Option | Description |
|:-------|:------------|
| `--build-only` | Generate the editor bundle without starting the server |

## `npx @docmd/core stop`

Kill running dev servers.

```bash
npx @docmd/core stop [options]
```

| Option | Alias | Description |
|:-------|:------|:------------|
| `--port <number>` | `-p` | Stop only the server on this port |
| `--force` | `-f` | Also kill `serve` processes on ports 3000, 3001, 8080, 8081 |

## `npx @docmd/core deploy`

Generate deployment configuration files.

```bash
npx @docmd/core deploy [options]
```

| Option | Description |
|:-------|:------------|
| `--docker` | Generate a `Dockerfile` + `.dockerignore` |
| `--nginx` | Generate `nginx.conf` |
| `--caddy` | Generate `Caddyfile` |
| `--github-pages` | Generate `.github/workflows/deploy.yml` |
| `--vercel` | Generate `vercel.json` |
| `--netlify` | Generate `netlify.toml` |
| `--force` | Overwrite existing deployment files |

## `npx @docmd/core migrate`

Migrate from another tool or upgrade configs.

```bash
npx @docmd/core migrate
```

Automatically re-maps deprecated keys (e.g., `siteTitle` → `title`) and restructures the config object.

## `npx @docmd/core add <plugin>`

Install and configure an official or community plugin.

```bash
npx @docmd/core add <plugin-name>
```

| Example | Description |
|:--------|:------------|
| `npx @docmd/core add analytics` | Install `@docmd/plugin-analytics` |
| `npx @docmd/core add search` | Install `@docmd/plugin-search` |

The CLI detects your package manager (npm, pnpm, yarn, or bun) and injects recommended defaults into `docmd.config.json`.

## `npx @docmd/core remove <plugin>`

Safely uninstall a plugin and clean up its config.

```bash
npx @docmd/core remove <plugin-name>
```

Removes:
- The npm package
- Plugin configuration from `docmd.config.json`

::: callout tip "Agent-Compatible Logging" icon:sparkles
docmd uses structured terminal logging. AI agents can parse output precisely for error detection and automated maintenance.
:::