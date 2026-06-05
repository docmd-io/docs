---
title: "Zero-Config"
description: "Understand the heuristics engine of docmd that automatically structures your site without files."
---

`docmd` features a smart heuristics engine designed to parse and structure your documentation automatically. You can start building, serving, and translating your documentation without writing a single line of configuration.

## How It Works

When run without a `docmd.config.json` file, the engine automatically triggers **Zero-Config Mode**. It scans the workspace directory for content and applies the following heuristics:

### 1. Source Directory Detection

The engine looks for documentation files in these candidate directories in order:
1.  `docs/`
2.  `src/docs/`
3.  `documentation/`
4.  `content/`
5.  `.` (Root directory fallback)

If one of the candidate directories is found and contains Markdown files, it is selected as the source. If no directory is found, but the project root has Markdown files, the root directory is used (automatically ignoring `node_modules`, `.git`, output folders like `site/`, `dist/`, and `out/`).

If no documentation content is found at all, `docmd` initializes a fresh starter structure automatically.

### 2. Heuristics for Versions and Locales

The folder structure is scanned to dynamically extract versioning and localization metadata:
-   **Versions**: Subdirectories matching `v[0-9]+` (e.g., `v1.0`, `v08`) are parsed as documentation versions.
-   **Locales**: Subdirectories with two-letter language codes (e.g., `en`, `de`, `zh`) are treated as localized variants.
-   **Structure Extraction**: The highest version is designated as the current release, and the first locale found (prioritizing `en` if present) is set as the default language.

### 3. Automatic Navigation Routing

If there are no root-level versions or locales, the engine builds a navigation tree dynamically by analyzing the file structure:
-   Subdirectories are mapped to navigation groups.
-   Titles are generated dynamically from file basenames. E.g., `getting-started.md` is formatted as `Getting Started`.
-   Index files (`index.md`, `README.md`) are routed as the landing page of the current directory.

## Zero-Config Best Practices

To get the most out of Zero-Config mode, follow these structure recommendations:

-   **Explicit file naming**: Use clear, hyphenated or camelCase file names. The autoloader converts them to readable titles.
-   **Folder-based sections**: Place related documents inside subfolders to automatically group them in the sidebar.
-   **Index fallback**: Always place an `index.md` or `README.md` at the root of your source folder to serve as the landing page.
-   **Clean output path**: If you are using the root folder `.` as your source, keep your built assets in the default `site/` folder which is automatically ignored.