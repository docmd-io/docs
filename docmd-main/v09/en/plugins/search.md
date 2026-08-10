---
title: "Search Plugin"
description: "Enable high-speed, offline-first full-text keyword search and local semantic embeddings in docmd."
---

The `@docmd/plugin-search` plugin provides a client-side search experience for your documentation site. It uses [MiniSearch](external:https://github.com/lucaong/minisearch) to build a compressed index during compilation, enabling readers to search technical documentation instantly without requiring server-side databases or third-party crawling services.

## Configuration Options

Search is enabled by default across standard `docmd` templates. Configure indexer parameters and header placement in `docmd.config.json`:

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `enabled` | `boolean` | `true` | Enable or disable full-text search index generation. |
| `placeholder` | `string` | `'Search...'` | Input placeholder text in search dialogs. |
| `maxResults` | `number` | `10` | Maximum number of search results returned in the modal window. |

### Header Integration Example

```json "docmd.config.json"
{
  "layout": {
    "optionsMenu": {
      "position": "header",
      "components": {
        "search": true
      }
    }
  }
}
```

## How Keyword Search Works

### 1. Build-Time Indexing
During site compilation (`npx @docmd/core build`), `@docmd/plugin-search` traverses every page on your site. It extracts headings, titles, and body prose to generate a compressed `search-index.json` bundle:

* **Deep Linking**: Registers heading anchors (`#`, `##`) as direct search jump targets.
* **Relevance Weighting**: Page titles receive highest weighting, followed by section headings, then prose paragraphs.

### 2. Client-Side Retrieval
When a user opens the search modal (press `Ctrl+K` or `/`), the browser fetches `search-index.json`. Queries execute locally with prefix matching and fuzzy string distance matching to accommodate minor typos.

## Customising Search Scope

To exclude specific pages from the search index, add `noindex: true` to [Page Frontmatter](../content/frontmatter.md):

```yaml
---
title: "Internal Draft Specification"
noindex: true
---
```

::: callout tip title:"Privacy & Compliance" icon:shield-check
Because search queries execute entirely within client memory, zero search input or keystroke telemetry leaves the user's browser.
::: /callout

## Offline Local Semantic Search

`@docmd/plugin-search` includes support for local semantic search powered by `docmd-search`. Semantic search uses client-side embedding models to process queries conceptually rather than matching literal keywords.

### Enabling Semantic Search

1. Install `docmd-search` in your documentation workspace:

```bash
npm install docmd-search
```

2. Enable semantic indexing in `docmd.config.json`:

```json "docmd.config.json"
{
  "plugins": {
    "search": {
      "semantic": true
    }
  }
}
```

### Semantic Search Options

| Option | Type | Default | Technical Purpose |
| :--- | :--- | :--- | :--- |
| `semantic` | `boolean` | `false` | Enable vector embedding search. |
| `showConfidence` | `boolean` | `false` | Display similarity percentage badges on search results. |
| `showFilters` | `boolean` | `true` | Display version filter controls in search dialogs. |
| `model` | `string` | `'Xenova/all-MiniLM-L6-v2'` | HuggingFace embedding model ID. |
| `chunkSize` | `number` | `512` | Token chunking limit per document section. |

### Supported Embedding Models

| Model ID | Download Size | Best For |
| :--- | :--- | :--- |
| `Xenova/all-MiniLM-L6-v2` *(Default)* | ~23 MB | English technical documentation |
| `Xenova/paraphrase-multilingual-MiniLM-L12-v2` | ~118 MB | Multilingual sites (German, Chinese, French) |
| `Xenova/multilingual-e5-small` | ~118 MB | Broad international language coverage |

::: callout info "Automatic Fallback" icon:info
If `docmd-search` is enabled but vector embedding dependencies cannot be loaded, the search plugin falls back gracefully to standard MiniSearch keyword indexing.
:::