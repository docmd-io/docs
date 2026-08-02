---
title: "Netlify"
description: "Deploy your docmd documentation to Netlify using a generated netlify.toml."
---

`npx @docmd/core deploy --netlify` generates a `netlify.toml` file at the root of your project. It is pre-configured with the correct build command, publish directory, cache headers, and SPA redirects.

```bash
npx @docmd/core deploy --netlify
```

## What Gets Generated

The `netlify.toml` configures:

- **Build command** - installs `@docmd/core` and runs `npx @docmd/core build`.
- **Publish directory** - set to your configured `out` directory.
- **Node version** - pinned to Node 20.
- **Cache headers** - immutable for assets, no-cache for HTML pages.
- **SPA redirects** - a `/*` → `/index.html` rewrite when `layout.spa` is enabled.

## Deploying

Connect your repository to Netlify from the [Netlify dashboard](external:https://app.netlify.com). It detects the `netlify.toml` automatically and deploys on every push.

Alternatively, use the [Netlify CLI](external:https://docs.netlify.com/cli/get-started/):

```bash
npm install -g netlify-cli
netlify deploy --prod
```

## Re-generating

Re-run `npx @docmd/core deploy --netlify` any time you change `out` or other config fields. This keeps `netlify.toml` in sync.