---
title: "Deployment"
description: "Host your docmd documentation on platforms like GitHub Pages, Vercel, Netlify, and Cloudflare Pages."
---

Because `docmd` generates a high-performance static website, it can be hosted on any environment that serves HTML. Simply run the build command and deploy the output directory (Default: `site/`).

```bash
docmd build
```

## Hosting Providers

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
5.  Configure as a single-page app: `Yes` (this handles the 404 behavior).
6.  Deploy using `firebase deploy`.

== tab "Static Server"

For traditional web servers (NGINX, Apache, IIS):

1.  Generate the site: `npx @docmd/core build`.
2.  Upload the contents of the `site/` folder to your server via SFTP, SCP, or your preferred CI/CD tool.
3.  Ensure your server is configured to serve `index.html` for directories (the default for most).

== tab "Docker"

For self-hosting within a containerized environment, you can use a simple Nginx-based Dockerfile:

```dockerfile
# Build Stage
FROM node:22-alpine AS builder
WORKDIR /app
COPY . .
RUN npx @docmd/core build

# Serve Stage
FROM nginx:alpine
COPY --from=builder /app/site /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

:::

## SPA Routing Considerations

`docmd` implements a micro-SPA router that handles internal navigation smoothly. Unlike React-based SPAs, every page in `docmd` is generated as its own `index.html` file on the filesystem. This means:

- **No Rewrite Rules**: You don't need to configure `index.html` rewrites on your server for most platforms.
- **Deep Linking**: Direct access to URLs like `/guide/setup` works out of the box because the server finds `/guide/setup/index.html`.

## Production Checklist

1.  **Site URL**: Ensure the `url` property is set in your `docmd.config.js`. This is critical for generating correct canonical tags, sitemaps, and social preview images.
2.  **Redirects**: If you are migrating from another tool, use the `redirects` config to maintain your SEO rankings.
3.  **Analytics**: Enable the `analytics` plugin to track user engagement and search queries.
4.  **AI Ingress**: Enable the `llms` plugin to generate `llms.txt`. This allows AI agents to ingest your documentation more efficiently, providing better answers to your users.

::: callout tip "Custom 404 Pages"
`docmd` automatically generates a `404.html` in your output directory. Most hosting providers (GitHub Pages, Netlify, Vercel) will automatically use this file when a user hits a missing route.
:::