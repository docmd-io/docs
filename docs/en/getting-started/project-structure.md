---
title: "Project Structure"
description: "How docmd maps your files and folders to pages, URLs, and navigation."
---

docmd uses your filesystem as the source of truth. Folders become sections, Markdown files become pages, and the directory hierarchy defines URL routes.

## Initialise a project

::: tabs
== tab "npm" icon:box
```bash
mkdir my-docs && cd my-docs
npx @docmd/core init
```
== tab "Bun" icon:zap
```bash
mkdir my-docs && cd my-docs
bunx @docmd/core init
```
:::

This creates the standard project scaffold:

```text
my-docs/
├── docs/               ← Source directory. Your .md files go here.
│   └── index.md        ← Home page (/)
├── assets/             ← Static assets (images, custom CSS/JS)
│   ├── css/
│   ├── js/
│   └── images/
├── docmd.config.js     ← Configuration file
├── package.json        ← Project metadata and scripts
└── site/               ← Generated output (after build)
```

## File-to-URL mapping

docmd maps your `docs/` directory structure directly to URLs:

| File | URL |
|:-----|:----|
| `docs/index.md` | `/` |
| `docs/api.md` | `/api` |
| `docs/guides/setup.md` | `/guides/setup` |

::: callout tip "Automatic titles"
If a page title is not defined in frontmatter, docmd extracts the first `H1` heading as the title.
:::

## Start the dev server

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

Opens `http://localhost:3000` with live reload. Changes to `.md` files or `docmd.config.js` are reflected instantly.

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

Outputs a static site to `./site/`. The output is entirely static HTML — deploy it to GitHub Pages, Vercel, Netlify, or any static host.

Verify locally before deploying:

::: tabs
== tab "npm" icon:box
```bash
npx serve site
```
== tab "Bun" icon:zap
```bash
bunx serve site
```
:::
