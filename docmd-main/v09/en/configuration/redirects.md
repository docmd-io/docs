---
title: "Redirects & 404 Pages"
description: "Configure static HTML redirects and custom branded 404 error pages in docmd."
---

Static hosting environments lack dynamic server-side routing engines (such as Nginx rewrite rules). `docmd` generates native HTML failsafes to handle URL redirection and custom error states automatically.

## Server-less HTML Redirects

Forward traffic from legacy URLs to new document destinations by declaring path mappings in the `redirects` object:

```json "docmd.config.json"
{
  "redirects": {
    "/setup": "/getting-started/installation", 
    "/v1/api": "/api-reference"                  
  }
}
```

### Technical Redirection Mechanism

When declaring a redirect mapping, the compiler generates an `index.html` file at the target legacy route containing a `<meta http-equiv="refresh">` HTML tag:

1. **Instant User Redirection**: Readers are forwarded to the new destination route instantly upon landing.
2. **SEO Equity Preservation**: Search engines recognise the meta refresh direction, preserving link equity and indexing authority.
3. **Analytics Tracking**: Client-side analytics scripts log incoming pageviews prior to redirection.

## Custom Branded 404 Error Pages

When visitors request a non-existent URL route, static hosting platforms serve the root `404.html` document. `docmd` compiles a custom `404.html` page by default, inheriting your site's branding, sidebar navigation, and SPA runtime.

### Customising 404 Error Content

Customise 404 page titles and error body copy in `docmd.config.json`:

```json "docmd.config.json"
{
  "notFound": {
    "title": "404: Page Not Found",
    "content": "We couldn't locate the requested page. Use the sidebar navigation to return to active documentation."
  }
}
```

::: callout tip "Testing Error Pages Locally" icon:lightbulb
The `docmd` local development server automatically serves your custom 404 page for missing file routes.
:::