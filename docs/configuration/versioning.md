---
title: "Versioning"
description: "How to manage multiple versions of your documentation (e.g., v1, v2) within a single docmd site."
---

`docmd` (v0.5.0+) includes a native Versioning Engine. It allows you to serve multiple versions of your docs (e.g., `v1.0`, `v2.0`) from the same domain, with a seamless dropdown switcher in the sidebar.

## Directory Structure

To use versioning, you must organize your folders. The "Current" version typically lives in `docs/`, while older versions live in separate folders like `docs-v1/`.

```text
my-project/
├── docs/           # The latest version (v2) content
├── docs-v1/        # The older version (v1) content
├── docmd.config.js
```

## Configuration

Enable versioning by adding the `versions` object to your config.

```javascript
// docmd.config.js
module.exports = defineConfig({
  // ...
  versions: {
    current: 'v2', // The ID of the version served at the root (/)
    position: 'sidebar-top', // 'sidebar-top' or 'sidebar-bottom'
    all: [
      { 
        id: 'v2', 
        dir: 'docs',       // Source folder for this version
        label: 'v2.0 (Latest)' 
      },
      { 
        id: 'v1', 
        dir: 'docs-v1',    // Source folder for older version
        label: 'v1.x' 
      }
    ]
  }
});
```

### How It Works
*   **Current Version:** The version matching `current` is built to the root of your site (e.g., `mysite.com/`). This ensures your main SEO juice goes to the latest docs.
*   **Older Versions:** Other versions are built into subdirectories matching their ID (e.g., `mysite.com/v1/`).
*   **Switching:** A dropdown automatically appears in the sidebar. When a user switches versions, `docmd` attempts to keep them on the same page path (e.g., `/guide/install` -> `/v1/guide/install`).

## Best Practices
1.  **Keep `docs/` as Latest:** Always point your `current` version to your main working directory. When you release v3, rename `docs` to `docs-v2` and create a new `docs` for v3.
2.  **Separate Configs? No.** You only need one `docmd.config.js`. The engine handles the build loop for you.