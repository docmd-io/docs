---
title: "Improving Search Relevance with Structured Markdown"
description: "A comprehensive guide on relevance & structure."
---

## Problem

Search engine algorithms parse raw text. If an author writes a brilliant tutorial but puts the core keywords only in the paragraph text while giving headers generic names like "Step 1" and "Step 2", the search engine applies a low weighting to the document.

## Why it matters

Users rarely search in full sentences. They search using isolated keywords (e.g., "deploy vercel limit"). If the search engine algorithm cannot confidently weigh these terms against specific page structures, the relevant page will be buried on page 3 of the search results.

## Approach

Structure your markdown so that the search indexer automatically assigns high relevance scores. In `docmd`, the search index weights `title` > `headers` > `content`. 

## Implementation

### 1. High-Density Frontmatter
Inject your frontmatter with the terms users search for, even if they explicitly don't appear in the document title.

```yaml
---
title: "Cloud Provider Configuration"
keywords: ["aws", "s3", "gcp", "azure", "deployment"]
description: "Learn how to connect your application to your desired cloud infrastructure."
---
```

### 2. Semantic Headers over Generic Headers

*Low Relevance Score:*
```markdown
# Storage Setup
## Step 1
## Step 2
```

*High Relevance Score:*
```markdown
# AWS S3 Storage Setup
## Configuring AWS IAM Roles
## Uploading S3 Objects
```

### 3. Use Bold Text for Concepts
Most search indexers apply a minor multiplier to `<strong>` tags. Wrap core concepts in bold syntax the first time they are introduced.

```markdown
The **Authentication Context** holds the user's JWT token globally.
```

## Trade-offs

Keyword stuffing frontmatter takes disciplinary effort. As features evolve, keywords get out of sync. Furthermore, heavily bolded text can distract readers visually, so it must be used sparingly and only on critical taxonomic keywords.
