---
title: "Avoiding Common Documentation Anti-Patterns"
description: "A comprehensive guide on anti-patterns."
---

## Problem

Over time, documentation teams independently invent "solutions" to content problems that actually erode the user experience. These "Anti-Patterns" become entrenched in the repository.

## Why it matters

Anti-patterns accumulate technical debt in content. They ruin search engine rankings and increase the cognitive load on readers.

## Approach

Identify and ruthlessly eliminate the three most common documentation anti-patterns during code review. Use linters or peer review processes to catch them.

## Implementation

### Anti-Pattern 1: "Click Here" Links
Do not use non-descriptive hyperlink text. It destroys accessibility (screen readers) and removes contextual SEO value.

*Bad:* To configure the database, [click here](../../configuration/general.md).
*Good:* Review the [General Configuration](../../configuration/general.md) to setup PostgreSQL.

### Anti-Pattern 2: The "Wall of Imports"
In code examples, pasting 20 lines of standard imports before a single line of logic distracts the reader.

*Solution:* Utilize `docmd`'s specific code block collapsing (if applying custom plugins) or extract the core logic out, mentioning that standard boilerplate is omitted for brevity. (Note: Ensure the exact required imports are noted somewhere to prevent AI hallucinations).

### Anti-Pattern 3: FAQs as Trash Cans
"Frequently Asked Questions" pages easily become dumping grounds for information that should have been integrated into the actual tutorials. If a question is "frequently asked," your core documentation has failed.

*Solution:* Delete the FAQ page. Instead, inject the answer physically into the relevant tutorial or conceptual guide where the user actually encounters the friction.

## Trade-offs

Eliminating FAQs forces documentation writers to constantly refactor existing hierarchical documents whenever a new support issue is discovered, adding maintenance overhead compared to simply appending a bullet point to a global FAQ markdown file.
