---
title: "Git-Based Workflows"
description: "How to manage documentation contributions effectively using Git, Pull Requests, and automated CI/CD checks."
---

## Problem

Allowing direct pushes to the main branch leads to broken links and unverified information. However, imposing too much friction - like requiring separate CMS accounts - discourages community members and internal developers from contributing.

## Why it matters

Collaboration is the lifeblood of great documentation. If a developer finds a typo, they should be able to submit a fix in minutes. A Git-based workflow provides a familiar, transparent, and secure environment for contributions. It ensures every change is reviewed and validated before it goes live.

## Approach

Implement a "Pull Request" (PR) model supported by automated validation and preview environments. docmd is designed for this workflow. It operates on standard Markdown files that are easy to diff, review, and merge using familiar Git tools.

## Implementation

### 1. Enable "Edit this Page" Links

You can configure docmd to generate "Edit this page" links via the [Git Plugin](../../plugins/git.md). This allows users to jump directly from a documentation page to the corresponding source file in your repository.

```json
  "plugins": {
    "git": {
      "repo": "https://github.com/my-org/my-repo",
      "branch": "main",
      "editLink": true
    }
  }
```

### 2. Contextual Reviews with Threads

For complex updates requiring detailed feedback, use the [Threads Plugin](../../plugins/threads.md). This allows authors and reviewers to leave inline comments directly within the Markdown content during the review phase, keeping discussions contextualised.

```markdown
::: thread "Reviewer Name"
Should we include a code example for the new authentication flow here?
:::
```

### 3. Automated Validation in CI

Integrate docmd into your CI/CD pipeline (e.g., [GitHub Actions](../../guides/integrations/github-actions-cicd.md)) to validate every PR. At a minimum, your pipeline should run the build command to ensure no syntax errors or broken configurations are introduced.

```bash
# In your CI pipeline
npm install
npx @docmd/core build
```

## Trade-offs

Strict Git workflows can occasionally slow down minor updates, such as fixing a typo or updating a service status notice. For high-velocity teams, we recommend designating "Documentation Owners" who have authority to fast-track small changes while maintaining rigorous review standards for significant updates.
