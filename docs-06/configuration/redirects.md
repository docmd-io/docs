---
title: "Redirects & 404"
description: "Configure metadata-based redirects and custom branded 404 error pages for static deployments."
---

In a static hosting environment, there is no server-side logic (such as Nginx rules or `.htaccess` files) to handle dynamic routing. `docmd` addresses this by generating native HTML failsafes that handle redirection and error states automatically.

## Server-less Redirects

You can forward traffic from legacy URLs to new destinations by defining a mapping in the `redirects` object.

```javascript
export default defineConfig({
  redirects: {
    '/setup': '/getting-started/installation', // Short URL to deep link
    '/v1/api': '/api-reference'                  // Legacy version to modern path
  }
});
```

### Technical Implementation

When a redirect is defined, `docmd` creates an `index.html` file at the legacy path containing a `<meta http-equiv="refresh">` tag. This strategy ensures:

1.  **Seamless Redirection**: Users are forwarded to the new destination instantly after the page loads.
2.  **SEO Preservation**: Search engines recognize the redirection, helping to maintain link equity.
3.  **Analytics Tracking**: Page views are captured before the redirect occurs, preserving your traffic data.

## Branded 404 Pages

When a user attempts to access a non-existent URL, most static hosting providers (Netlify, Vercel, GitHub Pages) automatically look for a `404.html` file in the root directory. `docmd` generates this file by default, ensuring it inherits your site's theme, sidebar, and SPA functionality.

### Customizing Error Content

You can personalize the 404 error message within your configuration:

```javascript
export default defineConfig({
  notFound: {
    title: '404: Page Not Found',
    content: "We couldn't find the page you're looking for. Use the sidebar to find your way back."
  }
});
```

::: callout tip "Local Development"
The `docmd dev` server automatically serves your custom 404 page whenever a requested file is missing, allowing you to test the error experience locally.
:::