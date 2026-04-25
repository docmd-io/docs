---
title: "Versioning"
description: "Enable multi-version documentation with seamless switching, sticky path preservation, and isolated build directories."
---

`docmd` features a native Versioning Engine that allows you to manage and serve multiple versions of your project simultaneously (e.g., `v1.x`, `v2.x`). The engine automatically handles URL routing, sidebar updates, and switching logic.

## Directory Organisation

To enable versioning, organise your documentation into versioned source folders. A common pattern is keeping the active version in `docs/` and archived versions in directories prefixed with `docs-`.

```text
my-project/
├── docs/           # Latest Version (Main)
├── docs-v1/        # Legacy Version
├── docmd.config.js
```

## Configuration


<!-- SCREENSHOT: Version switcher dropdown in the sidebar showing "v2.x (Latest)" selected, with "v1.x" as an option. -->

Define your versions within the `versions` object:

```javascript
export default defineConfig({
  versions: {
    current: 'v2',           // The version ID built to the root (/)
    position: 'sidebar-top', // Switcher location: 'sidebar-top' or 'sidebar-bottom'
    all: [
      { id: 'v2', dir: 'docs',    label: 'v2.x (Latest)' },
      { id: 'v1', dir: 'docs-v1', label: 'v1.x' }
    ]
  }
});
```

## Core Features

### 1. Root SEO (The "Current" Version)
The version designated as `current` is generated directly at your output root (e.g., `mysite.com/`). This ensures your primary search traffic always lands on your most up-to-date documentation.

### 2. Isolated Sub-directories
Non-current versions are automatically built into subfolders matching their `id`.
*   `v2 (Current)` → `mysite.com/`
*   `v1` → `mysite.com/v1/`

### 3. Sticky Switching (Path Preservation)


<!-- SCREENSHOT: Two browser windows side by side — left showing v2 of a page, right showing the same page path in v1 after switching, demonstrating path preservation. -->
`docmd` preserves the relative path when a user switches versions. If a user is reading `mysite.com/getting-started` and switches to **v1**, they are automatically redirected to `mysite.com/v1/getting-started` (if the page exists) rather than being returned to the home page.

### 4. Asset Isolation
Each version inherits your global `assets/` directory, but `docmd` ensures they are isolated during the build process to prevent style leakage or version conflicts.

### 5. Versioned Navigation

Each version can maintain its own independent navigation structure. `docmd` uses a cascading priority system to resolve the sidebar, allowing you to use a centralized config or per-version/per-language `navigation.json` files.

For details on the resolution hierarchy and visual examples, see [Navigation Resolution Priority](./navigation#navigation-resolution-priority).

## Best Practices

1.  **Semantic IDs**: Use concise, URL-friendly IDs like `v1`, `v2`, or `beta`.
2.  **Navigation Parity**: Maintain consistent folder structures across versions to maximize the effectiveness of "Sticky Switching."
3.  **Unified Configuration**: You do not need separate config files for each version; `docmd` processes all versions in a single pass.