---
title: "Contributing"
description: "Learn how you can contribute to the development, design, and documentation of docmd."
---

# Contributing to docmd

First off, thank you for considering contributing to `docmd`! It's people like you that make the open-source community an amazing place to learn, inspire, and create.

We welcome contributions of all kinds, from fixing typos to engineering entirely new plugins.

## Ways to Contribute

<div class="docmd-container clear-float">
  <div class="image-gallery" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">

::: card 🐛 Bug Reports
Find something that isn't working right? Open an issue on GitHub. Please include your OS, Node version, and steps to reproduce.
:::

::: card ✨ Feature Requests
Have an idea to make docmd better? Open an issue and let's discuss it before you start writing code!
:::

::: card 📝 Documentation
This very website is built with docmd! You can contribute by fixing typos, improving recipes, or adding clearer examples.
:::

::: card 💻 Code Contributions
Want to get your hands dirty? We happily accept Pull Requests for core engine improvements, UI polish, and new features.
:::

  </div>
</div>

## Development Setup

`docmd` is built as a **Monorepo** using `pnpm`. Developing it locally requires a specific workflow to ensure all the internal packages (core, UI, themes, plugins) talk to each other correctly.

::: steps

1. **Prerequisites**
   Ensure you have Node.js (v18+) and [pnpm](https://pnpm.io/installation) installed on your machine.
   ```bash
   npm install -g pnpm
   ```

2. **Fork and Clone**
   Fork the repository on GitHub, then clone your fork locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/docmd.git
   cd docmd
   ```

3. **Install Dependencies**
   Use `pnpm` to install all dependencies and link the monorepo workspaces together.
   ```bash
   pnpm install
   ```

4. **Running the Dev Server**
   We use this documentation site (located in the `docs/` folder) as our primary testing ground. To start the development server and watch for changes in both the documentation *and* the core engine:
   ```bash
   # Windows (PowerShell)
   $env:DOCMD_DEV="true"; pnpm run dev
   
   # macOS / Linux
   DOCMD_DEV=true pnpm run dev
   ```
   *Note: Setting `DOCMD_DEV=true` tells the watcher to monitor the internal templates, UI scripts, and engine logic, automatically rebuilding the site when you edit source files.*

:::

## Testing Your Changes

Before submitting a Pull Request, you **must** ensure your changes haven't broken the core engine. `docmd` includes a brutal integration testing suite that verifies HTML generation, path resolutions, and SPA configurations.

To run the test suite:

```bash
pnpm test
```

If the test passes and outputs `✨ ALL SYSTEMS GO`, your code is safe to commit!

## Pull Request Guidelines

1. **Create a Branch:** Always branch off of `main` for your work (e.g., `feat/new-search-ui` or `fix/broken-link`).
2. **Write Clean Code:** Follow the existing coding style. If you are creating a new file in the `packages/` directory, ensure it includes the standard docmd copyright header at the top.
3. **Commit Messages:** We prefer [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) (e.g., `feat: add new button container` or `fix: resolve sidebar scroll issue`).
4. **Open a PR:** Push your branch to your fork and open a Pull Request against our `main` branch. Provide a clear summary of your changes and reference any related issues.

### Copyright Header
All source files in `packages/` must include the standard copyright header. If you create a new file, please copy the header from an existing file.

```javascript
/*!
 * --------------------------------------------------------------------
 * docmd : the minimalist, zero-config documentation generator.
 *
 * @package     @docmd/core (and ecosystem)
 * @website     https://docmd.io
 * @repository  https://github.com/docmd-io/docmd
 * @license     MIT
 * @copyright   Copyright (c) 2025 docmd.io
 *
 * [docmd-source] - Please do not remove this header.
 * --------------------------------------------------------------------
 */
```

## Code of Conduct

Please note that this project operates with a standard Contributor Code of Conduct. By participating in this project you agree to abide by its terms, ensuring a welcoming and respectful environment for everyone.