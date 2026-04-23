---
title: "Using docmd Alongside Other Documentation Tools"
description: "A comprehensive guide on parallel tools."
---

## Problem

Large enterprises rarely use a single tool. Your company might use Confluence for internal specs, Stoplight for APIs, and want `docmd` for user-facing SDK tutorials. Integrating these disparate silos into a seamless user journey is critical.

## Why it matters

If a user clicks an SDK method and is thrown into a jarring, completely unstyled Swagger UI hosted on a different subdomain, context is lost, and the developer experience shatters.

## Approach

Utilize `docmd` as your "Glass Pane" routing hub. Use its powerful menubar linking and container embedding capabilities to unify tools without replacing them.

## Implementation

### 1. Iframe Embeds
If you use a hosted API explorer (like ReadMe or Scalar), you can embed it directly inside a `docmd` container, keeping the user encompassed by your docmd sidebar and layout.

```markdown
::: embed "https://api.mycompany.com/explorer"
:::
```

### 2. Header and Routing Unification
If you must use separate subdomains (`docs.site.com` and `api.site.com`), replicate the `docmd` menubar globally. You can use docmd's `layout` config to map external URLs precisely.

```javascript
// docmd.config.js
export default defineConfig({
  layout: {
    menubar: {
      left: [
        { text: 'SDK Guides', url: '/' }, // Handled by docmd
        { text: 'REST API', url: 'https://api.site.com', external: false } // Avoids opening a new tab
      ]
    }
  }
});
```

## Trade-offs

Iframe embedding creates "scroll within a scroll" UX issues on mobile devices. Furthermore, using `docmd` purely as a router means your global search index (`docmd-search`) will not be able to natively index the content buried in external tools like Confluence or Stoplight unless you write custom scraping scripts.
