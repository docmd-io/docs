---
title: "Quick Start"
description: "Go from an empty directory to a running documentation site in under a minute."
---

Run `docmd` inside any directory containing Markdown files. No configuration file, setup overhead, or framework experience required.

::: steps

### 1. Start the development server

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core dev
```
== tab "pnpm" icon:boxes
```bash
pnpm dlx @docmd/core dev
```
== tab "yarn" icon:scroll
```bash
yarn dlx @docmd/core dev
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core dev
```
:::

This opens `http://localhost:3000`. Your documentation is now live.

<img width="500" class="with-border" src="/assets/previews/terminal-npx-dev.webp">

::: callout tip "Automatic Port Failover" icon:info
If port `3000` is currently in use, `docmd` automatically detects and binds to the next available port (e.g. `3001`).
:::

### 2. Automatic feature resolution

The engine configures all essential features automatically:

1. **Directory Detection**: Scans for `docs/`, `src/docs/`, `documentation/`, `content/`, or any `.md` files in the project root.
2. **Navigation Structuring**: Builds a nested sidebar navigation tree directly from your directory hierarchy.
3. **Title Resolution**: Extracts page titles from the first `H1` heading tag automatically.
4. **Search Indexing**: Generates a client-side full-text search index instantly.
5. **Smart Caching**: Triggers sub-200ms rebuilds automatically on file save.

No `docmd.config.json` is required. Add one later to customise layouts, plugins, or versioning settings.

### 3. Build for production

Compile your Markdown files into an optimised, static production website.

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core build
```
== tab "pnpm" icon:boxes
```bash
pnpm dlx @docmd/core build
```
== tab "yarn" icon:scroll
```bash
yarn dlx @docmd/core build
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core build
```
:::

The compiler outputs a static site to `./site/`. Host this static output anywhere, such as GitHub Pages, Vercel, Netlify, or any static HTTP host.

:::

::: callout info "Next Steps" icon:compass
Ready to configure your project? Learn how to structure your repository in the [Project Structure Guide](./project-structure.md) or explore local installation options in [Installation](./installation.md).
:::