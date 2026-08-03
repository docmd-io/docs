---
title: "Avoiding Anti-Patterns"
description: "How to identify and eliminate common documentation mistakes that degrade the user experience and increase content debt."
---

## Problem

Documentation repositories accumulate "quick fixes" that inadvertently erode the user experience. Anti-patterns - such as vague link text or bloated code samples - become entrenched. This makes documentation harder to maintain and less useful for developers.

## Why it matters

Anti-patterns contribute to "content debt". They degrade search engine rankings (SEO), reduce accessibility, and increase cognitive load on readers trying to find quick solutions. High-quality documentation requires constant vigilance to keep it clean, concise, and professional.

## Approach

Identify and ruthlessly eliminate common anti-patterns during the [Peer Review process](../workflows-teams/git-based-workflows.md). Use automated prose linters like Vale and manual reviews to ensure content remains high-quality, accessible, and consistent.

## Implementation

### 1. Non-Descriptive Hyperlinks

Avoid generic text like "click here" or "read more" for links. This harms SEO and makes documentation inaccessible for screen reader users who navigate by skipping between links.

*   **❌ Bad**: To configure your server, [click here](../../configuration/overview.md).
*   **✅ Good**: Review the [General Configuration](../../configuration/overview.md) to set up your production server.

### 2. The "Wall of Boilerplate"

In code examples, dozens of lines of standard imports and boilerplate distract the reader from the core logic.

*   **Solution**: Focus on the relevant code snippet. If boilerplate is necessary, use comments to indicate omissions or use [Callouts](../../content/containers/callouts.md) to explain the required setup.

### 3. Using FAQs as "Dumping Grounds"

"Frequently Asked Questions" (FAQ) pages often become a repository for information that failed to integrate into main guides. If a question is truly "frequently asked," it indicates your core documentation failed to explain the concept effectively.

*   **Solution**: Instead of adding to an FAQ, refactor the relevant tutorial or conceptual guide to address the confusion where the user first encounters it. Use an [Important Callout](../../content/containers/callouts.md) if the information is critical.

## Trade-offs

Eliminating FAQs requires writers to refactor and improve existing documentation hierarchies constantly. While this adds initial maintenance overhead, it results in a significantly more cohesive, professional, and useful documentation site.