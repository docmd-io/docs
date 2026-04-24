---
title: "Alongside Other Tools"
description: "Strategies for integrating docmd into a multi-tool documentation ecosystem to create a seamless user experience."
---

## Problem

Large organizations rarely use a single tool for all their documentation needs. Your company might use Confluence for internal specifications, Stoplight for API design, and GitHub for code examples. Integrating these disparate sources into a unified user journey is a significant challenge, as users often find themselves jumping between disconnected portals with different styles and navigation.

## Why it matters

A fragmented documentation experience ruins developer trust and increases cognitive load. If a user is forced to switch between completely different interfaces just to follow a single tutorial, they are more likely to lose context or abandon your product. Unifying your tools ensures a professional, cohesive experience that encourages exploration and learning.

## Approach

Use `docmd` as your primary documentation hub or "Single Pane of Glass." By leveraging the [Menubar](../../configuration/menubar) for unified navigation and [Embed Containers](../../content/containers/embed) for third-party content, you can create a seamless interface that hides the complexity of your multi-tool infrastructure.

## Implementation

### 1. Unified Global Navigation

Use the `menubar` configuration to link your various documentation portals together. This ensures that users can always find their way back to the main guides, regardless of which subdomain they are currently on.

```javascript
// docmd.config.js
export default {
  layout: {
    menubar: {
      left: [
        { text: 'Guides', url: '/' }, // docmd site
        { text: 'API Reference', url: 'https://api.example.com' }, // External tool
        { text: 'Community', url: 'https://forum.example.com', external: true }
      ]
    }
  }
};
```

### 2. Seamless Embedding

For tools that provide a web interface (like interactive API explorers or dashboard previews), use the `::: embed` container to display them directly within your `docmd` pages. This keeps users within your branded environment.

```markdown
# Interactive API Explorer

::: embed "https://api.example.com/v1/explorer"
:::
```
For more information, see the [Embed Reference](../../content/containers/embed).

### 3. Content Aggregation

For external content that must be searchable alongside your core documentation, consider a build step that fetches data from other sources and converts it into Markdown. This allows `docmd` to index all your information in a single, unified [Search Index](../../plugins/search).

## Trade-offs

While embedding provides a unified look, it can occasionally introduce performance overhead or "scroll-nesting" issues on mobile devices. Furthermore, content within an iframe is not natively indexed by `docmd`'s search engine. If search parity is critical, prioritizing [OpenAPI Generation](./openapi-generation) or other Markdown-based ingestion methods is recommended.
