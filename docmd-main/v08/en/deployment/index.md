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
`docmd deploy` reads your `docmd.config.json` and generates deployment files personalised to your project - no generic templates.
:::

Instead of manually writing Dockerfiles and server configs, let docmd generate them for you:

```bash
docmd deploy --docker          # Dockerfile + .dockerignore
docmd deploy --nginx           # Production nginx.conf
docmd deploy --caddy           # Production Caddyfile
docmd deploy --github-pages   # GitHub Actions workflow
docmd deploy --vercel          # vercel.json
docmd deploy --netlify         # netlify.toml
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

No `docmd.config.json`? No problem - the command uses the same zero-config defaults as `docmd dev` and `docmd build`.

### Always In Sync

Every run regenerates your deployment files to match your current config. Changed your site URL or output directory? Just re-run the deploy command - no need to manually track what changed.

Use `--force` only if you intentionally want to suppress any future confirmation prompts. By default, files are silently regenerated.

### Supported Targets

**Self-hosted**

*   [`docmd deploy --docker`](docker.md) - Optimised multi-stage Dockerfile with layer caching and version pinning.
*   [`docmd deploy --nginx`](nginx.md) - Security-hardened nginx.conf with GZIP and immutable asset caching.
*   [`docmd deploy --caddy`](caddy.md) - HTTPS-ready Caddyfile with automatic routing.

**Cloud & CI**

*   [`docmd deploy --github-pages`](github-pages.md) - GitHub Actions CI/CD workflow for automated Pages deployment.
*   [`docmd deploy --vercel`](vercel.md) - vercel.json with build command, output directory, and cache headers.
*   [`docmd deploy --netlify`](netlify.md) - netlify.toml with build settings, Node version, and SPA redirects.

**More Platforms**

*   [Cloudflare Pages](cloudflare-pages.md) - Edge-native hosting with built-in CI/CD; no config file needed.
*   [Firebase Hosting](firebase.md) - Google's global CDN with GitHub Actions CI/CD integration.

Click each target above for detailed, service-specific documentation.