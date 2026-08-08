---
title: "Deployer"
description: "Generate production deployment configurations for Docker, NGINX, Caddy, Vercel, and Netlify directly from docmd.config.json."
---

The `npx @docmd/core deploy` command parses your `docmd.config.json` project configuration and emits provider-specific deployment manifests. Output paths, hostnames, and SPA fallback rules are injected automatically.

## Supported Deploy Target Flags

| Target Platform | Command Flag | Generated Output Files |
| :--- | :--- | :--- |
| **Docker Container** | `--docker` | `Dockerfile`, `.dockerignore` |
| **NGINX Web Server** | `--nginx` | `nginx.conf` |
| **Caddy Web Server** | `--caddy` | `Caddyfile` |
| **GitHub Pages CI** | `--github-pages` | `.github/workflows/deploy.yml` |
| **Vercel** | `--vercel` | `vercel.json` |
| **Netlify** | `--netlify` | `netlify.toml` |

## Usage Examples

Execute the deployer command from your project root:

```bash
# Single provider generation
npx @docmd/core deploy --github-pages

# Generate Docker and NGINX configs in tandem
npx @docmd/core deploy --docker --nginx

# Overwrite pre-existing config files
npx @docmd/core deploy --vercel --force
```

## Configuration Injections

The deployer reads your configuration parameters and personalises output templates:

| Configuration Property | Target Output Usage |
| :--- | :--- |
| `title` | Header commentary in generated manifests. |
| `out` | `COPY` directives in Dockerfile; `root` paths in NGINX and Caddy. |
| `url` | `server_name` in NGINX; site blocks in Caddy. |
| `layout.spa` | Controls conditional SPA fallback rewrite rules. |

If no `docmd.config.json` is present, the deployer evaluates standard zero-config defaults.

## Overwrite Protection

By default, existing deployment files are preserved and skipped with a notice. Pass the `--force` flag to overwrite existing configuration files.

## Target Platform Details

### GitHub Pages CI Workflow

```bash
npx @docmd/core deploy --github-pages
```

Generates `.github/workflows/deploy.yml` containing a GitHub Actions workflow that checks out the repository, installs Node.js, runs `npx @docmd/core build`, and uploads static output to GitHub Pages.

::: callout tip "GitHub Action Alternative" icon:github
If you prefer a pre-packaged action without maintaining local workflow files, use the official [`docmd-io/deploy`](./github-action) action.
:::

### Docker Containerization

```bash
npx @docmd/core deploy --docker
```

Generates a multi-stage `Dockerfile`:
1. **Build Stage**: Installs the pinned `@docmd/core` version and compiles static assets.
2. **Serve Stage**: Copies output assets into a minimal `nginx:alpine` image.

If an `nginx.conf` exists in the project root, the Dockerfile automatically includes a `COPY nginx.conf /etc/nginx/conf.d/default.conf` directive.

::: callout tip "Official Container Image" icon:container
To run docmd directly in containerised pipelines without building custom images, refer to the [Docker Image Guide](./docker).
:::

### NGINX Configuration

```bash
npx @docmd/core deploy --nginx
```

Generates `nginx.conf` configured with Security headers, GZIP compression, immutable asset caching, and SPA fallback rules.

### Caddy Server

```bash
npx @docmd/core deploy --caddy
```

Generates a `Caddyfile` with automatic HTTPS certificate management and static file serving.

### Vercel Deployment

```bash
npx @docmd/core deploy --vercel
```

Generates `vercel.json` with static build commands, output routing, and asset caching headers.

### Netlify Deployment

```bash
npx @docmd/core deploy --netlify
```

Generates `netlify.toml` with build commands, publish directories, and SPA redirect rules.