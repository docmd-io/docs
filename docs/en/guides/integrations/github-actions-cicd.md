---
title: "Integrating docmd with GitHub Actions for CI/CD"
description: "A comprehensive guide on github actions."
---

## Problem

Building and deploying documentation manually from a local machine leads to unpredictable environments (e.g., someone deploying with the wrong node version) and blocks deployments when the "deployment engineer" is on vacation.

## Why it matters

Continuous Deployment is mandatory for modern SaaS. Documentation updates should reach production within 3 minutes of a merged Pull Request automatically.

## Approach

Leverage GitHub Actions to run the `docmd build` pipeline on an Ubuntu runner, and push the `site/` output securely via SSH to your VPS or natively to GitHub Pages.

## Implementation

### Standard GitHub Pages Deploy

Create `.github/workflows/docs.yml`:

```yaml
name: Deploy docmd to GitHub Pages
on:
  push:
    branches: ["main"]
jobs:
  build-and-deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with: { node-version: 22 }
      
      # Build
      - run: npm i -g @docmd/core
      - run: docmd build
      
      # Deploy using peaceiris action
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./site
```

Ensure your `docmd.config.js` sets the `url` properly if deploying to a subpath (e.g., `https://user.github.io/repo/`).

## Trade-offs

Relying entirely on GitHub Actions means relying on Microsoft's uptime. Additionally, managing edge-caching invalidations (e.g., purging Cloudfront caches via GH Action script) requires careful IAM secret management.
