---
title: "Assets Management"
description: "Learn how docmd mirrors CSS, JavaScript, and image assets from source directories to output builds."
---

`docmd` uses a "Mirror & Map" architecture for static assets. This ensures local development file paths match compiled production build outputs smoothly.

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
    "customCss": ["/assets/css/branding.css"],
    "customJs": ["/assets/js/analytics.js"]
  }
}
```

::: callout tip "Asset Organisation for AI Indexers" icon:lightbulb
* **Structured Subdirectories**: Keep `/css`, `/js`, and `/images` isolated. Clean directory separation allows AI agents to locate relevant styling assets instantly.
* **Descriptive Filenames**: Naming images `authentication-flow-diagram.png` provides rich context to search indexers and `llms.txt` crawlers compared to generic names like `image1.png`.
:::

## Public & Static Root Assets (`public/`)

For static files that must reside directly at your website root rather than under `/assets/` (such as `robots.txt`, `CNAME`, `funding.json`, favicons, or domain-level manifests), `docmd` includes a first-class **Public Root Assets** pipeline.

### Zero-Config Auto-Detection

Simply create a `public/` directory at your project root (or inside your `docs/` content folder):

```bash
my-docs/
  ├── public/                  # Static Root Assets (Zero-Config)
  │   ├── CNAME                # -> https://example.com/CNAME
  │   ├── robots.txt           # -> https://example.com/robots.txt
  │   ├── funding.json         # -> https://example.com/funding.json
  │   ├── .well-known/
  │   │   └── funding.json     # -> https://example.com/.well-known/funding.json
  │   └── work/
  │       └── fund.json        # -> https://example.com/work/fund.json
  ├── assets/                  # Web Assets (Mirrored to /assets/)
  ├── docs/                    # Markdown Documentation
  ├── docmd.config.json
  └── site/                    # Compiled Output
```

All files and nested directory trees inside `public/` are automatically copied directly to the output root (`site/`), keeping your folder structure completely intact.

### Custom Configuration (`static`)

You can customize which files or directories are copied to the root using the `static` property in `docmd.config.json`:

```json "docmd.config.json"
{
  "static": ["work", "funding.json", "CNAME"]
}
```

* **Preserves Directory Hierarchy**: Specifying a directory like `"work"` keeps it intact at `site/work/...` (e.g. `work/fund.json` resolves to `https://example.com/work/fund.json`).
* **Single or Multiple Entries**: Pass a string or an array of strings representing directories or individual files.
* **Failsafe Build**: If a configured directory or file cannot be resolved on disk, `docmd` logs a warning (`[static] Configured path "..." does not exist, skipping.`) and cleanly finishes your build without crashing.
* **Opt-Out**: To disable static root asset copying entirely, set `"static": false`.

### Dev Server Live Updates

During local development with `docmd dev`, the dev server automatically watches `public/` and any configured static directories. Any added, modified, or removed files instantly trigger a rebuild and refresh your browser.