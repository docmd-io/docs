---
title: "CI/CD Pipelines"
description: "Automate documentation builds and deployments with CI/CD pipelines for GitHub Pages, Vercel, Netlify, and more."
---

Use CI/CD workflows to automatically build and deploy your `docmd` site every time you push changes. Below are ready-to-use configurations for popular cloud platforms.

## Cloud Platforms

::: tabs

== tab "GitHub Pages"

The recommended method is using **GitHub Actions** to automate your deployments on every push.

**Create `.github/workflows/deploy.yml`:**

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
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: '22' }
      - run: npx @docmd/core build
      - uses: actions/upload-pages-artifact@v3
        with: { path: ./site }
      - uses: actions/deploy-pages@v4
```

== tab "Vercel"

1.  Connect your repository to Vercel.
2.  In the project **Build Settings**:
    - **Framework Preset**: `Other`
    - **Build Command**: `npx @docmd/core build`
    - **Output Directory**: `site`
3.  Deploy. Vercel automatically detects the static output and serves it globally.

== tab "Netlify"

1.  Import your project from GitHub/GitLab/Bitbucket.
2.  Configure your build settings:
    - **Build command**: `npx @docmd/core build`
    - **Publish directory**: `site`
3.  Click **Deploy site**. Netlify's CDN will handle the routing and asset delivery.

== tab "Cloudflare Pages"

1.  Create a new project in the Cloudflare Dashboard under **Pages**.
2.  Connect your git provider and select your repository.
3.  Configure the build settings:
    - **Framework preset**: `None`
    - **Build command**: `npx @docmd/core build`
    - **Build output directory**: `site`
4.  Save and Deploy.

== tab "Firebase"

1.  Install the Firebase CLI: `npm install -g firebase-tools`.
2.  Build your site: `npx @docmd/core build`.
3.  Run `firebase init hosting` and select your project.
4.  Set the public directory to `site`.
5.  Configure as a single-page app: `Yes` (this handles the 404 behaviour).
6.  Deploy using `firebase deploy`.

:::

::: callout info "Why npx @docmd/core?"
In CI/CD environments where `docmd` is not globally installed, use `npx @docmd/core` to run the scoped package directly. If your project has `@docmd/core` listed as a `devDependency`, simply using `docmd build` after `npm install` will also work.
:::

## Manual / Static Server

For traditional web servers (NGINX, Apache, IIS):

1.  Generate the site: `npx @docmd/core build`.
2.  Upload the contents of the `site/` folder to your server via SFTP, SCP, or your preferred deployment tool.
3.  Ensure your server is configured to serve `index.html` for directories (the default for most).

For self-hosted environments like Docker, NGINX, or Caddy, see the dedicated [Deployment guides](index.md).