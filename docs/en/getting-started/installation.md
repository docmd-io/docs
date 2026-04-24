---
title: "Installation"
description: "Install docmd globally, locally, or run it instantly with npx. Requires Node.js 18+."
---

Choose the installation method that fits your workflow.

## Run instantly

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core dev
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core dev
```
:::

No installation needed. Runs docmd directly inside any folder with Markdown files.

::: tabs
== tab "npm" icon:box
```bash
# Build a production-ready static site
npx @docmd/core build
```
== tab "Bun" icon:zap
```bash
# Build a production-ready static site
bunx @docmd/core build
```
:::

## Install as a project dependency (recommended)

::: tabs
== tab "npm" icon:package
```bash
npm install -D @docmd/core
npx docmd init
npx docmd dev
```
== tab "pnpm" icon:boxes
```bash
pnpm add -D @docmd/core
pnpm dlx docmd init
pnpm dlx docmd dev
```
== tab "yarn" icon:scroll
```bash
yarn add -D @docmd/core
yarn docmd init
yarn docmd dev
```
== tab "Bun" icon:zap
```bash
bun add -D @docmd/core
bunx docmd init
bunx docmd dev
```
:::

This pins the version across your team and CI/CD pipeline.

<!-- SCREENSHOT: Terminal output showing a successful `npx docmd init` run — the generated file tree with docmd.config.js, docs/index.md, and the 'Ready!' message. -->

::: callout tip "After local install"
Once `@docmd/core` is a project dependency, use `npx docmd` instead of `npx @docmd/core` for all commands.
:::

## Install globally

::: tabs
== tab "npm" icon:package
```bash
npm install -g @docmd/core
```
== tab "pnpm" icon:boxes
```bash
pnpm add -g @docmd/core
```
== tab "yarn" icon:scroll
```bash
yarn global add @docmd/core
```
== tab "Bun" icon:zap
```bash
bun add -g @docmd/core
```
:::

```bash
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