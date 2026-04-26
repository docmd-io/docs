---
title: "Quick Start"
description: "Go from an empty folder to a running documentation site in under a minute."
---

Run docmd inside any folder containing Markdown files. No config file, no setup, no framework knowledge required.

## Start a dev server

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

Opens `http://localhost:3000`. Your documentation is live.

<!-- SCREENSHOT: Terminal output after running docmd dev showing the local dev server URL and build summary with page count. -->

## What happens automatically

docmd scans your project and sets everything up:

1. **Directory detection** — looks for `docs/`, `src/docs/`, `documentation/`, or any `.md` files
2. **Navigation generation** — builds a nested sidebar from your folder structure
3. **Metadata extraction** — reads `package.json` for the site title if available
4. **Theme activation** — applies the default theme with system-aware light/dark mode
5. **Search indexing** — enables built-in full-text search

No `docmd.config.js` is needed. Add one later when you need versioning, plugins, or custom navigation.

## Build for production

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

Outputs a static site to `./site/`, ready to deploy anywhere.