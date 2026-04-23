---
title: "Optimising Documentation Content for Local-First Search Engines"
description: "A comprehensive guide on local-first opt."
---

## Problem

Local-first search engines (engines that run entirely in the browser using WebAssembly or Javascript, like MiniSearch or Pagefind) have strict memory limitations. If you feed them raw, unoptimized Markdown, the index balloons and crashes the user's browser tab with out-of-memory errors.

## Why it matters

Browser tabs are constrained to specific RAM limits (often ~2GB, but practically much lower for smooth operation). Swelling the memory footprint with a massive, unoptimized search index causes page scrolling to jitter, battery life to plummet, and eventually tab crashes on mobile devices.

## Approach

A local-first engine requires you to prune the data *before* indexing it. You cannot rely on server-side compute to filter results on the fly. We must optimize the text corpus at build time.

## Implementation

### 1. The docmd Extraction Pipeline
`docmd` intercepts your markdown during the build process and strips out raw formatting before handing it to the indexer. It removes:
- HTML Tags
- Markdown links `[text](url)` -> `text`
- Callout syntax `::: callout`

### 2. Customizing the Indexer
If your codebase has heavy, repetitive code blocks (like massive JSON responses in an API reference), you can configure `docmd` to only index the `headers` and `title` of API files, ignoring the body.

```javascript
export default defineConfig({
  plugins: {
    search: {
      excludeSelectors: ['.code-block-large', '.api-response-sample']
    }
  }
});
```
*(Note: Exclude selectors are a planned capability in the next Search Plugin iteration).*

## Trade-offs

By aggressively pruning indexable content (e.g., stripping out code blocks from the index), you lose the ability for users to search for specific deep variable names nested within JSON examples. You must evaluate whether your users search more for "Concepts" or "Deep Code References".
