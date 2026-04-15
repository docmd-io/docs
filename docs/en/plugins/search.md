---
title: "Search Plugin"
description: "Enable high-speed, offline-first full-text search for your documentation using MiniSearch."
---

The `@docmd/plugin-search` plugin provides a powerful, client-side search experience for your documentation. It uses [MiniSearch](https://github.com/lucaong/minisearch) to build a lightweight index during the build process, allowing users to find technical information instantly without a server-side database.

## Configuration

Search is enabled by default in most `docmd` templates. You can control its visibility and placement via the `layout` configuration.

```javascript
import { defineConfig } from '@docmd/core';

export default defineConfig({
  layout: {
    optionsMenu: {
      position: 'header', // 'header', 'sidebar-top', 'sidebar-bottom', or 'menubar'
      components: {
        search: true // Set to false to disable the search plugin entirely
      }
    }
  }
});
```

## How It Works

### 1. Indexing (Build-time)
During the `docmd build` process, the search plugin iterates through every page on your site. It extracts the title, headings, and plain-text prose, then compiles this data into a compressed `search-index.json` file. 

*   **Deep Linking**: The indexer automatically registers every heading (`#`, `##`, etc.) as a searchable target.
*   **Relevancy Boosting**: Titles are given the highest weight, followed by headings, then page content.

### 2. Retrieval (Client-side)
When a user opens the search modal (usually via `/` or `Ctrl+K`), the `search-index.json` is fetched by the browser. Searches are performed locally using fuzzy matching (allowing for small typos) and instant prefix matching.

## Customizing Search Behavior

While the search plugin is designed for zero-config simplicity, you can exclude specific pages from the index by using the `noindex` flag in their frontmatter:

```yaml
---
title: "Internal Specification"
noindex: true # This page will not appear in search results or sitemaps
---
```

## Technical Implementation

The plugin injects a lightweight search modal into the `<body>` of your site. It is fully accessible (ARIA compliant) and supports keyboard navigation for a native app-like experience.

::: callout tip "Search Analytics"
If you have the [Analytics Plugin](./analytics) enabled, search keywords used by your readers are automatically captured and sent to your analytics provider, giving you insights into what information is missing or hardest to find.
:::
Because the search happens entirely on the client, no data—not even keystrokes—is ever sent to a server. This makes `docmd` the Gold Standard for documentation search in privacy-sensitive industries (Healthcare, Finance, Security).

## Comparison

Many documentation generators (like Docusaurus) rely on **Algolia DocSearch**. While Algolia is powerful, it introduces friction:

| Feature | docmd Search | Algolia / External |
| :--- | :--- | :--- |
| **Setup** | **Zero Config** (Automatic) | Complex (API Keys, CI/CD crawling) |
| **Privacy** | **100% Private** (Client-side) | Data sent to 3rd party servers |
| **Offline** | **Yes** | No |
| **Cost** | **Free** | Free tier limits or Paid |
| **Speed** | **Instant** (In-memory) | Fast (Network latency dependent) |