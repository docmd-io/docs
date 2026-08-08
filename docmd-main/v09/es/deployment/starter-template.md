---
title: "Starter Template"
description: "Initialise new documentation repositories using the official docmd starter template with GitHub Pages deployment."
---

The `docmd-template` repository provides a turn-key starting point for docmd projects. It ships with a pre-configured `docmd.config.json`, sample Markdown pages, local development scripts, and an automated GitHub Actions deployment workflow.

::: button "Use this Template" external:https://github.com/docmd-io/docmd-template/generate icon:github color:#2ea44f
::: button "View Repository" external:https://github.com/docmd-io/docmd-template icon:external-link

## Quick Start Setup

### 1. Generate Repository

Click **[Use this template](https://github.com/docmd-io/docmd-template/generate)** on GitHub to create a fresh, un-forked copy of the repository under your account.

### 2. Configure Parameters

Update `docmd.config.json` with your project title and target URL:

```json "docmd.config.json"
{
  "title": "My Docs",
  "url": "https://<username>.github.io/<repository>"
}
```

### 3. Enable GitHub Pages

Configure Pages publishing settings in GitHub:

1. Navigate to **Settings → Pages**.
2. Under **Source**, select **GitHub Actions**.
3. Save choices.

### 4. Commit & Publish

Push commits to `main`. The included workflow compiles your site and publishes to:

```text
https://<username>.github.io/<repository>/
```

## Repository Structure

```text
.github/
  workflows/
    docs.yml          # Automated CI/CD build and publish workflow
docmd.config.json     # Configuration file
docs/
  index.md            # Default landing page
package.json          # Development scripts
```

## Local Development Workflow

Clone your repository locally and start the dev server:

```bash
npm install
npm run dev
```

The site serves locally at `http://localhost:3000` with hot-reloading.

To verify a production compilation locally:

```bash
npm run build
```

The output directory builds to `site/` by default.

## CI/CD Deployment Workflow

The template includes `.github/workflows/docs.yml`:

```yaml ".github/workflows/docs.yml"
name: Docs

on:
  push:
    branches: [main, master]
  workflow_dispatch:

permissions:
  contents: write
  pages: write
  id-token: write

concurrency:
  group: docs
  cancel-in-progress: false

jobs:
  deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deploy.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: 24

      - name: Install
        run: npm install @docmd/core

      - name: Build
        run: npx @docmd/core build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./site

      - name: Deploy
        id: deploy
        uses: actions/deploy-pages@v4
```

## Custom Domains

To bind a custom domain (e.g. `docs.example.com`):

1. Set `url` in `docmd.config.json`:
   ```json
   { "url": "https://docs.example.com" }
   ```
2. Commit a `CNAME` file containing your domain inside `docs/`.
3. Set domain routing in **Settings → Pages → Custom domain**.

::: callout tip "Template vs GitHub Action" icon:git-branch
The starter template provides a ready-made repository layout for new projects. If you are adding documentation to an existing codebase, use the [GitHub Action](./github-action) directly.
:::