---
title: "Improving Readability and Information Hierarchy in Documentation"
description: "A comprehensive guide on readability & hierarchy."
---

## Problem

Engineers naturally write like they code: dense, logically packed, and utilizing jargon. When writing encounters dense technical matter without visual relief (whitespace), the eye glazes over, leading to "skimming."

## Why it matters

Skimming leads to missed steps. A missed step in a deployment tutorial leads to a broken server. Visual readability is not an aesthetic choice; it is an operational requirement.

## Approach

Enforce strict visual rhythms. Break up text walls mathematically and employ thematic `docmd` containers to establish a predictable information hierarchy.

## Implementation

### 1. The 3-Sentence Rule
Never allow a paragraph to exceed three sentences. Technical concepts must breathe.

### 2. Thematic Breakouts
Use `docmd` callouts consistently to establish a visual language.
- `info`: Contextual background.
- `tip`: Best practices.
- `warning`: Destructive actions.

By color-coding the intent, a user scrolling rapidly can instantly spot dangerous actions (Red/Yellow) without reading a word.

### 3. Step Structuring
When outlining sequential actions, do not use narrative text. Use numbered lists or `docmd` step containers.

```markdown
::: steps
1. Initialize the project.
2. Configure the database.
3. Deploy to production.
:::
```

This draws the eye downwards and clearly defines the progression.

## Trade-offs

Breaking content into highly stylized blocks requires the author to learn the specific Markdown extensions (e.g., `::: callout`). This slightly raises the barrier to entry for casual open-source contributors compared to pure standard Markdown.
