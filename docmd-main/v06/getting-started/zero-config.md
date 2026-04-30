---
title: "Zero-Config Mode"
description: "Execute docmd without a configuration file. Ideal for rapid prototyping and instant documentation previews."
---

`docmd` features an intelligent auto-detection engine that allows you to generate professional documentation for any project without writing a single line of configuration. This "Zero-Config" mode derives structure and metadata directly from your filesystem and project files.

## Usage

To activate Zero-Config mode, simply append the `-z` or `--zero-config` flag to your command.

```bash
# Start the development server instantly
npx @docmd/core dev -z

# Generate a production-ready static site
npx @docmd/core build -z
```

## How It Works

When executing in Zero-Config mode, `docmd` performs the following automated steps:

1.  **Directory Detection**: The engine scans your project root for common documentation folders, including: `docs/`, `src/docs/`, `documentation/`, and `content/`. If multiple candidates exist, it prioritizes them in that order.
2.  **Smart Indexing**: If no `index.md` or `README.md` is found at the root of the source directory, `docmd` automatically designates the first discovered Markdown file as the home page.
3.  **Metadata Extraction**: If a `package.json` exists in your project, `docmd` extracts the `name` and `description` to automatically set the site title and branding.
4.  **Automatic Routing**: The engine recursively scans all subdirectories and Markdown files to build a nested, collapsible navigation sidebar instantly.
5.  **Optimized Defaults**: It applies the premium `default` theme with system-aware Light/Dark mode and enables core features like built-in search.

## Safety & Performance

Zero-Config mode is engineered for speed and predictability:

*   **Scoped Execution**: By targeting specific directories, `docmd` avoids unnecessary indexing of unrelated project files, build artifacts, or large logs.
*   **Intelligent Exclusion**: The engine automatically ignores `node_modules`, hidden system folders (e.g., `.git`), and typical output directories (`dist/`, `build/`, `site/`).
*   **Bail-out Protection**: If no valid documentation directory or content is found, `docmd` will provide a clear warning and exit gracefully rather than hanging or generating empty files.

::: callout tip "AI-Friendly Architecture"
Zero-Config mode is highly recommended for **AI-driven development**. Because the documentation structure is strictly derived from the filesystem, AI agents can easily predict file locations and update content without needing to manage complex configuration schemas.
:::