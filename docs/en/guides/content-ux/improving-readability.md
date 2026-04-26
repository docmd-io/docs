---
title: "Improving Readability"
description: "How to use visual rhythm, information hierarchy, and docmd's structural tools to create highly readable documentation."
---

## Problem

Technical documentation is often dense, jargon-heavy, and difficult to scan. When readers encounter "walls of text" without visual relief, they tend to skim over important details or miss critical safety warnings entirely. Dense formatting increases cognitive friction and leads to user frustration and potential errors.

## Why it matters

Readability is not just an aesthetic choice—it is a functional requirement. If a developer misses a warning because it was buried in a long paragraph, the consequences can be severe. A clear information hierarchy ensures that users can find the information they need quickly, understand it accurately, and act upon it safely.

## Approach

Establish a predictable visual rhythm by breaking up long sections of text and using [Thematic Containers](../../content/containers/index.md) to highlight critical information. By utilizing `docmd`'s built-in structural tools, you can create a hierarchy that guides the reader's eye naturally toward the most important parts of the page.

## Implementation

### 1. The "Power of Brevity"

Try to limit paragraphs to no more than three or four sentences. Shorter paragraphs are easier to digest on screens and provide natural "breathing room" for complex technical concepts. If a paragraph feels too long, consider breaking it into a list or using a sub-heading to re-categorise the information.

### 2. Categorising with Callouts

Use [Callouts](../../content/containers/callouts.md) consistently to categorise information. This allows users who are skimming to instantly recognise the intent of a block based on its visual style:

*   **Info**: Background context or supplementary details that provide deeper understanding.
*   **Tip**: Best practices, shortcuts, and "pro-tips" for efficiency.
*   **Warning/Danger**: Critical actions that could lead to errors, data loss, or security vulnerabilities.

```markdown
::: callout warning "Production Safety"
Never execute this command on a live database without verifying your backups first.
:::
```

### 3. Sequential Instruction with Steps

For tutorials and step-by-step guides, avoid narrative descriptions of actions. Instead, use the [Steps Container](../../content/containers/steps.md) to create a clear, numbered progression that is easy to follow.

```markdown
::: steps
1. **Initialise**: Run `npx @docmd/core init` in your project root.
2. **Configure**: Update your `docmd.config.js` with your site title and navigation.
3. **Build**: Run `npx @docmd/core build` to generate your production-ready static files.
:::
```

## Trade-offs

Using specialized containers like `::: steps` or `::: callout` requires contributors to learn `docmd`-specific Markdown extensions. While this adds a small learning curve, the significant improvement in information density, clarity, and professional presentation far outweighs the minimal effort of learning these powerful structural tags.