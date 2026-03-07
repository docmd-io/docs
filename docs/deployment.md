---
title: "Deployment (Deploy Your Website)"
description: "Learn how to deploy your docmd-generated static site to modern hosting platforms like GitHub Pages, Vercel, and Netlify."
---

Because `docmd` generates a pure static site, you can host your documentation literally anywhere that serves HTML. Run the build command and serve the output directory (default: `site/`).

```bash
docmd build
```

::: tabs

== tab "GitHub Pages"
The most robust way is using a **GitHub Action**. This ensures your site rebuilds automatically every time you push.

**Create `.github/workflows/deploy-docs.yml`**

```yaml
name: Deploy docmd
on:
  push:
    branches: ["main"]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22', cache: 'npm' }
      - run: npm install -g @docmd/core
      - run: docmd build 
      - uses: actions/upload-pages-artifact@v3
        with: { path: ./site }
      - uses: actions/deploy-pages@v4
```

== tab "Vercel"
1. Connect your GitHub repository.
2. Under Build Settings:
   * **Build Command:** `npm install -g @docmd/core && docmd build`
   * **Output Directory:** `site`
3. Click **Deploy**.

== tab "Traditional Server"
1. Run `docmd build`.
2. Copy the contents of `site/` to your public directory (e.g., `/var/www/html/docs`).

::: callout tip "SPA Routing"
`docmd`'s Single Page Application (SPA) router handles direct URL access gracefully. You **do not** need complex rewrite rules (like `index.html` redirects) on your server.
:::

:::


## Site URL Configuration

Always ensure your `siteUrl` is set accurately in `docmd.config.js` if you are using plugins like `sitemap` or `seo` that require absolute URLs.

::: callout tip "AI-Ready Deployments 🤖"
When deploying to staging or production, run `docmd build` with the `llms` plugin active. This ensures that even your staging environments provide AI-consumable context via `/llms.txt`, allowing your testing agents to verify your documentation accuracy before going live.
:::