---
title: "Redirects & 404"
description: "Configure server-less 301 redirects and custom 404 pages."
---

`docmd` generates static HTML files. Since there is no backend server logic, we simulate redirects and 404s using standard static site techniques.

## Redirects

You can define rewrite rules to forward users from old URLs to new ones. This is crucial when you rename pages or restructure your docs.

```javascript
// docmd.config.js
module.exports = defineConfig({
  // ...
  redirects: {
    '/old-setup': '/getting-started/installation',
    '/api/v1': '/v1/api-reference'
  }
});
```

### How it works
`docmd` generates a small HTML file at the "old" path (e.g., `site/old-setup/index.html`) containing a `<meta http-equiv="refresh">` tag and a canonical link to the new URL. Search engines treat this similarly to a 301 Redirect.

## Custom 404 Page

If a user navigates to a non-existent link, `docmd` generates a `404.html` file using your site's theme and layout.

You can customize the text of this page:

```javascript
module.exports = defineConfig({
  // ...
  notFound: {
    title: 'Page Not Found',
    content: 'Oops! It looks like this page has been moved or deleted.'
  }
});
```

::: callout tip
If you are hosting on GitHub Pages or a static server, you should configure your server to serve `404.html` when a file is missing. Most platforms (Netlify, Vercel, GitHub Pages) do this automatically.
:::