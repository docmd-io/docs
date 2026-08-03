---
title: Tool Execution System
description: Registering and executing custom tools with docmd-assistant.
---

`docmd-assistant` features a client-side and server-side tool execution system. Tools allow the AI Assistant to query external databases, perform full-text searches, navigate documentation pages, or execute custom logic in your application.

## Defining a Custom Tool

A tool definition requires a `name`, `description`, structured `parameters` schema, and an `execute` (or `handler`) function:

```typescript
import { AssistantTool } from 'docmd-assistant';

const weatherTool: AssistantTool = {
  name: 'get_weather_forecast',
  description: 'Retrieve current weather forecast for a specified city.',
  parameters: {
    type: 'object',
    properties: {
      city: { type: 'string', description: 'Name of the city' },
      unit: { type: 'string', enum: ['celsius', 'fahrenheit'], description: 'Temperature unit' }
    },
    required: ['city']
  },
  execute: async ({ city, unit = 'celsius' }) => {
    // Custom API call or logic
    return { city, temperature: 22, unit, condition: 'Sunny' };
  }
};
```

## Registering Tools

Register tools during initialisation or dynamically via `registerTool()`:

```typescript
// During initialisation
const assistant = new DocmdAssistantEngine({
  tools: [weatherTool]
});

// Dynamically at runtime
assistant.registerTool({
  name: 'open_modal',
  description: 'Open a user interface modal dialog',
  parameters: {
    type: 'object',
    properties: {
      modalId: { type: 'string' }
    },
    required: ['modalId']
  },
  execute: async ({ modalId }) => {
    document.getElementById(modalId)?.classList.add('visible');
    return { success: true };
  }
});
```

## Standard Documentation Tools

`docmd-assistant` exports built-in helpers (`createStandardTools`) for common documentation interactions:

- `search_documentation`: Performs search queries across document indices or DOM section headers.
- `read_documentation_page`: Fetches and extracts full prose and code blocks from specific documentation pages.
- `navigate_to_page`: Navigates user browser to specific URLs or anchor hashes (`#section`).
- `copy_code_snippet`: Copies code snippets directly to system clipboard.

```typescript
import { DocmdAssistantEngine, createStandardTools } from 'docmd-assistant';

const assistant = new DocmdAssistantEngine({
  tools: createStandardTools(
    // 1. Custom search callback (Algolia, FlexSearch, Fuse.js, or REST API)
    async (query) => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      return await res.json();
    },
    // 2. Custom page reader callback (CMS API, raw Markdown endpoint, or backend DB)
    async (path) => {
      const res = await fetch(`/api/page?path=${encodeURIComponent(path)}`);
      const data = await res.json();
      return { title: data.title, content: data.markdownProse };
    }
  )
});
```

## 🔍 How Documentation Search Indexing Works

Because `docmd-assistant` is a pure headless library, it does not mandate or compile a specific search index format. Instead, it supports two clean search index integration modes:

### Mode 1: Integrated docmd Sites (`@docmd/plugin-ai`)
When running inside a `docmd` static documentation site, `@docmd/plugin-ai` automatically bridges `docmd-assistant` to `@docmd/plugin-search` (which builds a static `search-index.json` during SSG compilation):

```typescript
// Inside @docmd/plugin-ai:
const standardTools = createStandardTools(async (query) => {
  if (window.docmdSearch?.search) {
    // Delegates directly to docmd's indexed search engine
    return await window.docmdSearch.search(query);
  }
  return [];
});
```

### Mode 2: External / Custom Search Engines (Standalone Usage)
When using `docmd-assistant` in a standalone application (React, Vue, Docusaurus, VitePress, CLI, etc.), you can plug in any search index by providing a `customSearch` callback:

```typescript
// Example: Connecting Algolia or Fuse.js to docmd-assistant
const standardTools = createStandardTools(async (query) => {
  const hits = await fuseIndex.search(query);
  return hits.map(hit => ({
    title: hit.item.title,
    path: hit.item.url,
    snippet: hit.item.content.slice(0, 200)
  }));
});
```

### Mode 3: DOM Header & Section Fallback
If no `customSearch` callback is provided, `createStandardTools()` defaults to an in-browser DOM scraper that searches `<h1>`–`<h4>` headers and `<section>` tags on the currently active HTML page.

---

## 📖 Full Page Reading (`read_documentation_page`)

When a search result snippet does not contain full instructions, the AI engine automatically invokes `read_documentation_page({ path })`.

### Reader Execution Options:
1. **Custom Reader Callback (`customReader`)**: If provided, `docmd-assistant` delegates directly to your custom page content loader (e.g. fetching raw Markdown files, headless CMS API endpoints, or database queries).
2. **DOM Parser Fallback**: If no `customReader` is provided, `read_documentation_page` fetches `window.location.origin + path` using `fetch()` and extracts `<main>`, `<article>`, or body content via browser `DOMParser()`.
3. **Hyperlinked Citations**: Returns parsed content to the assistant context, allowing it to cite sources using clickable Markdown links `[Page Title](path)`.