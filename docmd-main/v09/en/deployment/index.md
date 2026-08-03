---
title: "Deployment Overview"
description: "Choose how to deploy your docmd documentation site — from zero-config templates to self-hosted servers and cloud platforms."
---

docmd builds a fully static site. The output is a self-contained folder (default: `site/`) that can be hosted anywhere — no server-side runtime required.

```bash
npx @docmd/core build
```

## Choosing a Deployment Method

There are three main paths depending on your situation:

| Method | Best For |
|:--|:--|
| [Starter Template](./starter-template) | Starting a new project from scratch |
| [GitHub Action](./github-action) | Adding automated deployment to an existing repository |
| [Deployer](./deployer) | Generating server configs (Docker, Nginx, Caddy, Vercel, Netlify) |

## Starter Template

The fastest way to get started. Clone the official template repository — it includes a `docmd.config.json`, a sample page, and a pre-configured GitHub Actions workflow that deploys to GitHub Pages on every push.

→ [Starter Template](./starter-template)

## GitHub Action

The `docmd-io/deploy` action builds your site and outputs the compiled path, ready for upload to GitHub Pages or any other target. Use this to add docmd deployment to an existing repository without changing your project structure.

→ [GitHub Action](./github-action)

## Deployer

The `deploy` command reads your `docmd.config.json` and generates provider-specific configuration files tailored to your project. No generic templates — every file reflects your actual output directory, site URL, and SPA settings.

```bash
# Self-hosted
npx @docmd/core deploy --docker          # Dockerfile + .dockerignore
npx @docmd/core deploy --nginx           # Production nginx.conf
npx @docmd/core deploy --caddy           # Production Caddyfile

# Cloud / CI
npx @docmd/core deploy --github-pages    # GitHub Actions workflow
npx @docmd/core deploy --vercel          # vercel.json
npx @docmd/core deploy --netlify         # netlify.toml
```

→ [Deployer Reference](./deployer)

## Cloud Platforms

For managed hosting without running your own server:

- [Docker Image](./docker) — Official multi-arch image for containerised deployments
- [NGINX](./nginx) — Self-hosted with generated config
- [Caddy](./caddy) — Self-hosted with automatic HTTPS
- [Vercel](./vercel) — Zero-config cloud deployment
- [Netlify](./netlify) — Git-connected continuous deployment
- [Cloudflare Pages](./cloudflare-pages) — Edge-native hosting with built-in CI/CD
- [Firebase Hosting](./firebase) — Google CDN with GitHub Actions integration

## Production Checklist

1. **Site URL** — Set `url` in `docmd.config.json`. This drives canonical tags, sitemaps, social previews, and generated deployment files.
2. **Redirects** — Migrating from another tool? Use the `redirects` config to preserve SEO rankings.
3. **Analytics** — Enable the `analytics` plugin to track engagement and search queries.
4. **AI Context** — Enable the `llms` plugin to generate `llms.txt` for AI agent ingestion.

::: callout tip "Custom 404 Pages"
docmd writes a `404.html` into your output directory. Most static hosts serve it automatically for missing routes.
:::