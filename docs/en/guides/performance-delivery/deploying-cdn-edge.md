---
title: "Deploying docmd Documentation on a CDN or Edge Network"
description: "A comprehensive guide on cdn & edge deploy."
---

## Problem

Hosting your documentation on a single virtual machine (VM) in New York means that a developer reading your docs in Tokyo will experience 200ms+ round-trip latency on every single image, script, and HTML file they fetch.

## Why it matters

High latency kills the illusion of speed. Even if `docmd` generates an 18kb payload, physics dictates that sending data across the Pacific Ocean is slow. If doc navigation feels sluggish, developers lose focus and abandon the documentation.

## Approach

Deploy the site to an Edge CDN (Content Delivery Network). CDNs replicate your static `site/` folder across hundreds of globally distributed servers ("Edge Nodes"). When a user in Tokyo requests your docs, they are served from a Tokyo data center.

## Implementation

Because `docmd` outputs pure HTML/CSS/JS, it is instantly compatible with Vercel, Netlify, Cloudflare Pages, and AWS CloudFront. 

### GitHub Actions + Cloudflare Pages
This is the recommended free-tier architecture for Edge deploys.

```yaml
# .github/workflows/deploy.yml
name: Deploy docmd to Cloudflare Pages
on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm install -g @docmd/core
      - run: docmd build
      - name: Deploy
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          accountId: ${{ secrets.CF_ACCOUNT_ID }}
          projectName: my-docmd-site
          directory: site
```

## Trade-offs

Global edge networks abstract away server logs. If an asset is randomly 404ing in Germany but working in the USA due to an edge caching fault, debugging becomes significantly harder than tailing a local NGINX log. However, standard deployments via Vercel/Cloudflare are generally rock-solid.
