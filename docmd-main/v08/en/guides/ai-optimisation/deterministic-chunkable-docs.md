---
title: "Creating Deterministic and Chunkable Documentation"
description: "How to structure your documentation to optimise it for Retrieval-Augmented Generation (RAG) and AI ingestion."
---

## Problem

When AI pipelines ingest documentation, they slice the Markdown into smaller "chunks". If a document consists of long paragraphs with unclear boundaries, the algorithm splits context mid-thought. This destroys the chunk's utility and leads to incorrect AI responses.

## Why it matters

If an AI retrieves a code block but misses the preceding paragraph explaining *when* to use it, the answer lacks conditionality. Structuring your documentation for chunkability ensures each segment contains enough context to be useful on its own.

## Approach

Structure your pages as a hierarchy of deterministic, atomic blocks. Use Markdown headers to clearly delineate concepts. Ensure related information (like a warning and the code it applies to) is kept physically close together in the source file.

## Implementation

### 1. Atomic Header Sections

Ensure every `##` or `###` header encapsulates a single, atomic concept. A well-structured section should stand alone as a useful chunk for an AI model.

-   **✅ Good**: A header "Authentication via OAuth" followed by a brief explanation and a code example.
-   **❌ Poor**: A massive "Getting Started" page with 15 different concepts and no sub-headers.

### 2. Tight Proximity for Critical Information

Do not separate a critical warning from the code it applies to with long paragraphs. Use [Callouts](../../content/containers/callouts.md) to bind them together vertically. This increases the probability that they remain in the same vector chunk during ingestion.

```markdown
::: callout warning "Destructive Action"
Running this command will permanently delete all logs.
:::

`npx @docmd/core logs --clear`
```

### 3. Automated Concatenation

The [LLMs Plugin](../../plugins/llms.md) facilitates chunking by generating a `llms-full.txt` file. This uses standard separators (`---`) between pages. It helps ingestion pipelines recognise natural document boundaries while preserving global context.

## Trade-offs

This approach favours a modular, segmented writing style over long, flowing narratives. While it may feel repetitive to a human reader, it significantly improves the performance of AI-powered search and automated support agents.