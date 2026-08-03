---
title: "Search Relevance & Structure"
description: "How to structure your Markdown content to improve search relevance and help users find information faster."
---

## Problem

Search engines prioritise content based on structure. If a high-quality guide uses generic headers like "Introduction" or "Step 1", the search engine may not assign enough weight to core keywords. Relevant pages get buried in search results, frustrating users who expect instant answers.

## Why it matters

Users typically search for specific technical terms (e.g., "authentication token" or "deployment limit") rather than full sentences. If your documentation structure doesn't emphasise these terms, the search engine cannot confidently rank your content. High search relevance prevents a high volume of support tickets.

## Approach

Structure your Markdown so the search indexer automatically identifies and prioritises core concepts. docmd's search engine assigns higher weights to the page `title`, `description`, and `headers` compared to the body text. Optimising these structural elements significantly improves discoverability.

## Implementation

### 1. Optimise Frontmatter Metadata

Use the [Frontmatter](../../content/frontmatter.md) block to provide explicit keywords and a descriptive summary. The [Search Plugin](../../plugins/search.md) indexes these fields to provide better results and useful snippets in the search UI.

```yaml
---
title: "AWS S3 Storage Configuration"
description: "How to configure IAM roles and bucket permissions for AWS S3 integration."
keywords: ["aws", "s3", "storage", "iam", "cloud"]
---
```

### 2. Use Semantic Headers

Avoid generic header names. Include relevant keywords in your headers to provide context for both the user and the search engine.

*   **Low Relevance:** `## Step 1: Configuration`
*   **High Relevance:** `## Step 1: Configuring AWS IAM Roles`

### 3. Use Callouts for Key Information

Using [Callout Containers](../../content/containers/callouts.md) for critical warnings or "Pro Tips" improves search relevance. Content within callouts is semantically isolated and weighted differently by the indexer to highlight important troubleshooting steps.

## Trade-offs

Optimising for search relevance requires disciplined writing. As your product evolves, keywords in frontmatter become outdated if not reviewed regularly. In addition, including too many keywords in headers (keyword stuffing) makes documentation feel repetitive and unnatural. Aim for a balance between SEO and readability.
