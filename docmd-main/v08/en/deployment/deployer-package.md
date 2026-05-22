---
title: "Deploying with the Deployer Package"
description: "How docmd's modular @docmd/deployer package generates provider-specific deployment configurations automatically from your project config."
---

## Overview

docmd ships with a dedicated `@docmd/deployer` package. It reads your `docmd.config.json` and generates provider-specific deployment files automatically. Every generated file is personalised to your exact configuration - your output directory, site URL, SPA routing rules, and Node.js version are all reflected without manual editing.

## Supported Providers

| Provider | Command Flag | Files Generated |
| :------- | :----------- | :-------------- |
| Docker + Nginx | `--docker` | `Dockerfile`, `.dockerignore` |
| Nginx | `--nginx` | `nginx.conf` |
| Caddy | `--caddy` | `Caddyfile` |
| GitHub Pages | `--github-pages` | `.github/workflows/deploy.yml` |
| Vercel | `--vercel` | `vercel.json` |
| Netlify | `--netlify` | `netlify.toml` |

## Usage

Run from your project root (where `docmd.config.json` lives):

```bash
# Single provider
npx @docmd/core deploy --github-pages

# Multiple providers at once
npx @docmd/core deploy --docker --nginx

# Overwrite existing files
npx @docmd/core deploy --vercel --force
```

## Provider Details

### GitHub Pages

```bash
npx @docmd/core deploy --github-pages
```

Generates `.github/workflows/deploy.yml` with a complete build-and-deploy pipeline. The workflow:
- Checks out your repository
- Installs Node.js (matching your project's required version)
- Runs `npx @docmd/core build`
- Uploads the output directory to GitHub Pages

### Vercel

```bash
npx @docmd/core deploy --vercel
```

Generates `vercel.json` with SPA routing rules (rewrites all paths to `index.html`) and your configured output directory.

### Netlify

```bash
npx @docmd/core deploy --netlify
```

Generates `netlify.toml` with your build command, publish directory, and SPA redirect rules.

### Docker

```bash
npx @docmd/core deploy --docker
```

Generates a `Dockerfile` using a multi-stage build:
1. **Build stage**: Installs your exact pinned `@docmd/core` version and runs the build.
2. **Serve stage**: Copies output into a minimal `nginx:alpine` image.

If an `nginx.conf` already exists in your project root, the Dockerfile automatically copies it into the container.

```bash
# Generate Docker and Nginx configs together
npx @docmd/core deploy --docker --nginx
```

### Nginx

```bash
npx @docmd/core deploy --nginx
```

Generates `nginx.conf` with SPA routing, gzip compression, and correct `root` path for your output directory.

### Caddy

```bash
npx @docmd/core deploy --caddy
```

Generates a `Caddyfile` with automatic HTTPS, SPA routing, and file serving from your output directory.

## Re-Generating

Changed your config? Re-run the same deploy command. Use `--force` to overwrite existing files:

```bash
npx @docmd/core deploy --docker --force
```

## Trade-offs

Generated configs are opinionated starting points. They are correct for the majority of docmd deployments but may require adjustments for advanced scenarios such as custom domains, CDN rewrites, or multi-region deployments. Always review generated files before deploying to production.
