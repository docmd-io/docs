---
title: "Git-Based Workflows"
description: "How to manage documentation contributions effectively using Git, Pull Requests, and automated CI/CD checks."
---

## Problem

Allowing direct pushes to the main documentation branch often leads to broken links, inconsistent formatting, and unverified technical information. However, imposing too much friction—such as requiring separate CMS accounts—discourages community members and internal developers from contributing valuable updates.

## Why it matters

Collaboration is the lifeblood of great documentation. If a developer finds a typo or an outdated example, they should be able to submit a fix in minutes. A Git-based workflow provides a familiar, transparent, and secure environment for contributions, ensuring that every change is reviewed and validated before it goes live.

## Approach

Implement a "Pull Request" (PR) model supported by automated validation and preview environments. `docmd` is designed for this workflow, as it operates on standard Markdown files that are easy to diff, review, and merge using familiar Git tools.

## Implementation

### 1. Enable "Edit this Page" Links

You can configure `docmd` to automatically generate "Edit this page" links in the footer or sidebar. This allows users to jump directly from a documentation page to the corresponding source file in your repository.

```javascript
// docmd.config.js
export default {
  editLink: {
    enabled: true,
    baseUrl: 'https://github.com/my-org/my-docs/edit/main/docs',
    text: 'Suggest an edit'
  }
};
```
For more details, see the [Edit Link Configuration](../../configuration/general#editlink).

### 2. Contextual Reviews with Threads

For complex updates that require detailed feedback, use the [Threads Plugin](../../plugins/usage). This allows authors and reviewers to leave inline comments directly within the Markdown content during the review phase, keeping discussions contextualized.

```markdown
::: thread "Reviewer Name"
Should we include a code example for the new authentication flow here?
:::
```

### 3. Automated Validation in CI

Integrate `docmd` into your CI/CD pipeline (e.g., [GitHub Actions](../../guides/integrations/github-actions-cicd)) to validate every PR. At a minimum, your pipeline should run the build command to ensure no syntax errors or broken configurations are introduced.

```bash
# In your CI pipeline
npm install
npx @docmd/core build
```

## Trade-offs

Strict Git workflows can occasionally slow down minor updates, such as fixing a critical typo or updating a service status notice. For high-velocity teams, we recommend designating "Documentation Owners" who have the authority to fast-track small changes while maintaining rigorous review standards for significant technical updates.
