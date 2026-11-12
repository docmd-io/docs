---
title: "Docker Containerisation"
description: "Run docmd within containerised environments using official images or generated Dockerfiles."
---

docmd outputs static assets, making it ideal for containerised deployments. You can pull the official pre-built image or compile a custom `Dockerfile` via the Deployer CLI.

## Official Container Image

The pre-built container image builds and serves your site without a local Node.js environment. Its default command is [`docmd serve --host 0.0.0.0`](./docmd-serve): a production build, served on port 3000, with a health check on `/healthz`. Images are published for `linux/amd64` and `linux/arm64` architectures.

### Quick Start Commands

```bash
# Pull pinned release image
docker pull ghcr.io/docmd-io/docmd:0.9.0

# Compile static output (mounts local docs directory)
docker run -v $(pwd)/docs:/docs -v $(pwd)/site:/site ghcr.io/docmd-io/docmd:0.9.0 build

# Serve your docs in production mode (default command)
docker run -v $(pwd):/docs -p 3000:3000 ghcr.io/docmd-io/docmd:0.9.0

# Development server with live reload, while writing
docker run -v $(pwd):/docs -p 3000:3000 ghcr.io/docmd-io/docmd:0.9.0 dev --host 0.0.0.0
```

::: callout info "Default command" icon:info
Images before `docmd serve` ran `dev --host 0.0.0.0` by default. If you relied on live reload without passing a command, pass `dev --host 0.0.0.0` explicitly.
:::

::: callout tip "Pinning Releases" icon:pin
Pin specific version tags (e.g. `0.9.0`) in production CI pipelines to ensure build reproducibility.
:::

### Docker Compose Workflow

```yaml "docker-compose.yml"
version: '3.8'
services:
  docs:
    image: ghcr.io/docmd-io/docmd:0.9.0
    command: build
    volumes:
      - ./docs:/docs
      - ./site:/site
      - ./docmd.config.json:/docmd.config.json:ro

  serve:
    image: nginx:alpine
    ports:
      - "8080:80"
    volumes:
      - ./site:/usr/share/nginx/html:ro
    depends_on:
      - docs
```

### Health Check and Port

The image's `HEALTHCHECK` requests `GET /healthz` on `${PORT:-3000}`. `docmd serve` answers `200` once the site is built and `503` while the first build runs. Set `PORT` to move the server and the health check together:

```bash
docker run -e PORT=8080 -p 8080:8080 ghcr.io/docmd-io/docmd:0.9.0
```

In Kubernetes, point the startup and readiness probes at `/healthz`. `serve` writes the built site under `/docs`, so mount it from a writable volume, not straight from a ConfigMap.

### Image Specifications

| Property | Specifications |
| :--- | :--- |
| **Base Operating System** | Alpine Linux |
| **User Identity Mapping** | Remaps container root identity to host UID/GID via `su-exec` automatically. |
| **Default Working Dir** | `/docs` (override via `-w` flag). |
| **Architectures** | `linux/amd64`, `linux/arm64` |

### Custom Working Directory & Permissions

The entrypoint automatically detects owner UID and GID for mounted volumes and steps down privileges prior to executing `init`, `build`, `serve` or `dev` commands. Files written to host mounts retain host user ownership.

```bash
docker run -v $(pwd):/workspace -w /workspace ghcr.io/docmd-io/docmd:0.9.0 init
```

## Generated Multi-Stage Dockerfile

Generate a custom `Dockerfile` using the [Deployer CLI](./deployer):

```bash
npx @docmd/core deploy --docker
```

The generated multi-stage `Dockerfile`:
1. **Build Stage**: Installs the pinned `@docmd/core` version and compiles static HTML/CSS/JS assets.
2. **Serve Stage**: Copies compiled output into a lightweight `nginx:alpine` image.

To generate Docker and NGINX configurations together:

```bash
npx @docmd/core deploy --docker --nginx
```

### Build & Container Execution

```bash
docker build -t my-docs .
docker run -p 8080:80 my-docs
```

Access the served site at `http://127.0.0.1:8080`.