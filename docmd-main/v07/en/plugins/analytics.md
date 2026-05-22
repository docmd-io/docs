---
title: "Analytics Plugin"
description: "Integrate Google Analytics 4 or legacy Universal Analytics and track user interactions automatically."
---

The `@docmd/plugin-analytics` plugin allows you to easily integrate Google Analytics into your documentation. It supports the modern Google Analytics 4 (GA4) standard, legacy Universal Analytics (UA), and includes native event tracking for interaction-heavy documentation sites.

## Configuration

Enable analytics by adding your tracking credentials to the `plugins` section of your `docmd.config.js`.

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `googleV4` | `object` | `null` | Google Analytics 4 configuration (requires `measurementId`). |
| `googleUA` | `object` | `null` | Universal Analytics configuration (requires `trackingId`). |
| `autoEvents` | `boolean` | `true` | Automatically track clicks, downloads, and TOC interactions. |
| `trackSearch` | `boolean` | `true` | Track search keywords used by readers. |

### Usage

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  plugins: {
    analytics: {
      googleV4: { 
        measurementId: 'G-XXXXXXX' 
      },
      autoEvents: true,
      trackSearch: true
    }
  }
});
```

## Tracked Events

When `autoEvents` is enabled, the plugin automatically captures the following user interactions:

- **External Links**: Track when users depart for external resources.
- **File Downloads**: Log clicks on links with the `download` attribute or common file extensions.
- **Table of Contents (TOC)**: Monitor section engagement by tracking clicks in the right-hand navigation.
- **Heading Anchors**: Log when users click on "permalinks" to share specific sections.
- **Search Queries**: Capture keywords used in the search bar (with a 1-second debounce).

::: callout info "Privacy & GDPR"
By default, this plugin does not anonymise IP addresses as that is now handled natively by GA4. If you require advanced cookie consent management, you can manually inject scripts using a custom plugin hook.
:::