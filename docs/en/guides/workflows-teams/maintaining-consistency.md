---
title: "Maintaining Consistency Across Large Documentation Teams"
description: "A comprehensive guide on consistency at scale."
---

## Problem

Every technical writer has a different style. Some use `*` for italics, others use `_`. Some say "Click here", others say "Select the element". Over time, the document reads like a patchwork quilt written by ten different people.

## Why it matters

Consistency breeds familiarity. When users are learning complex APIs, changing vocabulary mid-tutorial forces them to pause and translate terminology. "Wait, is an 'Instance' the same as a 'Node'?"

## Approach

Enforce consistency mechanically using linters, rather than relying solely on human review. Combine `markdownlint`, Vale (for prose), and `docmd`'s strict parsing.

## Implementation

### 1. Vale Prose Linter
Install Vale to enforce terminology, tone, and brand safety.

```ini
# .vale.ini
MinAlertLevel = suggestion
Packages = Microsoft
[*]
BasedOnStyles = Vale, Microsoft
```

### 2. Standardized docmd Containers
Force writers to use built-in, thematic `docmd` containers for warnings instead of improvising with bold text.

```markdown
<!-- Reject this in PRs -->
**Warning:** Do not format the disk.

<!-- Require this -->
::: callout warning
Do not format the disk.
:::
```
Use `markdownlint` to blacklist custom HTML elements to force usage of thematic containers.

## Trade-offs

Aggressive linting frustrates new contributors. If a community member fixes a typo but the PR fails because they used the passive voice (flagged by Vale), they might abandon the PR out of frustration. Always ensure open-source contribution linters are less strict than internal ones.
