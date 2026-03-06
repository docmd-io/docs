---
title: "Zero-Config Mode"
description: "Run docmd without any configuration file. Perfect for quick previews."
---

`docmd` v0.5.0 introduces **Zero-Config Mode**. This allows you to run the documentation engine in any folder without creating a `docmd.config.js` file.

## Usage

Simply add the `-z` or `--zero-config` flag to your command.

```bash
# Start dev server
docmd dev -z

# Build static site
docmd build -z
```

## How It Works

When running in Zero-Config mode, the engine:
1.  **Smart Directory Detection (v0.5.1+)**: Scans your current directory sequentially for `docs/`, `src/docs/`, or `content/`. If none exist, it falls back to parsing the root directory entirely. 
2.  **Metadata Extraction (v0.5.1+)**: It attempts to read your project's root `package.json` file. If present, it will automatically populate your documentation site `title` and `description` to perfectly match your npm package names.
3.  **Auto-Router:** It recursively scans your `.md` files and folders to build the sidebar navigation automatically.
    *   Folder names become Category labels (capitalized).
    *   File names (or H1 headers inside them) become Page titles.
4.  Applies sensible defaults (Default theme, System light/dark mode).

## When to use it?
*   **Quick Previews:** You have a README.md and a few docs in a repo and just want to read them nicely.
*   **Prototyping:** Starting a new project before deciding on branding.
*   **Simple Wikis:** Personal knowledge bases that don't need plugins or custom themes.