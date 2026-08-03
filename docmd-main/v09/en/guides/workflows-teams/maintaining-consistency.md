---
title: "Maintaining Consistency"
description: "How to ensure a unified voice and professional quality across large documentation teams using linting and standardised patterns."
---

## Problem

In large teams, every technical writer has a different style. Some use bold text for emphasis; others use italics. Some prefer "Click the button"; others use "Select the option". Over time, documentation becomes a patchwork quilt of conflicting styles. This makes it harder for users to parse information and reduces professional trust.

## Why it matters

Consistency breeds familiarity. When users learn complex APIs or workflows, they rely on consistent vocabulary and structural patterns to navigate effectively. A unified voice makes documentation feel like a cohesive, high-quality product, building confidence in the software itself.

## Approach

Enforce consistency mechanically using [Standardised Containers](../../content/containers/index.md) and automated linting tools. Automating low-level style and syntax checks frees human editors to focus on the high-level quality, accuracy, and clarity of the content.

## Implementation

### 1. Use Standardised docmd Patterns

Encourage all contributors to use docmd's built-in thematic containers instead of manual Markdown formatting. This ensures every warning, tip, or note looks and behaves identically across the entire site.

```markdown
<!-- ❌ Avoid: inconsistent and unstyled -->
**Note:** Please restart the service.

<!-- ✅ Use: consistent, accessible, and thematic -->
::: callout info
Please restart the service.
:::
```

Using [Callouts](../../content/containers/callouts.md) ensures your documentation maintains a professional appearance and meets accessibility standards without extra effort.

### 2. Implement Prose Linting

Integrate tools like **Vale** or **Markdownlint** to enforce brand terminology, tone, and grammar. These tools automatically check for passive voice, biased language, or incorrect product spelling.

```ini ".vale.ini"
# .vale.ini example
MinAlertLevel = suggestion
Packages = Google, Microsoft
[*]
BasedOnStyles = Vale, Google
```

### 3. Automated Enforcement in CI/CD

Include consistency checks in your [GitHub Actions](../../guides/integrations/github-actions-cicd.md) or other CI/CD pipelines. This ensures every Pull Request is audited for style and structural consistency before it can be merged.

```bash
# Example CI step for linting
- name: Lint Documentation
  run: vale docs/
```

## Trade-offs

Strict linting can discourage community contributors if they face multiple "style errors" for a simple typo fix. We recommend setting your linter's sensitivity to `warning` for external contributions and reserving `error` status for internal team updates. This balances consistency with inclusivity.