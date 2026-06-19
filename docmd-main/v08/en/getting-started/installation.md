---
title: "Installation"
description: "Install @docmd/core globally, locally within a project, or run containerised via the official Docker image. Requires Node.js 18+."
---

Choose the installation method that fits your workflow. Node.js 18 or higher is required for local builds.

## 1. Local Installation (Recommended)

Running `docmd` locally keeps your documentation configuration versioned with your source code.

::: tabs
== tab "npm" icon:box
```bash
# Install as a development dependency
npm install -D @docmd/core

# Initialise a new project
npx docmd init
```
== tab "pnpm" icon:boxes
```bash
# Install as a development dependency
pnpm add -D @docmd/core

# Initialise a new project
pnpm dlx docmd init
```
== tab "yarn" icon:scroll
```bash
# Install as a development dependency
yarn add -D @docmd/core

# Initialise a new project
yarn dlx docmd init
```
== tab "Bun" icon:zap
```bash
# Install as a development dependency
bun add -D @docmd/core

# Initialise a new project
bunx docmd init
```
== tab "Docker" icon:container
```bash
# Pull the official multi-architecture image
docker pull ghcr.io/docmd-io/docmd:latest

# Build documentation from local docs/ to site/
docker run -v $(pwd)/docs:/docs -v $(pwd)/site:/site ghcr.io/docmd-io/docmd:latest build
```

See the [Docker Deployment Guide](../deployment/docker.md) for Docker Compose and Kubernetes configurations.
:::

<img width="500" class="with-border" src="/assets/previews/terminal-npx-init.webp">

::: callout tip "Shorthand Scripts" icon:sparkles
Once installed locally, you can use `npx docmd dev` to start the live preview server, or add scripts directly to your `package.json`.
:::

## 2. Global Installation

Install the package globally to create or preview sites anywhere on your system without creating a local project.

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

Once installed, the `docmd` binary is available everywhere:

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
<script src="https://unpkg.com/@docmd/live/public/docmd-live.js"></script>
```

See the [Browser API Guide](../api/browser-api.md) for full integration details.

## 4. Troubleshooting

### Permission Denied (`EACCES` Errors)
Do not use `sudo` for global installs on macOS or Linux. Fix permission conflicts using a Node.js version manager like [nvm](external:https://github.com/nvm-sh/nvm) or [fnm](external:https://github.com/Schniz/fnm).

### PowerShell Execution Policies (Windows)
If Windows blocks execution, open PowerShell as administrator and enable current-user script execution.

```powershell
Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```