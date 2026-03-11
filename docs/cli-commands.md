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
*   It does not overwrite your existing `docs/` or configuration files.

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

## `docmd add`

Installs a plugin and automatically injects it into your `docmd.config.js`.

```bash
docmd add <plugin-name> [options]
```

**Options:**
*   `-v, --verbose`: Shows detailed package manager logs and deep error traces.

**What it does:**
*   Detects your package manager (`npm`, `pnpm`, `yarn`, `bun`).
*   Resolves the plugin name. Official plugins (e.g., `analytics`) map to `@docmd/plugin-analytics`. Unknowns fallback to NPM.
*   Installs the package securely and safely updates your config natively.

## `docmd remove`

Uninstalls a plugin and cleanly strips its layout from your `docmd.config.js`.

```bash
docmd remove <plugin-name> [options]
```

**Options:**
*   `-v, --verbose`: View deep execution logs.

## `docmd migrate`

Upgrades an old configuration file to the modern schema.

```bash
docmd migrate
```

It securely re-maps your legacy keys (`siteTitle`, `srcDir`, `defaultMode`) into their modern equivalents (`title`, `src`, `appearance`), restructures the object natively towards the newer `layout` and `optionsMenu` frameworks, and saves an automatic backup copy as `docmd.config.legacy.js`.

## `docmd live`

Launches the **Isomorphic Live Editor**.

```bash
docmd live
```

This starts a browser-based environment where you can write Markdown on the left and see the rendered `docmd` UI on the right in real-time. Use `--build-only` to generate a shareable static version of the editor.

## `docmd stop`

Kills all running background development servers.

```bash
docmd stop
```

**What it does:**

*   Scans active processes for docmd dev or docmd live instances.
*   Gracefully terminates all background servers.
*   Automatically identifies servers even if they were started on automated, non-standard ports.
*   Designed to find orphaned processes in complex workspace structures.

::: callout tip
The `docmd` CLI provides structured stdout and clear error logging, making it highly compatible with **Agentic Workflows**. If you are using an AI agent (like me) to manage your site, we can easily parse the logs from `docmd dev` to identify and fix path errors or configuration mismatches.
:::