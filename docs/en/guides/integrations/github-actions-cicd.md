---
title: "GitHub Actions CI/CD"
description: "How to automate your documentation builds and deployments using GitHub Actions and docmd for a high-velocity documentation workflow."
---

## Problem

Building and deploying documentation manually from a local machine is prone to errors, environment inconsistencies (e.g., differing Node.js versions), and security risks. It also creates a bottleneck, as deployments depend on a single individual's availability and local setup.

## Why it matters

Continuous Deployment (CD) ensures that your documentation is always in sync with your software. When a technical update is merged, it should reach your users within minutes, not days. Automation guarantees that every build happens in a clean, reproducible environment, maintaining high standards of quality and reliability.

## Approach

Leverage GitHub Actions to run the `docmd` build pipeline on every push or Pull Request. The resulting static assets can then be automatically deployed to hosting providers like GitHub Pages, Cloudflare Pages, or containerized environments using Docker.

## Implementation

### 1. Standard GitHub Pages Workflow

Create `.github/workflows/docs.yml` to automate the build and deployment process.

```yaml
name: Deploy Docs
on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
          cache: 'npm'

      - run: npm install
      
      # Build the site into the 'site/' directory
      - run: npx @docmd/core build

      - name: Upload Artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: site/

      - name: Deploy to GitHub Pages
        uses: actions/deploy-pages@v4
```

### 2. Containerized Deployment (Docker)

If you host your own documentation, use the [Deploy Command](../../deployment) to generate a production-ready `Dockerfile` and server configurations.

```bash
# Generate Docker and Nginx configs locally
npx @docmd/core deploy --docker --nginx
```

You can then update your GitHub Action to build and push this Docker image to a registry (like Docker Hub or GitHub Container Registry) whenever you release a new version.

### 3. Pull Request Previews

Enhance your workflow by generating ephemeral preview environments for every Pull Request. This allows reviewers to see the rendered documentation before it is merged into the main branch. See the [Previewing Changes Guide](../workflows-teams/previewing-changes) for more details.

## Trade-offs

Automated CI/CD requires initial setup time and management of secrets (e.g., API tokens). However, the long-term benefits of a "hands-off" deployment process—including reduced human error and faster update cycles—far outweigh the initial investment. For large sites, ensure your workflow only triggers when files in your documentation directory are changed to save on CI minutes.
