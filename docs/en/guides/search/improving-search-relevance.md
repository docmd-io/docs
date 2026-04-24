---
title: "Search Relevance & Structure"
description: "How to structure your Markdown content to improve search relevance and help users find information faster."
---

## Problem

Search engines prioritize content based on structure. If a high-quality guide uses generic headers like "Introduction" or "Step 1," the search engine may not assign enough weight to the core keywords buried within the paragraphs. This results in relevant pages being buried deep in search results, frustrating users who expect instant answers.

## Why it matters

Users typically search for specific technical terms (e.g., "authentication token" or "deployment limit") rather than full sentences. If your documentation structure doesn't emphasize these terms, the search engine cannot confidently rank your content. High search relevance is the difference between a self-service documentation portal and a high volume of support tickets.

## Approach

Structure your Markdown so the search indexer can automatically identify and prioritize core concepts. `docmd`'s search engine assigns higher weights to the page `title`, `description`, and `headers` compared to the body text. By optimizing these structural elements, you significantly improve the discoverability of your content.

## Implementation

### 1. Optimize Frontmatter Metadata

Use the [Frontmatter](../../content/frontmatter) block to provide explicit keywords and a descriptive summary. The [Search Plugin](../../plugins/search) indexes these fields to provide better results and more useful snippets in the search UI.

```yaml
---
title: "AWS S3 Storage Configuration"
description: "How to configure IAM roles and bucket permissions for AWS S3 integration."
keywords: ["aws", "s3", "storage", "iam", "cloud"]
---
```

### 2. Use Semantic Headers

Avoid generic header names. Instead, include relevant keywords in your headers to provide context for both the user and the search engine.

*   **Low Relevance:** `## Step 1: Configuration`
*   **High Relevance:** `## Step 1: Configuring AWS IAM Roles`

### 3. Leverage Callouts for Key Information

Using [Callout Containers](../../content/containers/callouts) for critical warnings or "Pro Tips" can also help search relevance. Content within callouts is often semantically isolated and can be weighted differently by the indexer to highlight important troubleshooting steps.

## Trade-offs

Optimizing for search relevance requires disciplined writing. As your product evolves, keywords in frontmatter can become outdated if not regularly reviewed. Furthermore, including too many keywords in headers (keyword stuffing) can make the documentation feel repetitive and less natural to read. Aim for a balance between SEO and readability.
