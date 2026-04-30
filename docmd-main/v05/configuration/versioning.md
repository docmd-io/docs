---
title: "Versioning"
description: "Enable multi-version documentation with seamless switching, sticky path preservation, and isolated build directories."
---

`docmd` features a native Versioning Engine that allows you to manage and serve multiple versions of your project simultaneously (e.g., `v1.0`, `v2.0`). It automatically handles the URL routing, sidebar updates, and version switching logic.

## Directory Organization

To enable versioning, you must organize your documentation into versioned source folders. The most common pattern is keeping the latest version in `docs` and older versions in folders prefixed with `docs-`.

```text
my-project/
├── docs/           # Version 2 (Main)
├── docs-v1/        # Version 1 (Legacy)
├── docmd.config.js
```

## Configuration

Define your versions in the `versions` object.

```javascript
module.exports = defineConfig({
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
The version specified in `current` is built directly to your output directory root (e.g., `mysite.com/`). This ensures your primary SEO traffic always lands on your most up-to-date information.

### 2. Isolated Sub-directories
Other versions are automatically built into subfolders matching their `id`.
*   `v2 (Current)` → `mysite.com/`
*   `v1` → `mysite.com/v1/`

### 3. Sticky Switching (Path Preservation)
`docmd` smartly preserves the relative path when a user switches versions. If a user is reading `mysite.com/getting-started` and switches to **v1**, they are automatically taken to `mysite.com/v1/getting-started` instead of being dumped back at the home page.

### 4. Per-Version Assets
Each version inherits your global `assets/` folder, but `docmd` ensures they are isolated in the build process, preventing styles from older versions from leaking into newer ones.

## Best Practices

1.  **Semantic IDs**: Use short, URL-friendly IDs like `v1`, `v2`, or `beta`. These IDs appear directly in your URLs.
2.  **Navigation Parity**: While you can have different navigation for different versions, keeping your folder structure consistent makes "Sticky Switching" much more effective for your users.
3.  **One Config to Rule Them All**: You do not need separate configuration files for each version. `docmd` iterates through your `versions.all` array during a single `docmd build` command.