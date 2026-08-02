---
title: "Alongside Other Tools"
description: "Strategies for integrating docmd into a multi-tool documentation ecosystem to create a seamless user experience."
---

## Problem

Large organisations rarely use a single tool for documentation. You might use Confluence for internal specs, Stoplight for APIs, and GitHub for code. Integrating disparate sources into a unified user journey is a challenge. Users often jump between disconnected portals with different styles and navigation.

## Why it matters

A fragmented documentation experience ruins developer trust and increases cognitive load. If a user switches between completely different interfaces to follow a tutorial, they lose context or abandon your product. Unifying your tools ensures a professional, cohesive experience that encourages exploration.

## Approach

Use docmd as your primary documentation hub. By using the [Menubar](../../configuration/menubar.md) for unified navigation and [Embed Containers](../../content/containers/embed.md) for third-party content, you can create a seamless interface that hides multi-tool complexity.

## Implementation

### 1. Unified Global Navigation

Use the `menubar` configuration to link your various documentation portals together. This ensures users can always find their way back to the main guides, regardless of which subdomain they are on.

```json
  "layout": {
    "menubar": {
      "left": [
        { "text": "Guides", "url": "/" }, 
        { "text": "API Reference", "url": "https://api.example.com" },
        { "text": "Community", "url": "https://forum.example.com" }
      ]
    }
  }
```

### 2. Seamless Embedding

For tools that provide a web interface (like interactive API explorers or dashboard previews), use the `::: embed` container. This displays them directly within your docmd pages, keeping users within your branded environment.

```markdown
# Interactive API Explorer

::: embed "https://api.example.com/v1/explorer"
:::
```
For more information, see the [Embed Reference](../../content/containers/embed.md).

### 3. Content Aggregation

For external content that must be searchable alongside core documentation, consider a build step that fetches data from other sources and converts it into Markdown. This allows docmd to index all information in a single, unified [Search Index](../../plugins/search.md).

## Trade-offs

While embedding provides a unified look, it can introduce performance overhead or "scroll-nesting" issues on mobile devices. Content within an iframe is not natively indexed by docmd's search engine. If search parity is critical, prioritising [OpenAPI Generation](openapi-generation.md) or other Markdown-based ingestion methods is recommended.