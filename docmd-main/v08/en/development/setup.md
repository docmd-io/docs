---
title: "Setup"
description: "Run this docs site locally, link to your global docmd install, and run the full verification pipeline."
---

# Setup

> **For docs-site contributors.** Want to *contribute* to docmd itself (the framework)? See the [GitHub Contributing guide](https://github.com/docmd-io/docmd?tab=contributing-ov-file) instead — that's where the framework development workflow lives.

This page covers working on **this documentation site** (`docmd-io/docs`), not on the docmd framework (`docmd-io/docmd`).

## Prerequisites

- **Node.js**: v22.x or later (LTS recommended)
- **pnpm**: v10.x or later

## Local Development

```bash
git clone https://github.com/docmd-io/docs.git
cd docs
pnpm install
npx @docmd/core dev
```

The site is served at `http://localhost:3000` with live reload.

### Watching the framework locally

If you're editing framework code in `docmd-io/docmd` and want to see changes reflected in this docs site:

```bash
# In the framework repo
pnpm build

# In this docs repo, link the local build
npx @docmd/core link ../docmd/packages/core
```

Then restart `npx @docmd/core dev`. Your changes to the framework will be picked up after a framework rebuild.

## Quality Gates

Before opening a Pull Request:

```bash
# Lint Markdown and check for broken links
pnpm lint

# Full verification pipeline (lint + build + dead-link check)
pnpm verify
```

The verification pipeline mirrors what the maintainers run on every PR. A green run is required for merge.

## Translations

Translation workflow for adding/updating `de/` and `zh/` content:

1. Edit the EN source in `docmd-main/v08/en/...`.
2. Mirror the change in `de/` and `zh/` (same path, translated prose, preserved frontmatter keys, preserved container markers, code blocks unchanged).
3. Preserve all file titles on codeblocks (e.g. ` ```json "docmd.config.json"`).
4. Run `pnpm verify` to confirm links and structure still hold.

See the project memory for the translation house style and codeblock file-title rule.

## Project Layout

```
docs/
├── docmd-main/v08/
│   ├── en/                  # Canonical English source
│   ├── de/                  # German translations (mirrors en/)
│   ├── zh/                  # Chinese translations (mirrors en/)
│   └── navigation.json      # Single nav, replicated per locale
├── docmd-search/            # Search index assets
├── docs/                    # Other doc projects (docmd-search, docmd-main, etc.)
└── package.json
```

## What's Next

- [Building Plugins](/development/building-plugins) — write a custom docmd plugin.
- [Plugin Examples](/development/plugin-examples) — see a complete plugin walkthrough.
- [Building Templates](/development/building-templates) — author a docmd template.
- [Node API Reference](/development/node-api-reference) — programmatic build API.
