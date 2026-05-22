---
title: "Organising Large Repositories"
description: "How to maintain navigation clarity and usability in complex documentation structures using hub pages and hierarchical navigation."
---

## Problem

As a documentation repository grows to hundreds of pages, displaying every topic in a single sidebar makes the site unusable. Users suffer from "choice paralysis" where finding a specific module requires scrolling through dozens of irrelevant categories.

## Why it matters

Navigation is a critical component of user experience. A cluttered interface diminishes the perceived quality of your product and makes it harder for developers to find answers. If navigation feels chaotic, users often assume the software itself is difficult to use.

## Approach

Implement a hierarchical grouping strategy using docmd's [Navigation Configuration](../../configuration/navigation.md). Hide complexity until it is needed. Use collapsible groups and "Hub Pages" to maintain a clean sidebar, ensuring users can focus on their current task.

## Implementation

### 1. Hierarchical Grouping

Use the `collapsible` property in your `navigation.json` or config file to group related pages. This keeps the sidebar clean and allows users to expand only the sections they need.

```json
// docs/navigation.json
[
  {
    "title": "Advanced API",
    "icon": "braces",
    "collapsible": true,
    "children": [
      { "title": "Authentication", "path": "/api/auth" },
      { "title": "Webhooks", "path": "/api/webhooks" },
      { "title": "Rate Limiting", "path": "/api/rate-limiting" }
    ]
  }
]
```

### 2. Implementing Hub Pages

Instead of exposing every individual page in the sidebar, create central "Hub Pages" that act as directories for specific sub-systems. Use [Grids and Cards](../../content/containers/grids.md) to provide a visual, high-level overview of the available content.

```markdown
# Integrations Hub

::: grids
::: grid
::: card "Database Integrations" icon:database
Connect your application to popular databases like Postgres and MongoDB.
[View Database Guides](/integrations/databases)
:::
:::
::: grid
::: card "Payment Gateways" icon:credit-card
Learn how to implement Stripe, PayPal, and more.
[View Payment Guides](/integrations/payments)
:::
:::
:::
```

### 3. Using Breadcrumbs

docmd automatically generates [Breadcrumbs](../../content/syntax/advanced.md#breadcrumbs) for every page based on your folder structure and navigation hierarchy. By using Hub Pages, you keep the sidebar focused while breadcrumbs provide context and an easy way to navigate back up the hierarchy.

## Trade-offs

Using Hub Pages can add an extra "click" for users to reach deep content. However, this is usually preferable to a cluttered sidebar that makes discovery difficult. The trade-off is a cleaner, more professional interface that improves overall searchability and focus.
