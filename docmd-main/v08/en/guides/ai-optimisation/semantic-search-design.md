---
title: "Designing for Semantic Search and RAG"
description: "How to structure your documentation to optimise it for vector-based search and Retrieval-Augmented Generation."
---

## Problem

Traditional keyword search relies on exact text matches. If a user searches for "authentication", a basic keyword engine fails to find "Integrating OAuth2" if the exact word is absent. Semantic search uses vector embeddings to understand query meaning. It solves this problem but requires specific documentation structures.

## Why it matters

Modern developers expect intuitive, intent-based search. If documentation fails to surface relevant content because of terminology differences, users abandon your site. Designing for semantic search ensures documentation remains discoverable regardless of the vocabulary used.

## Approach

Structure your documentation to be easily consumed by Retrieval-Augmented Generation (RAG) pipelines. Create "semantically dense" content where concepts are clearly defined. Replace pronouns with explicit entities to preserve context during chunking and vectorisation.

## Implementation

### 1. Rich Frontmatter Metadata

Use [Frontmatter](../../content/frontmatter.md) to provide explicit keywords and descriptions that might not appear naturally in the body text. This gives the search engine extra "hooks" into your content.

```yaml
---
title: "Integrating OAuth2"
description: "Learn how to implement secure user authentication and SSO."
keywords: ["login", "authentication", "sso", "security", "identity"]
---
```

### 2. The "Semantic Density" Strategy

RAG systems slice documents into small vector chunks. The first paragraph of every section should contain the highest density of relevant nouns and verbs related to that topic. This ensures the section's primary "meaning" is captured in the initial vector.

-   **✅ Good**: "This guide explains how to implement **OAuth2 Single Sign-On (SSO)** to provide secure **authentication** for your documentation site."
-   **❌ Poor**: "In this section, we'll talk about how it works and how you can set it up easily."

### 3. Avoiding Pronoun Ambiguity

In a chunked database, a sentence like "It works with any provider" is useless if the preceding paragraph defining "It" was sliced into a different chunk. Be explicit.

-   **❌ Ambiguous**: "It is highly scalable."
-   **✅ Explicit**: "The **docmd Search Engine** is designed to be highly scalable."

## Trade-offs

Writing for semantic density can feel more formal or repetitive than traditional narrative writing. However, the resulting improvement in discoverability and AI response accuracy makes this a vital practice for enterprise-grade documentation.
