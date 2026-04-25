---
title: "Previewing Changes"
description: "How to set up local and cloud-based preview environments to ensure your documentation renders perfectly before it goes live."
---

## Problem

Writing Markdown without a live preview often leads to formatting errors, broken containers, and incorrect image paths that only become visible once the content is in production. This results in a frustrating experience for users and extra work for maintainers who must constantly push hotfixes for simple rendering issues.

## Why it matters

High-quality documentation is essential for developer trust. A broken warning box or unrendered syntax looks unprofessional and can even mislead users about how your software works. Seeing the "real" documentation before it goes live is the most effective way to catch errors, improve readability, and ensure a seamless user experience.

## Approach

Implement a multi-stage preview strategy: use `docmd`'s [Local Development](../../getting-started/quick-start#local-development) server for immediate feedback while writing, and leverage ephemeral cloud environments (like Vercel or Cloudflare Pages) for final reviews within your Pull Requests.

## Implementation

### 1. Instant Local Previews

The fastest way to see your changes is by running the `docmd dev` server. It features Hot Module Replacement (HMR), which automatically refreshes your browser the moment you save a Markdown file.

```bash
# Start the local development server
npx @docmd/core dev
```

### 2. Cloud-Based Preview Environments

For collaborative reviews, configure your CI/CD platform to generate unique "Preview URLs" for every Pull Request. Since `docmd` outputs standard static files, it is compatible with all major hosting providers.

*   **Build Command**: `npx @docmd/core build`
*   **Output Directory**: `site`

This allows reviewers to see exactly how the changes will look and behave in a production-like environment before they are merged into the main branch.

### 3. Collaborative Reviews with Threads

Combine your cloud previews with the [Threads Plugin](../../plugins/usage). This allows team members to leave feedback directly on the rendered preview page, bridging the gap between the source Markdown and the final user experience.

## Trade-offs

Building a full static site for every commit in a massive repository (thousands of pages) can be time-consuming and costly in terms of CI/CD resources. To optimise this, configure your CI pipeline to only trigger a documentation build when files within your source directory (e.g., `/docs`) have been modified.
