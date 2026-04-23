---
title: "Implementing Custom Favicons and Metadata"
description: "A comprehensive guide on favicons & meta."
---

## Problem

The uncustomized state of any site leads to generic browser tabs (the default globe icon) and terrible social media previews when links are shared on Slack or Twitter, diminishing click-through rates.

## Why it matters

When an engineer pins your documentation tab, the Favicon is the only visual identifier they see. When they share an article internally, rich social previews containing branding and accurate titles validate the link's authority.

## Approach

`docmd` natively handles standard metadata injection automatically based on your configuration `url` and `description` root tags. However, customized favicons and distinct social (OpenGraph) images must be placed manually.

## Implementation

### 1. The Favicon Array
Generate your favicons (e.g., using a tool like realfavicongenerator.net) and place them in the `assets/` directory. Target them using the `head` array in `docmd.config.js`.

```javascript
export default defineConfig({
  head: [
    ['link', { rel: 'icon', type: 'image/x-icon', href: '/assets/favicon.ico' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/assets/favicon-32x32.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/assets/apple-touch-icon.png' }]
  ]
});
```

### 2. Page-Level Open Graph Images
If a specific major release post needs a custom banner image when shared, use the `image` frontmatter property explicitly on that markdown file.

```yaml
---
title: "Release v3.0: The Future"
image: "https://docs.mycompany.com/assets/v3-hero.png"
---
```
`docmd` will automatically extract this and map it to `og:image` and `twitter:image` tags in the `<head>`.

## Trade-offs

Managing custom `<head>` tags in the central JS config file requires hardcoding asset paths. If an asset is moved or renamed in your file system without updating the config array, `docmd` will not inherently throw a compilation error, and the image will 404 silently in production.
