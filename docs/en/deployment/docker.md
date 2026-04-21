---
title: "Docker"
description: "Deploy docmd using a Docker container"
---

Because `docmd` generates a high-performance static website, it is incredibly efficient to serve within a Docker container.

## Automated Deployment Configuration

::: callout warning "Version Requirement"
The `docmd deploy` command was introduced in **v0.7.2**. Ensure you have updated `@docmd/core` before using this feature.
:::

You can automatically generate a production-ready `Dockerfile` and `.dockerignore` for your project using the core CLI:

```bash
docmd deploy --docker
```

This generates a production-ready `Dockerfile` and `.dockerignore` in your project root. You can also use the `--force` flag to overwrite existing files, or `--all` if you want to generate Nginx and Caddy configs as well.

The generated Dockerfile uses an optimized multi-stage build:
1. **Layer Caching**: Copies `package.json` first to cache dependency installation.
2. **Deterministic Builds**: Dynamically installs the **exact** version of the `@docmd/core` engine you are currently using.
3. **Optimized Size**: Uses Alpine Linux as a base for minimal footprint.
4. **Security Hardening**: Drops the built static site into a secure Nginx container.

::: callout tip "Custom Nginx with Docker"
If you generate an `nginx.conf` (via `--nginx`) before generating the Dockerfile, `docmd` will automatically detect it and configure the Dockerfile to use your custom Nginx configuration.
:::

## Manual Configuration

If you prefer to write the `Dockerfile` manually, you can use the following template:

```dockerfile
# Stage 1: Build Phase
FROM node:20-alpine AS builder
WORKDIR /app

# 1. Copy manifests first for optimal layer caching
COPY package*.json ./
RUN if [ -f package.json ]; then npm install --ignore-scripts; fi

# 2. Copy source and install engine
COPY . .
RUN npm install -g @docmd/core@0.7.2

# 3. Build site
RUN docmd build

# Stage 2: Serve Phase
FROM nginx:alpine
# Optional: COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/site /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

## Running the Container

Once your `Dockerfile` is present, you can build and run it locally or on your VPS:

```bash
docker build -t docmd-site .
docker run -p 8080:80 docmd-site
```

Your documentation will now be live at `http://localhost:8080`.