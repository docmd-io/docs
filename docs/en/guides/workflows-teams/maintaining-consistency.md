---
title: "Maintaining Consistency"
description: "How to ensure a unified voice and professional quality across large documentation teams using linting and standardized patterns."
---

## Problem

In large teams, every technical writer has a different style and preference. Some might use bold text for emphasis, while others use italics. Some may prefer "Click the button," while others use "Select the option." Over time, your documentation can become a "patchwork quilt" of conflicting styles, making it harder for users to parse information quickly and reducing the professional trust of your product.

## Why it matters

Consistency breeds familiarity. When users are learning complex APIs or workflows, they rely on consistent vocabulary and structural patterns to navigate the content effectively. A unified voice makes your documentation feel like a cohesive, high-quality product, which in turn builds confidence in the software itself.

## Approach

Enforce consistency mechanically using [Standardized Containers](../../content/containers/index.md) and automated linting tools. By automating low-level style and syntax checks, you free up your human editors to focus on the high-level quality, accuracy, and clarity of the content.

## Implementation

### 1. Use Standardized docmd Patterns

Encourage all contributors to use `docmd`'s built-in thematic containers instead of improvising with manual Markdown formatting. This ensures that every warning, tip, or note looks and behaves identically across the entire site.

```markdown
<!-- ❌ Avoid: inconsistent and unstyled -->
**Note:** Please restart the service.

<!-- ✅ Use: consistent, accessible, and thematic -->
::: callout info
Please restart the service.
:::
```

Using [Callouts](../../content/containers/callouts.md) ensures that your documentation maintains a professional appearance and meets accessibility standards without extra effort from the writer.

### 2. Implement Prose Linting

Integrate tools like **Vale** or **Markdownlint** to enforce brand terminology, tone, and grammar. These tools can be configured to check for passive voice, biased language, or incorrect product spelling automatically.

```ini
# .vale.ini example
MinAlertLevel = suggestion
Packages = Google, Microsoft
[*]
BasedOnStyles = Vale, Google
```

### 3. Automated Enforcement in CI/CD

Include consistency checks in your [GitHub Actions](../../guides/integrations/github-actions-cicd.md) or other CI/CD pipelines. This ensures that every Pull Request is automatically audited for style and structural consistency before it can be merged.

```bash
# Example CI step for linting
- name: Lint Documentation
  run: vale docs/
```

## Trade-offs

Strict linting can sometimes discourage community contributors if they are met with multiple "style errors" for a simple typo fix. We recommend setting your linter's sensitivity to `warning` for external contributions and reserving `error` status for internal team updates to balance consistency with inclusivity.
