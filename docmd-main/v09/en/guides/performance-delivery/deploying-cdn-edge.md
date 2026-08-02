---
title: "CDN & Edge Deployment"
description: "How to minimise global latency by deploying your static documentation to a Content Delivery Network (CDN) or Edge Network."
---

## Problem

Hosting documentation on a single server in one geographic region (e.g., US-East) creates significant network latency for users elsewhere. Every page load, image, and script travels thousands of miles. This makes your documentation feel sluggish for a global audience.

## Why it matters

High latency directly harms the developer experience. Even if your documentation is well-written and lightweight, the "Time to First Byte" (TTFB) is limited by physics. If your site feels slow, developers lose focus or abandon your tool in favour of faster alternatives.

## Approach

The optimal solution is to deploy your site to an Edge CDN. docmd generates pure static assets (HTML, CSS, JS), making it perfectly suited for edge distribution. CDNs replicate files across globally distributed "Edge Nodes" to serve users from the closest data centre.

## Implementation

### 1. Choose a Platform

docmd natively supports all modern static hosting and edge platforms. We recommend the following for their global performance and ease of use:
*   **Cloudflare Pages**: Extremely fast global edge network with built-in DDoS protection.
*   **Vercel**: Optimised for performance with excellent developer workflow integration.
*   **Netlify**: Powerful automation features and a reliable global CDN.

### 2. Automate the Build

Use a CI/CD pipeline to build and deploy your site automatically whenever you push changes. See the [GitHub Actions Guide](../../guides/integrations/github-actions-cicd.md) for detailed examples.

```yaml ".github/workflows/deploy.yml"
# .github/workflows/deploy.yml
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 22
      
      # Build the site into the default 'site/' directory
      - run: npm install && npx @docmd/core build
      
      # Example: Deploying to Cloudflare Pages
      - name: Deploy
        uses: cloudflare/pages-action@v1
        with:
          apiToken: ${{ secrets.CF_API_TOKEN }}
          accountId: ${{ secrets.CF_ACCOUNT_ID }}
          projectName: my-docs
          directory: site
```

### 3. Verification

Once deployed, verify global performance using tools like PageSpeed Insights or global ping tests. You should see sub-100ms response times from almost any worldwide location.

## Trade-offs

Global edge networks abstract away server management, which benefits documentation teams. However, debugging regional caching issues can occasionally be more complex than reviewing a single server log. Using platforms with reliable "instant cache invalidation" ensures users always see the latest version immediately after a deployment.