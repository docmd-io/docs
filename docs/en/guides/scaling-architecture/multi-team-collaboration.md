---
title: "Multi-Team Collaboration"
description: "How to use decentralized navigation and global menubars to allow multiple teams to contribute to a unified documentation project without friction."
---

## Problem

When multiple independent teams (e.g., Frontend, Backend, DevOps, and Product) contribute to a single documentation repository, organizational friction often occurs. Teams may accidentally overwrite global navigation settings, create conflicting styling paradigms, or break links across domain boundaries during concurrent updates.

## Why it matters

Friction in the authoring experience leads to "documentation silos," where teams create independent, isolated wikis to avoid the complexity of a shared repository. This destroys the unified user experience of a single documentation portal and makes it significantly harder for users to find comprehensive information about the entire system.

## Approach

Leverage `docmd`'s decentralized [Navigation Resolution](../../configuration/navigation.md#navigation-resolution-priority) system. This allows individual teams to have full autonomy over their specific domains using local `navigation.json` files, while a central team governs the global [Menubar](../../configuration/menubar.md) and visual design system.

## Implementation

### 1. Domain-Based Ownership

Divide your documentation into top-level directories assigned to specific teams. Each team completely owns the content and internal structure of their assigned folder.

```text
my-project/
├── docs/
│   ├── frontend/             # Owned by the UI Team
│   │   ├── navigation.json   # Team-specific sidebar
│   │   └── components.md
│   ├── backend/              # Owned by the API Team
│   │   ├── navigation.json
│   │   └── database.md
│   └── docmd.config.js       # Owned by the Platform/Core Team
```

### 2. Global Context Switching (The Menubar)

The central platform team controls the [Menubar](../../configuration/menubar.md), which serves as the primary navigation layer to switch between different team domains.

```javascript
// docmd.config.js
export default {
  menubar: {
    enabled: true,
    items: [
      { text: 'Frontend', url: '/frontend/components' },
      { text: 'Backend', url: '/backend/database' },
      { text: 'Infrastructure', url: '/devops/setup' }
    ]
  }
};
```

### 3. Local Autonomy with navigation.json

When a user is browsing content within the `/frontend/` directory, `docmd` automatically prioritizes the `frontend/navigation.json` file. The sidebar updates dynamically to reflect only the frontend-specific hierarchy, preventing the navigation from becoming cluttered with unrelated information from other teams.

```json
// docs/frontend/navigation.json
[
  { "title": "Design System", "path": "/frontend/design-system" },
  { "title": "Component Library", "path": "/frontend/components" }
]
```

## Trade-offs

Decentralized navigation requires teams to be mindful of cross-domain links. While `docmd` handles relative links effectively, moving an entire team directory will break links in other teams' files. We recommend using root-relative paths (starting with `/`) for links between different team domains to ensure stability.
