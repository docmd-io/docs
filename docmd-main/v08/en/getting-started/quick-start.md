---
title: "Quick Start"
description: "Go from an empty folder to a running documentation site in under a minute."
---

Run docmd inside any folder with Markdown files. No config file, setup, or framework knowledge required.

## 1. Start a dev server

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

This opens `http://localhost:3000`. Your documentation is live.

<img width="500" class="with-border" src="/assets/previews/terminal-npx-dev.webp">

::: callout tip "Automatic Port Failover" icon:info
If port `3000` is in use, docmd automatically finds the next available port (e.g., `3001`).
:::

## 2. Automatic features

The engine sets up everything automatically:

1.  **Directory Detection**: Scans for `docs/`, `src/docs/`, `documentation/`, or `.md` files.
2.  **Navigation Structuring**: Builds a nested sidebar from your folder tree.
3.  **Title Resolution**: Extracts page titles from the first `H1` tag automatically.
4.  **Search Indexing**: Enables built-in full-text search immediately.
5.  **Smart Caching**: Triggers sub-200ms rebuilds instantly on file save.

No `docmd.config.json` is required. Add one later to customise layouts, plugins, or versions.

## 3. Build for production

Compile your Markdown files into a static, production-ready site.

::: tabs
== tab "npm" icon:box
```bash
npx @docmd/core build
```
== tab "Bun" icon:zap
```bash
bunx @docmd/core build
```
:::

The compiler outputs a static site to `./site/`. 

Host this static output anywhere. Deploy to GitHub Pages, Vercel, Netlify, or any static host.