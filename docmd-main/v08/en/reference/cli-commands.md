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
| [`npx @docmd/core validate`](#npx-docmdcore-validate) | Validate links and check documentation files |
| [`npx @docmd/core doctor`](#npx-docmdcore-doctor) | Pre-flight check: report missing plugins, broken configs, mismatched engines |
| [`npx @docmd/core mcp`](#npx-docmdcore-mcp) | Run as an MCP (Model Context Protocol) server over stdio |
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

## `npx @docmd/core validate`

Validate documentation files and check for broken internal links.

```bash
npx @docmd/core validate [options]
```

| Option | Description |
|:-------|:------------|
| `--json` | Output errors as machine-readable JSON (useful for CI pipelines). |

Scans every Markdown file, follows relative links and image references, and reports any broken targets. Exits with a non-zero status if any link is invalid, so you can wire it into pre-merge hooks.

## `npx @docmd/core doctor`

Pre-flight check that reports missing plugins, broken configs, and mismatched engines. No filesystem writes, no build side-effects — purely diagnostic.

```bash
npx @docmd/core doctor [options]
```

| Option | Description |
|:-------|:------------|
| `--config <path>` | Path to a non-default `docmd.config.json` (or `.ts`/`.js`/`.mjs`). |
| `--fix` | Auto-install any missing official plugin or template that `doctor` flags. |
| `--json` | Output the full report as machine-readable JSON (for CI and tooling). |

By default, `doctor` prints a human-readable summary covering: the installed `@docmd/core` version, every configured plugin (with version and `✓ installed` / `⚠ missing` status), the active template, requested engines (`js` always-on, `rust` opt-in), and a list of auto-install candidates. With `--fix`, it shells out to the project's package manager (`pnpm add`, `npm install --save`, `yarn add`, or `bun add`) to install the candidates, then exits with code 0 if everything resolved. With `--json`, the same data is emitted as a single JSON object — useful for pre-commit hooks and CI gates. Exit code 0 means the project is healthy; non-zero means at least one issue remains after any `--fix` run.

## `npx @docmd/core mcp`

Run docmd as a Model Context Protocol (MCP) server over stdio. Use this to give AI agents (Claude Desktop, Cursor, etc.) the ability to read and validate your documentation directly.

```bash
npx @docmd/core mcp
```

The server communicates over standard input/output using the JSON-RPC protocol. Configure your MCP client with:

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