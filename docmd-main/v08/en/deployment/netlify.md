---
title: "Netlify"
description: "Deploy your docmd documentation to Netlify using a generated netlify.toml. Supports CI/CD via Git integration — auto-deploys on every push."
---

`docmd deploy --netlify` generates a `netlify.toml` file at the root of your project, pre-configured with the correct build command, publish directory, cache headers, and SPA redirects.

```bash
docmd deploy --netlify
```

## What Gets Generated

The `netlify.toml` configures:

- **Build command** — installs `@docmd/core` and runs `docmd build`
- **Publish directory** — set to your configured `out` directory
- **Node version** — pinned to Node 20
- **Cache headers** — immutable for assets, no-cache for HTML pages
- **SPA redirects** — a `/*` → `/index.html` rewrite when `layout.spa` is enabled

## Deploying

Connect your repository to Netlify from the [Netlify dashboard](external:https://app.netlify.com). It will pick up the `netlify.toml` automatically and deploy on every push.

Alternatively, use the [Netlify CLI](external:https://docs.netlify.com/cli/get-started/):

```bash
npm install -g netlify-cli
netlify deploy --prod
```

## Re-generating

Re-run `docmd deploy --netlify` any time you change `out` or other relevant config fields to keep `netlify.toml` in sync.