---
title: "PWA & Offline Support"
description: "Transform your documentation into a progressive web application with offline caching and mobile-first features."
---

The `@docmd/plugin-pwa` plugin transforms your documentation into a Progressive Web App (PWA). It adds a web manifest for mobile installation and registers a service worker for intelligent offline caching. Your technical manuals remain accessible even in low-connectivity environments.

## Configuration

Customise your app branding within the `plugins` section of your `docmd.config.json`.

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | Enable or disable PWA manifest and service worker generation. |
| `themeColor` | `string` | `'#1e293b'` | The primary colour of the mobile UI browser chrome. |
| `bgColor` | `string` | `'#ffffff'` | Background colour for the splash screen during installation. |
| `logo` | `string` | `null` | Path to the app icon (relative to project source). |

### Example

```json
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

## Features

- **Offline Caching**: Uses a "Stale-While-Revalidate" strategy. Pages serve instantly from the cache while updating in the background.
- **Mobile Installation**: Generates a `manifest.webmanifest` allowing users to "Add to Home Screen" natively on iOS and Android.
- **Smart Asset Resolution**: Automatically generates app icons from your project logo or favicon if no explicit icon is provided.
- **SPA Compatible**: Fully compatible with Single Page Application transitions and standard directory routing.

## Icon Resolution Priority

The plugin resolves your PWA icons based on the following priority:

1. `pwa.icons` - Explicit array in config.
2. `pwa.logo` - Path relative to source.
3. `config.logo` - Global site logo.
4. `config.favicon` - Global favicon.

::: callout tip "Testing PWA Features"
Service workers are bypassed in `npx @docmd/core dev` to prevent caching issues during editing. To test PWA features, run `npx @docmd/core build` and serve the `site/` directory using a static host.
:::