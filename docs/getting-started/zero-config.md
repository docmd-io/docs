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
1.  Scans your current directory for a `docs/` folder. If found, it uses that as the source. If not, it uses the root directory.
2.  **Auto-Router:** It recursively scans your `.md` files and folders to build the sidebar navigation automatically.
    *   Folder names become Category labels (capitalized).
    *   File names (or H1 headers inside them) become Page titles.
3.  Applies sensible defaults (Default theme, System light/dark mode).

## When to use it?
*   **Quick Previews:** You have a README.md and a few docs in a repo and just want to read them nicely.
*   **Prototyping:** Starting a new project before deciding on branding.
*   **Simple Wikis:** Personal knowledge bases that don't need plugins or custom themes.