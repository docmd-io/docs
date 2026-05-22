---
title: "Caching Strategies"
description: "How to optimise your documentation site's performance using immutable caching, Etag revalidation, and production-ready server configurations."
---

## Problem

When a documentation site is served without proper cache-control headers, browsers unnecessarily re-download images, CSS, and JavaScript bundles. This results in visual stuttering, increased bandwidth consumption, and a poor experience for returning users.

## Why it matters

Effective caching is highly impactful for improving perceived performance. Storing static assets locally in the user's browser eliminates the latency of repeated network requests. This makes navigation feel fluid and reliable, even on unstable connections.

## Approach

Implement a two-tier caching strategy: **Immutable Caching** for static assets (CSS, JS, images) and **Etag Revalidation** for dynamic content (HTML, JSON). docmd facilitates this by generating production-ready configurations that handle cache-busting automatically.

## Implementation

### 1. Production-Ready Server Configs

The easiest way to implement optimal caching is by using the [Deploy Command](../../deployment/index.md) to generate your server configuration.

```bash
# Generate an optimised Nginx configuration
npx @docmd/core deploy --nginx
```

### 2. Immutable Assets

For assets that don't change frequently (like theme styles and core scripts), use long-term caching. docmd appends version hashes to these assets to ensure users only download new versions when you update your documentation.

```nginx
# Example Nginx rule for immutable assets
location ~* \.(?:css|js|webp|png|svg|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, max-age=31536000, immutable";
}
```

### 3. HTML & Navigation Revalidation

Your HTML files and `navigation.json` should always be checked for updates. This ensures users see the latest content immediately. Use the `no-cache` directive to force the browser to revalidate with the server using Etags.

```nginx
# Example Nginx rule for HTML files
location ~* \.html$ {
    add_header Cache-Control "no-cache, must-revalidate";
}
```

## Trade-offs

### Stale Content vs. Performance

Setting long cache times for assets is highly performant but requires a reliable "cache-busting" strategy. docmd handles this automatically for core files. If you manually add assets to your `static/` directory, you must update their references (e.g., by changing the filename or adding a query parameter) when content changes.

### CDN Integration

If you use a CDN (like Cloudflare or AWS CloudFront), ensure it honours your server's `Cache-Control` headers. Most modern CDNs provide "instant purge" capabilities. We recommend triggering this as part of your CI/CD pipeline whenever you deploy a new version.