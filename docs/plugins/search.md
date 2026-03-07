---
title: "Search Plugin"
description: "Configure docmd's zero-config, privacy-focused offline search engine with section-deep linking."
---

Every `docmd` project includes a powerful, full-text search engine built-in. Unlike traditional search tools that require external indexing services or server-side databases, `docmd` search runs **entirely in the user's browser**.

## How it Works

1.  **Build Phase**: `docmd` analyzes your markdown and generates a compressed `search-index.json`.
2.  **Section Awareness**: We don't just index pages; we index **headers**. If a keyword appears in a specific `###` section, the search result will link the user directly to that section using its permalink.
3.  **Local Execution**: When a user types, the matching happens instantly in memory using `MiniSearch`. It works perfectly in air-gapped environments or on slow connections.

## Configuration

The search plugin is **active by default**. You can customize its presence via the `layout` object.

```javascript
// docmd.config.js
module.exports = {
  layout: {
    optionsMenu: {
      components: {
        search: true // Set to false to remove the search button
      }
    }
  }
}
```

## Advanced Usage

### Excluding Content
To prevent a specific page from being indexed (e.g., utility pages), add `noindex` to the frontmatter:

```yaml
---
title: "Private Info"
noindex: true
---
```

### Keyboard Shortcuts
We've optimized the search experience with native feeling shortcuts:
*   `Cmd + K` (Mac) or `Ctrl + K` (Windows) to open.
*   `ESC` to close.
*   `Arrow Keys` and `Enter` to navigate.


## Privacy First
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