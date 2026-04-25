---
title: "Scalable Folder Structure"
description: "How to organise large-scale documentation projects using the Diátaxis framework and docmd's resolution system."
---

## Problem

Small documentation sites often start with a flat `docs/` folder. However, as the project grows to include multiple modules, tutorials, APIs, and conceptual deep-dives, a disorganized folder structure becomes a significant maintenance burden. Files become difficult to locate, and the navigation sidebar becomes an overwhelming "wall of links."

## Why it matters

A disorganized folder structure directly results in a confusing user experience, as `docmd`'s routing and default navigation are derived from your file system. For authors, a lack of clear structure leads to content duplication and inconsistent naming, making the documentation harder to manage as more contributors join the project.

## Approach

We recommend adopting an information architecture framework like [Diátaxis](https://diataxis.fr/), which separates content into four distinct categories: Tutorials, How-To Guides, Reference, and Explanation. Mapping these categories strictly to your physical file system provides a clear roadmap for both readers and authors.

## Implementation

### 1. The Diátaxis Hierarchy

Organise your source directory into semantic subfolders. This physical isolation makes it easier to manage large sets of files and ensures a clean URL structure.

```text
my-project/
├── docs/
│   ├── tutorials/           (Learning-oriented: step-by-step lessons)
│   │   └── getting-started.md
│   ├── guides/              (Task-oriented: solving specific problems)
│   │   └── deployment.md
│   ├── reference/           (Information-oriented: technical descriptions)
│   │   └── api-spec.md
│   ├── explanation/         (Understanding-oriented: theoretical background)
│   │   └── architecture.md
│   └── navigation.json      (Main navigation definition)
└── docmd.config.js
```

### 2. Strategic Use of navigation.json

Instead of defining a massive navigation tree in your global configuration, use `navigation.json` files within your source directories. `docmd` follows a [Resolution Priority](../../configuration/navigation#navigation-resolution-priority) system, allowing you to define distinct sidebar hierarchies for different sections of your site.

```json
// docs/navigation.json
[
  {
    "title": "Tutorials",
    "icon": "book-open",
    "children": [
      { "title": "Get Started", "path": "/tutorials/getting-started" }
    ]
  },
  {
    "title": "Reference",
    "icon": "braces",
    "children": [
      { "title": "API Specification", "path": "/reference/api-spec" }
    ]
  }
]
```

### 3. File-Based Routing

Remember that every Markdown file's location in the folder structure determines its final URL. For example, `docs/guides/auth.md` becomes `your-site.com/guides/auth`. Use this to your advantage to create intuitive, memorable URLs for your users.

## Trade-offs

Strict organizational frameworks like Diátaxis require a clear understanding of content types. Technical writers may occasionally find it difficult to categorise a specific document (e.g., "Is this a guide or a tutorial?"). Establishing clear internal contribution guidelines is essential to maintain consistency as your team and documentation grow.
