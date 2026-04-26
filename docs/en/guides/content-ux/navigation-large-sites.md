---
title: "Navigation for Large Sites"
description: "How to organise complex documentation sets into an intuitive, scalable navigation structure using docmd's layout tools."
---

## Problem

As a documentation site grows from a few dozen pages to hundreds or thousands, a simple sidebar often transforms into a confusing labyrinth of deeply nested folders. When users are forced to expand multiple levels of hierarchy just to find a specific reference, they lose context, become frustrated, and often abandon the documentation in favour of trial-and-error.

## Why it matters

Navigation is the "map" of your product's capabilities. If navigation is difficult to use, users will rely exclusively on the search bar, which can lead to fragmented knowledge. A well-structured navigation system teaches the user the logic and taxonomy of your product as they browse, helping them become more proficient and self-sufficient over time.

## Approach

Prioritize **Top-Level Context Switching** over deep nesting. Aim to keep your left sidebar limited to no more than two or three levels of depth. Use the horizontal [Menubar](../../configuration/menubar.md) to separate distinct documentation "domains" (e.g., Guides, API Reference, and Community), which allows each individual sidebar to remain focused, relevant, and manageable.

## Implementation

### 1. Domain-Based Separation

In your `docmd.config.js`, use the [Menubar](../../configuration/menubar.md) to divide your content into high-level categories. This approach allows you to present a completely different sidebar for each domain, preventing a single navigation tree from becoming overwhelmed.

### 2. Flattening the Hierarchy

Instead of splitting a single concept across many tiny Markdown pages, consolidate related information into comprehensive parent pages. Use clear [Heading Hierarchy](../../content/syntax/index.md) to allow users to navigate within the page using the auto-generated right-side Table of Contents (TOC).

*   **❌ Poor IA**: A folder named "Security" containing ten separate, one-paragraph files for different protocols.
*   **✅ Better IA**: A single, well-structured "Security Overview" page that covers all protocols, using headings to provide a clean TOC.

### 3. Leveraging Collapsible Sections

For large groups of related content that aren't accessed constantly, use the `collapsible` property in your [Navigation Configuration](../../configuration/navigation.md). This keeps the interface clean by hiding secondary information until it is explicitly requested by the user.

```json
// navigation.json
{
  "title": "API Reference",
  "collapsible": true,
  "collapsed": true,
  "children": [
    { "title": "Authentication", "path": "api/auth" },
    { "title": "Endpoints", "path": "api/endpoints" }
  ]
}
```

## Trade-offs

Consolidating content into fewer, longer pages requires authors to be disciplined about structural clarity and heading use. If a page becomes too long without proper internal navigation (TOC), it can become its own "wall of text." However, the significant reduction in "click-fatigue" and the improved discovery of related content make a flatter, domain-based hierarchy far superior for large documentation sets.