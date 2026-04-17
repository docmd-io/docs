---
title: "PWA & Offline Support"
description: "Transform your documentation into a progressive web application with offline caching and mobile-first features."
---

The **PWA plugin** transforms your documentation into a Progressive Web App with offline caching and mobile installation. It adds a web manifest for mobile installation and registers a service worker to handle intelligent offline caching, ensuring your technical manuals remain accessible even in low-connectivity environments.

## Setup

```bash
docmd add pwa
```

## Configuration

The PWA plugin can be customised to match your branding within the `plugins` section of `docmd.config.js`.

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  plugins: {
    pwa: {
      enabled: true,           // Enabled by default if the plugin is loaded
      themeColor: '#1e293b',   // The primary color of the mobile UI
      bgColor: '#ffffff',      // Background color for the splash screen
      logo: '/assets/logo.png' // Fallback for app icons if not explicitly defined
    }
  }
});
```

## Core Features

### 1. Offline Caching
The plugin automatically generates a `service-worker.js` file that implements a "Stale-While-Revalidate" caching strategy. When a user visits a page, the service worker:
*   Returns the cached version instantly for maximum speed.
*   Fetches the latest version from the network in the background.
*   Updates the cache for the next visit.

### 2. Mobile Installation


<!-- SCREENSHOT: Mobile device (iOS or Android) showing the "Add to Home Screen" prompt for a docmd-powered site, and the resulting app icon on the home screen. -->

By generating a `manifest.webmanifest` and injecting the required `<meta>` tags, the plugin allows users to "Add to Home Screen" on iOS and Android. Your documentation will behave like a standalone application, with its own splash screen and window frame.

### 3. Smart Asset Resolution
The plugin attempts to generate app icons automatically by looking for your project's `logo` or `favicon`. For more control, you can provide an explicit `icons` array:

```javascript
pwa: {
  icons: [
    { src: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
    { src: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' }
  ]
}
```

## Technical Implementation

The service worker is designed to be compatible with Single Page Application (SPA) routing. It includes specific fail-safe logic for Safari's strict security policies regarding redirected streams, ensuring stability across all modern browsers.

::: callout tip "Dev Mode"
Service workers are typically disabled or bypassed in local development (`docmd dev`) to prevent aggressive caching from interfering with your edits. To test the PWA functionality, perform a production build with `docmd build` and serve the output directory using a static host.
:::

### Fully Remove

Simply delete the `pwa` block from your `plugins`. The next time you run `docmd build`, a new manifest is not generated. When users visit the site, docmd's client-side bootstrap (`docmd-main.js`) checks for the presence of `<link rel="manifest">`. If it's missing but a Service Worker is registered, it automatically **unregisters all existing ghost workers** and clears the cached shell — requiring no user action.

::: callout warning
The `manifest.webmanifest` and `service-worker.js` files from a previous build persist on disk until you clear your output directory (`site/` by default) with `docmd build` or `rm -rf site`. This is a filesystem artifact, not an active PWA.
:::

## Configuration Reference

All fields are optional. The defaults are designed for zero-config use.

```javascript
export default {
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

Open Chrome DevTools → **Application** → **Manifest** and **Service Workers** to view the activated registration in real-time.

Safari → **Develop** → **Service Workers** panel works equally well.