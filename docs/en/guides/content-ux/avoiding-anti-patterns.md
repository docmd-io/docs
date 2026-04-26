---
title: "Avoiding Anti-Patterns"
description: "How to identify and eliminate common documentation mistakes that degrade the user experience and increase content debt."
---

## Problem

Over time, documentation repositories often accumulate "quick fixes" to content problems that inadvertently erode the user experience. These anti-patterns—such as vague link text or bloated code samples—become entrenched in the project, making the documentation harder to maintain and less useful for developers.

## Why it matters

Anti-patterns contribute to "content debt." They degrade search engine rankings (SEO), reduce accessibility for users with disabilities, and significantly increase the cognitive load on readers who are simply trying to find a quick solution to a technical problem. High-quality documentation requires constant vigilance to keep it clean, concise, and professional.

## Approach

Identify and ruthlessly eliminate common anti-patterns during the [Peer Review process](../workflows-teams/git-based-workflows.md). Use automated prose linters like Vale and manual reviews to ensure your content remains high-quality, accessible, and consistent across all pages.

## Implementation

### 1. Non-Descriptive Hyperlinks

Avoid using generic text like "click here" or "read more" for links. This is harmful to SEO and makes the documentation inaccessible for screen reader users who often navigate by skipping between links.

*   **❌ Bad**: To configure your server, [click here](../../configuration/overview.md).
*   **✅ Good**: Review the [General Configuration](../../configuration/overview.md) to set up your production server.

### 2. The "Wall of Boilerplate"

In code examples, including dozens of lines of standard imports and boilerplate configuration before the core logic distracts the reader from the actual point of the example.

*   **Solution**: Focus on the relevant code snippet. If boilerplate is necessary for context, use comments to indicate that standard imports are omitted for brevity, or use [Callouts](../../content/containers/callouts.md) to explain the required setup.

### 3. Using FAQs as "Dumping Grounds"

"Frequently Asked Questions" (FAQ) pages often become a repository for information that was too difficult to integrate into the main guides. If a question is truly "frequently asked," it is a clear sign that your core documentation has failed to explain that concept effectively.

*   **Solution**: Instead of adding to an FAQ, refactor the relevant tutorial or conceptual guide to address the confusion directly where the user first encounters it. Use an [Important Callout](../../content/containers/callouts.md) if the information is critical for success.

## Trade-offs

Eliminating FAQs requires writers to constantly refactor and improve existing documentation hierarchies as new support issues are discovered. While this adds more initial maintenance overhead than simply appending a bullet point to an FAQ list, it results in a significantly more cohesive, professional, and useful documentation site for your users.