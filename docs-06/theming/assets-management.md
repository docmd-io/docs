---
title: "Assets Management"
description: "How docmd handles CSS, JavaScript, and Image assets during the build process."
---

`docmd` takes a "Mirror & Map" approach to assets. This ensures that your local development paths stay consistent with your production build.

## Directory Structure

By default, `docmd` looks for an `assets/` folder in your project root.

```bash
my-docs/
  ├── assets/          # Source Assets
  │   ├── css/
  │   ├── js/
  │   └── images/
  ├── docs/            # Content
  ├── docmd.config.js
  └── site/            # Build Output (Automatically mirrored)
```

## Automatic Copying (v0.5.1+)

When you run `docmd build` or `docmd dev`:
1.  **The Mirroring Logic**: The entire contents of your `assets/` folder are recursively copied to `site/assets/`.
2.  **Stability**: We use a hardened copy engine with automatic retries to prevent "File Busy" or "ENOENT" errors on macOS and modern SSDs.
3.  **Referencing**: You should always reference assets from your Markdown or Config using the **root-relative** path:
    ```markdown
    ![Logo](/assets/images/logo.png)
    ```

## Custom CSS & JS Integration

To link your assets to every page, add them to your theme configuration:

```javascript
// docmd.config.js
export default {
  theme: {
    customCss: ['/assets/css/branding.css']
  },
  customJs: ['/assets/js/utils.js']
}
```

## AI Recognition Strategy

When adding assets:
*   **Organize by type**: Keep `/css`, `/js`, and `/images` separate. This helps AI agents locate relevant styles or scripts instantly when you ask them to "edit the header color".
*   **Use Descriptive Filenames**: Naming an image `authentication-flow-diagram.png` provides much more context to the `llms.txt` crawler than `img_01.png`.