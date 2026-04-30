---
title: "Setting Up a Workflow"
description: "How to establish a high-velocity, multi-author documentation workflow using docmd and docs-as-code principles."
---

## Problem

When teams lack a structured documentation workflow, updates are often delayed, forgotten, or shared as ad-hoc messages. Without a clear process, content becomes fragmented, formatting becomes inconsistent, and technical writers spend more time resolving merge conflicts than writing high-quality content.

## Why it matters

Without a formal process, documentation quickly becomes outdated and loses its value. If updating documentation requires waiting on a slow software release cycle, your guides will perpetually remain out of sync with your actual product features, leading to user frustration and increased support volume.

## Approach

Decouple documentation deployments from software release cycles while adopting the same robust processes used in software engineering (Branches → Pull Requests → CI/CD Previews). `docmd`'s lightweight nature allows teams to treat "documentation as code" with minimal overhead, ensuring that your guides are as reliable and up-to-date as your software.

## Implementation

### 1. Repository Strategy

Choose the strategy that best fits your organizational structure:
*   **Monorepo Strategy**: Keep a `/docs` folder within your main application repository. This is ideal for ensuring that documentation changes are merged in the same Pull Request as the code they describe, maintaining perfect synchronization.
*   **Separate Repository Strategy**: Best for large organisations or open-source projects where a dedicated team manages the documentation independently of the main application's build pipeline.

### 2. Validation with CI/CD

Integrate `docmd` into your CI/CD pipeline to ensure that every update is technically sound. At a minimum, your pipeline should run the build command to check for syntax errors and configuration issues.

```bash
# Example validation step in GitHub Actions
- name: Validate Documentation
  run: npm install && npx @docmd/core build
```
See the [GitHub Actions Guide](../../guides/integrations/github-actions-cicd.md) for detailed setup instructions.

### 3. Collaborative Review Process

Establish a culture of peer review for all documentation updates. Use Pull Requests to discuss changes, verify formatting, and ensure technical accuracy. You can leverage the [Threads Plugin](../../plugins/usage.md) to facilitate detailed discussions directly on the rendered content.

## Trade-offs

Adopting a "docs-as-code" workflow can create a barrier for non-technical contributors (e.g., Product Managers or Legal teams) who may find Git and Markdown intimidating. To mitigate this, consider using GitHub's built-in web editor for minor fixes or leveraging the [Live Preview](../../content/live-preview.md) feature to provide a more visual and intuitive authoring experience.
