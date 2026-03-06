---
title: "PWA Plugin"
description: "Turn your documentation into a blazingly fast installable App using the zero-config PWA plugin."
---

# PWA Plugin

The `@docmd/plugin-pwa` allows you to instantly turn your documentation site into a **Progressive Web App (PWA)** with a single line of configuration. Once enabled, it handles everything: the Web Manifest, PWA meta tag injection, an intelligent Service Worker, and automatic offline caching.

## Installation

This plugin ships bundled with `@docmd/core` and does not require a separate install.

## Enabling the Plugin

Add `pwa` under the `plugins` object in `docmd.config.js`:

```javascript
// docmd.config.js
module.exports = {
  plugins: {
    pwa: {} // That's it. The plugin is now active!
  }
}
```

## What it Generates

When `docmd build` runs with `pwa` active, three things are automatically generated and injected into your output:

| File / Injection | Description |
| :--- | :--- |
| `manifest.webmanifest` | Declares your site as an installable app with name, theme colors, and icons |
| `service-worker.js` | Intercepts network requests, caches assets, and powers offline support |
| `<meta>` tag injection | Injects `mobile-web-app-capable`, `apple-mobile-web-app-capable`, and `theme-color` into every page's `<head>` |

## How Caching Works

The Service Worker uses a **network-first with cache fallback** strategy:

1. **On page load**, it attempts to fetch from the network first. If the network responds successfully, the freshest version is stored and returned.
2. **On subsequent visits**, if a cached version exists, it is returned instantly from the cache while the network is simultaneously checked in the background and the cache is updated silently.
3. **Offline**: If the network is unreachable and a cached version exists, the cached version is returned seamlessly.

## Automatic Cache Busting

Every `docmd build` generates a new Service Worker with a unique `CACHE_NAME` timestamp fingerprint (e.g., `docmd-cache-1741267200000`). When the browser fetches the new worker, it automatically activates it and the old cache is purged immediately via the Service Worker's `activate` lifecycle.

> **No manual cache clearing is needed.** Redeploying your site is all it takes.

## Background Auto-Updates

The plugin registers a silent polling interval that checks the server for a new Service Worker every **5 minutes** while the user has your site open in their browser tab. If a new Site Worker is found (i.e. you have redeployed), it is staged and installed during activation on the next navigation.

## Disabling or Removing the Plugin

### Temporarily Disable

```javascript
pwa: { enabled: false }
```

### Fully Remove

Simply delete the `pwa` block from your `plugins`. The next time you run `docmd build`, a new manifest is not generated. When users visit the site, docmd's client-side bootstrap (`docmd-main.js`) checks for the presence of `<link rel="manifest">`. If it's missing but a Service Worker is registered, it automatically **unregisters all existing ghost workers** and clears the cached shell — requiring no user action.

> [!NOTE]
> The `manifest.webmanifest` and `service-worker.js` files from a previous build persist on disk until you clear your output directory (`site/` by default) with `docmd build` or `rm -rf site`. This is a filesystem artifact, not an active PWA.

## Configuration Reference

All fields are optional. The defaults are designed for zero-config use.

```javascript
module.exports = {
  plugins: {
    pwa: {
      // --- Icon Configuration ---
      // Priority: pwa.logo > config.logo > config.favicon > (no icons)
      logo: 'assets/images/app-icon.png', // Path relative to your src folder

      // Or for full manual control:
      icons: [
        { src: '/assets/images/icon-192.png', sizes: '192x192', type: 'image/png' },
        { src: '/assets/images/icon-512.png', sizes: '512x512', type: 'image/png' }
      ],

      // --- Manifest Colors ---
      themeColor: '#1e293b',  // Browser chrome / top bar accent
      bgColor: '#ffffff',     // Splash screen background during install

      // --- Disable the plugin entirely ---
      enabled: false
    }
  }
}
```

### Icon Resolution Priority

docmd resolves your PWA icon from the following cascade:

1. `pwa.icons` — Manual array, used as-is
2. `pwa.logo` — Single image path, used for both 192x192 and 512x512 entries
3. `config.logo` — Your global site logo
4. `config.favicon` — Your global favicon
5. *(No icons declared in manifest)* — If none of the above are set

## Testing Locally

Browsers restrict Service Workers to `https://` or `localhost`. Use:

```bash
docmd dev
```

Open Chrome DevTools → **Application** → **Manifest** and **Service Workers** to view the activated registration in real-time. Safari → **Develop** → **Service Workers** panel works equally well.