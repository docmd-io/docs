---
title: "Using Git-Based Workflows for Documentation Contributions"
description: "A comprehensive guide on git-based flows."
---

## Problem

Allowing anyone to push documentation straight to master results in broken links, duplicated sections, and stylistic nightmares. However, imposing too much friction discourages external contributors.

## Why it matters

Open-source projects and internal developer platforms survive on community contributions. If a user finds a typo, they should be able to fix it in 60 seconds.

## Approach

Use the "Fork & Pull Request" model bolstered by automated CI checks. `docmd` integrates flawlessly with this model because it natively operates on flat markdown files.

## Implementation

### 1. Enable Edit Links
`docmd` provides built-in support for "Edit this page" links in the footer of every document.

```javascript
// docmd.config.js
export default defineConfig({
  editLink: {
    pattern: 'https://github.com/my-org/my-docs/edit/main/docs/:path',
    text: 'Edit this page on GitHub'
  }
});
```

When a user clicks this, GitHub's web UI opens, automatically handles forking the repo on their behalf, and opens a PR upon save.

### 2. The Threads Plugin
For inline reviews, use the `@docmd/plugin-threads` module locally so authors can drop discussion nodes (`::: thread`) into PRs. This keeps review conversations contextualized with the text block directly in the Vscode diff.

## Trade-offs

Relying entirely on GitHub PRs for docs can slow down urgent announcements (e.g., posting a quick notice about a server outage) if branch protection rules require multiple approvals. Consider having an exemption process or a simple automated status-page integration.
