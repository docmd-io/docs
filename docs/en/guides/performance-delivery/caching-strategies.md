---
title: "Caching Strategies for Static Documentation Sites"
description: "A comprehensive guide on caching strategies."
---

## Problem

When a documentation site relies heavily on static assets (images, CSS, JS bundles) without strict cache-control headers, browsers will unnecessarily re-download megabytes of data on every return visit. This causes visual stuttering and consumes massive amounts of bandwidth.

## Why it matters

Bandwidth costs money. Even on free CDN tiers like Netlify or Cloudflare, hitting limits due to improper caching will trigger rate limits or billing upgrades. More importantly, returning users experience frustratingly slow load times despite having already downloaded the site yesterday.

## Approach

Implement **Immutable Caching** for static assets paired with **Etag Revalidation** for HTML roots. `docmd` natively supports aggressive caching because it generates static assets with deterministic fingerprinting.

## Implementation

`docmd deploy --nginx` and `docmd deploy --caddy` automatically output production-ready configurations with these caching rules embedded.

### NGINX Caching Example

Ensure your web server sets headers that instruct browsers to cache assets for 1 year (`max-age=31536000`), marking them `immutable`.

```nginx
# assets are fingerprinted; they never change
location ~* \.(?:ico|css|js|gif|jpe?g|png|webp|avif|eot|ttf|woff2?|svg)$ {
    expires 1y;
    access_log off;
    add_header Cache-Control "public, max-age=31536000, immutable";
}

# HTML files should be revalidated
location ~* \.html$ {
    add_header Cache-Control "no-cache, must-revalidate";
}
```

## Trade-offs

Immutable caching is dangerous if applied incorrectly. If you apply `max-age=31536000` to a file that *doesn't* have a fingerprint in its filename (like `styles.css` instead of `styles-a1b2.css`), returning users will not see your layout updates for an entire year unless they manually hard-refresh their browser. `docmd` handles fingerprinting automatically to prevent this.
