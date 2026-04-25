---
title: "Generating AI-Ready Documentation with docmd"
description: "How to use the llms.txt standard and docmd's built-in tools to provide optimised context for AI assistants."
---

## Problem

Developers increasingly rely on AI coding assistants (like Cursor, GitHub Copilot, and ChatGPT) to read and interpret documentation on their behalf. If your documentation is only accessible via a web browser and is cluttered with navigation elements, trackers, and complex HTML, AI agents will consume excessive tokens on irrelevant data, quickly exhausting their context windows.

## Why it matters

Providing a clean, token-optimised text version of your documentation is the modern equivalent of providing a high-quality REST API. It ensures that AI agents can quickly ingest your entire documentation set, resulting in more accurate code suggestions and better support for developers using your product.

## Approach

Leverage `docmd`'s built-in **LLMs Plugin**. This plugin natively implements the emerging `llms.txt` standard, automatically generating token-optimised summaries and full-context files during every build process.

## Implementation

The `llms` plugin is available in `docmd >= 0.7.0` and can be configured in your [Plugin Configuration](../../plugins/usage).

### 1. Configure the Site URL

Ensure that the `url` property is correctly set in your `docmd.config.js`. This allows the plugin to generate absolute URLs for all pages in the `llms.txt` file.

```javascript
// docmd.config.js
export default {
  title: 'My Project Docs',
  url: 'https://docs.example.com',
  plugins: ['llms']
};
```

### 2. Output Files

During the build process, `docmd` generates two key files in your site root:

-   **`llms.txt`**: A concise, structured Markdown summary of all your pages, including their titles, descriptions, and full URLs.
-   **`llms-full.txt`**: A comprehensive file containing the raw Markdown content of your entire site, concatenated with standard separators (`---`). This provides the ultimate "source of truth" for AI models.

### 3. Controlling Ingestion

You can exclude specific pages from the AI-ready output by using the `llms` property in the [Page Frontmatter](../../content/frontmatter).

```yaml
---
title: "Internal Debugging Guide"
llms: false
---
```

## Trade-offs

Generating `llms-full.txt` creates a large single file. For exceptionally large documentation sites, this file could exceed several megabytes. While this is ideal for modern LLMs with large context windows (like Gemini 1.5 Pro or Claude 3.5 Sonnet), it may be too large for smaller models. Ensure you organise your [Navigation](../../configuration/navigation) logically so that the AI can prioritize the most important sections.
