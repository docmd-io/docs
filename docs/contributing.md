---
title: "Contributing"
description: "Learn how you can contribute to the development, design, and documentation of docmd."
---

We welcome contributions of all kinds—from fixing typos to engineering entirely new plugins.

::: cards
::: card 🐛 Bug Reports
Find something broken? Open an issue on GitHub with steps to reproduce.
:::
::: card ✨ Feature Requests
Have an idea? Let's discuss it in an issue before writing code!
:::
::: card 💻 Code PRs
We happily accept Pull Requests for core engine improvements and UI polish.
:::
:::

## Development Setup

`docmd` is a **Monorepo** using `pnpm`.

::: steps

1. **Install pnpm**
   Ensure you have Node.js (v18+) and [pnpm](https://pnpm.io/) installed.

2. **Clone & Install**
   ```bash
   git clone https://github.com/docmd-io/docmd.git
   cd docmd
   pnpm install
   ```

3. **Run Dev Server**
   Start the watcher for both the core engine and this documentation site:
   ```bash
   # macOS / Linux
   DOCMD_DEV=true pnpm run dev
   ```

:::

### Testing
Ensure your changes haven't broken the core engine by running our integration suite:
```bash
pnpm test
```

If the test passes and outputs `✨ ALL SYSTEMS GO`, your code is safe to commit!

### Pull Request Rules
1. **Branch off `main`**.
2. **Conventional Commits**: Use clear prefixes (e.g., `feat:`, `fix:`).
3. **Copyright Header**: Ensure new files include the standard `docmd` copyright notice.

#### Copyright Header
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
 * @copyright   Copyright (c) 2025 docmd.io
 *
 * [docmd-source] - Please do not remove this header.
 * --------------------------------------------------------------------
 */
```

## Code of Conduct

Please note that this project operates with a standard Contributor Code of Conduct. By participating in this project you agree to abide by its terms, ensuring a welcoming and respectful environment for everyone.