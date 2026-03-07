---
title: "Redirects & 404"
description: "Configure instant metadata-based redirects and custom branded 404 error pages for static deployments."
---

In a static environment, there is no server-side logic (like `.htaccess` or Nginx rules) to handle routing. `docmd` solves this by generating native HTML failsafes that handle redirection and error states automatically.

## Server-less Redirects

You can forward traffic from old URLs to new destinations by defining a mapping in the `redirects` object.

```javascript
module.exports = defineConfig({
  redirects: {
    '/setup': '/getting-started/installation', // Redirect /setup to new path
    '/v1/api': '/api-reference'                  // Forward legacy API links
  }
});
```

### Technical Implementation
When you define a redirect, `docmd` creates a directory and an `index.html` at the old path containing a `<meta http-equiv="refresh">` tag. This ensures:
1.  **Humans** are redirected instantly after the page loads.
2.  **Search Engines** recognize the canonical link to the new content.
3.  **Analytics** are preserved across the transition.

## Branded 404 Pages

When a user accesses a non-existent URL, most static hosts (Netlify, Vercel, GitHub Pages) look for a `404.html` file in the root. `docmd` automatically generates this file, ensuring that it inherits your theme, sidebar, and Single Page Application (SPA) functionality.

### Customizing the Error Content

You can customize the 404 messaging in your configuration:

```javascript
module.exports = defineConfig({
  notFound: {
    title: '404: Lost in the Docs',
    content: "We couldn't find the page you're looking for. Use the sidebar to find your way back."
  }
});
```

::: callout tip
Local development server (`docmd dev`) will automatically serve this custom 404 page whenever a file is missing.
:::