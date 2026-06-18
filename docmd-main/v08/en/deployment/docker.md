---
title: "Docker"
description: "Run docmd in a Docker container — use the official pre-built image or generate a custom Dockerfile from your project config."
---

docmd generates static HTML, making it ideal for lightweight, reproducible Docker containers. There are two distinct approaches depending on your use case.

## Official Docker Image

The official image lets you build and serve your documentation without installing anything locally. It supports multiple architectures (`linux/amd64` and `linux/arm64`).

### Quick Start

```bash
# Pull the latest image
docker pull ghcr.io/docmd-io/docmd:latest

# Build your documentation (mounts local docs and outputs to ./site)
docker run -v $(pwd)/docs:/docs -v $(pwd)/site:/site ghcr.io/docmd-io/docmd:latest build

# Run the built-in demo site
docker run -p 3000:3000 ghcr.io/docmd-io/docmd:latest
```

### Docker Compose

Use Docker Compose to build and serve in a single workflow:

```yaml "docker-compose.yml"
version: '3.8'
services:
  docs:
    image: ghcr.io/docmd-io/docmd:latest
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

### Image Details

| Property | Value |
|:--|:--|
| Base | Alpine Linux (minimal footprint) |
| Security | Runs as non-root user |
| Health checks | Built-in container health monitoring |
| SBOM | Software Bill of Materials attestation included |
| Architectures | `linux/amd64`, `linux/arm64` |

## Custom Dockerfile (via Deployer)

For production self-hosting, generate a `Dockerfile` tailored to your project configuration using the [Deployer](./deployer):

```bash
npx @docmd/core deploy --docker
```

This generates a `Dockerfile` using a multi-stage build:
1. **Build stage** — installs your exact pinned `@docmd/core` version and runs the build.
2. **Serve stage** — copies the output into a minimal `nginx:alpine` image.

Generate both Docker and Nginx configs together for a complete self-hosted setup:

```bash
npx @docmd/core deploy --docker --nginx
```

### Build and Run

```bash
docker build -t my-docs .
docker run -p 8080:80 my-docs
```

Your documentation will be live at `http://localhost:8080`.

::: callout tip "Re-generating"
Changed your config? Re-run `npx @docmd/core deploy --docker` to regenerate. Use `--force` to overwrite existing files.
:::