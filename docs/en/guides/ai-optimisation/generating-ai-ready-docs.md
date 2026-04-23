---
title: "Generating AI-Ready Documentation with docmd (llms.txt and Beyond)"
description: "A comprehensive guide on ai-ready output."
---

## Problem

Developers are increasingly relying on AI coding assistants (like Cursor, Copilot, and ChatGPT) to read documentation on their behalf. If your documentation is locked behind React SPAs without a standardized text API, the AI cannot easily ingest the full context of your platform.

## Why it matters

Providing a clean, token-optimized text dump of your entire documentation is the modern equivalent of providing a REST API. Without it, AI agents scrape raw HTML, consuming thousands of useless tokens on navigation elements, destroying their small context windows.

## Approach

Leverage the `@docmd/plugin-llms` plugin. It implements the emerging `llms.txt` standard natively, generating token-optimized summaries and full-context files automatically during the build process.

## Implementation

The `llms` plugin is enabled by default in `docmd >= 0.7.0`.

1. Ensure your `baseUrl` or `url` is configured properly so absolute links are correctly resolved in the text file.

```javascript
export default defineConfig({
  url: 'https://docs.mycompany.com',
  plugins: {
    llms: {
      fullContext: true // Strongly recommended
    }
  }
});
```

2. When you build, `docmd` scans the routing tree and outputs two files to your site root:
*   `llms.txt`: A structured markdown summary of all your pages with their specific URLs.
*   `llms-full.txt`: A massive, concatenated markdown file containing the stripped text of your entire site, preserving semantic headers and code blocks.

3. To exclude internal-only documents from the AI feed, use frontmatter:

```yaml
---
title: "Internal Release Process"
llms: false
---
```

## Trade-offs

Generating `llms-full.txt` means you are creating a very large, single file. For sites with thousands of pages, this file could exceed 10MB, which might stress the context window of smaller LLMs. Future versions of `docmd` will introduce module-level chunking for `llms.txt`.
