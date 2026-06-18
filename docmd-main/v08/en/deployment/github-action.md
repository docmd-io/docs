---
title: "GitHub Action"
description: "Use the official docmd GitHub Action to build and deploy your documentation to GitHub Pages — zero config, one composable step."
---

The `docmd-io/deploy` action builds your documentation site and outputs the path to the compiled assets, ready for upload to GitHub Pages or any other hosting target. It handles Node.js setup, config detection, dependency installation, and the build step in a single composable action.

::: button "View on GitHub Marketplace" external:https://github.com/marketplace/actions/build-and-deploy-documentation-with-docmd icon:github
::: button "Source Code" external:https://github.com/docmd-io/deploy icon:code

::: callout tip "Starting a new project?"
Use the [Starter Template](./starter-template) — it includes a pre-configured workflow file and a ready-to-go repository structure. The GitHub Action is best for adding docmd deployment to an **existing** repository.
:::

## Quick Start

Add the action to any workflow file in your repository:

```yaml ".github/workflows/docs.yml"
# .github/workflows/docs.yml
name: Deploy Docs

on:
  push:
    branches: [main]

permissions:
  contents: write
  pages: write
  id-token: write

jobs:
  docs:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deploy.outputs.page_url }}
    steps:
      - uses: actions/checkout@v4

      - uses: docmd-io/deploy@v1
        id: build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: ${{ steps.build.outputs.site-dir }}

      - uses: actions/deploy-pages@v4
        id: deploy
```

## Reusable Workflow

For the absolute minimum boilerplate, use the hosted reusable workflow. It handles permissions, checkout, build, upload, and deploy in one call:

```yaml ".github/workflows/docs.yml"
# .github/workflows/docs.yml
on:
  push:
    branches: [main]

jobs:
  docs:
    uses: docmd-io/deploy/.github/workflows/deploy.yml@v1
```

## Inputs

| Input | Default | Description |
|-------|---------|-------------|
| `node` | `20` | Node.js version to use during the build |

## Outputs

| Output | Description |
|--------|-------------|
| `site-dir` | Relative path to the compiled site directory (e.g. `site/`) |

## What the Action Does

The action runs the following steps internally:

1. **Sets up Node.js** using the specified version.
2. **Detects your config** — searches the repository tree (up to two levels deep) for `docmd.config.json`, `docmd.config.js`, or `docmd.config.ts`. Subdirectory configs are fully supported.
3. **Initialises docmd** — if no config is found, runs `npx @docmd/core init` to scaffold one automatically.
4. **Installs dependencies** — runs `npm ci` if a `package.json` is present, otherwise installs `@docmd/core` directly.
5. **Builds the site** — runs `npx @docmd/core build` and reads the output directory from your config.
6. **Outputs the path** — exposes `site-dir` so the upload step knows where to find the compiled assets.

## First-Time Setup

GitHub Pages must be configured to deploy from **GitHub Actions** (not from a branch). This is a one-time step per repository:

1. Go to your repository on GitHub.
2. Navigate to **Settings → Pages**.
3. Under **Source**, select **GitHub Actions**.
4. Save.

After this, every push to `main` triggers a deployment automatically.

## Nested Config Support

If your `docmd.config.json` lives in a subdirectory — for example, `packages/docs/docmd.config.json` in a monorepo — the action detects it and passes `--cwd` to docmd automatically. No manual path configuration is required.

## Custom Domain

To use a custom domain:

1. Add a `CNAME` file to your `docs/` directory (or your configured assets folder) containing your domain, e.g. `docs.example.com`.
2. Set the `url` field in `docmd.config.json` to your custom domain so sitemaps and canonical tags are correct.
3. Configure the domain in **Settings → Pages → Custom domain**.

## Pinning the Action Version

For production documentation sites, pin to a specific release tag rather than `@v1`:

```yaml ".github/workflows/docs.yml"
- uses: docmd-io/deploy@v1.0.0
  id: build
```

This prevents unexpected behaviour from future minor updates.

## Troubleshooting

**`Error: Dependencies lock file is not found`**

This occurs when `actions/setup-node` is configured with `cache: 'npm'` but no `package-lock.json` exists. The `docmd-io/deploy` action handles caching internally — do not add a separate `actions/setup-node` step with `cache: 'npm'` when using this action.

**Build succeeds but the site is not live**

Ensure GitHub Pages is set to deploy from **GitHub Actions**, not from a branch. See [First-Time Setup](#first-time-setup) above.

**Config not detected**

The action searches up to two directory levels. If your config is deeper, pass `--cwd` manually in a custom workflow step or use the [Deployer](./deployer) to generate a tailored workflow file.