---
title: "Deployment"
description: "Deploy your docmd documentation to Docker, Nginx, Caddy, or any cloud platform with a single command."
---

docmd generates a high-performance static website. Run the build command to generate the output directory:

```bash
npx @docmd/core build
```

The output is a self-contained `site/` folder (or whatever you configure as `out`) that can be hosted anywhere.

## One-Command Deployment

::: callout tip "Deployment Generator"
The `deploy` command reads your `docmd.config.json` and generates deployment files personalised to your project. It eliminates generic templates.
:::

Instead of manually writing Dockerfiles and server configs, let the engine generate them for you:

```bash
npx @docmd/core deploy --docker          # Dockerfile + .dockerignore
npx @docmd/core deploy --nginx           # Production nginx.conf
npx @docmd/core deploy --caddy           # Production Caddyfile
npx @docmd/core deploy --github-pages    # GitHub Actions workflow
npx @docmd/core deploy --vercel          # vercel.json
npx @docmd/core deploy --netlify         # netlify.toml
```

### What Gets Personalised

The deploy command reads your configuration (or zero-config defaults) and injects:

| Config Field | Used In |
|:--|:--|
| `title` | Comment headers in every generated file |
| `out` | `COPY` paths in Dockerfile, `root` directives in Nginx/Caddy |
| `url` | `server_name` in Nginx, site address in Caddy |
| `layout.spa` | Controls whether SPA routing fallback is included |
| Config path | Dockerfile build step uses `--config` when non-default |

No `docmd.config.json`? No problem. The command uses the same zero-config defaults as `npx @docmd/core dev` and `npx @docmd/core build`.

### Always In Sync

Every run regenerates your deployment files to match your current config. Changed your site URL or output directory? Just re-run the deploy command. You do not need to track what changed manually.

Use `--force` only if you intentionally want to suppress future confirmation prompts. By default, files silently regenerate.

### Supported Targets

**Self-hosted**

*   [`npx @docmd/core deploy --docker`](docker.md) - Optimised multi-stage Dockerfile with layer caching.
*   [`npx @docmd/core deploy --nginx`](nginx.md) - Security-hardened nginx.conf with GZIP and immutable caching.
*   [`npx @docmd/core deploy --caddy`](caddy.md) - HTTPS-ready Caddyfile with automatic routing.

**Cloud & CI**

*   [`npx @docmd/core deploy --github-pages`](github-pages.md) - GitHub Actions CI/CD workflow for Pages deployment.
*   [`npx @docmd/core deploy --vercel`](vercel.md) - vercel.json with build command, output directory, and cache headers.
*   [`npx @docmd/core deploy --netlify`](netlify.md) - netlify.toml with build settings, Node version, and SPA redirects.

**More Platforms**

*   [Cloudflare Pages](cloudflare-pages.md) - Edge-native hosting with built-in CI/CD.
*   [Firebase Hosting](firebase.md) - Google's global CDN with GitHub Actions CI/CD integration.

Click each target above for detailed, service-specific documentation.