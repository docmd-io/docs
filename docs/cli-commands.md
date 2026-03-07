---
title: "CLI Commands"
description: "The complete command-line reference for docmd. Create, build, and deploy your documentation with ease."
---

The `docmd` CLI is designed to be minimalist and intuitive. It handles everything from your initial project scaffolding to production-ready builds.

## `docmd init`

Scaffolds a new documentation project in the current directory.

```bash
docmd init
```

**What it does:**
*   Creates a `docs/` folder with an `index.md`.
*   Generates a `docmd.config.js` file with recommended defaults.
*   Sets up a `package.json` with build scripts.
*   **Safe**: It will not overwrite your existing `docs/` or configuration files.

## `docmd dev`

Starts a local development server with **Instant Hot Reloading**.

```bash
docmd dev [options]
```

**Options:**
*   `-z, --zero-config`: **Magic Mode**. If you don't have a config file, `docmd` will automatically detect your project structure and build your site.
*   `-p, --port <number>`: Specify a manual port (Default: `3000`).
*   `-c, --config <path>`: Use a non-standard config file path.

## `docmd build`

Generates a production-ready static website to the `site/` folder.

```bash
docmd build [options]
```

**Options:**
*   `--offline`: **File Protocol Friendly**. Rewrites all internal links to end in `.html`. This allow you to browse the site directly from a hard drive (e.g. `file:///Users/me/docs/site/index.html`) without a web server.
*   `-z, --zero-config`: Build for production using the auto-detection engine.
*   `-c, --config <path>`: Specify the config file to use.

## `docmd migrate`

Upgrades an old configuration file to the modern schema.

```bash
docmd migrate
```

It re-maps your legacy keys into the new `layout`, `footer`, and `optionsMenu` objects and saves a backup as `docmd.config.legacy.js`.

## `docmd live`

Launches the **Isomorphic Live Editor**.

```bash
docmd live
```

This starts a browser-based environment where you can write Markdown on the left and see the rendered `docmd` UI on the right in real-time. Use `--build-only` to generate a shareable static version of the editor.

::: callout tip
The `docmd` CLI provides structured stdout and clear error logging, making it highly compatible with **Agentic Workflows**. If you are using an AI agent (like me) to manage your site, we can easily parse the logs from `docmd dev` to identify and fix path errors or configuration mismatches.
:::