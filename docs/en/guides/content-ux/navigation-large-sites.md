---
title: "Designing Navigation That Works for Large Documentation Sites"
description: "A comprehensive guide on large site nav."
---

## Problem

Building the sidebar for a 5-page site naturally results in a flat list. For a 500-page site, treating the sidebar as an expanding tree of nested folders creates a labyrinth where users expand 6 levels deep, lose context of where they are, and cannot find their way back.

## Why it matters

If navigation feels like a chore, users rely entirely on the search bar. This indicates the Information Architecture (IA) has failed. Good navigation teaches the user the taxonomy of your product without them realizing it.

## Approach

Use **Top-Level Context Switching** rather than **Deep Nesting**. The left sidebar should rarely exceed 2 levels of depth.

## Implementation

### 1. Utilize the Menubar for Domains
In `docmd`, use the top menubar to shift the user between entirely different domains (e.g., Tutorials vs API Reference), completely swapping out the sidebar content.

### 2. Flatten the Hierarchy
Collapse deeply nested concepts into long-form parent pages utilizing anchor links (Table of Contents), rather than splitting a concept across 5 separate small markdown pages.

*Poor IA:*
- Auth Setup (Page)
  - Setting up OAuth (Page)
  - Setting up JWT (Page)
  - Setting up SAML (Page)

*Better IA:*
- Auth Setup (One Page)
  -> *Uses right-side TOC to navigate to OAuth, JWT, SAML sections*

### 3. Default to Collapsed
If you must use folders, set `collapsible: true` and ensure they default to closed except for the actively highlighted path.

```json
{
  "title": "Reference",
  "collapsible": true,
  "children": [ /* 50 items hidden safely */ ]
}
```

## Trade-offs

Consolidating many small pages into fewer, longer pages makes those specific long pages harder to digest if not structured cleanly with Markdown headers. It requires the author to be highly disciplined about using the right-side Table of Contents effectively.
