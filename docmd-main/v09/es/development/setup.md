---
title: "Development Setup"
description: "How to set up local development, link local framework builds, and run verification pipelines for docmd documentation."
---

# Development Setup

::: callout info "Contributing to docmd Core" icon:git-pull-request
Want to contribute to the core docmd framework? See the [GitHub Contributing Guide](external:https://github.com/docmd-io/docmd?tab=contributing-ov-file) for repository setup instructions.
:::

This guide covers building and updating this documentation repository (`docmd-io/docs`).

## Prerequisites

* **Node.js**: v22.x or later (LTS recommended)
* **pnpm**: v10.x or later

## Local Development

```bash
git clone https://github.com/docmd-io/docs.git
cd docs
pnpm install
npx @docmd/core dev
```

The local development server launches at `http://localhost:3000` with instant Hot Module Replacement (HMR).

### Linking Local Framework Code

To test local changes made within `docmd-io/docmd` against this documentation site:

```bash
# Inside the docmd framework repository
pnpm build

# Inside this docs site repository, link the local build
npx @docmd/core link ../docmd/packages/core
```

Restart `npx @docmd/core dev` to apply local framework build updates.

## Quality Gates

Run the verification pipeline prior to submitting Pull Requests:

```bash
# Lint Markdown files and check link integrity
pnpm lint

# Run complete verification pipeline (lint + build + dead-link check)
pnpm verify
```

## Translations Workflow

Workflow for adding or updating localized content in `de/` and `zh/`:

1. Update the canonical English source files in `docmd-main/v09/en/...`.
2. Mirror edits in `de/` and `zh/` under matching paths while preserving frontmatter keys, container markers, and code snippet file titles.
3. Run `pnpm verify` to confirm link integrity.

## Project Directory Layout

```text
docs/
├── docmd-main/v09/
│   ├── en/                  # Canonical English source
│   ├── de/                  # German translations (mirrors en/)
│   ├── zh/                  # Chinese translations (mirrors en/)
│   └── navigation.json      # Shared navigation hierarchy
├── docmd-search/            # Search engine assets
├── docs/                    # Sub-project targets
└── package.json
```

## What's Next

- [Building Plugins](./building-plugins.md) — write a custom docmd plugin.
- [Plugin Examples](./plugin-examples.md) — see a complete plugin walkthrough.
- [Building Templates](./building-templates.md) — author a docmd template.
- [Node API Reference](./node-api-reference.md) — programmatic build API.