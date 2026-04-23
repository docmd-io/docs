---
title: "Creating Deterministic, Chunkable Documentation for AI Consumption"
description: "A comprehensive guide on chunkable content."
---

## Problem

When AI pipelines (RAG architectures) ingest documentation, they slice the markdown into "chunks" (e.g., 500 tokens each). If a document is composed of long, meandering paragraphs with unclear delineations, the slicing algorithm splits the context mid-thought, destroying the utility of the chunk.

## Why it matters

If the AI retrieves a chunk that contains a code block but misses the preceding paragraph explaining *when* to use that code, the generated answer will lack necessary conditionality, leading to incorrect usage.

## Approach

Structure pages as a hierarchy of deterministic blocks. Keep sections short, visually bounded by headers, and immediately followed by their respective code or examples.

## Implementation

### 1. The Header-to-Header Rule
A chunk boundary should naturally occur at a Markdown header (`##`). Ensure that everything beneath a `##` header comprehensively answers a single, atomic concept.

```markdown
## Generating API Keys

To authenticate, you must generate an API key. This key grants full read/write access.

[Code block showing generation]
```

### 2. Group Warnings with Context
Do not separate a critical warning from the code it applies to using wide gaps of text. Use docmd's nested containers.

```markdown
::: callout warning "Destructive Action"
Executing the following command will drop the production database.
:::
`db.core.drop()`
```
Because the callout and the code are tight vertically, RAG systems (which chunk sequentially) are highly likely to keep them in the same vector chunk.

## Trade-offs

This forces documentation into a more segmented, modular rhythm. Authors must resist the urge to write long, flowing narratives spanning thousands of words, opting instead for atomic, self-contained units of knowledge.
