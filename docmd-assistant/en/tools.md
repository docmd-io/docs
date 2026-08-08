---
title: "Tool System"
description: "Creating, registering, and executing custom and standard tools with docmd-assistant."
---

`docmd-assistant` includes a tool execution system. Tools allow the assistant to run full-text search, read document pages, navigate URLs, copy code snippets, or invoke custom functions in your application.

## Defining a Tool

A tool definition requires a `name`, `description`, `parameters` schema, and an `execute` (or `handler`) function:

```typescript
import { AssistantTool } from 'docmd-assistant';

const weatherTool: AssistantTool = {
  name: 'get_weather_forecast',
  description: 'Retrieve current weather forecast for a city.',
  parameters: {
    type: 'object',
    properties: {
      city: { type: 'string', description: 'City name' },
      unit: { type: 'string', enum: ['celsius', 'fahrenheit'], description: 'Temperature unit' }
    },
    required: ['city']
  },
  execute: async ({ city, unit = 'celsius' }) => {
    // Perform API call or application logic
    return { city, temperature: 22, unit, condition: 'Sunny' };
  }
};
```

## Registering Tools

Register tools upon initialisation or dynamically via `registerTool()`:

::: tabs
== tab "At Initialisation" icon:settings
```typescript
const assistant = new DocmdAssistantEngine({
  tools: [weatherTool]
});
```
== tab "Dynamic Registration" icon:plus-circle
```typescript
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
:::

## Standard Documentation Tools

`docmd-assistant` exports a `createStandardTools()` factory function providing four standard documentation tools:

| Tool Name | Parameters | Description |
| :-------- | :--------- | :---------- |
| `search_documentation` | `{ query: string }` | Searches document indices or active DOM heading sections |
| `read_documentation_page` | `{ path: string }` | Fetches and extracts full page text and code blocks |
| `navigate_to_page` | `{ path: string }` | Navigates the browser to a URL or scroll anchor (`#section`) |
| `copy_code_snippet` | `{ code: string }` | Copies code snippets directly to the user's system clipboard |

### Initialising Standard Tools

```typescript
import { DocmdAssistantEngine, createStandardTools } from 'docmd-assistant';

const assistant = new DocmdAssistantEngine({
  tools: createStandardTools(
    // 1. Custom search callback (e.g. docmd-search, Algolia, Fuse.js, or backend API)
    async (query) => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      return await res.json();
    },
    // 2. Custom page reader callback (CMS API, raw Markdown endpoint, or backend DB)
    async (path) => {
      const res = await fetch(`/api/page?path=${encodeURIComponent(path)}`);
      const data = await res.json();
      return { title: data.title, content: data.markdown };
    }
  )
});
```

## Search Integration Modes

`createStandardTools()` supports three search integration modes:

::: grid

::: card "docmd Plugin Mode" icon:puzzle
When used within a `docmd` site via `@docmd/plugin-ai`, search delegates directly to `docmd-search` (`window.docmdSearch`), searching pre-built static index batches.
:::

::: card "Custom Search Callback" icon:search
Provide a `customSearch` function to connect external search engines like Algolia, Fuse.js, or server endpoints.
:::

::: card "DOM Heading Scraper" icon:code
If no custom search callback is provided, `search_documentation` falls back to an in-browser DOM scraper that searches `<h1>`–`<h4>` headings and `<section>` tags on the active page.
:::

:::

## Full Page Reader Mechanics (`read_documentation_page`)

When search result snippets are insufficient, the assistant automatically calls `read_documentation_page({ path })`:

1. **Custom Reader Callback (`customReader`)**: If provided, the engine delegates page fetching to your custom loader.
2. **DOM Parser Fallback**: If no callback is provided, the tool fetches `window.location.origin + path` using `fetch()` and extracts text from `<main>`, `<article>`, or `[role="main"]` elements using `DOMParser()`.
3. **Hyperlinked Citations**: Returned page content is incorporated into context, allowing the model to generate clickable Markdown links `[Page Title](path)` in its final answer.