---
title: "Netlify Deployment"
description: "Deploy docmd documentation to Netlify using generated netlify.toml configurations."
---

Generate Netlify build manifests matching your project configuration:

```bash
npx @docmd/core deploy --netlify
```

## Generated Configuration

The emitted `netlify.toml` file configures build environments, output directories, and header controls:

* **Build Command**: Runs `npm install @docmd/core && npx @docmd/core build`.
* **Publish Directory**: Synchronised with `config.out` (`site`).
* **Header Policies**: Enforces immutable caching for static assets and no-cache rules for HTML entries.
* **Redirect Rules**: Configures `/*` → `/index.html` rewrites when `layout.spa: true`.

```toml "netlify.toml"
[build]
  command = "npx @docmd/core build"
  publish = "site"

[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000, immutable"
```

## Deployment Execution

Connect your Git repository in Netlify for automated builds on push, or deploy via Netlify CLI:

```bash
npm install -g netlify-cli
netlify deploy --prod
```

::: callout tip "Re-generation" icon:refresh-cw
Re-run `npx @docmd/core deploy --netlify --force` whenever modifying `out` or `url` values in `docmd.config.json`.
:::