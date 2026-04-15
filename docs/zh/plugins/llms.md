---
title: "LLM Context Plugin"
description: "Optimise your documentation for AI consumption with automated llms.txt and llms-full.txt generation."
---

The `@docmd/plugin-llms` plugin ensures your documentation is perfectly optimised for Large Language Models (LLMs) and AI Agents. It follows the growing industry standard of providing a high-level summary and a comprehensive context file that AI tools can ingest to understand your project with minimal hallucination.

## Configuration


<!-- SCREENSHOT: Browser showing the raw llms.txt output at /llms.txt — the structured summary with page titles, URLs, and descriptions in plain text format. -->

The LLM plugin is enabled by default. To function correctly, you must provide a `siteUrl` in your `docmd.config.js`.

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  siteUrl: 'https://docs.example.com',
  plugins: {
    llms: {} // Enabled by default
  }
### Excluding a Page
If a page contains sensitive information or internal notes you don't want AI models to learn:

```yaml
---
title: "Internal Dev Secrets"
llms: false
---
```

::: callout tip
By hosting an `llms-full.txt` file, you are essentially providing an **Open API for AI Models**. This makes your project the preferred choice for developers working with AI assistance, as they can reliably get accurate answers without your docs "hallucinating" or being outdated by the model's training cutoff.
:::