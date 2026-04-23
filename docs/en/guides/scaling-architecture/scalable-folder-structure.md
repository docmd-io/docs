---
title: "Designing a Scalable Folder Structure for Large Documentation Projects"
description: "A comprehensive guide on folder structure."
---

## Problem

Small documentation sites start simple: a `docs/` folder with a few markdown files. However, as independent modules, tutorials, APIs, and theoretical concepts are introduced, a flat or haphazardly nested folder structure becomes impossible to maintain.

## Why it matters

A disorganized folder structure directly maps to a confusing user experience because routing and navigation inherit from it. For authors, finding where a specific conceptual guide lives becomes an exercise in guessing, which slows down content updates and increases the chance of duplicate documentation.

## Approach

Adopt an information architecture framework like [Diátaxis](https://diataxis.fr/) (separating Tutorials, How-To Guides, Explanation, and Reference), mapped strictly to your file system. Partner this with `docmd`'s file-based routing and localized `navigation.json` mappings.

## Implementation

Configure a semantic, deeply nested folder hierarchy that physically isolates different documentation domains. 

```text
my-project/
├── docs/
│   ├── index.md             (Landing page)
│   ├── tutorials/           (Learning-oriented)
│   │   ├── get-started.md
│   │   └── build-an-app.md
│   ├── guides/              (Task-oriented)
│   │   ├── deployment.md
│   │   └── authentication.md
│   ├── reference/           (Information-oriented)
│   │   ├── cli.md
│   │   └── rest-api.md
│   └── architecture/        (Understanding-oriented)
│       └── data-model.md
└── docmd.config.js
```

By binding your `navigation.json` specifically to these root categories, you cleanly separate concepts for the reader:

```javascript
// docs/navigation.json
[
  {
    "title": "Learning & Tasks",
    "children": [
      { "title": "Tutorials", "path": "/tutorials/get-started" },
      { "title": "How-to Guides", "path": "/guides/deployment" }
    ]
  },
  {
    "title": "Deep Dives",
    "children": [
      { "title": "API Reference", "path": "/reference/rest-api" },
      { "title": "Architecture", "path": "/architecture/data-model" }
    ]
  }
]
```

## Trade-offs

Strict organizational frameworks like Diátaxis have a learning curve. Technical writers may occasionally struggle to categorize a piece of content (e.g., "Is this a guide or a tutorial?"). You will need to maintain clear contributing guidelines to enforce structural consistency among teams.
