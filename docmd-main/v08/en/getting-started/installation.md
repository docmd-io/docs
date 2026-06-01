---
title: "Installation"
description: "Install @docmd/core globally, locally within a project, or integrate it directly into web applications. Requires Node.js 18+."
---

Choose the installation method that fits your workflow. Node.js 18 or higher is required.

## 1. Project-Local Install (Recommended)

Install `@docmd/core` locally as a development dependency. This locks the version in your `package.json` and ensures consistent builds across teams and CI/CD.

### Install the Package

::: tabs
== tab "npm" icon:box
```bash
npm install -D @docmd/core
```
== tab "pnpm" icon:boxes
```bash
pnpm add -D @docmd/core
```
== tab "yarn" icon:scroll
```bash
yarn add -D @docmd/core
```
== tab "Bun" icon:zap
```bash
bun add -D @docmd/core
```
:::

### Initialise the Project

Create the standard folder structure, initial page, and config file automatically.

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core init
```
== tab "pnpm" icon:boxes
```bash
pnpm dlx @docmd/core init
```
== tab "yarn" icon:scroll
```bash
yarn dlx @docmd/core init
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core init
```
:::

<img width="500" class="with-border" src="/assets/previews/terminal-npx-init.webp">

::: callout tip "Shorthand Scripts" icon:sparkles
Once installed locally, you can use `npx @docmd/core dev` or add it directly to your `package.json` scripts.
:::

## 2. Global Install

Install the package globally to create or preview sites anywhere on your system.

::: tabs
== tab "npm" icon:box
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

Once installed globally, the `docmd` binary is available everywhere. You can also always use `npx @docmd/core` without a global install.

```bash
docmd dev   # Start a dev server locally
docmd build # Build static output
```

## 3. Browser-Only Integration

Embed the engine directly inside an existing web application via CDN.

::: callout info "Specialised Library Integration" icon:help-circle
This bypasses the CLI and loads the parsing engine in the reader's browser. Use this for dynamic portals, not static SEO websites.
:::

Add the stylesheet and JavaScript engine to your HTML.

```html
<!-- Core Stylesheet -->
<link rel="stylesheet" href="https://unpkg.com/@docmd/ui/assets/css/docmd-main.css">

<!-- Isomorphic Rendering Engine -->
<script src="https://unpkg.com/@docmd/live/dist/docmd-live.js"></script>
```

See the [Browser API](../api/browser-api.md) for full integration details.

## 4. Troubleshooting

### Permission Denied (`EACCES` Errors)
Do not use `sudo` for global installs on macOS or Linux. Fix permission conflicts using a Node.js version manager like [nvm](external:https://github.com/nvm-sh/nvm) or [fnm](external:https://github.com/Schniz/fnm).

### PowerShell Execution Policies (Windows)
If Windows blocks execution, open PowerShell as administrator and enable current-user script execution.

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```