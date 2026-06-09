---
title: "Starter Template"
description: "Use the official docmd starter template to create a pre-configured documentation site with GitHub Pages deployment in under a minute."
---

# docmd Starter Template

The `docmd-template` repository is the fastest way to start a new documentation site. It includes a working `docmd.config.json`, a sample page, a `package.json` for local development, and a pre-configured GitHub Actions workflow that deploys to GitHub Pages automatically on every push.

::: button "Use this Template" external:https://github.com/docmd-io/docmd-template/generate icon:github color:#2ea44f
::: button "View Repository" external:https://github.com/docmd-io/docmd-template icon:external-link

## Getting Started

### 1. Create Your Repository

Click **[Use this template](https://github.com/docmd-io/docmd-template/generate)** on GitHub. Give your repository a name and click **Create repository**. You do not need to fork it — the template creates a clean, independent copy.

### 2. Configure Your Site

Open `docmd.config.json` in your new repository and update the `title` and `url` fields:

```json
{
  "title": "My Docs",
  "url": "https://username.github.io/repo-name"
}
```

Replace `username` and `repo-name` with your GitHub username and repository name.

### 3. Enable GitHub Pages

This is a one-time step per repository:

1. Go to **Settings → Pages**.
2. Under **Source**, select **GitHub Actions**.
3. Save.

### 4. Push and Deploy

Push any change to `main`. The included workflow builds your site and deploys it to GitHub Pages automatically. Your documentation will be live at:

```
https://<username>.github.io/<repo-name>/
```

## What's Included

```
.github/
  workflows/
    docs.yml          # Automated build and deploy on push to main
docmd.config.json     # Site title, URL, and output directory
docs/
  index.md            # Your first documentation page
package.json          # Local development scripts
```

## Local Development

Clone your repository and run the development server:

```bash
npm install
npm run dev
```

The site is available at `http://localhost:3000` with live reload. Changes to Markdown files are reflected immediately.

To build a production copy locally:

```bash
npm run build
```

The compiled site is written to `site/` by default.

## Included Workflow

The template ships with `.github/workflows/docs.yml`:

```yaml
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
          node-version: 20

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

The workflow installs `@docmd/core` directly without a lock file, which is intentional — the template has no committed `package-lock.json` so `actions/setup-node` caching is not used. This keeps the template dependency-free whilst still deploying reliably.

## Adding Your First Page

Create a new Markdown file in `docs/`:

```bash
docs/
  index.md        # Home page
  getting-started.md
  api-reference.md
```

Add a `navigation.json` to control the sidebar:

```json
[
  { "title": "Home", "path": "/" },
  { "title": "Getting Started", "path": "/getting-started" },
  { "title": "API Reference", "path": "/api-reference" }
]
```

See [Navigation Configuration](../configuration/navigation.md) for the full navigation schema.

## Custom Domain

To use a custom domain (e.g. `docs.example.com`):

1. Update the `url` field in `docmd.config.json`:
   ```json
   { "url": "https://docs.example.com" }
   ```
2. Add a `CNAME` file to your `docs/` directory containing your domain.
3. Configure the domain in **Settings → Pages → Custom domain**.

## Starter Template vs GitHub Action

The template gives you full ownership of the workflow file and config from the start. The [GitHub Action](./github-action) is better suited for adding docmd deployment to an existing repository without restructuring it.

| | Starter Template | GitHub Action |
|---|---|---|
| Starting point | New repository | Existing repository |
| Workflow file | Included, yours to edit | You write it, action handles build |
| Config | Pre-configured | Detected or scaffolded automatically |
| Best for | New projects | Adding docs to existing repos |