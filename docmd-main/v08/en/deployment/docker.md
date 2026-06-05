---
title: "Docker"
description: "Deploy docmd in a Docker container with a single command."
---

docmd generates static HTML. This is perfect for lightweight, reproducible Docker containers.

## Official Docker Image

docmd is available as an official Docker image with multi-architecture support (`linux/amd64` and `linux/arm64`).

### Quick Start

```bash
# Pull the latest image
docker pull ghcr.io/docmd-io/docmd:latest

# Build your documentation
docker run -v $(pwd)/docs:/docs -v $(pwd)/site:/site ghcr.io/docmd-io/docmd:latest build

# Run with the built-in demo site
docker run -p 3000:3000 ghcr.io/docmd-io/docmd:latest
```

### Docker Compose

```yaml
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

- **Base**: Alpine Linux (minimal footprint)
- **Security**: Runs as non-root user
- **Health checks**: Built-in container health monitoring
- **SBOM**: Software Bill of Materials attestation included
- **Architectures**: `linux/amd64`, `linux/arm64`

## Custom Dockerfile

For advanced use cases or self-building, you can generate a custom `Dockerfile` and `.dockerignore` matching your configuration:

```bash
npx @docmd/core deploy --docker
```

To build and run your custom container:

```bash
docker build -t my-docs .
docker run -p 8080:80 my-docs
```

Your documentation will be live at `http://localhost:8080`.