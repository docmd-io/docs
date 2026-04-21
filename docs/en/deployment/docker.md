---
title: "Docker"
description: "Deploy docmd in a Docker container with a single command."
---

`docmd` generates static HTML — perfect for lightweight, reproducible Docker containers.

## Generate a Dockerfile

```bash
docmd deploy --docker
```

This creates a `Dockerfile` and `.dockerignore` in your project root, personalised to your configuration:

- **Your output directory** is used in the `COPY` path (not a hardcoded `site/`)
- **Your exact `@docmd/core` version** is pinned in the install step for reproducible builds
- **Your config file** is passed to `docmd build` if you use a non-default name

### What Gets Generated

The Dockerfile uses an optimised multi-stage build:

1. **Stage 1 — Build**: Installs dependencies with layer caching (`package.json` copied first), installs the pinned `@docmd/core` version, and runs `docmd build`.
2. **Stage 2 — Serve**: Copies the built output into a minimal `nginx:alpine` container.

```dockerfile
# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN if [ -f package.json ]; then npm install --ignore-scripts; fi
COPY . .
RUN npm install -g @docmd/core@0.7.2
RUN docmd build

# Stage 2: Serve
FROM nginx:alpine
COPY --from=builder /app/site /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

::: callout tip "Custom Nginx with Docker"
If you generate an `nginx.conf` (via `docmd deploy --nginx`) before generating the Dockerfile, it will be detected and automatically configured inside the container.
:::

### The `.dockerignore`

A `.dockerignore` is generated alongside the Dockerfile to keep the build context lean:

```
node_modules
site
dist
.git
.env
*.md
!docs/**/*.md
```

## Build and Run

```bash
docker build -t my-docs .
docker run -p 8080:80 my-docs
```

Your documentation is now live at `http://localhost:8080`.

### Re-Generating

Changed your config? Just run `docmd deploy --docker` again — the files are always regenerated to match your current `docmd.config.js`.