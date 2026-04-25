---
title: "Creating Deterministic and Chunkable Documentation"
description: "How to structure your documentation to optimise it for Retrieval-Augmented Generation (RAG) and AI ingestion."
---

## Problem

When AI pipelines (such as RAG architectures) ingest documentation, they slice the Markdown source into smaller "chunks" (e.g., 500 tokens each). If a document consists of long, meandering paragraphs with unclear boundaries, the slicing algorithm may split the context mid-thought, destroying the utility of the chunk and leading to incomplete or incorrect AI responses.

## Why it matters

If an AI retrieves a chunk containing a code block but misses the preceding paragraph explaining *when* to use that code, the generated answer will lack necessary conditionality. Structuring your documentation for chunkability ensures that each segment of text contains enough context to be useful on its own.

## Approach

Structure your pages as a hierarchy of deterministic, atomic blocks. Use Markdown headers to clearly delineate concepts and ensure that related information (like a warning and the code it applies to) is kept physically close together in the source file.

## Implementation

### 1. Atomic Header Sections

Ensure that every `##` or `###` header encapsulates a single, atomic concept. A well-structured section should be able to stand alone as a useful chunk for an AI model.

-   **✅ Good**: A header "Authentication via OAuth" followed by a brief explanation and a code example.
-   **❌ Poor**: A massive "Getting Started" page with 15 different concepts and no sub-headers.

### 2. Tight Proximity for Critical Information

Do not separate a critical warning from the code it applies to with long paragraphs. Use [Callouts](../../content/containers/callouts) to bind them together vertically. This increases the probability that they will remain in the same vector chunk during ingestion.

```markdown
::: callout warning "Destructive Action"
Running this command will permanently delete all logs.
:::

`docmd logs --clear`
```

### 3. Automated Concatenation

The [LLMs Plugin](../../plugins/usage) facilitates chunking by generating a `llms-full.txt` file. This file uses standard separators (`---`) between pages, helping ingestion pipelines recognise natural document boundaries while preserving the global context of your project.

## Trade-offs

This approach favors a modular, segmented writing style over long, flowing narratives. While this may feel more repetitive to a human reader, it significantly improves the performance of AI-powered search and automated support agents that rely on your documentation.
