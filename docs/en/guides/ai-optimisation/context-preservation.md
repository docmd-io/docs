---
title: "Best Practices for Linking and Context Preservation in AI-Friendly Docs"
description: "A comprehensive guide on context preservation."
---

## Problem

Hyperlinks provide excellent context for humans, who can click them to open a new tab and learn more. However, when an AI model processes a chunk of text, it cannot "click" the link. The context locked behind the hyperlink is entirely lost.

## Why it matters

If a critical parameter's definition is hidden behind a hyperlink rather than explained inline, the AI will fail to use that parameter correctly, despite the documentation technically pointing to the answer.

## Approach

Utilize **Inline Context Unrolling**. While you should still use hyperlinks for deep dives, you must provide a brief, one-sentence summary of the linked concept *before* initiating the link, or immediately adjacent to it.

## Implementation

*Bad (Context Lost for AI):*
To configure the timeout, refer to the [Navigation Array](../../configuration/navigation.md).

*Good (Context Preserved for AI):*
Configure the timeline via the `timeoutMs` parameter, which is part of the [Navigation Array](../../configuration/navigation.md) (a schema defining retry limits and DNS resolutions).

### Implementing with `docmd` Containers
For advanced context, use Docmd's collapsible sections. These remain in the markdown stream (visible to the AI natively) but are visually hidden for human readers until clicked.

```markdown
### Database Configuration

Connect to your primary DB instance using the connection URI.

::: collapsible "What is the internal connection URI?"
The connection URI follows standard PostgreSQL syntax: `postgresql://user:password@host:port/database`.
:::
```

The AI reads this seamlessly as part of the flow, while humans get a clean UI.

## Trade-offs

Inline Context Unrolling makes documents slightly more verbose. It repeats high-level summaries that exist elsewhere in the wiki. However, this intentional redundancy ensures that regardless of how the text is chunked or retrieved, the agent always has the minimum viable context to act.
