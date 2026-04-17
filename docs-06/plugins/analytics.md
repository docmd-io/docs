---
title: "Analytics Plugin"
description: "Integrate Google Analytics 4 or Legacy Universal Analytics and track user interactions automatically."
---

The `@docmd/plugin-analytics` plugin allows you to seamlessly integrate Google Analytics into your documentation. It supports the modern Google Analytics 4 (GA4) standard, legacy Universal Analytics (UA), and includes native event tracking for interaction-heavy documentation sites.

## Configuration

Enable analytics by adding your tracking credentials to the `plugins` section of `docmd.config.js`.

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  plugins: {
    analytics: {
      // 1. Google Analytics 4 (Recommended)
      googleV4: { 
        measurementId: 'G-XXXXXXX' 
      },

      // 2. Legacy Universal Analytics
      googleUA: { 
        trackingId: 'UA-XXXXXXX-X' 
      },

      // 3. Behavioral Tracking Settings
      autoEvents: true,  // Track clicks, downloads, and TOC interactions
      trackSearch: true  // Track search keywords used by readers
    }
  }
});
```

## Tracked Events

When `autoEvents` is enabled, the plugin automatically captures the following user interactions and sends them to your analytics provider:

*   **External Links**: Track when users depart for external resources.
*   **File Downloads**: Automatically log clicks on links with the `download` attribute or common file extensions (`.pdf`, `.zip`, `.tar`, etc.).
*   **Table of Contents (TOC)**: Monitor which sections are most engaging by tracking clicks in the right-hand navigation.
*   **Heading Anchors**: Log when users click on "permalinks" (heading anchors) to share specific sections.
*   **Search Queries**: When `trackSearch` is active, keywords are captured (with a 1-second debounce) to help you understand what your users are looking for.

## Technical Details

The plugin injects the necessary tracking scripts into the `<head>` of every page. Event listeners are attached to the `<body>` using efficient event delegation to ensure zero impact on page load performance or Single Page Application (SPA) transitions.

::: callout info "Privacy & GDPR"
By default, this plugin does not anonymize IP addresses as that is now handled natively by GA4. If you require advanced cookie consent management, you can manually inject your consent manager scripts using the `customCss` or a custom plugin hook.
:::