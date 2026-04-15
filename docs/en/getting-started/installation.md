---
title: "Installation"
description: "Install docmd globally, locally, or run it instantly with npx. Requires Node.js 18+."
---

Choose the installation method that fits your workflow.

## Run instantly with npx

```bash
npx @docmd/core dev
```

No installation needed. Runs docmd directly inside any folder with Markdown files.

```bash
# Build a production-ready static site
npx @docmd/core build
```

## Install as a project dependency (recommended)

```bash
# Install as a dev dependency
npm install -D @docmd/core

# Initialise the project
npx docmd init

# Start the dev server
npx docmd dev
```

This pins the version across your team and CI/CD pipeline.

::: callout tip "After local install"
Once `@docmd/core` is a project dependency, use `npx docmd` instead of `npx @docmd/core` for all commands.
:::

## Install globally

```bash
npm install -g @docmd/core

# Use the 'docmd' command anywhere
docmd dev
docmd build
```

## Browser-only integration

::: callout info "Library use only"
This method embeds the docmd rendering engine into another web application. It is not the standard way to build documentation sites.
:::

```html
<!-- Core Styles -->
<link rel="stylesheet" href="https://unpkg.com/@docmd/ui/assets/css/docmd-main.css">

<!-- Processing Engine -->
<script src="https://unpkg.com/@docmd/live/dist/docmd-live.js"></script>
```

See the [Browser API](../api/browser-api.md) guide for integration details.

## Troubleshooting

::: callout warning "Permission denied (EACCES)"
If you encounter `EACCES` errors during global installation on macOS or Linux, switch to a Node version manager like [nvm](https://github.com/nvm-sh/nvm) or [fnm](https://github.com/Schniz/fnm) instead of using `sudo`.
:::

::: callout info "PowerShell script execution (Windows)"
If PowerShell blocks script execution, run as Administrator:
`Set-ExecutionPolicy RemoteSigned -Scope CurrentUser`
:::