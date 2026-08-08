---
title: "Assets Management"
description: "Learn how docmd mirrors CSS, JavaScript, and image assets from source directories to output builds."
---

`docmd` uses a "Mirror & Map" architecture for static assets. This ensures local development file paths match compiled production build outputs seamlessly.

## Directory Structure

By default, `docmd` processes an `assets/` directory located at your project root:

```bash
my-docs/
  ├── assets/          # Source Assets (Images, Fonts, CSS, JS)
  │   ├── css/
  │   ├── js/
  │   └── images/
  ├── docs/            # Markdown Content Files
  ├── docmd.config.json
  └── site/            # Compiled Production Output (Auto-Mirrored)
```

## Automatic Asset Mirroring

When executing `npx @docmd/core build` or `npx @docmd/core dev`:

1. **Mirroring Logic**: The entire contents of `assets/` are copied recursively to `site/assets/`.
2. **Build Stability**: Asset copying uses a hardened, asynchronous copy engine with exponential retries to prevent filesystem locking errors on macOS and SSD volumes.
3. **Path References**: Reference assets in Markdown and configuration files using **root-relative** paths:
    ```markdown
    ![Architecture Diagram](/assets/images/architecture.png)
    ```

## Custom CSS & JS Integration

Link custom stylesheet or script assets across all pages via theme configuration in `docmd.config.json`:

```json "docmd.config.json"
{
  "theme": {
    "customCss": ["/assets/css/branding.css"]
  },
  "customJs": ["/assets/js/analytics.js"]
}
```

::: callout tip "Asset Organisation for AI Indexers" icon:lightbulb
* **Structured Subdirectories**: Keep `/css`, `/js`, and `/images` isolated. Clean directory separation allows AI agents to locate relevant styling assets instantly.
* **Descriptive Filenames**: Naming images `authentication-flow-diagram.png` provides rich context to search indexers and `llms.txt` crawlers compared to generic names like `image1.png`.
:::