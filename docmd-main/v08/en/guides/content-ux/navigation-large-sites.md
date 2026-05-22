---
title: "Navigation for Large Sites"
description: "How to organise complex documentation sets into an intuitive, scalable navigation structure using docmd's layout tools."
---

## Problem

As a site grows to hundreds of pages, a simple sidebar often transforms into a labyrinth of deeply nested folders. When users must expand multiple levels to find a reference, they lose context. Frustrated users abandon documentation in favour of trial-and-error.

## Why it matters

Navigation is the "map" of your product's capabilities. If navigation is difficult, users rely exclusively on the search bar, leading to fragmented knowledge. A well-structured navigation system teaches users the taxonomy of your product, helping them become self-sufficient over time.

## Approach

Prioritise **Top-Level Context Switching** over deep nesting. Keep your left sidebar limited to two or three levels of depth. Use the horizontal [Menubar](../../configuration/menubar.md) to separate distinct documentation "domains" (e.g., Guides, API Reference, Community). This allows each sidebar to remain focused and manageable.

## Implementation

### 1. Domain-Based Separation

In your `docmd.config.json`, use the [Menubar](../../configuration/menubar.md) to divide your content into high-level categories. This approach allows you to present a completely different sidebar for each domain, preventing a single navigation tree from becoming overwhelming.

### 2. Flattening the Hierarchy

Instead of splitting a single concept across many tiny pages, consolidate related information into comprehensive parent pages. Use clear [Heading Hierarchy](../../content/syntax/index.md) to allow users to navigate within the page using the auto-generated right-side Table of Contents (TOC).

*   **❌ Poor IA**: A folder named "Security" containing ten separate, one-paragraph files for different protocols.
*   **✅ Better IA**: A single, well-structured "Security Overview" page that covers all protocols, using headings to provide a clean TOC.

### 3. Using Collapsible Sections

For large groups of related content accessed infrequently, use the `collapsible` property in your [Navigation Configuration](../../configuration/navigation.md). This keeps the interface clean by hiding secondary information until explicitly requested by the user.

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

Consolidating content into fewer, longer pages requires authors to be disciplined about structural clarity and heading use. If a page becomes too long without proper internal navigation, it becomes its own "wall of text." However, the significant reduction in "click-fatigue" and improved discovery make a flatter, domain-based hierarchy better for large documentation sets.