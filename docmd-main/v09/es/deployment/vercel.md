---
title: "Vercel Deployment"
description: "Deploy docmd static documentation sites to Vercel using generated vercel.json configurations."
---

Generate production deployment manifests for Vercel using the Deployer CLI tool:

```bash
npx @docmd/core deploy --vercel
```

## Generated Configuration

The emitted `vercel.json` configures build commands, publish directories, and routing policies:

* **Build Execution**: Runs `npx @docmd/core build`.
* **Output Path**: Automatically resolves your `out` property (defaults to `site`).
* **Cache Headers**: Immutably caches static assets (`/assets/*`) whilst forcing revalidation for HTML documents.
* **SPA Rules**: Appends catch-all route rewriting when `layout.spa: true`.

```json "vercel.json"
{
  "buildCommand": "npx @docmd/core build",
  "outputDirectory": "site",
  "cleanUrls": true
}
```

## Deployment Execution

Publish to Vercel using the CLI or dashboard integration:

```bash
npm install -g vercel
vercel --prod
```

Alternatively, link your Git repository in the Vercel Dashboard. Vercel detects `vercel.json` and manages CI/CD triggers automatically.

::: callout tip "Re-generation" icon:refresh-cw
Re-run `npx @docmd/core deploy --vercel --force` after modifying `out` or `url` options inside `docmd.config.json`.
:::