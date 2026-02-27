---
title: "CLI Commands"
description: "A complete reference guide to the docmd command-line interface and its available options."
---

# CLI Reference

The Command Line Interface (CLI) is the primary way you will interact with `docmd` while building and testing your documentation.

## `docmd init`

Initializes a new `docmd` project in your current directory.

**Usage:**
```bash
docmd init
```

This command safely generates the necessary boilerplate to get you started without overwriting existing files. It creates:
* A `docs/` folder containing a sample `index.md` file.
* An `assets/` folder structure for your custom CSS, JS, and images.
* A modern `docmd.config.js` file pre-filled with sensible defaults.
* A `package.json` file with standard build scripts.

## `docmd dev`

Starts a local development server with hot-reloading.

**Usage:**
```bash
docmd dev [options]
```

This is the command you will use most often. It builds your site into memory, starts a local web server (usually at `http://localhost:3000`), and watches your `docs/` folder and config file. Whenever you save a file, it instantly rebuilds the changes and triggers a live reload in your browser.

**Options:**
* `-c, --config <path>`: Specify a custom path to your configuration file (defaults to `docmd.config.js`).
* `-p, --port <number>`: Force the server to start on a specific port. If the port is busy, `docmd` will ask if you want to try the next available one.

## `docmd build`

Compiles your Markdown files into a production-ready static website.

**Usage:**
```bash
docmd build [options]
```

This command reads your source directory, processes all Markdown and assets, minifies CSS/JS, and outputs a complete static website into your `site/` folder (or whatever you defined as your `outputDir`). The resulting folder can be uploaded to any static web host.

**Options:**
* `-c, --config <path>`: Specify a custom configuration file.
* `--offline`: Optimizes the generated HTML links to end in `/index.html` so the site can be browsed directly from a local hard drive without a web server (using `file:///` protocols).

## `docmd migrate`

Upgrades an older configuration file to the newest architecture.

**Usage:**
```bash
docmd migrate
```

If you are upgrading from an older version of `docmd` that used a "flat" configuration structure, this command will intelligently rewrite your config file to the modern layout. 
* It creates a safe backup named `docmd.config.legacy.js`.
* It maps your old settings into the new `layout`, `optionsMenu`, and `footer` objects.
* It preserves your existing plugins and navigation arrays.

## `docmd live`

Builds and launches the browser-based Live Editor.

**Usage:**
```bash
docmd live [options]
```

This command bundles the core `docmd` engine into a standalone web application. It starts a local server where you can write Markdown in a split-pane view and see the rendered documentation instantly, demonstrating our isomorphic browser engine.

**Options:**
* `--build-only`: Generates the `dist/` folder containing the Live Editor but does not start the local server. Use this if you want to host the Live Editor itself on a platform like GitHub Pages.

## Global Options

These flags can be appended to any command.

* `-v, --version`: Displays the currently installed version of `docmd`.
* `-h, --help`: Displays help information and available options for the CLI.