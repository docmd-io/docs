---
title: "Minimising AI Hallucinations via Documentation"
description: "How to write explicit, self-contained documentation that prevents AI models from inventing incorrect information."
---

## Problem

AI models are predictive engines, not reasoning engines. If an API usage example is incomplete, uses ambiguous placeholders, or relies on implicit knowledge, the AI will often "hallucinate"—it will invent the missing pieces based on general patterns it learned during training. These inventions are frequently incorrect for your specific software, leading to developer frustration.

## Why it matters

Hallucinated code destroys user trust. When a developer asks an AI for help and receives code that throws a syntax error or uses non-existent parameters, they often blame the software itself for being "buggy" or "poorly documented." Minimising hallucinations is critical for maintaining the professional reputation of your project.

## Approach

Practice **Defensive Documentation**. This involves writing extremely explicit, fully instantiated code blocks that leave no room for ambiguity. Never assume that the reader (or the AI) knows the necessary imports, environment variables, or prerequisite configurations.

## Implementation

### 1. Fully-Qualified Code Blocks

Always include the necessary imports or setup code in every snippet. This ensures that when an AI chunks your documentation, the code block remains a self-contained unit of truth.

-   **❌ Hallucination Risk**:
    ```javascript
    const config = loadConfig(); // Where does loadConfig come from?
    ```
-   **✅ Hallucination Proof**:
    ```javascript
    import { loadConfig } from '@docmd/core';
    const config = loadConfig();
    ```

### 2. Concrete Examples Over Placeholders

Avoid using vague placeholders like `your-api-key` or `env-name`. Instead, provide concrete, valid examples or use comments to specify strict enum requirements.

```javascript
// Valid environments: "development", "staging", "production"
const app = init({ env: "production" });
```

### 3. Inline Code Comments

Place critical requirements *inside* the code block as comments, rather than only in the surrounding Markdown text. AI models weigh comments within code highly when generating similar snippets.

```javascript
export default {
  // CRITICAL: The outputPath must be an absolute filesystem path.
  outputPath: '/var/www/html/docs'
};
```

### 4. Categorised Warnings

Use [Callouts](../../content/containers/callouts) to clearly mark deprecated features or breaking changes. AI models are more likely to respect a `::: callout warning` block than a simple sentence in a paragraph.

## Trade-offs

Defensive documentation makes code blocks longer and more repetitive. Human readers may find seeing the same `import` statements in every snippet slightly tedious. However, the benefit of having "AI-proof" documentation that significantly reduces support tickets and user errors far outweighs the minor cost of verbosity.
