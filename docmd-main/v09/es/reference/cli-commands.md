---
title: "CLI Commands"
description: "Command-line interface reference for docmd — commands, flags, and options for building and managing documentation."
---

## Commands Overview

| Command | Technical Function |
| :--- | :--- |
| [`npx @docmd/core init`](#npx-docmdcore-init) | Initialise a new documentation workspace. |
| [`npx @docmd/core dev`](#npx-docmdcore-dev) | Launch local development server with hot-reloading. |
| [`npx @docmd/core build`](#npx-docmdcore-build) | Compile production-ready static site. |
| [`npx @docmd/core live`](#npx-docmdcore-live) | Launch browser-based Live Editor environment. |
| [`npx @docmd/core stop`](#npx-docmdcore-stop) | Terminate active development servers. |
| [`npx @docmd/core deploy`](#npx-docmdcore-deploy) | Generate deployment manifests and container files. |
| [`npx @docmd/core migrate`](#npx-docmdcore-migrate) | Upgrade legacy configurations or migrate from third-party tools. |
| [`npx @docmd/core validate`](#npx-docmdcore-validate) | Run link validation and check Markdown document integrity. |
| [`npx @docmd/core doctor`](#npx-docmdcore-doctor) | Run pre-flight environment diagnostics and inspect dependencies. |
| [`npx @docmd/core mcp`](#npx-docmdcore-mcp) | Execute Model Context Protocol (MCP) server over `stdio`. |
| [`npx @docmd/core add <plugin>`](#npx-docmdcore-add-plugin) | Install and configure docmd plugins. |
| [`npx @docmd/core remove <plugin>`](#npx-docmdcore-remove-plugin) | Uninstall plugins and remove configuration entries. |

## Global Options

| Parameter Flag | Alias | Technical Description |
| :--- | :--- | :--- |
| `--config <path>` | `-c` | Specify custom path to configuration file (default: `docmd.config.json`). |
| `--verbose` | `-V` | Output detailed execution logs. |
| `--version` | `-v` | Output installed package version. |
| `--help` | `-h` | Output command CLI help instructions. |
| `--cwd <path>` | - | Override target working directory path. |

## `npx @docmd/core init`

Initialise a documentation repository layout inside the working directory.

```bash
npx @docmd/core init
```

Generates:
* `docs/index.md` — Default landing page.
* `docmd.config.json` — Standard configuration options.
* Updated `package.json` build scripts.

## `npx @docmd/core dev`

Launch local development server with real-time hot-reloading.

```bash
npx @docmd/core dev [options]
```

| Parameter Flag | Alias | Technical Description |
| :--- | :--- | :--- |
| `--port <number>` | `-p` | Specify web server port (default: `3000`). |
| `--config <path>` | `-c` | Custom path to configuration file. |

## `npx @docmd/core build`

Compile a production static site into your configured output directory (`site/`).

```bash
npx @docmd/core build [options]
```

| Parameter Flag | Alias | Technical Description |
| :--- | :--- | :--- |
| `--offline` | - | Rewrite asset and link paths to `.html` relative files for local file system browsing. |
| `--config <path>` | `-c` | Custom path to configuration file. |

## `npx @docmd/core live`

Launch browser-based Live Editor environment.

```bash
npx @docmd/core live [options]
```

| Parameter Flag | Technical Description |
| :--- | :--- |
| `--build-only` | Compile standalone Live Editor bundle without starting preview web server. |

## `npx @docmd/core stop`

Terminate running development servers.

```bash
npx @docmd/core stop [options]
```

| Parameter Flag | Alias | Technical Description |
| :--- | :--- | :--- |
| `--port <number>` | `-p` | Terminate process running on specified port. |
| `--force` | `-f` | Kill processes running on standard ports (3000, 3001, 8080, 8081). |

## `npx @docmd/core deploy`

Generate deployment manifests and configuration files.

```bash
npx @docmd/core deploy [options]
```

| Parameter Flag | Technical Description |
| :--- | :--- |
| `--docker` | Emit multi-stage `Dockerfile` and `.dockerignore`. |
| `--nginx` | Emit production `nginx.conf`. |
| `--caddy` | Emit `Caddyfile`. |
| `--github-pages` | Emit `.github/workflows/deploy.yml`. |
| `--vercel` | Emit `vercel.json`. |
| `--netlify` | Emit `netlify.toml`. |
| `--force` | Overwrite existing deployment manifests. |

## `npx @docmd/core migrate`

Migrate configurations from legacy versions or third-party engines.

```bash
npx @docmd/core migrate [options]
```

Option flags:
* `--upgrade`: Translate legacy pre-0.7.x configuration keys in place.
* `--dry-run`: Preview migration changes without modifying disk contents.

## `npx @docmd/core validate`

Validate internal link targets and document structure across Markdown sources.

```bash
npx @docmd/core validate [options]
```

| Parameter Flag | Technical Description |
| :--- | :--- |
| `--json` | Output validation errors as machine-readable JSON for CI integration. |

## `npx @docmd/core doctor`

Run pre-flight environment diagnostics and inspect plugin/template installation states.

```bash
npx @docmd/core doctor [options]
```

| Parameter Flag | Technical Description |
| :--- | :--- |
| `--config <path>` | Path to non-default configuration file. |
| `--fix` | Auto-install missing official plugins or templates identified during check. |
| `--json` | Output diagnostic report in machine-readable JSON format. |

## `npx @docmd/core mcp`

Execute Model Context Protocol (MCP) server over `stdio` for agentic integrations.

```bash
npx @docmd/core mcp
```

```json "claude_desktop_config.json"
{
  "mcpServers": {
    "docmd": {
      "command": "npx",
      "args": ["-y", "@docmd/core", "mcp"]
    }
  }
}
```

## `npx @docmd/core add <plugin>`

Install and configure official or third-party plugins.

```bash
npx @docmd/core add <plugin-name>
```

| Command Example | Technical Function |
| :--- | :--- |
| `npx @docmd/core add analytics` | Install `@docmd/plugin-analytics`. |
| `npx @docmd/core add search` | Install `@docmd/plugin-search`. |

## `npx @docmd/core remove <plugin>`

Uninstall plugins and clean up corresponding `docmd.config.json` configuration blocks.

```bash
npx @docmd/core remove <plugin-name>
```

::: callout tip "Agentic Terminal Logging" icon:sparkles
docmd formats CLI output using structured terminal logging to simplify parsing by automated CI jobs and AI dev agents.
:::