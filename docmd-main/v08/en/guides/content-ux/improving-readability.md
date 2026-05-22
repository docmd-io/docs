---
title: "Improving Readability"
description: "How to use visual rhythm, information hierarchy, and docmd's structural tools to create highly readable documentation."
---

## Problem

Technical documentation is often dense, jargon-heavy, and difficult to scan. When readers encounter "walls of text" without visual relief, they skim over important details. Dense formatting increases cognitive friction, leading to user frustration and potential errors.

## Why it matters

Readability is a functional requirement. If a developer misses a warning buried in a long paragraph, the consequences can be severe. A clear information hierarchy ensures users find information quickly, understand it accurately, and act safely.

## Approach

Establish a predictable visual rhythm by breaking up long sections of text. Use [Thematic Containers](../../content/containers/index.md) to highlight critical information. By utilising docmd's built-in structural tools, you create a hierarchy that guides the reader's eye naturally toward the most important parts of the page.

## Implementation

### 1. The "Power of Brevity"

Limit paragraphs to three or four sentences. Shorter paragraphs are easier to digest on screens and provide "breathing room" for complex technical concepts. If a paragraph feels too long, break it into a list or use a sub-heading.

### 2. Categorising with Callouts

Use [Callouts](../../content/containers/callouts.md) consistently to categorise information. This allows skimming users to recognise the intent of a block based on its visual style:

*   **Info**: Background context or supplementary details.
*   **Tip**: Best practices, shortcuts, and "pro-tips".
*   **Warning/Danger**: Critical actions that could lead to errors, data loss, or security vulnerabilities.

```markdown
::: callout warning "Production Safety"
    Never execute this command on a live database without verifying backups first.
:::
```

### 3. Sequential Instruction with Steps

For tutorials, avoid narrative descriptions of actions. Instead, use the [Steps Container](../../content/containers/steps.md) to create a clear, numbered progression.

```markdown
::: steps
    1. **Initialise**: Run `npx @docmd/core init` in your project root.
    2. **Configure**: Update your `docmd.config.json` with your site title and navigation.
    3. **Build**: Run `npx @docmd/core build` to generate your production-ready static files.
:::
```

## Trade-offs

Using specialised containers like `::: steps` or `::: callout` requires contributors to learn docmd-specific Markdown extensions. While this adds a small learning curve, the significant improvement in information density and clarity far outweighs the minimal effort required.