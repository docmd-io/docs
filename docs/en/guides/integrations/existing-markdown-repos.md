---
title: "Using docmd with Existing Markdown Repositories"
description: "A comprehensive guide on existing repos."
---

## Problem

You have an established repository with thousands of raw Markdown files (e.g., an Obsidian Vault, a Hugo blog, or a legacy wiki directory). Converting all frontmatter and syntax manually to fit a new engine is impossible.

## Why it matters

Vendor lock-in is dangerous. A high-quality documentation engine should map to your files, rather than forcing your files to map to the engine.

## Approach

`docmd` adheres to strict CommonMark specifications and requires **zero configuration**. You can point `docmd` at any existing markdown directory and it will intelligently bootstrap itself without altering your files.

## Implementation

Navigate to your existing markdown folder and execute:

```bash
cd my-obsidian-vault/
npx @docmd/core dev
```

1. **Auto-Navigation:** If `navigation.json` is missing, `docmd` recursively maps your folder structure, capitalizes folder names, and generates an automatic sidebar taxonomy.
2. **Title Inference:** If frontmatter `title` is missing, `docmd` extracts the first `# H1` tag from the markdown.
3. **Syntax Fallback:** Unsupported legacy shortcodes are safely rendered as raw text rather than throwing compilation errors.

## Trade-offs

Auto-generated sidebars sort alphabetically by filename. If you have "01-Intro.md" and "02-Setup.md", the engine will render them accurately, but using random filenames like "install.md" and "welcome.md" will sort alphabetically (Install before Welcome). Transitioning to a manual `navigation.json` is recommended for production aesthetics.
