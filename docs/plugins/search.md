---
title: "Search Plugin"
description: "Configure the offline-capable, full-text search engine."
---

# Search Plugin

`docmd` includes a privacy-focused, offline-capable search engine powered by `MiniSearch`. It indexes your content at build time, meaning no external services (like Algolia) are required.

## Configuration

The search plugin is enabled by default. You can configure it via the `optionsMenu` in the layout config, or the `plugins` object.

### Enabling/Disabling

To toggle the search button in the UI:

```javascript
// docmd.config.js
module.exports = {
  layout: {
    optionsMenu: {
      components: {
        search: true, // Set to false to hide the search icon
      }
    }
  }
}
```

### Excluding Pages

To prevent specific pages (like drafts or utility pages) from appearing in search results, add `noindex: true` to the frontmatter:

```yaml
---
title: "Private Draft"
noindex: true
---
```

## How it Works

1.  **Build Time:** The plugin scans all generated HTML, strips tags, and extracts headings/text into `site/search-index.json`.
2.  **Runtime:** When a user opens your site, the lightweight index is loaded.
3.  **Privacy:** All search logic happens locally in the user's browser. No keystrokes are sent to any server.

## Keyboard Shortcuts

*   `Cmd + K` (Mac) or `Ctrl + K` (Windows): Open Search
*   `Arrow Up/Down`: Navigate results
*   `Enter`: Select result
*   `Esc`: Close modal

## Comparison vs. Algolia

Many documentation generators (like Docusaurus) rely on **Algolia DocSearch**. While Algolia is powerful, it introduces friction:

| Feature | docmd Search | Algolia / External |
| :--- | :--- | :--- |
| **Setup** | **Zero Config** (Automatic) | Complex (API Keys, CI/CD crawling) |
| **Privacy** | **100% Private** (Client-side) | Data sent to 3rd party servers |
| **Offline** | **Yes** | No |
| **Cost** | **Free** | Free tier limits or Paid |
| **Speed** | **Instant** (In-memory) | Fast (Network latency dependent) |

`docmd` creates a frictionless experience: you write the markdown, we handle the discovery.