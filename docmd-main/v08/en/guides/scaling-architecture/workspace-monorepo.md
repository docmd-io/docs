---
title: "Workspace & Monorepo Architecture"
description: "How to use docmd's Workspace mode to manage multiple independent documentation projects from a single repository with zero duplication."
---

## Problem

Large organisations maintain documentation for multiple independent products - an SDK, a CLI tool, and a main platform - each with its own versioning, navigation, and release cycle. Running separate documentation sites for each product creates duplication: separate CI pipelines, separate theme configs, separate deployment jobs.

## Why it matters

Fragmented documentation is hard to maintain and confusing for users. If the SDK docs look different from the platform docs, users lose confidence. If every project needs its own CI job, your engineering overhead scales with the number of products. A unified workspace solves both problems with a single config file.

## Approach

Use docmd's **Workspace mode**. Define all projects in a single root `docmd.config.json`. Set global defaults (theme, menubar, logo) once. Each project inherits them and may override what it needs. One build command produces a single deployable directory.

## Implementation

### 1. Repository Structure

```text
my-org-docs/
├── assets/                   ← shared logo, favicon, global CSS
├── main-docs/                ← prefix: /
│   ├── docmd.config.json
│   └── docs/
├── sdk-docs/                 ← prefix: /sdk
│   ├── docmd.config.json
│   └── docs/
├── cli-docs/                 ← prefix: /cli
│   ├── docmd.config.json
│   └── docs/
├── docmd.config.json         ← workspace root
└── package.json
```

### 2. Root Workspace Config

Define global settings once. All projects inherit these automatically.

```json
{
  "workspace": {
    "projects": [
      { "prefix": "/",    "src": "main-docs", "title": "Platform Docs" },
      { "prefix": "/sdk", "src": "sdk-docs",  "title": "SDK Reference" },
      { "prefix": "/cli", "src": "cli-docs",  "title": "CLI Reference" }
    ],
    "switcher": {
      "enabled": true,
      "position": "sidebar-top"
    }
  },
  "theme": { "name": "default", "appearance": "system" },
  "logo": {
    "light": "assets/logo-dark.svg",
    "dark": "assets/logo-light.svg",
    "alt": "My Org"
  },
  "menubar": [
    { "text": "Platform", "url": "/" },
    { "text": "SDK",      "url": "/sdk" },
    { "text": "CLI",      "url": "/cli" }
  ]
}
```

### 3. Per-Project Config

Each project only specifies what differs from the root. This example for the SDK project adds OpenAPI support and sets its own `title`:

```json
{
  "title": "SDK Reference",
  "src": "docs",
  "plugins": {
    "search": {},
    "openapi": {},
    "git": { "repo": "https://github.com/my-org/sdk" }
  },
  "versions": {
    "current": "v2",
    "all": [
      { "id": "v2", "dir": "docs",    "label": "v2.x (Stable)" },
      { "id": "v1", "dir": "docs-v1", "label": "v1.x (Legacy)" }
    ]
  }
}
```

The global `theme`, `logo`, and `menubar` from the root config are still applied. The SDK project just adds its own plugins and versions on top.

### 4. Build & CI

Build the entire workspace with a single command:

```bash
npx @docmd/core build
```

For CI/CD, a minimal GitHub Actions workflow:

```yaml
name: Deploy Docs
on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'
      - run: npm install
      - run: npx @docmd/core build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: site/
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
    steps:
      - uses: actions/deploy-pages@v4
```

Or generate the workflow automatically:

```bash
npx @docmd/core deploy --github-pages
```

### 5. Per-Project Targeted Dev Rebuilds

During development, file changes trigger targeted rebuilds for the affected project only:

```bash
npx @docmd/core dev
```

- Changing a file in `sdk-docs/docs/` only rebuilds the SDK project.
- Changing the root `docmd.config.json` triggers a full workspace rebuild.
- Changing a shared `assets/` file rebuilds all projects.

### 6. Project Switcher

The built-in Project Switcher lets users navigate between projects without leaving the documentation site. It is automatically populated from the `projects` array in the root config. Each entry's `title` field is used as the display label.

```json
"switcher": {
  "enabled": true,
  "position": "sidebar-top"
}
```

Available positions: `sidebar-top` (default), `sidebar-bottom`, `options-menu`.

## Trade-offs

### Build Time
Building 3 projects takes roughly 3× the time of a single project. For very large workspaces (10+ projects), consider splitting into separate CI jobs that publish to a shared CDN path.

### Prefix Conflicts
If your root project has a folder named `sdk/` and you also define a project with `prefix: "/sdk"`, the prefixed project wins. The engine emits a warning. Review your directory structure before adding new prefixes.

### Shared Navigation
A global `navigation` array in the root config is useful as a fallback. However, each project should ideally maintain its own `navigation.json` for precise control. See [Navigation Configuration](../../configuration/navigation.md).
