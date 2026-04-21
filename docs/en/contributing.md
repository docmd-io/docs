---
title: "Contributing"
description: "Guidelines and setup instructions for contributing to docmd."
---

Thank you for your interest in contributing to `docmd`. We appreciate bug fixes, documentation improvements, new features, and design suggestions.

## Development Environment

`docmd` is a monorepo managed with [pnpm](https://pnpm.io/).

### Prerequisites

- **Node.js**: v22.x or later (LTS recommended)
- **pnpm**: v10.x or later

### Project Setup

Clone the repository and run the initial setup to install dependencies and build the monorepo:

```bash
git clone https://github.com/docmd-io/docmd.git
cd docmd
pnpm install
pnpm build
```

To link the local `docmd` command globally for testing in other projects:

```bash
pnpm verify --link
```

### Local Development

We provide a master proxy command to run any `docmd` command against our internal `_playground` directory. This makes development identical to the user CLI experience:

```bash
pnpm docmd dev    # Starts playground dev server (also: pnpm dev)
pnpm docmd build  # Builds playground documentation
```

To watch internal source files (engine, templates, and plugins) with hot-reload, set the `DOCMD_DEV` environment variable:

```bash
DOCMD_DEV=true pnpm dev
```

## Quality Standards

### Linting
Ensure your code complies with our ESLint configuration. To automatically fix formatting issues, run:
```bash
pnpm lint --fix
```

### Verification
Before submitting a Pull Request, you **MUST** ensure the entire monorepo passes our intensive verification pipeline. This simulates a fresh release environment, audits for security vulnerabilities, and verifies monorepo integrity:

```bash
pnpm prep
```
*(This chains `pnpm reset`, dependency installation, lint checks, 7-pillar E2E tests, and the final release dry-run.)*

## GitHub Workflow

1.  **Fork and Branch**: Create a feature branch from the latest `main`.
2.  **Verify**: Ensure `pnpm prep` returns `🛡️ docmd is ready for production!`.
3.  **Pull Request**: Open a PR with a clear description of the problem solved or the feature added.

### Commit Guidelines

We use [Conventional Commits](https://www.conventionalcommits.org/). Please prefix your commit messages with:
- `feat:` (New features)
- `fix:` (Bug fixes)
- `docs:` (Documentation changes)
- `refactor:` (Internal refactorings)

### Source Headers

All new files within the `packages/` directory MUST include the standard project copyright header:

```javascript
/**
 * --------------------------------------------------------------------
 * docmd : the zero-config documentation engine.
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