---
title: "Organising Large Documentation Repositories Without Losing Navigation Clarity"
description: "A comprehensive guide on large repositories."
---

## Problem

As documentation surpasses hundreds of pages, throwing everything into a single, massive sidebar makes the site unusable. Users suffer from "Choice Paralysis," where finding one specific module forces them to scroll through dozens of irrelevant expanded categories.

## Why it matters

Navigation is UX. A cluttered interface diminishes the perceived quality of the entire product. If users can't understand the system's hierarchy at a glance, they will assume the software itself is equally chaotic.

## Approach

Adopt an aggressive top-down grouping strategy using `docmd`'s navigation collapsible arrays, nested containers, and menubar context-switching. The key rule: **A user should never see more than 15 sidebar items at one time.**

## Implementation

### 1. The Context-Switching Hierarchy
Move top-level domains out of the sidebar and into the Menubar. 

```javascript
navigation: [
  // Instead of one monolithic array, divide it.
  { 
    title: 'Core Concepts',
    icon: 'brain-circuit',
    collapsible: true, // ALWAYS default to collapsed for large categories
    children: [ /* ... */ ]
  },
  { 
    title: 'Advanced API',
    icon: 'braces',
    collapsible: true, 
    children: [ /* ... */ ]
  }
]
```

### 2. The "Hub" Protocol
Instead of exposing every leaf node in the sidebar, create "Hub" pages using `docmd`'s grid and card containers. The sidebar only links to the Hub, and the user navigates to child nodes via the visual cards on the page.

```markdown
# Database Integrations Hub

::: grids
::: grid
::: card "Postgres Provider" /reference/integrations/postgres icon:database
:::
::: grid
::: card "Redis Caching" /reference/integrations/redis icon:zap
:::
:::
```

### 3. Smart Breadcrumbs
`docmd` automatically generates breadcrumbs. By moving deep content off the sidebar and onto Hub pages, breadcrumbs take over the heavy lifting for navigational context, returning whitespace to the interface.

## Trade-offs

Utilizing "Hub Pages" adds click-depth to your documentation. A user must navigate to the Hub, then click a card to reach the final content. However, the trade-off of an extra click is drastically outweighed by the cognitive ease of an uncluttered, focused sidebar taxonomy.
