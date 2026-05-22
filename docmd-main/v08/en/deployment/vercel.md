---
title: "Vercel"
description: "Deploy your docmd documentation to Vercel using a generated vercel.json."
---

`npx @docmd/core deploy --vercel` generates a `vercel.json` file at the root of your project. It is automatically configured for your site's output directory and SPA routing settings.

```bash
npx @docmd/core deploy --vercel
```

## What Gets Generated

The `vercel.json` configures:

- **Build command** - runs `npx @docmd/core build`.
- **Output directory** - set to the `out` property in your config.
- **Install command** - installs the exact `@docmd/core` version used.
- **Cache headers** - immutable caching for assets, no-cache for HTML.
- **SPA routing** - a catch-all route to `index.html` when `layout.spa` is enabled.

## Deploying

After generating the file, deploy using the [Vercel CLI](external:https://vercel.com/docs/cli):

```bash
npm install -g vercel
vercel
```

Alternatively, connect your repository to Vercel from the dashboard. It detects the `vercel.json` automatically.

## Re-generating

If you change your `out` directory or `url` in `docmd.config.json`, re-run the command to regenerate the file. This keeps the configuration in sync.