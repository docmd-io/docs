---
title: "Installation"
description: "How to install docmd globally or locally using npm, yarn, or pnpm."
---

# Installation

`docmd` is a Node.js package. It requires **Node.js v18.0.0 or higher**.

## Global Installation (Recommended)

For most users, installing `docmd` globally provides the best experience. It gives you access to the `docmd` command anywhere in your terminal.

```bash
npm install -g @docmd/core
```

**Verification:**
Run the following to check if the installation was successful:
```bash
docmd --version
```

## Local Installation

If you prefer to keep dependencies scoped to a specific project (useful for CI/CD pipelines or teams), install it as a dev dependency.

```bash
# npm
npm install -D @docmd/core

# pnpm
pnpm add -D @docmd/core

# yarn
yarn add -D @docmd/core
```

**Running commands locally:**
When installed locally, you cannot run `docmd` directly. Instead, use your package manager's runner:

```bash
npx docmd dev
# or
pnpm docmd dev
```

## CDN Installation (Browser Only)

::: callout warning Developer Use Only
This method is **not** for building documentation sites. It is for developers who want to embed the `docmd` parsing engine inside another web application (like a CMS or Live Preview tool).
:::

If you are building a React/Vue/Vanilla JS app and want to render `docmd` syntax on the fly without a backend, use the browser build:

```html
<!-- 1. Styles -->
<link rel="stylesheet" href="https://unpkg.com/@docmd/ui/assets/css/docmd-main.css">

<!-- 2. Engine -->
<script src="https://unpkg.com/@docmd/live/dist/docmd-live.js"></script>
```

See the [Browser API](/advanced/browser-api) guide for implementation details.

## Setup Troubleshooting

::: callout warning Permission Errors
If you see `EACCES` errors on macOS/Linux during global installation, it means you don't have permission to write to global directories.
**Fix:** Run `sudo npm install -g @docmd/core`.
:::

::: callout info Windows Powershell
If you receive an error about "running scripts is disabled on this system", run this command in PowerShell as Administrator:
`Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`
:::