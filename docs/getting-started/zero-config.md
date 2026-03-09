---
title: "Zero-Config Mode"
description: "Run docmd without any configuration file. Perfect for quick previews and rapid prototyping."
---

`docmd` features a high-intelligence auto-detection engine. This allows you to generate professional documentation for any project without writing a single line of configuration.

## Usage

Simply add the `-z` or `--zero-config` flag to your command.

```bash
# Start dev server
docmd dev -z

# Build static site
docmd build -z
```

## How It Works

When running in Zero-Config mode, `docmd` performs the following steps:

1.  **Smart Directory Detection**: It scans your project for one of these documentation folders: `docs/`, `src/docs/`, `documentation/`, or `content/`. If none are found, `docmd` will gracefully exit with a helpful message.
2.  **Automatic Index Fallback**: If no `index.md` or `README.md` is found in your documentation folder, `docmd` automatically designates the first file it finds as the temporary record for your root domain. No more 404s on fresh projects!
3.  **Automatic Titling**: It reads your `package.json`. If found, it automatically sets your site `title` and `description` to match your npm package metadata.
4.  **Recursive Routing**: It scans all folders and Markdown files to build a nested navigation sidebar.
5.  **Sensible Defaults**: It applies the `default` theme with system-aware light/dark mode and enables the `search` plugin.

## Safety & Performance

Zero-Config is engineered for safety and predictability:

*   **Context Awareness**: By limiting execution to specific folders, `docmd` avoids accidentally indexing your entire project root (which might contain thousands of unrelated files like logs or build artifacts).
*   **Recursion Limit**: The engine ignores `node_modules` and hidden folders (like `.git`) and restricts depth to prevent infinite loops.
*   **Bail-out Logic**: If no candidate directory is found, or if the directory contains no Markdown files, `docmd` will immediately stop and provide a clean CLI warning rather than hanging.

::: callout tip
Zero-config is excellent for **AI Agents**. Because the structure is predictable and derived from the filesystem, an AI can easily predict where files will be located and update documentation without needing to parse complex configuration schemas.
:::