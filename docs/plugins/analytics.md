---
title: "Analytics Integration"
description: "Integrate Google Analytics or other tracking services into your docmd site."
---

`docmd` provides a built-in plugin for web analytics. This allows you to understand your audience and track page views with ease.

## Enabling Analytics

Add the `analytics` plugin to your `plugins` object in `docmd.config.js`.

```javascript
export default {
  plugins: {
    analytics: {
      // For Google Analytics 4 (Recommended)
      googleV4: {
        measurementId: 'G-XXXXXXXXXX'
      },
      // For Google Universal Analytics (Legacy)
      googleUA: {
        trackingId: 'UA-XXXXXXXXX-Y'
      }
    }
  }
};
```

## Configuration Options

### Google Analytics 4 (GA4)
*   **Key**: `googleV4`
*   **Requirement**: `measurementId` (String).
*   **Behavior**: Injects the `gtag.js` snippet into every page.

### Universal Analytics (UA)
*   **Key**: `googleUA`
*   **Requirement**: `trackingId` (String).
*   **Behavior**: Injects the legacy `analytics.js` script.

## Important Considerations

*   **SPA Tracking**: The `docmd` analytics plugin is SPA-aware. It automatically sends a "Page View" event on every `docmd:page-mounted` trigger, ensuring your metrics are accurate despite the client-side routing.
*   **Privacy**: Be mindful of local regulations (GDPR/CCPA). You can use [Custom JS](/advanced/client-side-events) to implement custom consent banners.

::: callout tip "AI Bot Tracking 🤖"
While standard analytics track human visitors, `docmd` sites also generate high traffic from AI crawlers. Use server-side logs or advanced privacy-first analytics (like Plausible or Fathom) if you want to distinguish between human readers and AI-agent context retrieval sessions.
:::