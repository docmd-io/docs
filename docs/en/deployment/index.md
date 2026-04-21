---
title: "Deployment"
description: "Host your docmd documentation on platforms like GitHub Pages, Vercel, Netlify, and Cloudflare Pages."
---

Because `docmd` generates a high-performance static website, it can be hosted on any environment that serves HTML. Simply run the base build command to generate the raw `site/` directory:

```bash
docmd build
```

## Automated Deployment Configurations

::: callout warning "Version Requirement"
The `docmd deploy` command was introduced in **v0.7.2**.
:::

While `docmd build` gives you the raw files, actually deploying them to a self-hosted server or container usually requires writing tedious configuration files. `docmd` drastically solves this by scaffolding production-ready environments for you automatically.

Run the native core command in your terminal to bootstrap a configuration profile:

```bash
docmd deploy [target]
```

### Supported Offline Targets
We currently support generating configuration files for the following popular offline and self-hosted environments:

*   [`docmd deploy --docker`](./docker) - Generates an optimized, multi-stage `Dockerfile` and `.dockerignore`.
*   [`docmd deploy --nginx`](./nginx) - Generates an `nginx.conf` with security headers, GZIP, and caching policies.
*   [`docmd deploy --caddy`](./caddy) - Generates a `Caddyfile` for automated routing.

Use the `--force` flag if you need to overwrite existing deployment files:

```bash
docmd deploy --docker --force
```

Please click on the respective target above for detailed, service-specific documentation.

*(Note: Cloud API deployment commands like `--vercel` and `--netlify` are currently in development for Phase 2).*

## Cloud Hosting & CI/CD
If you do not want to manage your own servers (Docker, Nginx), you can deploy your `site/` folder directly to cloud platforms like GitHub Pages, Vercel, Netlify, or Cloudflare.

For detailed instructions on configuring Automated GitHub Actions or importing to Cloud Dashboards, see our [CI/CD Deployment Guide](./ci-cd).

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