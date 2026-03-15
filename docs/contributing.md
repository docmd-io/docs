---
title: "Contributing"
description: "Guidelines and setup instructions for contributing to docmd."
---

Thank you for your interest in contributing to `docmd`! We appreciate all contributions, from bug fixes and documentation improvements to new features and design suggestions.

## Development Environment

`docmd` is a monorepo managed with [pnpm](https://pnpm.io/).

### Prerequisites

- **Node.js**: v22.x or later (LTS recommended)
- **pnpm**: v10.x or later

### Project Setup

Clone the repository and run the automated onboarding tool to install dependencies and perform an initial build:

```bash
git clone https://github.com/docmd-io/docmd.git
cd docmd
pnpm onboard
```

To link the local `docmd` command globally for testing in other projects:

```bash
pnpm onboard --link
```

### Local Development

Run the documentation site while watching for changes in the core engine:

```bash
pnpm run dev
```

To watch internal source files (engine, templates, and plugins), set the `DOCMD_DEV` environment variable:

```bash
DOCMD_DEV=true pnpm run dev
```

## Quality Standards

Before submitting a Pull Request, please ensure your changes pass the verification suite:

```bash
pnpm verify
```

### Commit Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/). Please prefix your commit messages with:
- `feat:` (New features)
- `fix:` (Bug fixes)
- `docs:` (Documentation changes)
- `refactor:` (Code changes that neither fix bugs nor add features)

### Source Headers

All new files within the `packages/` directory MUST include the standard project copyright header to maintain consistency and compliance.

```javascript
/**
 * --------------------------------------------------------------------
 * docmd : the minimalist, zero-config documentation generator.
 *
 * @package     @docmd/core (and ecosystem)
 * @website     https://docmd.io
 * @repository  https://github.com/docmd-io/docmd
 * @license     MIT
 * @copyright   Copyright (c) 2025-present docmd.io
 *
 * [docmd-source] - Please do not remove this header.
 * --------------------------------------------------------------------
 */
```

## GitHub Workflow

1.  **Fork and Branch**: Create a feature branch from the latest `main`.
2.  **Verify**: Ensure `pnpm verify` returns `🛡️ docmd is ready for production!`.
3.  **Pull Request**: Open a PR with a clear description of the problem solved or the feature added.