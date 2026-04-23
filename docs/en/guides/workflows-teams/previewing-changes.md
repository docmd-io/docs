---
title: "Previewing Documentation Changes Before Deployment"
description: "A comprehensive guide on preview changes."
---

## Problem

Authors often write markdown, guess the formatting, and merge it. In production, tables break out of their containers, images fail to load due to incorrect relative paths, and nested lists render incorrectly.

## Why it matters

A broken container or unrendered React component in production looks incredibly unprofessional and ruins the reader's trust in the technical accuracy of the content.

## Approach

Implement ephemeral preview environments using Vercel, Netlify, or Cloudflare pages tied to your PR webhooks.

## Implementation

1. **Configure CI/CD Integrations:**
Because `docmd` uses zero custom runtimes and outputs standard HTML, platforms like Vercel automatically detect it as a static project.

2. **Pull Request Automations:**
When a PR is opened, the CI/CD pipeline runs `npx @docmd/core build` and hosts the output on a temporary domain (e.g., `pr-123.docs.mycompany.com`).

3. **Live Editor APIs:**
For authors who need a local preview before pushing, `docmd dev` utilizes HMR (Hot Module Replacement). Saving a `.md` file updates the browser instantaneously.

## Trade-offs

Generating a full static site build on every single commit in a PR can consume CI/CD minutes and bloat hosting bills for very large sites (1000+ pages). Consider configuring your CI to only build documentation if files in the `docs/` folder have actually changed.
