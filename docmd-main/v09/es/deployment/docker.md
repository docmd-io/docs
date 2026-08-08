---
title: "Docker Containerization"
description: "Run docmd within containerised environments using official images or generated Dockerfiles."
---

docmd outputs static assets, making it ideal for containerised deployments. You can pull the official pre-built image or compile a custom `Dockerfile` via the Deployer CLI.

## Official Container Image

The pre-built container image allows site builds and local preview serving without requiring a local Node.js environment. Images are published for `linux/amd64` and `linux/arm64` architectures.

### Quick Start Commands

```bash
# Pull pinned release image
docker pull ghcr.io/docmd-io/docmd:0.9.0

# Compile static output (mounts local docs directory)
docker run -v $(pwd)/docs:/docs -v $(pwd)/site:/site ghcr.io/docmd-io/docmd:0.9.0 build

# Launch local preview server
docker run -p 3000:3000 ghcr.io/docmd-io/docmd:0.9.0
```

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

### Image Specifications

| Property | Specifications |
| :--- | :--- |
| **Base Operating System** | Alpine Linux |
| **User Identity Mapping** | Remaps container root identity to host UID/GID via `su-exec` automatically. |
| **Default Working Dir** | `/docs` (override via `-w` flag). |
| **Architectures** | `linux/amd64`, `linux/arm64` |

### Custom Working Directory & Permissions

The entrypoint automatically detects owner UID and GID for mounted volumes and steps down privileges prior to executing `init`, `build`, or `dev` commands. Files written to host mounts retain host user ownership.

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

Access the served site at `http://localhost:8080`.