---
title: "Setting Up a Workflow"
description: "How to establish a high-velocity, multi-author documentation workflow using docmd and docs-as-code principles."
---

## Problem

When teams lack a structured workflow, updates are delayed or forgotten. Without a clear process, content becomes fragmented and formatting becomes inconsistent. Technical writers spend more time resolving merge conflicts than writing high-quality content.

## Why it matters

Without a formal process, documentation quickly becomes outdated. If updating documentation requires waiting on a slow software release cycle, guides will remain out of sync with product features. This leads to user frustration and increased support volume.

## Approach

Decouple documentation deployments from software release cycles. Adopt the same reliable processes used in software engineering (Branches → Pull Requests → CI/CD Previews). docmd's lightweight nature allows teams to treat "documentation as code" with minimal overhead.

## Implementation

### 1. Repository Strategy

Choose the strategy that best fits your organisational structure:
*   **Monorepo Strategy**: Keep a `/docs` folder within your main application repository. This ensures documentation changes merge in the same Pull Request as the code they describe.
*   **Separate Repository Strategy**: Best for large organisations or open-source projects where a dedicated team manages documentation independently.

### 2. Validation with CI/CD

Integrate docmd into your CI/CD pipeline to ensure every update is technically sound. At a minimum, your pipeline should run the build command to check for syntax errors and configuration issues.

```bash
# Example validation step in GitHub Actions
- name: Validate Documentation
  run: npm install && npx @docmd/core build
```
See the [GitHub Actions Guide](../../guides/integrations/github-actions-cicd.md) for detailed setup instructions.

### 3. Collaborative Review Process

Establish a culture of peer review for all documentation updates. Use Pull Requests to discuss changes, verify formatting, and ensure technical accuracy. Use the [Threads Plugin](../../plugins/threads.md) to facilitate discussions directly on the rendered content.

## Trade-offs

Adopting a "docs-as-code" workflow can create a barrier for non-technical contributors who may find Git and Markdown intimidating. To mitigate this, consider using GitHub's built-in web editor for minor fixes. Alternatively, use the [Live Preview](../../content/live-preview.md) feature to provide a visual and intuitive authoring experience.
