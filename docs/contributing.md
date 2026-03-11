---
title: "Contributing"
description: "Learn how you can contribute to the development, design, and documentation of docmd."
---

Thank you for contributing to `docmd`! We appreciate your help in making this tool faster, smarter, and more reliable.

## 🛠️ Development Setup

`docmd` is a Monorepo managed with [pnpm](https://pnpm.io/).

### 1. Prerequisites
- **Node.js**: v20+
- **pnpm**: v10+

### 2. Setup
Clone the repository and run the automated onboarding tool to install dependencies and build the monorepo in one go:

```bash
git clone https://github.com/docmd-io/docmd.git
cd docmd

# Standard setup
pnpm onboard

# Setup + link the "docmd" command globally
pnpm onboard --link-docmd
```

### 3. Running the Dev Server
We use workspace filtering to ensure the local CLI is used during development. Start the documentation site and watch for changes in the core engine automatically:

```bash
pnpm run dev
```

### 4. Developer Mode
By default, the dev server watches content. To watch internal source code (templates, core engine, plugins), set the environment variable:

```bash
# Mac/Linux
DOCMD_DEV=true pnpm run dev

# Windows (PowerShell)
$env:DOCMD_DEV="true"; pnpm run dev
```

## 🧪 Testing & Quality

Before submitting, ensure your changes haven't introduced regressions.

1. **Verification Suite:** Run our comprehensive failsafe to verify engine integrity, versioning, and plugin lifecycles:
   ```bash
   pnpm verify
   ```
2. **Conventional Commits:** We follow [Conventional Commits](https://www.conventionalcommits.org/). Use prefixes like `feat:`, `fix:`, or `docs:`.
3. **Copyright Header:** All new files in `packages/` must include the standard project copyright header. Please copy the header from any existing file in the `src/` directory.

## 🚀 Pull Request Workflow

1. **Branch:** Create a branch from `main`.
2. **Code:** Make your changes.
3. **Verify:** Run `pnpm verify` and ensure it outputs `🛡️ docmd is ready for production!`.
4. **Push & Open:** Open a Pull Request against the `main` branch.

### Copyright Header
All source files in `packages/` must include the standard copyright header. If you create a new file, please copy the header from an existing file.

```html
/*!
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

## Code of Conduct

Please note that this project operates with a standard Contributor Code of Conduct. By participating in this project you agree to abide by its terms, ensuring a welcoming and respectful environment for everyone.