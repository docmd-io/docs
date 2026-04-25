---
title: "Sub-100ms Navigation"
description: "How docmd's native SPA router and intent-based prefetching deliver instant page transitions for an optimal reading experience."
---

## Problem

Traditional multi-page navigation, where every link click triggers a full browser reload, creates a disruptive "white flash" and breaks the reader's flow. The browser must discard the current state, request new HTML, and re-parse CSS and JavaScript—even if only the central content area has changed.

## Why it matters

Documentation users frequently jump between different sections, such as tutorials, API references, and conceptual guides. If every transition takes a second or more, it creates cognitive friction and discourages thorough exploration. Instant navigation makes the documentation feel like a native application, significantly improving user satisfaction and engagement.

## Approach

`docmd` utilizes a high-performance **Single Page Application (SPA) Router** built on top of pre-generated static files. This allows the browser to intercept link clicks, fetch only the necessary content in the background, and update the page dynamically without a full reload. This approach preserves the state of the sidebar, table of contents, and theme settings, resulting in near-instant transitions.

## Implementation

The `docmd` SPA router is enabled by default and uses several advanced techniques to achieve sub-100ms navigation speeds:

### 1. Intent-Based Prefetching

When a user hovers over a navigation link, `docmd` detects the intent to navigate and initiates a background fetch for the target page's content. By the time the user actually clicks the link, the data is often already available in the browser's cache, making the transition feel instantaneous.

### 2. Partial DOM Updates

Instead of re-rendering the entire page, `docmd` intelligently updates only the necessary functional zones:
*   **Main Content**: The primary Markdown-rendered body.
*   **Table of Contents**: Refreshed to match the new page's headers.
*   **Navigation State**: Updates the active and expanded states in the sidebar.

### 3. Lifecycle Events for Custom Logic

Because the browser doesn't perform a full reload, standard events like `DOMContentLoaded` only fire once. To execute custom JavaScript after every navigation—such as re-initializing a third-party widget or tracking page views—you should listen for the `docmd:page-mounted` event.

```javascript
// Example: Re-initializing a custom component after navigation
document.addEventListener('docmd:page-mounted', (event) => {
  const currentPath = event.detail.path;
  console.log(`Successfully navigated to: ${currentPath}`);
  
  // Custom logic here
  if (currentPath.includes('/api/')) {
    initApiConsole();
  }
});
```
For more details, see the [Client-Side Events](../../api/client-side-events) documentation.

## Trade-offs

### Script Execution
The SPA router automatically re-executes `<script>` tags found within the Markdown body of the new page. However, global scripts defined in your theme or layout only run once during the initial load. Always use the `docmd:page-mounted` event for logic that must execute on every page.

### SEO and Accessibility
Despite the SPA-like behaviour, `docmd` still generates a complete, standalone `.html` file for every page. This ensures that search engine crawlers see the full content and that the site remains functional for users with JavaScript disabled, maintaining excellent SEO and accessibility standards.
