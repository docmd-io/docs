---
title: "Setting Up a Documentation Workflow for Teams Using docmd"
description: "A comprehensive guide on workflow setup."
---

## Problem

When teams lack a structured documentation workflow, updates are either forgotten or written as ad-hoc Slack messages. Content becomes fragmented, formatting becomes inconsistent, and technical writers spend more time formatting PRs than writing content.

## Why it matters

Without process, documentation rots. If deploying a documentation hotfix requires waiting on a core backend release cycle, the documentation will perpetually remain 2-3 weeks out of date. 

## Approach

Decouple documentation deployments from software deployments, but share the same Git-ops process (Branches -> PRs -> CI/CD Previews). `docmd`'s zero-config setup enables teams to treat documentation as code.

## Implementation

### 1. Separate Repository vs Monorepo
Depending on your company size, either:
- **Monorepo:** Keep a `docs/` folder in your root. Require documentation changes simultaneously with API changes in the same PR.
- **Separate Repo:** Best for large orgs. Engineers update OpenAPI specs separately, and technical writers pull those generated schemas into the isolated docmd repo.

### 2. Linting and Validation
Add Husky hooks to run `docmd build` on pre-commit. `docmd` will automatically validate broken relative links and malformed frontmatter.

```json
// package.json
"scripts": {
  "test:docs": "docmd build --strict"
}
```

## Trade-offs

Treating "docs as code" imposes an engineering barrier on non-technical contributors (e.g., Product Managers). They must learn Git and Markdown just to fix a typo. You will need to rely heavily on GitHub's web-editor UI or integrate headless CMS platforms for less technical members.
