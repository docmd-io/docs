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

1.  **Smart Directory Detection**: It scans your root directory for common documentation folders in this priority: `docs/` → `src/docs/` → `content/`. If none are found, it parses the root directory.
2.  **Automatic Titling**: It reads your `package.json`. If found, it automatically sets your site `title` and `description` to match your npm package metadata.
3.  **Recursive Routing**: It scans all folders and Markdown files to build a nested navigation sidebar.
4.  **Sensible Defaults**: It applies the `default` theme with system-aware light/dark mode and enables the `search` plugin.

## Safety & Performance

Zero-Config in v0.5.1 is engineered for safety:

*   **Recursion Limit**: The engine ignores `node_modules` and hidden folders (like `.git`) and restricts depth to prevent infinite loops in massive projects.
*   **Bail-out Logic**: If no Markdown files are found after scanning two levels deep, `docmd` will immediately stop and provide a clean CLI warning rather than hanging.

::: callout tip
Zero-config is excellent for **AI Agents**. Because the structure is predictable and derived from the filesystem, an AI can easily predict where files will be located and update documentation without needing to parse complex configuration schemas.
:::