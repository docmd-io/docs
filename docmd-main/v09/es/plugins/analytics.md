---
title: "Analytics Plugin"
description: "Integrate Google Analytics 4 (GA4) or legacy Universal Analytics with automated event tracking."
---

The `@docmd/plugin-analytics` plugin integrates Google Analytics tracking scripts into your documentation pages. It supports Google Analytics 4 (GA4) and legacy Universal Analytics (UA), providing automatic interaction tracking for technical documentation portals.

## Configuration Options

Configure analytics tracking IDs in `docmd.config.json`:

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `googleV4` | `object` | `null` | Google Analytics 4 configuration object (requires `measurementId`). |
| `googleUA` | `object` | `null` | Universal Analytics configuration object (requires `trackingId`). |
| `autoEvents` | `boolean` | `true` | Automatically track outbound links, downloads, anchor clicks, and TOC navigation. |
| `trackSearch` | `boolean` | `true` | Automatically capture search query terms typed into search modals. |

### Global Analytics Example

```json "docmd.config.json"
{
  "plugins": {
    "analytics": {
      "googleV4": {
        "measurementId": "G-XXXXXXX"
      },
      "autoEvents": true,
      "trackSearch": true
    }
  }
}
```

## Automatically Tracked Events

When `autoEvents` is set to `true`, the analytics plugin captures user interactions without custom scripts:

* **External Outbound Links**: Clicks on links navigating to external domain targets.
* **File Downloads**: Clicks on assets containing `download` attributes or common binary extensions (`.zip`, `.pdf`, `.gz`).
* **Table of Contents Engagement**: Navigation jumps made using the right-hand TOC panel.
* **Section Heading Anchors**: Clicks on heading permalink anchors.
* **Search Terms**: Search keywords entered into the search modal (debounced at 1 second).

::: callout info "Privacy & Data Protection" icon:shield-check
Google Analytics 4 handles IP anonymisation natively. If your organisation requires explicit cookie consent banners or GDPR opt-in controls, inject custom scripts via custom plugin hooks.
:::