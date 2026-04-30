---
title: "Deployment"
description: "Deploy your docmd documentation to Docker, Nginx, Caddy, or any cloud platform with a single command."
---

`docmd` generates a high-performance static website. Run the build command to generate the output directory:

```bash
docmd build
```

The output is a self-contained `site/` folder (or whatever you've configured as `out` in your config) that can be hosted anywhere.

## One-Command Deployment

::: callout tip "New in v0.7.2"
`docmd deploy` reads your `docmd.config.js` and generates deployment files personalised to your project — no generic templates.
:::

Instead of manually writing Dockerfiles and server configs, let docmd generate them for you:

```bash
docmd deploy --docker   # Dockerfile + .dockerignore
docmd deploy --nginx    # Production nginx.conf
docmd deploy --caddy    # Production Caddyfile
```

### What Gets Personalised

The deploy command reads your configuration (or zero-config defaults) and injects:

| Config Field | Used In |
|:--|:--|
| `title` | Comment headers in every generated file |
| `out` | `COPY` paths in Dockerfile, `root` directives in Nginx/Caddy |
| `url` | `server_name` in Nginx, site address in Caddy |
| `layout.spa` | Controls whether SPA routing fallback is included |
| Config file path | Dockerfile build step uses `--config` when non-default |

No `docmd.config.js`? No problem — the command uses the same zero-config defaults as `docmd dev` and `docmd build`.

### Always In Sync

Every run regenerates your deployment files to match your current config. Changed your site URL or output directory? Just re-run the deploy command — no need to manually track what changed.

Use `--force` only if you intentionally want to suppress any future confirmation prompts. By default, files are silently regenerated.

### Supported Targets

*   [`docmd deploy --docker`](docker.md) — Optimised multi-stage Dockerfile with layer caching and version pinning.
*   [`docmd deploy --nginx`](nginx.md) — Security-hardened nginx.conf with GZIP and immutable asset caching.
*   [`docmd deploy --caddy`](caddy.md) — HTTPS-ready Caddyfile with automatic routing.

Click each target above for detailed, service-specific documentation.

*(Cloud deployment targets like `--vercel` and `--netlify` are planned for a future release.)*

## Cloud Hosting & CI/CD

If you prefer managed hosting over self-hosted servers, deploy your output folder directly to GitHub Pages, Vercel, Netlify, or Cloudflare Pages.

See the [CI/CD Deployment Guide](ci-cd.md) for automated workflows.

## SPA Routing

`docmd` implements a micro-SPA router for smooth internal navigation. Every page is generated as its own `index.html` file, so:

- **No rewrite rules needed** — direct URL access works because `/guide/setup` resolves to `/guide/setup/index.html`.
- **Deep linking works** — out of the box, on every hosting platform.

When `layout.spa` is set to `false` in your config, the deploy command omits SPA fallback routing from generated server configs.

## Production Checklist

1.  **Site URL**: Set the `url` property in `docmd.config.js` — this drives canonical tags, sitemaps, social previews, and deployment file generation.
2.  **Redirects**: Migrating from another tool? Use the `redirects` config to preserve SEO rankings.
3.  **Analytics**: Enable the `analytics` plugin to track engagement and search queries.
4.  **AI Context**: Enable the `llms` plugin to generate `llms.txt` for AI agent ingestion.

::: callout tip "Custom 404 Pages"
`docmd` generates a `404.html` in your output directory. Most hosting providers automatically serve this for missing routes.
:::