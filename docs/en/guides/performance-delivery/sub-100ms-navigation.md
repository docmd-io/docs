---
title: "Optimising Documentation for Sub-100ms Navigation Speeds"
description: "A comprehensive guide on sub-100ms navigation."
---

## Problem

When documentation relies on traditional multi-page navigation (where clicking a link triggers a full browser reload), users experience a "white flash" on every click. The browser ditches the DOM, requests the new HTML, reparses the CSS, and repaints the screen. This destroys the reading flow.

## Why it matters

Users rarely read documentation linearly. They jump between tutorials, API references, and conceptual guides. If every jump guarantees a 1.5-second full-page reload, it disrupts cognitive friction and reduces vertical engagement metrics.

## Approach

Implement a **Single Page Application (SPA) Router** on top of pre-generated static files. This allows the browser to intercept link clicks, fetch the HTML payload dynamically in the background, and inject only the content changes without discarding the CSS or Sidebar state.

## Implementation

`docmd` ships with an ultra-lightweight SPA router enabled by default.

To maximize its effectiveness:

### 1. Preload Links Strategically
When the SPA framework (or your custom script) detects a user hovering over a sidebar link, immediately initiate a `fetch()` request for the target HTML.

```javascript
/* docmd native behavior mimicking */
document.querySelectorAll('.sidebar-link').forEach(link => {
  link.addEventListener('mouseenter', () => {
    // Pre-fetch the requested document before the user clicks
    prefetchHTML(link.href);
  });
});
```

### 2. Ensure Correct SPA Server configuration
If you are deploying to NGINX, you must ensure your server correctly falls back to `index.html` to allow the SPA to bootstrap correctly if a user lands on a deep URL (though `docmd` handles static outputs perfectly, this is vital for dynamic overlays).

```bash
docmd deploy --nginx # Generates the optimized block automatically
```

## Trade-offs

SPA routing breaks some native browser behaviors regarding executing inline `<script>` tags embedded in markdown bodies. You must rely on custom lifecycle events (like `docmd:page-mounted`) to re-trigger javascript functions (like diagram parsing or third-party ad initializations) upon route resolution.
