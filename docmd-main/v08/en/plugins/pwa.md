---
title: "PWA & Offline Support"
description: "Transform your documentation into a progressive web application with offline caching and mobile-first features."
---

The `@docmd/plugin-pwa` plugin turns your documentation into a Progressive Web App. It writes a web manifest for mobile installation and registers a service worker that caches pages for offline reading.

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

- **Offline caching**: stale-while-revalidate strategy. Pages load from cache, then refresh in the background.
- **Installable**: emits a `manifest.webmanifest` so users can install the site to their home screen on iOS and Android.
- **Auto icons**: derives PWA icons from your project logo or favicon if no explicit icon is provided.
- **SPA friendly**: works with the SPA router and the standard directory routing.

## Icon Resolution Priority

The plugin resolves your PWA icons based on the following priority:

1. `pwa.icons` - Explicit array in config.
2. `pwa.logo` - Path relative to source.
3. `config.logo` - Global site logo.
4. `config.favicon` - Global favicon.

::: callout tip "Testing PWA Features"
Service workers are bypassed in `npx @docmd/core dev` to prevent caching issues during editing. To test PWA features, run `npx @docmd/core build` and serve the `site/` directory using a static host.
:::