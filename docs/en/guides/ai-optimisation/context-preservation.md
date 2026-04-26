---
title: "Context Preservation for AI-Friendly Documentation"
description: "How to ensure that AI models can understand and utilize the relationships between different parts of your documentation."
---

## Problem

While human readers can easily click a hyperlink to learn more about a term, AI models often process documentation in isolated "chunks." When an AI encounters a hyperlink, it cannot "click" it to fetch more context. If critical information is hidden behind a link rather than explained in context, the AI may fail to provide accurate answers, leading to hallucinations.

## Why it matters

AI models rely on the immediate surrounding text to determine the meaning and relevance of information. If your documentation is highly fragmented with poor context preservation, AI-driven search tools (like those powered by RAG) will struggle to provide high-quality responses.

## Approach

Use **Inline Context Unrolling** to provide the minimum viable context alongside every major link. Additionally, leverage `docmd`'s specific features, such as the [LLMs Plugin](../../plugins/usage), to provide a unified, machine-readable view of your entire documentation set.

## Implementation

### 1. Descriptive Linking and Summaries

Avoid generic link text. Instead, provide a brief, one-sentence summary of the linked concept before or after the link itself.

-   **❌ Poor (Context Lost)**: To configure the timeout, refer to the [General Configuration](../../configuration/overview.md).
-   **✅ Better (Context Preserved)**: You can configure the `timeoutMs` parameter within the [General Configuration](../../configuration/overview.md), which defines how long the engine waits before failing a network request.

### 2. Using Collapsible Sections for Detail

[Collapsible Containers](../../content/containers/collapsible.md) are excellent for AI optimisation. The content remains part of the raw Markdown source (which the AI can read), but it is visually tucked away for human readers.

```markdown
### Database Connection

Connect using the primary URI.

::: collapsible "What is the URI format?"
The URI follows the standard PostgreSQL format: `postgresql://user:password@host:port/database`.
:::
```

### 3. Enabling the LLMs Plugin

Enable the [LLMs Plugin](../../plugins/llms.md) in your `docmd.config.js`. This plugin automatically generates a `llms-full.txt` file after every build, which concatenates your entire documentation set into a single, high-context file that can be easily consumed by Large Language Models.

## Trade-offs

Inline context unrolling makes your documentation slightly more verbose and introduces minor redundancy. However, this redundancy is a small price to pay for ensuring that your documentation is "AI-ready" and capable of powering high-quality automated support and search experiences.
