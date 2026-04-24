---
title: "Installation"
description: "How to install docmd globally or locally using npm, yarn, or pnpm."
---

`docmd` is a Node.js package. It requires **Node.js v18.x or higher** installed on your machine.

There are several ways you can deploy `docmd` sites. You can run it on-the-fly without installing, or add it permanently to your long term projects.

## Option 1: Zero-Config (Try it instantly)

Run `docmd` inside any folder containing markdown files. It will automatically read your files, extract their headers and build a nested navigation sidebar. No configuration or formal setup required.

```bash
npx @docmd/core dev -z    # Start local dev serve
npx @docmd/core build -z  # Generate production static site
```
::: callout warning
Zero-Config (`-z`) is currently in `beta`. It is fantastic for quick previews, but for production sites, we recommend initializing a standard configuration file for maximum control.
:::

### Option 2: Project Installation (Recommended)
For permanent projects, install `docmd` as dependency to lock your versions.

```bash
# 1. Install locally
npm install @docmd/core

# 2. Initialize your configuration
npx @docmd/core init

# 3. Start developing
npx @docmd/core dev
```

### Option 3: Global Installation
Install once and use the `docmd` command anywhere on your machine.

```bash
npm install -g @docmd/core

docmd dev        # Start the local dev server
docmd build      # Generate the production static site
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