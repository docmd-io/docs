---
title: "LLM Context Plugin"
description: "Optimise your documentation for AI consumption with automated llms.txt and llms-full.txt generation."
---

The `@docmd/plugin-llms` plugin ensures your documentation is perfectly optimised for Large Language Models (LLMs) and AI Agents. It follows the growing industry standard of providing a high-level summary and a comprehensive context file that AI tools can ingest to understand your project with minimal hallucination.

## Configuration

The LLM plugin is enabled by default. To function correctly, you must provide a `url` in your `docmd.config.js`.

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | Enable or disable the LLM context generation. |
| `fullContext` | `boolean` | `true` | If true, generates a `llms-full.txt` file containing the content of all pages. |
| `maxTokenLimit` | `number` | `null` | Optional limit on the total characters/tokens for context files. |

### Usage

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  url: 'https://docs.example.com',
  plugins: {
    llms: {
      fullContext: true
    }
  }
});
```

## Usage

Once configured, the plugin automatically generates `llms.txt` and `llms-full.txt` in your site root during every build. These files are linked in the page `<head>` for automatic discovery by AI tools.

### Excluding a Page

If a page contains sensitive information or internal notes you don't want AI models to learn, use the `llms: false` flag in your frontmatter:

```markdown
---
title: "Internal Dev Secrets"
llms: false
---
```

::: callout tip "Maximising AI Accuracy"
For detailed best practices on structuring your markdown (semantic headings, alt-text, etc.), see our [Optimising for AI Agents](../guides/ai-optimisation/generating-ai-ready-docs.md) guide.
:::