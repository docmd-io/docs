---
title: "Deployer"
description: "Generate provider-specific deployment configuration files from your docmd project config with a single command."
---

The `deploy` command reads your `docmd.config.json` and generates deployment configuration files tailored to your exact project — output directory, site URL, SPA routing, and Node.js version are all reflected automatically. No generic templates.

## Supported Providers

| Provider | Flag | Files Generated |
| :------- | :--- | :-------------- |
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

## What Gets Personalised

The deploy command reads your configuration (or zero-config defaults) and injects:

| Config Field | Used In |
|:--|:--|
| `title` | Comment headers in every generated file |
| `out` | `COPY` paths in Dockerfile, `root` directives in Nginx/Caddy |
| `url` | `server_name` in Nginx, site address in Caddy |
| `layout.spa` | Controls whether SPA routing fallback is included |
| Config path | Dockerfile build step uses `--config` when non-default |

No `docmd.config.json`? No problem. The command uses the same zero-config defaults as `npx @docmd/core dev` and `npx @docmd/core build`.

## Always In Sync

Every run regenerates your deployment files to match your current config. Changed your site URL or output directory? Just re-run the deploy command. Use `--force` to overwrite existing files without prompts.

## Provider Details

### GitHub Pages

```bash
npx @docmd/core deploy --github-pages
```

Generates `.github/workflows/deploy.yml` with a complete build-and-deploy pipeline. The workflow checks out your repository, installs Node.js, runs `npx @docmd/core build`, and uploads the output to GitHub Pages.

::: callout tip "Using the GitHub Action instead?"
If you want to deploy to GitHub Pages without generating a workflow file yourself, use the [GitHub Action](./github-action) directly — it handles everything in one composable step.
:::

### Docker

```bash
npx @docmd/core deploy --docker
```

Generates a `Dockerfile` using a multi-stage build:
1. **Build stage** — installs your exact pinned `@docmd/core` version and runs the build.
2. **Serve stage** — copies the output into a minimal `nginx:alpine` image.

If an `nginx.conf` already exists in your project root, the Dockerfile automatically copies it into the container.

```bash
# Generate Docker and Nginx configs together
npx @docmd/core deploy --docker --nginx
```

::: callout tip "Official Docker Image"
Looking to run docmd in a container without building a custom image? See the [Docker Image](./docker) page for the official pre-built image.
:::

### Nginx

```bash
npx @docmd/core deploy --nginx
```

Generates `nginx.conf` with SPA routing, gzip compression, and correct `root` path for your output directory. See the [NGINX](./nginx) page for the full generated config.

### Caddy

```bash
npx @docmd/core deploy --caddy
```

Generates a `Caddyfile` with automatic HTTPS, SPA routing, and file serving from your output directory. See the [Caddy](./caddy) page for the full generated config.

### Vercel

```bash
npx @docmd/core deploy --vercel
```

Generates `vercel.json` with SPA routing rules and your configured output directory. See the [Vercel](./vercel) page for deployment steps.

### Netlify

```bash
npx @docmd/core deploy --netlify
```

Generates `netlify.toml` with your build command, publish directory, and SPA redirect rules. See the [Netlify](./netlify) page for deployment steps.

## Trade-offs

Generated configs are opinionated starting points. They are correct for the majority of docmd deployments but may require adjustments for advanced scenarios such as custom domains, CDN rewrites, or multi-region deployments. Always review generated files before deploying to production.