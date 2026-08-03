---
title: "Sub-100ms Navigation"
description: "How docmd's native SPA router and intent-based prefetching deliver instant page transitions for an optimal reading experience."
---

## Problem

Traditional multi-page navigation triggers a full browser reload on every click. This creates a disruptive "white flash" and breaks the reader's flow. The browser discards the current state, requests new HTML, and re-parses CSS and JavaScript - even if only the central content area changes.

## Why it matters

Users frequently jump between tutorials, API references, and conceptual guides. If transitions take seconds, cognitive friction discourages exploration. Instant navigation makes documentation feel like a native application, significantly improving user satisfaction and engagement.

## Approach

docmd utilises a high-performance **Single Page Application (SPA) Router** built on pre-generated static files. The browser intercepts link clicks, fetches only necessary content in the background, and updates the page dynamically without a full reload. This preserves the state of the sidebar, table of contents, and theme settings for near-instant transitions.

## Implementation

The docmd SPA router uses advanced techniques to achieve sub-100ms navigation speeds:

### 1. Intent-Based Prefetching

When a user hovers over a navigation link, docmd detects the intent and initiates a background fetch for the target page. By the time the user clicks, the data is often already in the browser's cache. Transitions feel instantaneous.

### 2. Partial DOM Updates

Instead of re-rendering the entire page, docmd intelligently updates only necessary functional zones:
*   **Main Content**: The primary Markdown-rendered body.
*   **Table of Contents**: Refreshed to match new headers.
*   **Navigation State**: Updates active and expanded sidebar states.

### 3. Lifecycle Events for Custom Logic

Because the browser avoids full reloads, standard events like `DOMContentLoaded` only fire once. To execute custom JavaScript after every navigation, listen for the `docmd:page-mounted` event.

```javascript
document.addEventListener("docmd:page-mounted", (event) => {
  const currentPath = event.detail.path;
  console.log(`Successfully navigated to: ${currentPath}`);
  
  if (currentPath.includes("/api/")) {
    initApiConsole();
  }
});
```
For more details, see the [Client-Side Events](../../api/client-side-events.md) documentation.

## Trade-offs

### Script Execution
The SPA router automatically re-executes `<script>` tags found within the Markdown body of the new page. However, global scripts defined in your theme only run once during the initial load. Use the `docmd:page-mounted` event for logic that must execute on every page.

### SEO and Accessibility
Despite SPA-like behaviour, docmd generates a complete `.html` file for every page. This ensures search engine crawlers see full content and the site remains functional for users with JavaScript disabled. This maintains excellent SEO and accessibility standards.