---
title: "PWA & Offline Plugin"
description: "Transform documentation portals into offline-first Progressive Web Applications with service worker caching."
---

The `@docmd/plugin-pwa` plugin transforms your documentation site into an installable Progressive Web Application (PWA). It generates a W3C Web Application Manifest (`manifest.webmanifest`) and registers a service worker for offline caching and mobile platform installation.

## Configuration Options

Configure PWA properties in `docmd.config.json`:

| Option | Type | Default | Technical Description |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | Enable or disable PWA manifest and service worker compilation. |
| `themeColor` | `string` | `'#1e293b'` | Browser UI chrome header colour. |
| `bgColor` | `string` | `'#ffffff'` | Installation splash screen background colour. |
| `logo` | `string` | `null` | Path to app icon (relative to documentation source root). |

### Global Configuration Example

```json "docmd.config.json"
{
  "plugins": {
    "pwa": {
      "themeColor": "#1e293b",
      "bgColor": "#ffffff",
      "logo": "assets/app-icon.png"
    }
  }
}
```

## Key Capabilities

* **Offline Service Worker**: Implements a stale-while-revalidate caching strategy. Pages load instantly from local cache while checking network status in the background.
* **Home Screen Installation**: Emits valid manifest metadata allowing users to pin the documentation site on iOS, Android, macOS, and Windows.
* **Asset Resizing**: Automatically generates required PWA icon sizes (192x192, 512x512) from primary site branding.

## Icon Resolution Priority

The PWA plugin evaluates icon paths in top-down order:

1. `plugins.pwa.icons` — Explicit icon array defined in configuration.
2. `plugins.pwa.logo` — Plugin-specific icon path.
3. `config.logo` — Global site logo path.
4. `config.favicon` — Global site favicon path.

::: callout tip "Testing Offline Functionality" icon:smartphone
Service worker registration is disabled during local development (`npx @docmd/core dev`) to prevent cached assets from interfering with live edits. To test PWA features, build the site (`npx @docmd/core build`) and serve the output directory (`site/`) over HTTPS or localhost.
:::