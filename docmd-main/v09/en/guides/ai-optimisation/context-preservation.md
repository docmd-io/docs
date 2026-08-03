---
title: "Context Preservation for AI-Friendly Documentation"
description: "How to ensure that AI models can understand and utilise the relationships between different parts of your documentation."
---

## Problem

Human readers can click hyperlinks to learn more. AI models often process documentation in isolated "chunks". When an AI encounters a hyperlink, it cannot "click" it to fetch context. If critical information is hidden behind a link, the AI may fail to provide accurate answers. This leads to hallucinations.

## Why it matters

AI models rely on immediate surrounding text to determine meaning. If your documentation is highly fragmented with poor context preservation, AI-driven search tools (like RAG systems) will struggle to provide high-quality responses.

## Approach

Use **Inline Context Unrolling** to provide the minimum viable context alongside every major link. Use docmd's [LLMs Plugin](../../plugins/llms.md) to provide a unified, machine-readable view of your entire documentation set.

## Implementation

### 1. Descriptive Linking and Summaries

Avoid generic link text. Provide a brief, one-sentence summary of the linked concept alongside the link.

-   **❌ Poor (Context Lost)**: To configure the timeout, refer to the [General Configuration](../../configuration/overview.md).
-   **✅ Better (Context Preserved)**: You can configure the `timeoutMs` parameter within the [General Configuration](../../configuration/overview.md), which defines how long the engine waits before failing a network request.

### 2. Using Collapsible Sections for Detail

[Collapsible Containers](../../content/containers/collapsible.md) are excellent for AI optimisation. The content remains part of the raw Markdown source for the AI, but it is visually tucked away for human readers.

```markdown
### Database Connection

Connect using the primary URI.

::: collapsible "What is the URI format?"
The URI follows the standard PostgreSQL format: `postgresql://user:password@host:port/database`.
:::
```

### 3. Enabling the LLMs Plugin

Enable the [LLMs Plugin](../../plugins/llms.md) in your `docmd.config.json`. This plugin generates a `llms-full.txt` file after every build. It concatenates your entire documentation set into a single, high-context file that LLMs consume easily.

## Trade-offs

Inline context unrolling makes documentation slightly more verbose and introduces minor redundancy. However, this is a small price to ensure your documentation is "AI-ready" and capable of powering high-quality automated support.