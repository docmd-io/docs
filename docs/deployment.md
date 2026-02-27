---
title: "Deployment"
description: "Learn how to deploy your docmd-generated static site to modern hosting platforms like GitHub Pages, Vercel, and Netlify."
---

# Deploying Your Site

Because `docmd` generates a pure, standard static site, you can host your documentation literally anywhere that serves HTML files. 

When you run the build command, `docmd` processes all your Markdown and places the final, production-ready website into your output directory (default: `site/`).

```bash
docmd build
```

The contents of this `site/` folder are all you need. Below are guides for deploying to the most popular modern hosting platforms.

::: tabs

== tab "GitHub Pages"
The most robust and automated way to deploy to GitHub Pages is using a **GitHub Actions** workflow. This ensures your site rebuilds automatically every time you push changes to your repository.

**1. Create the Workflow File**
Create a file in your repository at `.github/workflows/deploy-docs.yml` and add the following content:

```yaml
name: Deploy docmd to GitHub Pages

on:
  push:
    branches: ["main"] # Change this if your default branch is 'master'
  workflow_dispatch:   # Allows manual triggers

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Set up Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '22' # docmd requires Node 18+
          cache: 'npm'

      - name: Install docmd
        run: npm install -g @docmd/core

      - name: Build site
        run: docmd build 

      - name: Setup Pages
        uses: actions/configure-pages@v5

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./site # Your configured outputDir

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

**2. Configure Repository Settings**
Go to your repository settings on GitHub. Navigate to **Pages**, and under "Build and deployment", change the Source to **GitHub Actions**.

The next time you push to your `main` branch, your docs will automatically build and publish!

== tab "Vercel"
Vercel is an excellent platform for hosting static sites with zero configuration.

1. Push your `docmd` project to a Git repository (GitHub, GitLab, Bitbucket).
2. Log in to Vercel and click **Add New > Project**.
3. Import your repository.
4. Vercel usually detects Node.js projects automatically, but ensure the following settings are applied:
   * **Framework Preset:** `Other`
   * **Build Command:** `npm install -g @docmd/core && docmd build`
   * **Output Directory:** `site`
5. Click **Deploy**.

== tab "Netlify"
Netlify provides a seamless deployment experience for static site generators.

1. Push your `docmd` project to a Git repository.
2. Log in to Netlify and click **Add new site > Import an existing project**.
3. Connect your Git provider and select your repository.
4. Configure the build settings:
   * **Base directory:** *(Leave empty unless your docs are in a subfolder)*
   * **Build command:** `npm install -g @docmd/core && docmd build`
   * **Publish directory:** `site`
5. Click **Deploy site**.

== tab "Traditional Web Server"
If you are hosting your documentation on a traditional web server (like Apache, Nginx, or an AWS S3 bucket), deployment is as simple as moving files.

1. Run `docmd build` locally or in your CI/CD pipeline.
2. Copy the entire contents of the generated `site/` folder to your web server's public directory (e.g., `/var/www/html/docs`).

::: callout tip SPA Routing
`docmd`'s Single Page Application (SPA) router is built to gracefully degrade. You **do not** need to configure complex URL rewrite rules on your server (like you would for React or Vue apps). If a user accesses a URL directly, the static HTML file is served by the server, and the SPA takes over from there.
:::

:::

## Path Configuration (Subdirectories)

If you are not hosting your documentation at the root of a domain (e.g., you are hosting it at `https://mycompany.com/docs/` instead of `https://docs.mycompany.com/`), you must ensure your `docmd.config.js` reflects this so assets and relative links resolve correctly.

While `docmd` uses highly resilient relative pathing out of the box, always ensure your `siteUrl` is set accurately in your config if you are using plugins like `sitemap` or `seo` that require absolute URLs.