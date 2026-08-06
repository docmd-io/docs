---
title: "GitHub Action"
description: "Build and deploy docmd documentation to GitHub Pages using the official docmd-io/deploy GitHub Action."
---

The `docmd-io/deploy` GitHub Action compiles your documentation site and exposes the generated build artifact path for downstream publishing steps.

::: button "View on GitHub Marketplace" external:https://github.com/marketplace/actions/build-and-deploy-documentation-with-docmd icon:github
::: button "Source Code" external:https://github.com/docmd-io/deploy icon:code

::: callout tip "Starting a New Project?" icon:rocket
Use the [Starter Template](./starter-template) for new repositories. The standalone GitHub Action is designed for integrating docmd compilation into **existing** repositories.
:::

## Workflow Configuration

Add the action to `.github/workflows/docs.yml`:

```yaml ".github/workflows/docs.yml"
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

## Reusable Workflow Pattern

For zero-boilerplate setups, reference the hosted reusable workflow:

```yaml ".github/workflows/docs.yml"
on:
  push:
    branches: [main]

jobs:
  docs:
    uses: docmd-io/deploy/.github/workflows/deploy.yml@v1
```

## Action Inputs & Outputs

### Inputs

| Parameter | Type | Default | Technical Description |
| :--- | :--- | :--- | :--- |
| `node` | `string` | `"20"` | Target Node.js engine version for build execution. |

### Outputs

| Parameter | Technical Description |
| :--- | :--- |
| `site-dir` | Relative path to the compiled static site output directory (e.g. `site/`). |

## Build Execution Steps

The action executes the following internal workflow:

1. **Environment Setup**: Configures the specified Node.js runtime version.
2. **Config Auto-Detection**: Searches up to 2 directory levels deep for `docmd.config.json`, `docmd.config.js`, or `docmd.config.ts`.
3. **Automatic Initialisation**: If no configuration is discovered, triggers `npx @docmd/core init` automatically.
4. **Dependency Resolution**: Runs `npm ci` if `package.json` exists; otherwise installs `@docmd/core` directly.
5. **Static Site Build**: Triggers `npx @docmd/core build` and captures output directory locations.

## GitHub Pages Repository Setup

Configure GitHub Pages to deploy from **GitHub Actions**:

1. Open your repository on GitHub.
2. Navigate to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.

## Subpath & Custom Domain Configuration

### Subpath Deployment

GitHub Pages serves project sites under subpaths (`https://<username>.github.io/<repository>/`). Specify your complete site URL in `docmd.config.json`:

```json "docmd.config.json"
{
  "url": "https://username.github.io/my-repo"
}
```

docmd extracts the `/my-repo/` path prefix automatically and applies it to internal asset references and navigation links.

### Custom Domains

To configure a custom domain:

1. Add a `CNAME` file containing your hostname (e.g. `docs.example.com`) inside `docs/`.
2. Update the `url` property in `docmd.config.json` to match your domain.
3. Configure the custom domain under **Settings → Pages → Custom domain**.

::: callout tip "Pinning Action Releases" icon:shield-check
For production environments, pin your workflow steps to explicit version tags (e.g. `uses: docmd-io/deploy@v1.0.0`) to guard against unintended breaking changes.
:::