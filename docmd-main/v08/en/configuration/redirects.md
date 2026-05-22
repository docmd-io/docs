---
title: "Redirects & 404"
description: "Configure metadata-based redirects and custom branded 404 error pages for static deployments."
---

Static hosting environments lack server-side logic (like Nginx rules) for dynamic routing. docmd generates native HTML failsafes to handle redirection and error states automatically.

## Server-less Redirects

Forward traffic from old URLs to new destinations by defining mappings in the `redirects` object.

```json
{
  "redirects": {
    "/setup": "/getting-started/installation", 
    "/v1/api": "/api-reference"                  
  }
}
```

### Technical Implementation

When you define a redirect, the engine creates an `index.html` file at the old path containing a `<meta http-equiv="refresh">` tag. This strategy ensures:

1.  **Seamless Redirection**: Users forward to the new destination instantly.
2.  **SEO Preservation**: Search engines recognise the redirection to maintain link equity.
3.  **Analytics Tracking**: Page views register before the redirect occurs.

## Branded 404 Pages

When users request a missing URL, static hosts automatically load a root `404.html` file. docmd generates this file by default. It inherits your site's theme, sidebar, and SPA functionality perfectly.

### Customising Error Content

Personalise the 404 error message in your configuration:

```json
{
  "notFound": {
    "title": "404: Page Not Found",
    "content": "We couldn't find the page you're looking for. Use the sidebar to find your way back."
  }
}
```

::: callout tip "Local Development" icon:lightbulb
The development server automatically serves your custom 404 page for missing files. Test the error experience locally.
:::