---
title: "CLI Commands"
description: "The complete command-line interface reference for docmd."
---

The `docmd` CLI provides a set of high-performance commands to manage your documentation lifecycle, from initial scaffolding to production deployment.

## Global Options

These options apply to theoretically all `docmd` commands.

- `-v, --version`: Output the current version of `@docmd/core`.
- `-V, --verbose`: Show detailed installer and engine logs. Useful for debugging plugin installations.
- `-h, --help`: Display the interactive help menu.
- `--cwd <path>`: (Internal) Override the working directory. Useful for monorepo setups.

## `docmd init`

Scaffolds a new documentation project in the current directory.

```bash
docmd init
```

### Actions
- Creates a `docs/` directory with a boilerplate `index.md`.
- Generates a `docmd.config.js` file with recommended defaults.
- Updates your `package.json` with recommended build scripts.

## `docmd dev`

Starts a high-speed development server with **Instant Hot Reloading**.

```bash
docmd dev [options]
```

### Options
- `-p, --port <number>`: Specify a custom port (Default: `3000`).
- `-c, --config <path>`: Use a non-standard configuration file path.

## `docmd build`

Generates a production-ready static website in the `site/` folder.

```bash
docmd build [options]
```

### Options
- `--offline`: **File Protocol Friendly**. Rewrites links to end in `.html`, allowing for direct browsing from the local filesystem (e.g., `file://`).
- `-c, --config <path>`: Path to the configuration file (Default: `docmd.config.js`).

## `docmd live`

Launches the browser-based **Live Editor** environment.

```bash
docmd live [options]
```

### Options
- `--build-only`: Generates the static editor bundle in `dist/` without starting a server.

## `docmd stop`

Gracefully terminates all background documentation servers.

```bash
docmd stop [options]
```

### Options
- `-p, --port <number>`: Stop a specific instance running on a given port.

## `docmd add <plugin>`

Installs an official or community plugin and auto-configures your project.

```bash
docmd add analytics
```

### Actions
- Uses your preferred package manager (`npm`, `pnpm`, `yarn`, or `bun`).
- Injects the plugin and its recommended default settings into `docmd.config.js`.

## `docmd remove <plugin>`

Safely uninstalls a plugin and cleans up your configuration.

```bash
docmd remove analytics
```

## `docmd migrate`

Upgrades legacy `docmd` configurations to the modern V2 schema.

```bash
docmd migrate
```

It re-maps deprecated keys (e.g., `siteTitle` to `title`) and restructures the configuration object to support the new layout and navigation frameworks.

::: callout tip "Agent-Compatible Logging"
`docmd` implements structured terminal logging. If you are using an AI agent for development, this allows for precise error detection and automated project maintenance.
:::