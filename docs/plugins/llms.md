---
title: "AI Support (llms.txt)"
description: "Turn your documentation into a first-class API for Large Language Models using the native llms.txt and llms-full.txt generation."
---

`docmd` is built for a world where both humans and machines consume documentation. The `llms` plugin automatically transforms your site into a structured, high-context data stream that allows AI agents and Large Language Models (LLMs) to understand your project with nearly 100% precision.

## Enabling AI Support

The plugin is bundled with `@docmd/core` and can be activated with a single line:

```javascript
// docmd.config.js
export default {
  url: 'https://docs.myproject.com', // Required for absolute link generation
  plugins: {
    llms: {} 
  }
};
```

## What it Generates

When enabled, `docmd` generates two specialized files at the root of your production output:

### 1. `llms.txt` (The Index)
A standardized, minimalist Markdown file that map out your site's hierarchy. AI tools like **Cursor**, **ChatGPT Search**, and **Perplexity** can use this to crawl your site's structure efficiently without downloading heavy HTML.

### 2. `llms-full.txt` (The Context Payload)
This is a `docmd`-specific innovation. It concatenates the raw, high-fidelity content of your **entire** documentation project into one single massive text file. 

*   **Zero Noise**: Strips CSS, JS, and UI clutter. 
*   **High Context**: Preserves headings, code blocks, and relationships.
*   **Total Awareness**: Users can upload this single file to ChatGPT or Claude to give the model immediate, deep knowledge of your entire library in one prompt.

## Managing AI Context

You can control what parts of your site are visible to AI models using frontmatter.

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