---
title: "Versioning"
description: "Enable multi-version documentation with seamless switching, sticky path preservation, and isolated build directories."
---

docmd features a native Versioning Engine. Manage and serve multiple versions of your project simultaneously. The engine automatically handles URL routing, sidebar updates, and switching logic.

## Directory Organisation

Organise your documentation into versioned source folders. A common pattern keeps the active version in `docs/` and archived versions in directories prefixed with `docs-`.

```text
my-project/
├── docs/           # Latest Version (Main)
├── docs-v1/        # Legacy Version
├── docmd.config.json
```

## Configuration

<img width="500" class="with-border" src="/assets/previews/menu-versioning.webp">

Define your versions within the `versions` object:

```json
{
  "versions": {
    "current": "v2",           
    "position": "sidebar-top", 
    "all": [
      { "id": "v2", "dir": "docs",    "label": "v2.x (Latest)" },
      { "id": "v1", "dir": "docs-v1", "label": "v1.x" }
    ]
  }
}
```

## Core Features

### 1. Root SEO (The "Current" Version)
The `current` version generates directly at your output root (e.g., `mysite.com/`). This ensures search traffic always lands on your most up-to-date documentation.

### 2. Isolated Sub-directories
Non-current versions build automatically into subfolders matching their `id`.
*   `v2 (Current)` → `mysite.com/`
*   `v1` → `mysite.com/v1/`

### 3. Sticky Switching (Path Preservation)

docmd preserves the relative path when users switch versions. If a user reads `mysite.com/getting-started` and switches to **v1**, they automatically redirect to `mysite.com/v1/getting-started` (if the page exists).

### 4. Asset Isolation
Each version inherits your global `assets/` directory. docmd isolates them during the build to prevent style leakage or conflicts.

### 5. Versioned Navigation

Each version can maintain an independent navigation structure. docmd uses a cascading priority system to resolve the sidebar.

See [Navigation Configuration](navigation.md) for details on the resolution hierarchy.

## Best Practices

1.  **Semantic IDs**: Use concise, URL-friendly IDs like `v1`, `v2`, or `beta`.
2.  **Navigation Parity**: Maintain consistent folder structures across versions to maximise "Sticky Switching".
3.  **Unified Configuration**: Do not create separate config files for each version. docmd processes all versions in a single pass.