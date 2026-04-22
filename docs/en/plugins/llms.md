---
title: "LLM Context Plugin"
description: "Optimise your documentation for AI consumption with automated llms.txt and llms-full.txt generation."
---

The `@docmd/plugin-llms` plugin ensures your documentation is perfectly optimised for Large Language Models (LLMs) and AI Agents. It follows the growing industry standard of providing a high-level summary and a comprehensive context file that AI tools can ingest to understand your project with minimal hallucination.

## Configuration

The LLM plugin is enabled by default. To function correctly, you must provide a `url` in your `docmd.config.js`.

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  url: 'https://docs.example.com',
  plugins: {
    llms: {
      fullContext: true // Generates llms-full.txt
    }
  }
});
```

### Excluding a Page

If a page contains sensitive information or internal notes you don't want AI models to learn, use the `llms: false` flag in your frontmatter:

```yaml
---
title: "Internal Dev Secrets"
llms: false
---
```

::: callout tip "Maximising AI Accuracy"
For detailed best practices on structuring your markdown (semantic headings, alt-text, etc.), see our [Optimising for AI Agents](../recipes/ai-optimization) recipe.
:::