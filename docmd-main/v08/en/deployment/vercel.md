---
title: "Vercel"
description: "Deploy your docmd documentation to Vercel using a generated vercel.json. Supports CI/CD via Git integration — push to deploy automatically."
---

`docmd deploy --vercel` generates a `vercel.json` file at the root of your project, configured for your site's output directory and SPA routing settings.

```bash
docmd deploy --vercel
```

## What Gets Generated

The `vercel.json` configures:

- **Build command** — runs `docmd build`
- **Output directory** — set to whatever `out` is in your `docmd.config.json`
- **Install command** — installs the exact `@docmd/core` version used
- **Cache headers** — immutable caching for assets, no-cache for HTML
- **SPA routing** — a catch-all route to `index.html` when `layout.spa` is enabled

## Deploying

After generating the file, deploy using the [Vercel CLI](external:https://vercel.com/docs/cli):

```bash
npm install -g vercel
vercel
```

Or connect your repository to Vercel from the dashboard - it will detect the `vercel.json` automatically.

## Re-generating

If you change your `out` directory or `url` in `docmd.config.json`, re-run the command to regenerate the file and keep the configuration in sync.