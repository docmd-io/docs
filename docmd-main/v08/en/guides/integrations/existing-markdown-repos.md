---
title: "Existing Markdown Repos"
description: "How to instantly generate a professional documentation site from your existing Markdown files with zero configuration."
---

## Problem

You have an established repository with hundreds of raw Markdown files - perhaps a legacy wiki, an Obsidian vault, or technical notes. Manually converting frontmatter, fixing broken links, and restructuring files for a new engine is a difficult task that often prevents modernisation.

## Why it matters

Your content should remain portable and tool-agnostic. A high-quality documentation engine adapts to your existing files, rather than forcing files to adapt to the engine. Avoiding vendor lock-in ensures your intellectual property remains standard, readable, and future-proof.

## Approach

docmd adheres to strict CommonMark specifications and is designed to be **zero-config** by default. Point the docmd CLI at any directory containing Markdown files, and it intelligently bootstraps a full-featured documentation site without modifying a single line of source content.

## Implementation

### 1. Instant Bootstrapping

Navigate to your existing Markdown folder and run the development server. docmd scans your directory structure and builds a functional site in memory instantly.

```bash
cd my-existing-docs/
npx @docmd/core dev
```

### 2. Automatic Navigation (Auto-Router)

If no `navigation.json` or `docmd.config.json` is found, docmd triggers its [Auto-Router](../../configuration/navigation.md#automatic-sidebar-generation). It recursively maps your folder structure, prettifies directory names (e.g., `getting-started` becomes `Getting Started`), and generates a logical sidebar taxonomy automatically.

### 3. Intelligent Title Inference

You don't need to add `title` frontmatter to every file. docmd uses a cascading resolution strategy to determine page titles:
1.  **Frontmatter**: Checks for a `title` or `h1` key.
2.  **First Heading**: Extracts the first `# Heading` found in the file content.
3.  **Filename**: Prettifies the filename as a fallback (e.g., `install-guide.md` becomes `Install Guide`).

### 4. Resilient Syntax Handling

docmd is built to be resilient. If existing files contain proprietary syntax or legacy shortcodes from other engines, they render safely as raw text or are skipped. This ensures your build never fails due to unmigrated content.

## Trade-offs

Automatic sidebars are typically sorted alphabetically by filename. While naming files like `01-intro.md` and `02-setup.md` works well, descriptive filenames may appear in an unintuitive order. For production-ready sites, we recommend transitioning to manual [Navigation Configuration](../../configuration/navigation.md) for full control over the user journey.
