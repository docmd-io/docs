---
title: "Structuring Documentation for Multi-Team Collaboration"
description: "A comprehensive guide on team collaboration."
---

## Problem

When multiple independent teams (e.g., Frontend, Backend, DevOps, Security) contribute to a single documentation repository, conflicting paradigms arise. Teams overwrite each other's global navigation, break relative links across domain boundaries, and disagree on stylistic approaches.

## Why it matters

Friction in the authoring experience leads to documentation silos. If teams are afraid of breaking the master build, they will spin up independent, isolated wikis, destroying the unified user experience of a single documentation portal.

## Approach

Leverage `docmd`'s decentralized `navigation.json` capabilities and strict frontmatter validation to give teams autonomy over their specific domains, while a central documentation team governs the global menubar and layout.

## Implementation

Divide ownership mathematically by top-level directories. Each team completely owns their subdirectory.

```text
docs/
├── frontend/             # Owned by Web Team
│   ├── navigation.json   # Local nav rules
│   └── components.md
├── backend/              # Owned by API Team
│   ├── navigation.json   # Local nav rules
│   └── database.md
└── docmd.config.js       # Owned by Docs Team
```

**Global Governance (`docmd.config.js`):**
The core docs team controls the Menubar, pointing users to the different domains.

```javascript
layout: {
  menubar: {
    left: [
      { text: 'Frontend UI', url: '/frontend/components' },
      { text: 'Backend APIs', url: '/backend/database' }
    ]
  }
}
```

**Local Autonomy (`frontend/navigation.json`):**
When a user navigates to `/frontend/components`, the `docmd` engine resolves the `frontend/` local navigation configuration, keeping the sidebar strictly focused on the frontend team's domain.

## Trade-offs

Cross-linking between domains requires authors to rely on absolute paths relative to the root (e.g., `[Configuration](../../configuration/general.md)`) rather than direct relative paths, which can break if a team renames their root directory. Use CI/CD link-checkers during Pull Requests to catch cross-domain breakages early.
